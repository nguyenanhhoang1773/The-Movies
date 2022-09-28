import * as request from "~/untils/request";
const result = async (id) => {
  const res = await request.get(`/movie/${id}`);
  return res;
};
export default result;
