import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type QuestionsSlice = {
  currentPage: number;
};

const initialState: QuestionsSlice = {
  currentPage: 1,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export default questionsSlice;
