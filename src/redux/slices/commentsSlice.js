import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments: (state, action) => {
      return action.payload;
    },
    addComment: (state, action) => {
      const newComment = action.payload;
      state.unshift(newComment);
    },
    deleteComment: (state, action) => {
      const commentIdToDelete = action.payload; // Assuming action.payload is the comment ID to delete
      return state.filter((comment) => comment._id !== commentIdToDelete);
    },
  },
});

export const { addComment, deleteComment, setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
