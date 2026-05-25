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
    // console.log("Fetched posts:", response);
    return response;
  },
);

export const fetchMorePopThunk = createAsyncThunk(
  "popular/fetchMorePopThunk",
  async (payload: {
    category: string;
    after?: string | null;
  }): Promise<FetchPostsResponse> => {
    const { category, after } = payload;
    const response = await fetchPopPosts(category, after);
    return response;
  },
);

interface PopularState {
  posts: {
    data: PostRecord[];
    numPosts: number;
    loading: boolean;
    loadingMore: boolean;
    error: boolean;
    nextCursor?: string | null;
  };
}

const initialState: PopularState = {
  posts: {
    data: [],
    numPosts: 0,
    loading: false,
    loadingMore: false,
    error: false,
    nextCursor: null,
  },
};

export const popularPostSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopPosts(state, action: PayloadAction<PostRecord[]>) {
      state.posts.data = action.payload;
    },
    appendPopPosts(
      state,
      action: PayloadAction<{ posts: PostRecord[]; after?: string | null }>,
    ) {
      state.posts.data = state.posts.data.concat(action.payload.posts);
      state.posts.nextCursor = action.payload.after ?? null;
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
        const { posts, numPosts, after } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
        state.posts.nextCursor = after ?? null;
        localStorage.setItem("popular", JSON.stringify(action.payload));
        state.posts.loading = false;
        state.posts.error = false;
      })
      .addCase(fetchMorePopThunk.pending, (state) => {
        state.posts.loadingMore = true;
      })
      .addCase(fetchMorePopThunk.fulfilled, (state, action) => {
        const { posts, after } = action.payload;
        state.posts.data = state.posts.data.concat(posts);
        state.posts.nextCursor = after ?? null;
        state.posts.loadingMore = false;
      })
      .addCase(fetchMorePopThunk.rejected, (state) => {
        state.posts.loadingMore = false;
      })
      .addCase(fetchPopPostsThunk.rejected, (state) => {
        state.posts.loading = false;
        state.posts.error = true;
      });
  },
});

export default popularPostSlice.reducer;
export const { setPopPosts } = popularPostSlice.actions;
