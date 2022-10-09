export const findIdGenre = (name, genreSelector) => {
  return genreSelector.genres.find((obj) => {
    return obj.name === name;
  }).id;
};
