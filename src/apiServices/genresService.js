import * as request from "~/untils/request";
const result = async () => {
  const res = await request.get("/genre/movie/list");
  return res.genres;
};
export default result;
