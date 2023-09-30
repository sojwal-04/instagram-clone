import { createSlice } from "@reduxjs/toolkit";

const homePostsSlice = createSlice({
  name: "homePosts",
  initialState: [],
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },

    setPost: (state, action) => {
      const { index, updatedPost } = action.payload; // Extract index and updatedPost from payload
      console.log("index: " + index + " updatedPost: " + updatedPost);
      if (index >= 0 && index < state.length) {
        // Ensure the index is within the array bounds
        state[index] = updatedPost; // Update the post at the specified index
      }
    },

    deletePost: (state, action) => {
      const postIdToDelete = action.payload; // Assuming action.payload is the post ID to delete
      return state.filter((post) => post.id !== postIdToDelete);
    },

    addPost: (state, action) => {
      const newPost = action.payload;
      state.push(newPost);
    },
  },
});

export const { addPost, deletePost, setPost, setPosts } =
  homePostsSlice.actions;

export default homePostsSlice.reducer;
