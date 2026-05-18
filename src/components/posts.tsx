import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPopPostsThunk } from "../features/popularPost/popularPostSlice";
import { setSubPosts } from "../features/subredditPost/subredditPostSlice";
import Post from "./postCard";
import type { PostRecord } from "../types";

export default function Posts() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const params = useParams<{ flair?: string }>();
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostRecord[]>([]);

  const page =
    (location.pathname.split("/")[1] as "popular" | "subreddit" | "") || "";
  const category = location.pathname.split("/")[2] || "";

  const postsArr = useAppSelector((state) => {
    if (page === "popular") {
      return state.popular.posts.data;
    }
    if (page === "subreddit") {
      return state.subreddit.posts.data;
    }
    return [];
  });

  const isLoading = useAppSelector((state) => {
    if (page === "popular") {
      return state.popular.posts.loading;
    }
    if (page === "subreddit") {
      return state.subreddit.posts.loading;
    }
    return false;
  });

  useEffect(() => {
    if (page === "popular") {
      dispatch(fetchPopPostsThunk(category));
      return;
    }

    if (page === "subreddit" && category && postsArr.length === 0) {
      const subPostsRaw = localStorage.getItem("subreddit");
      if (subPostsRaw) {
        const subPosts = JSON.parse(subPostsRaw) as {
          posts: PostRecord[];
          numPosts: number;
          linkFlairs: string[];
        };
        dispatch(setSubPosts(subPosts));
      }
    }
  }, [category, dispatch, page, postsArr.length]);

  useEffect(() => {
    setPosts(postsArr);
  }, [postsArr]);

  useEffect(() => {
    if (params.flair) {
      const filtered = posts.filter((category) => {
        const [_, data] = Object.entries(category)[0] as [
          string,
          { category?: string | null },
        ];
        return params.flair === data.category;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, params.flair]);

  function LoadingCircle() {
    return <div className="loading-circle"></div>;
  }

  function createPostCards() {
    return filteredPosts.map((post, index) => {
      const [id, data] = Object.entries(post)[0] as [string, any];
      return <Post index={index} key={id} data={data} />;
    });
  }

  return (
    <>
      {isLoading && <LoadingCircle />}
      <section className="posts">{createPostCards()}</section>
    </>
  );
}
