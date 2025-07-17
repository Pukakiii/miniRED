import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsThunk } from "../features/miniRed/miniRedSlice.js";
import PopReddPost from "./PopReddPost.jsx";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts.data);

  function createPostCards() {
    return posts.map((post) => {
      const [id, data] = Object.entries(post)[0];
      return <PopReddPost key={id} data={data} />;
    });
  }

  useEffect( () => {
    if (posts.length > 0) return;
    const storedPosts = localStorage.getItem("popposts");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      dispatch({ type: "posts/fetchPostsThunk/fulfilled", payload: parsedPosts });
    } else {
      dispatch(fetchPostsThunk());
    }
  }, []);

  return <section className="posts">{createPostCards()}</section>;
}
