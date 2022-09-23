import * as request from "~/untils/request";
const result = async (id) => {
  const res = await request.get(`/movie/${id}/recommendations`);
  return res.results;
};
export default result;
