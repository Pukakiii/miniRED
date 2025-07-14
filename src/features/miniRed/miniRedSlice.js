import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchPosts from "../../api/postsAPI.js";

export const fetchPostsThunk = createAsyncThunk(
  "posts/fetchPostsThunk",
  async () => {
    const response = await fetchPosts();
    console.log("Fetched posts:", response);
    return response;
  }
);

export const miniRedSlice = createSlice({
  name: "posts",
  initialState: {
    posts: {
      data: [],
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
        state.posts.data = action.payload;
        console.log("Reducer ran with:", action.payload);
        console.log("Reducer state:", state.posts.data);
        state.posts.loading = false;
        state.posts.error = false;
      })
      .addCase(fetchPostsThunk.rejected, (state) => {
        state.posts.loading = false;
        state.posts.error = true;
      });
  }
});

export default miniRedSlice.reducer;

// export const {  } = miniRedSlice.actions;
