import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsThunk } from "../features/popularPost/popularPostSlice.js";
import PopPost from "./popularPost.jsx";

export default function Posts() {
  const location = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts.data);

  // console.log("Posts component rendered with location:", location.pathname);
  const category = location.pathname.split("/")[2] || "";
  // console.log("Category derived from location:", category);
  function createPostCards() {
    return posts?.map((post, index) => {
      const [id, data] = Object.entries(post)[0];
      return <PopPost index={index} key={id} data={data} />;
    });
  }

  useEffect(() => {
    if (posts.length > 0) return;
    const storedPosts = localStorage.getItem("popposts");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      dispatch({
        type: "posts/fetchPostsThunk/fulfilled",
        payload: parsedPosts,
      });
    } else {
      dispatch(fetchPostsThunk(category));
    }
  }, [location.pathname, dispatch, posts.length, category]);

  return <section className="posts">{createPostCards()}</section>;
}
