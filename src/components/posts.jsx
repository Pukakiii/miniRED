import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsThunk } from "../features/popularPost/popularPostSlice.js";
import { fetchSubThunk } from "../features/subreddit/subredditPostSlice.js";
import PopPost from "./popularPost.jsx";

export default function Posts() {
  const location = useLocation();
  const dispatch = useDispatch();

  const page = location.pathname.split("/")[1];

  const posts = useSelector((state) => {
    if (page === "popular") {
      return state.popular.posts.data;
    } else if (page === "subreddit") {
      return state.subreddit.posts.data;
    } else {
      return;
    }
  });

  console.log("Posts component posts:", posts);
  // console.log("Posts component rendered with location:", location.pathname);
  const category = location.pathname.split("/")[2] || "";
  // console.log("Category derived from location:", category);

  useEffect(() => {
    // const page = location.pathname.split("/")[1];

    if (posts.length > 0) return;

    const storedPosts = localStorage.getItem(
      page === "popular" ? "popposts" : "subposts"
    );

    console.log(page);
    console.log("ss" + storedPosts);

    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      console.log(parsedPosts);
      const thunk = page === "popular" ? fetchPostsThunk : fetchSubThunk;
      console.log('it',
        dispatch({
          type: `${thunk.typePrefix}/fulfilled`,
          payload: parsedPosts,
        })
      );
    } else {
      // dispatch(fetchPostsThunk(category));
      dispatch(fetchSubThunk("playboicarti"));
    }
  }, [location.pathname, dispatch, category, posts.length]);

  function createPostCards() {
    return posts.map((post, index) => {
      const [id, data] = Object.entries(post)[0];
      return <PopPost index={index} key={id} data={data} />;
    });
  }

  return <section className="posts">{createPostCards()}</section>;
}
