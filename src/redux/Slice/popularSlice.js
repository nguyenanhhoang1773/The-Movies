import { createSlice } from "@reduxjs/toolkit";
const popularSlice = createSlice({
  name: "popular",
  initialState: {
    movies: [],
    loading: false,
  },
  reducers: {
    setPopular: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});
export default popularSlice;
