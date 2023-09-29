import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import profileReducer from "../slices/profileSlice";
import homePostsReducer from "../slices/homePostsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  profile: profileReducer,
  homePosts: homePostsReducer
});

export default rootReducer;
