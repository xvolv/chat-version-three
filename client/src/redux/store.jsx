import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userSlice,
  },
});

export default store;
