import { configureStore } from "@reduxjs/toolkit";
import predictions from "./predictions";

export const store = configureStore({
  reducer: {
    //Combine all reducers.
    predictions: predictions,
  },
});
