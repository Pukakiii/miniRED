import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsThunk } from "../features/miniRed/miniRedSlice.js";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  
  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, []);

  return (
    <div className="posts">
      <div className="post"></div>
      <div className="post"></div>
      <div className="post"></div>
    </div>
  );
}
