import { configureStore } from "@reduxjs/toolkit";
import frameworksSlice from "./frameworks/frameworksSlice";

export const store = configureStore({
  reducer: {
    frameworks: frameworksSlice,
  },
});
