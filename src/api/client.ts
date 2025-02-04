import { getUserId } from "@/utils/utils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const userId = getUserId(); //"123"; //getUserId(); // Always fetch the latest user ID
    console.log("Setting X-User-ID:", userId);
    if (userId) {
      config.headers["X-User-ID"] = userId;
    } else {
      console.warn("X-User-ID is missing!");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
