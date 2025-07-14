import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {},
});

export default postsSlice.reducer;

// export const {  } = postsSlice.actions; 