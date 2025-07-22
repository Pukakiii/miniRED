import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/popularPost/popularPostSlice.js";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
