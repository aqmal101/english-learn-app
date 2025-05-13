import axios from "axios";
const baseAPIURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseAPIURL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
