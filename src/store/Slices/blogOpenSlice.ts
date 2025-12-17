// src/store/blogSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* =======================
   Types
======================= */

export interface Blog {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  status?: "Draft" | "Published" | "Archived";
  // add more fields if needed later
}

interface BlogState {
  openBlog: Blog | null;
}

/* =======================
   Initial State
======================= */

const initialState: BlogState = {
  openBlog: null,
};

/* =======================
   Slice
======================= */

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setOpenBlog: (state, action: PayloadAction<Blog>) => {
      state.openBlog = action.payload;
    },
    clearOpenBlog: (state) => {
      state.openBlog = null;
    },
  },
});

/* =======================
   Exports
======================= */

export const { setOpenBlog, clearOpenBlog } = blogSlice.actions;
export default blogSlice.reducer;
