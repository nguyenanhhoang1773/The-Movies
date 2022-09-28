import NowPlayingSlice from "./Slice/nowPlayingSlice";
import TopRatedSilce from "./Slice/TopRatedSLice";
import UpComingSlice from "./Slice/UpComingSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    nowPlaying: NowPlayingSlice.reducer,
    topRated: TopRatedSilce.reducer,
    upComing: UpComingSlice.reducer,
  },
});
export default store;
