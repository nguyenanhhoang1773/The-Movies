import * as request from "~/untils/request";
const result = async (id, page) => {
  const res = await request.get(`/movie/${id}/credits`);
  return res.cast;
};
export default result;
