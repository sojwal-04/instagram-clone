import { createSlice } from "@reduxjs/toolkit";

// Try to load user data from local storage
const storedUser = localStorage.getItem("user");

const initialState = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
