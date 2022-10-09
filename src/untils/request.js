import axios from "axios";
const requestAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
export const get = async (path, obj) => {
  const res = await requestAPI.get(path, {
    params: {
      api_key: "1f7b4ae0102371b9dcab2569bcd6bb5f",
      ...obj,
    },
  });
  return res.data;
};
