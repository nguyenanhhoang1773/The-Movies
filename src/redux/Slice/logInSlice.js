import { createSlice } from "@reduxjs/toolkit";
const logInSlice = createSlice({
  name: "logIn",
  initialState: {
    logIn: false,
  },
  reducers: {
    setLogIn: (state) => {
      state.logIn = true;
    },
    setLogOut: (state) => {
      state.logIn = false;
    },
  },
});
export default logInSlice;
