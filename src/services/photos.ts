import axios from "axios";
import type { Photo } from "../types/photo";
const API_KEY = import.meta.env.VITE_PEXEL_API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

// interface PexelResponse {
//   photos: Photo[]
// }

export const getPhotos = async (query: string, page: number) => {
  const response = await axios.get(`search?query=${query}&page=${page}`);

  return response.data;
};