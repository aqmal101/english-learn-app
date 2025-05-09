import axios from "axios";
const baseAPIURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseAPIURL,
  withCredentials: true,
});

export default api;
