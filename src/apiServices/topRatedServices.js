import * as request from "~/untils/request";
const result = async () => {
  const res = await request.get("/movie/top_rated");
  return res.results;
};
export default result;
