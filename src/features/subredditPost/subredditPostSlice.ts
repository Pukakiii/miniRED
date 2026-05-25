import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchSubPosts } from "../../api/subPostsAPI";
import type { FetchSubPostsResponse, PostRecord } from "../../types";

// thunk for fetching subreddit posts
export const fetchSubThunk = createAsyncThunk<
  FetchSubPostsResponse,
  string,
  { rejectValue: { errorMessage: string; errorStatus: number; arg: string } }
>("subreddit/fetchSubThunk", async (subName: string, { rejectWithValue }) => {
  try {
    const response = await fetchSubPosts(subName);
    return response;
  } catch (error: any) {
    const statusCode = error.status || 500;

    return rejectWithValue({
      errorMessage: error.message || "Failed to fetch posts",
      errorStatus: statusCode,
      arg: subName,
    });
  }
});

export const fetchMoreSubThunk = createAsyncThunk<
  FetchSubPostsResponse,
  { subName: string; after?: string | null },
  { rejectValue: { errorMessage: string; errorStatus: number; arg: string } }
>("subreddit/fetchMoreSubThunk", async (payload, { rejectWithValue }) => {
  try {
    const response = await fetchSubPosts(payload.subName, payload.after);
    return response;
  } catch (error: any) {
    const statusCode = error.status || 500;
    return rejectWithValue({
      errorMessage: error.message || "Failed to fetch posts",
      errorStatus: statusCode,
      arg: payload.subName,
    });
  }
});

interface SubredditState {
  posts: {
    data: PostRecord[];
    linkFlairs: string[];
    numPosts: number;
    loading: boolean;
    loadingMore: boolean;
    error: {
      errorMessage: string;
      errorStatus: number;
      arg: string;
    } | null;
    nextCursor?: string | null;
  };
}

const initialState: SubredditState = {
  posts: {
    data: [],
    linkFlairs: [],
    numPosts: 0,
    loading: false,
    loadingMore: false,
    error: null,
    nextCursor: null,
  },
};

export const subRedditSlice = createSlice({
  name: "subreddit",
  initialState,
  reducers: {
    setSubPosts(
      state,
      action: PayloadAction<{
        posts: PostRecord[];
        numPosts: number;
        linkFlairs: string[];
      }>,
    ) {
      const { posts, numPosts, linkFlairs } = action.payload;
      state.posts.data = posts;
      state.posts.numPosts = numPosts;
      state.posts.linkFlairs = linkFlairs;
    },
    appendSubPosts(
      state,
      action: PayloadAction<{ posts: PostRecord[]; after?: string | null }>,
    ) {
      state.posts.data = state.posts.data.concat(action.payload.posts);
      state.posts.nextCursor = action.payload.after ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubThunk.pending, (state) => {
        state.posts.numPosts = 0;
        state.posts.loading = true;
        state.posts.error = null;
      })
      .addCase(fetchSubThunk.fulfilled, (state, action) => {
        const { posts, numPosts, linkFlairs, after } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
        state.posts.linkFlairs = linkFlairs;
        state.posts.nextCursor = after ?? null;
        localStorage.setItem("subreddit", JSON.stringify(action.payload));
        state.posts.loading = false;
        state.posts.error = null;
      })
      .addCase(fetchMoreSubThunk.pending, (state) => {
        state.posts.loadingMore = true;
      })
      .addCase(fetchMoreSubThunk.fulfilled, (state, action) => {
        const { posts, after } = action.payload;
        state.posts.data = state.posts.data.concat(posts);
        state.posts.nextCursor = after ?? null;
        state.posts.loadingMore = false;
      })
      .addCase(fetchMoreSubThunk.rejected, (state) => {
        state.posts.loadingMore = false;
      })
      .addCase(fetchSubThunk.rejected, (state, action) => {
        state.posts.numPosts = 0;
        state.posts.data = [];
        state.posts.linkFlairs = [];
        state.posts.loading = false;
        if (action.payload) {
          state.posts.error = {
            errorMessage: action.payload.errorMessage,
            errorStatus: action.payload.errorStatus,
            arg: action.payload.arg,
          };
        } else {
          // Fallback if the thunk throws outside our try/catch block
          state.posts.error = {
            errorMessage: action.error.message || "Unknown runtime error",
            errorStatus: 500,
            arg: action.meta.arg || "",
          };
        }
      });
  },
});

export default subRedditSlice.reducer;
export const { setSubPosts } = subRedditSlice.actions;
