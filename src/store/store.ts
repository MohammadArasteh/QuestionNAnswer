import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice, questionsSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [userInfoSlice.name]: userInfoSlice.reducer,
    [questionsSlice.name]: questionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
