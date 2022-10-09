import NowPlayingSlice from "./Slice/nowPlayingSlice";
import TopRatedSilce from "./Slice/TopRatedSLice";
import UpComingSlice from "./Slice/UpComingSlice";
import popularSlice from "./Slice/popularSlice";
import genreSlice from "./Slice/genreSlice";
import genreMoviesSlice from "./Slice/genreMoviesSlice";
import logInSlice from "./Slice/logInSlice";
import { configureStore } from "@reduxjs/toolkit";
import fireBaseSlice from "./Slice/fireBaseSlice";
const store = configureStore({
  reducer: {
    logIn: logInSlice.reducer,
    fireBase: fireBaseSlice.reducer,
    nowPlaying: NowPlayingSlice.reducer,
    topRated: TopRatedSilce.reducer,
    upComing: UpComingSlice.reducer,
    popular: popularSlice.reducer,
    genres: genreSlice.reducer,
    genreMovies: genreMoviesSlice.reducer,
  },
});
export default store;
