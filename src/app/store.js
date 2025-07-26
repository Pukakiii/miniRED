import { configureStore } from "@reduxjs/toolkit";
import popPostsReducer from "../features/popularPost/popularPostSlice.js";
import subRedditReducer from "../features/subreddit/subredditPostSlice.js";
export const store = configureStore({
  reducer: {
    popular: popPostsReducer,
    subreddit: subRedditReducer,
  },
});
