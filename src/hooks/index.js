import genresService from "~/apiServices/genresService";
import movieService from "~/apiServices/movieService";
export const findIdGenre = (name, genreSelector) => {
  return genreSelector.genres.find((obj) => {
    return obj.name === name;
  }).id;
};
