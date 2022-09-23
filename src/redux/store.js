import movieSlice from "./movieSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    moviePlaying: movieSlice.reducer,
  },
});
export default store;
