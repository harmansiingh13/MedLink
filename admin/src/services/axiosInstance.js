import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const aToken = localStorage.getItem("aToken");
    const dToken = localStorage.getItem("dToken");

    if (dToken) {
      config.headers.Authorization = `Bearer ${dToken}`;
      config.headers.dToken = dToken;
      return config;
    }

    if (aToken) {
      config.headers.Authorization = `Bearer ${aToken}`;
      config.headers.aToken = aToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      }

      if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
