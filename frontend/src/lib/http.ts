import axios from "axios";
import { retriveAuthState } from "./auth-utils";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

http.interceptors.request.use((request) => {
  const authState = retriveAuthState();
  if (request.headers && authState) {
    request.headers["Authorization"] = `Bearer ${authState.token}`;
  }
  return request;
});

export default http;
