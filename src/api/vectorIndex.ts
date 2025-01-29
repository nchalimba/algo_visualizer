import apiClient from "./client";
import { IndexSourceType } from "@/app/types";

type CreateIndexInput = {
  type: IndexSourceType;
  titleOrUrl: string;
  text?: string;
  file?: File | null;
};

const createBody = ({ type, titleOrUrl, text, file }: CreateIndexInput) => {
  if (type === "text") {
    return { title: titleOrUrl, text };
  } else if (type === "url") {
    return { urls: [titleOrUrl] };
  } else {
    if (!file) {
      throw new Error("PDF file is required for PDF index creation");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", titleOrUrl);
    return formData;
  }
};

// Function to create an index
export const createIndex = async (input: CreateIndexInput) => {
  const body = createBody(input);

  const response = await apiClient.post(`/process/${input.type}`, body);
  return response.data;
};

// Function to delete an index
export const deleteIndex = async (indexLabel: string) => {
  const response = await apiClient.delete(
    `/process/?source_label=${indexLabel}`
  );
  return response.data;
};
