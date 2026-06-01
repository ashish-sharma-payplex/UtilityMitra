import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/autSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});