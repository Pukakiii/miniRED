import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchSubPosts } from "../../api/subPostsAPI";
import type { FetchSubPostsResponse, PostRecord } from "../../types";

export const fetchSubThunk = createAsyncThunk<
  FetchSubPostsResponse,
  string,
  { rejectValue: { errorMessage: string; errorStatus: number; arg: string } }
>("subreddit/fetchSubThunk", async (subName: string, { rejectWithValue }) => {
  try {
    const response = await fetchSubPosts(subName);
    console.log("Fetched sub:", response);
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

interface SubredditState {
  posts: {
    data: PostRecord[];
    linkFlairs: string[];
    numPosts: number;
    loading: boolean;
    error: {
      errorMessage: string;
      errorStatus: number;
      arg: string;
    } | null;
  };
}

const initialState: SubredditState = {
  posts: {
    data: [],
    linkFlairs: [],
    numPosts: 0,
    loading: false,
    error: null, 
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubThunk.pending, (state) => {
        state.posts.numPosts = 0;
        state.posts.loading = true;
        state.posts.error = null; 
      })
      .addCase(fetchSubThunk.fulfilled, (state, action) => {
        const { posts, numPosts, linkFlairs } = action.payload;
        state.posts.data = posts;
        state.posts.numPosts = numPosts;
        state.posts.linkFlairs = linkFlairs;
        localStorage.setItem("subreddit", JSON.stringify(action.payload));
        state.posts.loading = false;
        state.posts.error = null;
      })
      .addCase(fetchSubThunk.rejected, (state, action) => {
        state.posts.numPosts = 0;
        console.log("--", action);
        state.posts.data = [];
        state.posts.linkFlairs = [];
        state.posts.loading = false;
        if (action.payload) {
          ;
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
