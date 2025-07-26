import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopPosts } from "../../api/postsAPI.js";

export const fetchPostsThunk = createAsyncThunk(
  "popular/fetchPostsThunk",
  async (category) => {
    const response = await fetchPopPosts(category);
    console.log("Fetched posts:", response);
    return response;
  }
);

export const popularPostSlice = createSlice({
  name: "popular",
  initialState: {
    posts: {
      data: [],
      numPosts: 0,
      loading: false,
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.posts.loading = true;
        state.posts.error = false;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        const { posts, numPosts } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
        console.log("Reducer state:", state.posts.data);
        console.log("Reducer state:", state.posts.numPosts);
        localStorage.setItem("popposts", JSON.stringify(action.payload));
        state.posts.loading = false;
        state.posts.error = false;
      })
      .addCase(fetchPostsThunk.rejected, (state) => {
        state.posts.loading = false;
        state.posts.error = true;
      });
  },
});

export default popularPostSlice.reducer;

// export const {  } = popularPostSlice.actions;
