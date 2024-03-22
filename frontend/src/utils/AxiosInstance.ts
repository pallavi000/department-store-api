import axios from "axios";
import store from "../redux/store";
export const baseURL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.auth?.access_token;
    if (token) {
      config.headers["Authorization"] = "Bearer" + " " + token;
      config.headers["Content-Type"] = "application/json";
      config.headers["accept"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
