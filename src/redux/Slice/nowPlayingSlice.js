import { createSlice } from "@reduxjs/toolkit";
const NowPlayingSlice = createSlice({
  name: "NowPlaying",
  initialState: {
    movies: [],
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.movies = action.payload;
    },
  },
});
export default NowPlayingSlice;
