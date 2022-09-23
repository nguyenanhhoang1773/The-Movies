import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
  name: "movie",
  initialState: {
    idMovie: 0,
  },
  reducers: {
    setIdMovie: (state, action) => {
      state.idMovie = action.payload;
    },
  },
});
export default movieSlice;
