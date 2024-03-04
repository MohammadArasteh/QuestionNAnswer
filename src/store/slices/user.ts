import { Server } from "@/models";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: Server.Dto.User.GetUserResponse = {
  data: {
    id: 0,
    imageUrl: "",
    userName: "",
  },
};

const userInfoSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Server.Dto.User.GetUserResponse>) {
      state.data = action.payload.data;
    },
  },
});

export default userInfoSlice;
