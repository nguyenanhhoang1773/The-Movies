import { createSlice } from "@reduxjs/toolkit";
const UpComingSlice = createSlice({
  name: "UpComing",
  initialState: {
    movies: [],
  },
  reducers: {
    setUpComing: (state, action) => {
      state.movies = action.payload;
    },
  },
});
export default UpComingSlice;
