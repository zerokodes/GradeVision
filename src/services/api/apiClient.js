import axios from "axios";

const API_BASE_URL = "https://project-api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error?.message);
    return Promise.reject(error);
  }
);
