import { createSlice } from "@reduxjs/toolkit";
const TopRatedSilce = createSlice({
  name: "TopRated",
  initialState: {
    movies: [],
  },
  reducers: {
    setTopRated: (state, action) => {
      state.movies = action.payload;
    },
  },
});
export default TopRatedSilce;
