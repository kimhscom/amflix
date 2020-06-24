import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "19936747f66378b4e717c1350ed5a425",
    language: "en-US",
  },
});

export default api;
