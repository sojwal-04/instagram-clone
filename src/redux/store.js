import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
