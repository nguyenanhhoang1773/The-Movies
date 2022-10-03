import * as request from "~/untils/request";
const result = async (id) => {
  const res = await request.get("/discover/movie", { with_genres: id });
  return res.results;
};
export default result;
