import { createSlice } from "@reduxjs/toolkit";
const genreMoviesSlice = createSlice({
  name: "genreMovies",
  initialState: {
    movies: [],
  },
  reducers: {
    setGenreMovies: (state, action) => {
      state.movies = action.payload;
    },
    addGenreMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload];
    },
  },
});
export default genreMoviesSlice;
