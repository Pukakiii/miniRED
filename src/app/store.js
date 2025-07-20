import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/miniRed/popularPostSlice.js";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
