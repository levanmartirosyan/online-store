import { getToken } from "@/services/token/token-service";
import { useUserStore } from "@/stories/User";
import axios from "axios";

export const baseUrl = "https://api.everrest.educata.dev/";

export const axiosDefaultInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosDefaultInstance.interceptors.request.use(
  (config) => {
    const { tokens } = useUserStore.getState();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
