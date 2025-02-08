import { z } from "zod";

export const getCreateSourceSchema = (sourceType: string) => {
  switch (sourceType) {
    case "url":
      return z.object({
        url: z.string().url("Invalid URL format").min(1, "URL is required"),
      });
    case "text":
      return z.object({
        title: z.string().min(1, "Title is required"),
        textContent: z.string().min(1, "Text content is required"),
      });
    case "pdf":
      return z.object({
        title: z.string().min(1, "Title is required"),
        pdfFile: z
          .instanceof(File)
          .refine((file) => file.size > 0, "File is required"),
      });
    default:
      return z.object({});
  }
};

export const getDeleteSourceSchema = () => {
  return z.object({
    titleOrUrl: z.string().min(1, "Title or URL is required"),
  });
};
