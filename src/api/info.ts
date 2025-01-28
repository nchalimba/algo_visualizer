import { InfoResponse } from "@/app/types";
import apiClient from "./client";

export const getInfo = async () => {
  const response = await apiClient.get("/info");
  return response.data as InfoResponse;
};
