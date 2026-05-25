import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostData } from "../../types";

interface SavedState {
  ids: string[];
  byId: Record<string, PostData>;
}

const LOCAL_KEY = "savedPosts";
const MAX_SAVED = 50;

const persist = (state: SavedState) => {
  try {
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({ ids: state.ids, byId: state.byId }),
    );
  } catch {
    // ignore quota errors
  }
};

const loadFromStorage = (): SavedState => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return { ids: [], byId: {} };
    const parsed = JSON.parse(raw) as
      | string[]
      | { ids?: string[]; byId?: Record<string, PostData> };
    if (Array.isArray(parsed)) {
      return { ids: parsed, byId: {} };
    }
    return {
      ids: parsed.ids ?? [],
      byId: parsed.byId ?? {},
    };
  } catch {
    return { ids: [], byId: {} };
  }
};

const initialState: SavedState = loadFromStorage();

export const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    toggleSaved(state, action: PayloadAction<PostData>) {
      const post = action.payload;
      const idx = state.ids.indexOf(post.id);
      if (idx === -1) {
        state.ids.unshift(post.id);
        state.byId[post.id] = post;
        if (state.ids.length > MAX_SAVED) {
          const removed = state.ids.pop();
          if (removed) delete state.byId[removed];
        }
      } else {
        state.ids.splice(idx, 1);
        delete state.byId[post.id];
      }
      persist(state);
    },
    setSaved(
      state,
      action: PayloadAction<{ ids: string[]; byId: Record<string, PostData> }>,
    ) {
      state.ids = action.payload.ids;
      state.byId = action.payload.byId;
      persist(state);
    },
  },
});

export const { toggleSaved, setSaved } = savedPostsSlice.actions;
export default savedPostsSlice.reducer;
