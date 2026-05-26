import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPopPostsThunk } from "../features/popularPost/popularPostSlice";
import { fetchSubThunk } from "../features/subredditPost/subredditPostSlice";
import { fetchMorePopThunk } from "../features/popularPost/popularPostSlice";
import { fetchMoreSubThunk } from "../features/subredditPost/subredditPostSlice";
import Post from "./postCard";
import { LoadingCircle } from "../utils/miniComponents";
import { ErrorDisplay } from "../utils/miniComponents";

export default function Posts() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { flair } = useParams<{ flair?: string }>();

  const [, pageRoute, category] = location.pathname.split("/");
  const page = (pageRoute as "popular" | "subreddit") || "";

  const postsArr = useAppSelector((state) => state[page]?.posts?.data ?? []);
  const isLoading = useAppSelector(
    (state) => state[page]?.posts?.loading ?? false,
  );
  const loadingMore = useAppSelector(
    (state) => state[page]?.posts?.loadingMore ?? false,
  );
  const nextCursor = useAppSelector(
    (state) => state[page]?.posts?.nextCursor ?? null,
  );
  const error = useAppSelector((state) => state[page]?.posts?.error ?? null);

  useEffect(() => {
    if (page === "popular") {
      dispatch(fetchPopPostsThunk(category || "best"));
    } else if (page === "subreddit" && category) {
      dispatch(fetchSubThunk(category));
    }
  }, [category, dispatch, page]);

  const displayedPosts = useMemo(() => {
    if (!flair) return postsArr;

    return postsArr.filter((postObj) => {
      const [, data] = Object.entries(postObj)[0];
      return data?.category === flair;
    });
  }, [postsArr, flair]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const fetchingMoreRef = useRef(false);

  const loadMore = useCallback(() => {
    if (!nextCursor || fetchingMoreRef.current || loadingMore) return;
    fetchingMoreRef.current = true;

    if (page === "popular") {
      dispatch(
        fetchMorePopThunk({
          category: category || "best",
          after: nextCursor,
        }),
      ).finally(() => {
        fetchingMoreRef.current = false;
      });
    } else if (page === "subreddit" && category) {
      dispatch(
        fetchMoreSubThunk({ subName: category, after: nextCursor }),
      ).finally(() => {
        fetchingMoreRef.current = false;
      });
    }
  }, [category, dispatch, loadingMore, nextCursor, page]);

  useEffect(() => {
    const el = lastElementRef.current;
    if (!el || !nextCursor || isLoading || loadingMore) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [displayedPosts.length, isLoading, loadMore, loadingMore, nextCursor]);

  if (!isLoading && !error && displayedPosts.length === 0) {
    return <p id="init-post-message">Search for posts.</p>;
  }
  if (isLoading) {
    return <LoadingCircle />;
  }

  if (error) {
    if (typeof error === "object" && error !== null && "errorStatus" in error) {
      return <ErrorDisplay error={error} />;
    }
    return (
      <div className="error">
        <p className="error-status">!</p>
        <p>Failed to load posts. Please try again.</p>
      </div>
    );
  }

  return (
    <section className="posts">
      {displayedPosts.map((postObj, index) => {
        const [id, data] = Object.entries(postObj)[0];
        const isLast = index === displayedPosts.length - 1;

        return (
          <div
            key={id}
            className="post-cell"
            ref={isLast ? lastElementRef : undefined}
          >
            <Post index={index} data={data} />
          </div>
        );
      })}
      {loadingMore && <LoadingCircle />}
    </section>
  );
}
