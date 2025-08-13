import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopPostsThunk, setPopPosts } from "../features/popularPost/popularPostSlice.js";
import { setSubPosts } from "../features/subreddit/subredditPostSlice.js";
import PopPost from "./postCard.jsx";

export default function Posts() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const page = location.pathname.split("/")[1];

  const postsArr = useSelector((state) => {
    if (page === "popular") {
      return state.popular.posts.data;
    } else if (page === "subreddit") {
      return state.subreddit.posts.data;
    } else {
      return;
    }
  });
  const isLoading = useSelector((state) => state[page].posts.loading);
  console.log("Posts component posts:", postsArr);
  console.log("Posts component rendered with location:", location.pathname);
  const category = location.pathname.split("/")[2] || "";
  console.log("Category derived from location:", category);

  // load posts
  useEffect(() => {
    if (page === "popular") {
      const popPosts = JSON.parse(localStorage.getItem('popular'));
      dispatch(fetchPopPostsThunk(category));
    }
    if (page === "subreddit" && category && postsArr.length===0) {
      const subPosts = JSON.parse(localStorage.getItem('subreddit'))
      dispatch(setSubPosts(subPosts));
    }
  }, [location.pathname, dispatch]);
  // set pop posts state
  useEffect(() => {
    if (postsArr.length > 0) {
      setPosts(postsArr);
    }
  }, [postsArr]);

  // categorize posts
  useEffect(() => {
    if (params.flair) {
      const filtered = posts.filter((category) => {
        const [id, data] = Object.entries(category)[0];
        return params.flair === data.category;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, params.flair]);

  console.log("ppps", posts);
  function LoadingCircle() {
    return <div className="loading-circle"></div>;
  }

  function createPostCards() {
    return filteredPosts.map((post, index) => {
      const [id, data] = Object.entries(post)[0];
      return <PopPost index={index} key={id} data={data} />;
    });
  }

  return (
    <>
      {isLoading && LoadingCircle()}
      <section className="posts">{createPostCards()}</section>
    </>
  );
}
