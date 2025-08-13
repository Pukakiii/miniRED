import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopPosts, fetchSubrredit } from "../../api/postsAPI.js";

export const fetchSubThunk = createAsyncThunk(
  "subreddit/fetchSubThunk",
  async (subName) => {
    const response = await fetchSubrredit(subName);
    console.log("Fetched sub:", response);
    return response;
  }
);

export const subRedditSlice = createSlice({
  name: "subreddit",
  initialState: {
    posts: {
      data: [],
      numPosts: 0,
      loading: false,
      error: false,
    },
    subInfo: {
      data: [],
      loading: false,
      error: false,
    },
  },
  reducers: {
    setSubPosts(state, action) {
      const { posts, numPosts, linkFlairs } = action.payload;
      state.posts.data = posts;
      state.posts.numPosts = numPosts;
      state.subInfo.data = linkFlairs;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubThunk.pending, (state) => {
        state.posts.loading = true;
        state.posts.error = false;
      })
      .addCase(fetchSubThunk.fulfilled, (state, action) => {
        const { posts, numPosts, linkFlairs } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
        state.subInfo.data = linkFlairs;
        console.log("Reducer state:", state.posts.data);
        console.log("Reducer state n:", state.posts.numPosts);
        console.log("Reducer sub info:", state.subInfo.data);
        localStorage.setItem("subreddit", JSON.stringify(action.payload));
        state.posts.loading = false;
        state.posts.error = false;
      })
      .addCase(fetchSubThunk.rejected, (state) => {
        state.posts.loading = false;
        state.posts.error = true;
      });
  },
});

export default subRedditSlice.reducer;

export const { setSubPosts } = subRedditSlice.actions;
