import * as request from "~/untils/request";
const result = async (type) => {
  const res = await request.get(`/movie/${type}`);
  return res.results;
};
export default result;
