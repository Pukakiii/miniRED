import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/posts.js";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
