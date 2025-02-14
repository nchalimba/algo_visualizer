import apiClient from "./client";
import { SourceType } from "@/app/types";

type CreateSourceInput = {
  type: SourceType;
  titleOrUrl: string;
  text?: string;
  file?: File | null;
  jwt: string;
};

type DeleteSourceInput = {
  titleOrUrl: string;
  jwt: string;
};

const createBody = ({ type, titleOrUrl, text, file }: CreateSourceInput) => {
  if (type === "text") {
    return { title: titleOrUrl, text };
  } else if (type === "url") {
    return { urls: [titleOrUrl] };
  } else {
    if (!file) {
      throw new Error("PDF file is required for PDF source creation");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", titleOrUrl);
    return formData;
  }
};

export const createSource = async (input: CreateSourceInput) => {
  const body = createBody(input);

  const response = await apiClient.post(`/process/${input.type}`, body, {
    headers: {
      Authorization: `Bearer ${input.jwt}`,
    },
  });
  return response.data;
};

export const deleteSource = async ({ titleOrUrl, jwt }: DeleteSourceInput) => {
  const response = await apiClient.delete(
    `/process/?source_label=${titleOrUrl}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};
