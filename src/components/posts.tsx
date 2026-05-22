import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPopPostsThunk } from "../features/popularPost/popularPostSlice";
import { fetchSubThunk } from "../features/subredditPost/subredditPostSlice";
import Post from "./postCard";
import {LoadingCircle} from "../utils/miniComponents";
import {ErrorDisplay} from "../utils/miniComponents";

export default function Posts() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { flair } = useParams<{ flair?: string }>();
  console.log("Current flair:", flair);
  
  //  page and category types
  const [, pageRoute, category] = location.pathname.split("/");
  const page = (pageRoute as "popular" | "subreddit") || "";

  // Redux data fetching selectors
  const postsArr = useAppSelector((state) => state[page]?.posts?.data ?? []);
  const isLoading = useAppSelector(
    (state) => state[page]?.posts?.loading ?? false,
  );
  const error = useAppSelector((state) => state[page]?.posts?.error ?? null);

  console.log("PostsArr:", postsArr);
  // Posts refetching
  useEffect(() => {
    if (page === "popular") {
      dispatch(fetchPopPostsThunk(category || ""));
    } else if (page === "subreddit" && category && postsArr.length === 0) {
      dispatch(fetchSubThunk(category));
    }
  }, [category, dispatch, page]);

  // Filtering subposts by flair
  const displayedPosts = useMemo(() => {
    if (!flair) return postsArr;

    return postsArr.filter((postObj) => {
      const [, data] = Object.entries(postObj)[0];
      return data?.category === flair;
    });
  }, [postsArr, flair]);

  // rendering logic
  if (isLoading) {
    return <LoadingCircle />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <>
      { 
        <section className="posts">
          {displayedPosts.map((postObj, index) => {
            const [id, data] = Object.entries(postObj)[0];
            return <Post index={index} key={id} data={data} />;
          })}
        </section>
      }
    </>
  );
}
