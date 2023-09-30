import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: 0,
    username: "",
    profilePic: "",
    name: "",
    postCount: 0,
    followingCount: 0,
    followersCount: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;