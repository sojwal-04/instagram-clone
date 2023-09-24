import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
})

export default rootReducer;