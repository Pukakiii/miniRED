import { configureStore } from "@reduxjs/toolkit";
import popPostsReducer from "../features/popularPost/popularPostSlice";
import subRedditReducer from "../features/subredditPost/subredditPostSlice";
import savedPostsReducer from "../features/savedPosts/savedPostsSlice";

export const store = configureStore({
  reducer: {
    popular: popPostsReducer,
    subreddit: subRedditReducer,
    savedPosts: savedPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
