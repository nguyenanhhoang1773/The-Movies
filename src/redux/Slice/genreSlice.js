import { createSlice } from "@reduxjs/toolkit";
const genreSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    loading: false,
  },
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});
export default genreSlice;
