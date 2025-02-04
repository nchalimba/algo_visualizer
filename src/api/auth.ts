import apiClient from "./client";

export const login = async (apiKey: string) => {
  const response = await apiClient.post("/admin/login", null, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return response.data;
};
