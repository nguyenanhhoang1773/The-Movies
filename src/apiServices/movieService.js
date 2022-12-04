import * as request from "~/untils/request";
export const getDetail = async (id) => {
  const res = await request.get(`/movie/${id}`);
  return res;
};
export const getGenreList = async () => {
  const res = await request.get("/genre/movie/list");
  return res.genres;
};
export const getMovieWithGenre = async (id, page) => {
  const res = await request.get("/discover/movie", {
    with_genres: id,
    page: page,
  });
  return res.results;
};
export const getCreadits = async (id, page) => {
  const res = await request.get(`/movie/${id}/credits`);
  return res.cast;
};
export const getTypeMovie = async (type) => {
  const res = await request.get(`/movie/${type}`);
  return res.results;
};
export const getPopularMovies = async () => {
  const res = await request.get("/movie/popular");
  return res.results;
};
export const getRecommentMovies = async (id) => {
  const res = await request.get(`/movie/${id}/recommendations`);
  return res.results;
};
export const searchMovie = async (searchText) => {
  const res = await request.get(`/search/movie`, {
    query: searchText,
  });
  return res.results;
};
export const getSimilarMovies = async (id) => {
  const res = await request.get(`/movie/${id}/similar`);
  return res.results;
};
