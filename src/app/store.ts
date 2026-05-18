import { configureStore } from "@reduxjs/toolkit";
import popPostsReducer from "../features/popularPost/popularPostSlice";
import subRedditReducer from "../features/subredditPost/subredditPostSlice";

export const store = configureStore({
  reducer: {
    popular: popPostsReducer,
    subreddit: subRedditReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
