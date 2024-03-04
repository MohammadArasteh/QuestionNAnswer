import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [userInfoSlice.name]: userInfoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
