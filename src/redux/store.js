import NowPlayingSlice from "./Slice/nowPlayingSlice";
import TopRatedSilce from "./Slice/TopRatedSLice";
import UpComingSlice from "./Slice/UpComingSlice";
import popularSlice from "./Slice/popularSlice";
import genreSlice from "./Slice/genreSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    nowPlaying: NowPlayingSlice.reducer,
    topRated: TopRatedSilce.reducer,
    upComing: UpComingSlice.reducer,
    popular: popularSlice.reducer,
    genres: genreSlice.reducer,
  },
});
export default store;
