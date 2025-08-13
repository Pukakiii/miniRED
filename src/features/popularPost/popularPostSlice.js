import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopPosts } from "../../api/postsAPI.js";

export const fetchPopPostsThunk = createAsyncThunk(
  "popular/fetchPopPostsThunk",
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
  reducers: {
    setPopPosts(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopPostsThunk.pending, (state) => {
        state.posts.loading = true;
        state.posts.error = false;
      })
      .addCase(fetchPopPostsThunk.fulfilled, (state, action) => {
        const { posts, numPosts } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
        console.log("Reducer state:", state.posts.data);
        console.log("Reducer state:", state.posts.numPosts);
        localStorage.setItem("popular", JSON.stringify(action.payload));
        state.posts.loading = false;
        state.posts.error = false;
      })
      .addCase(fetchPopPostsThunk.rejected, (state) => {
        state.posts.loading = false;
        state.posts.error = true;
      });
  },
});

export default popularPostSlice.reducer;

export const { setPopPosts } = popularPostSlice.actions;
