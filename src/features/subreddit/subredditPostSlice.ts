import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchSubrredit } from "../../api/postsAPI";
import type { FetchSubredditResponse, PostRecord } from "../../types";

export const fetchSubThunk = createAsyncThunk<
  FetchSubredditResponse,
  string,
  { rejectValue: { message: string } }
>("subreddit/fetchSubThunk", async (subName: string, { rejectWithValue }) => {
  try {
    const response = await fetchSubrredit(subName);
    console.log("Fetched sub:", response);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return rejectWithValue({ message });
  }
});

interface SubredditState {
  posts: {
    data: PostRecord[];
    numPosts: number;
    loading: boolean;
    error: boolean;
  };
  subInfo: {
    data: string[];
    loading: boolean;
    error: boolean;
  };
}

const initialState: SubredditState = {
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
