import axios from "axios";
import StorageKeys from "./storage-keys";

export const token = {
  value: "",
};

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

http.interceptors.request.use((request) => {
  if (request.headers) {
    const token = localStorage.getItem(StorageKeys.AUTH_STATE);
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});


export default http;
