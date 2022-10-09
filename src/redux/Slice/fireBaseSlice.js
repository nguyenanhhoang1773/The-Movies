import { createSlice } from "@reduxjs/toolkit";
const fireBaseSlice = createSlice({
  name: "fireBase",
  initialState: {
    isSignedIn: false,
    userInfor: {},
  },
  reducers: {
    setSignIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});
export default fireBaseSlice;
