import * as request from "~/untils/request";
const result = async (searchText) => {
  const res = await request.get(`/search/movie`, {
    query: searchText,
  });
  return res.results;
};
export default result;
