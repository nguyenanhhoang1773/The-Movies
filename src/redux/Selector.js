export const nowPlayingSelector = (state) => state.nowPlaying.movies;
export const topRatedSelector = (state) => state.topRated.movies;
export const upComingSelector = (state) => state.upComing.movies;
export const popularSelector = (state) => state.popular;
export const genreSelector = (state) => state.genres;
export const genreMOviesSelector = (state) => state.genreMovies.movies;
export const logInSelector = (state) => state.logIn.logIn;
export const signInSelector = (state) => state.fireBase.isSignedIn;
export const userInforSelector = (state) => state.fireBase.userInfor;
