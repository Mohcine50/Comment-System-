import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./features/commentSlice";
const store = configureStore({
  reducer: {
    comments: commentReducer,
  },
});

export default store;
