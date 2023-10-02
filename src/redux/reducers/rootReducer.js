import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import profileReducer from "../slices/profileSlice";
import homePostsReducer from "../slices/homePostsSlice";
import commentsReducer from "../slices/commentsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  profile: profileReducer,
  homePosts: homePostsReducer,
  comments: commentsReducer
});

export default rootReducer;
