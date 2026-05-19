import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchPopPosts } from "../../api/popPostsAPI";
import type { FetchPostsResponse, PostRecord } from "../../types";

export const fetchPopPostsThunk = createAsyncThunk(
  "popular/fetchPopPostsThunk",
  async (category: string): Promise<FetchPostsResponse> => {
    const response = await fetchPopPosts(category);
    console.log("Fetched posts:", response);
    return response;
  },
);

interface PopularState {
  posts: {
    data: PostRecord[];
    numPosts: number;
    loading: boolean;
    error: boolean;
  };
}

const initialState: PopularState = {
  posts: {
    data: [],
    numPosts: 0,
    loading: false,
    error: false,
  },
};

export const popularPostSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopPosts(state, action: PayloadAction<PostRecord[]>) {
      state.posts.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopPostsThunk.pending, (state) => {
        state.posts.numPosts = 0;
        state.posts.loading = true;
        state.posts.error = false;
      })
      .addCase(fetchPopPostsThunk.fulfilled, (state, action) => {
        const { posts, numPosts } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
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
