import * as request from "~/untils/request";
const result = async (id, page) => {
  const res = await request.get("/discover/movie", {
    with_genres: id,
    page: page,
  });
  return res.results;
};
export default result;
