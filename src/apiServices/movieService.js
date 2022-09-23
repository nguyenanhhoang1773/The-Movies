import * as request from "~/untils/request";
const result = async (id) => {
  const res = await request.get(`/movie/${id}`);
  console.log(id);
  return res;
};
export default result;
