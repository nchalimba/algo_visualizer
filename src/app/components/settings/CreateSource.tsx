import React, { FormEvent, useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createSource } from "@/api/source";
import { SourceType } from "@/app/types";
import { getCreateSourceSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/app/context/AuthContext";
import { ADMIN_ACCESS_MESSAGE } from "@/utils/constants";
import Alert from "../common/Alert";

const CreateSource = () => {
  const [sourceType, setSourceType] = useState<SourceType>("url");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null | undefined>(null);
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, jwt } = useAuth();

  const clearForm = () => {
    setUrl("");
    setTitle("");
    setPdfFile(null);
    setTextContent("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const schema = getCreateSourceSchema(sourceType);

    const result = schema.safeParse({
      title,
      url,
      textContent,
      pdfFile,
    });
    if (!result.success) {
      const errors = Object.values(result.error.flatten().fieldErrors)
        .flat()
        .join(", ");
      toast.error(errors || "Invalid input");
      console.log(result.error);
      return;
    }
    if (!jwt) return toast.error(ADMIN_ACCESS_MESSAGE);
    setLoading(true);
    clearForm();

    createSourceMutation.mutate({
      type: sourceType,
      titleOrUrl: sourceType === "url" ? url : title,
      text: sourceType === "text" ? textContent : undefined,
      file: sourceType === "pdf" ? pdfFile : undefined,
      jwt,
    });
  };

  const createSourceMutation = useMutation({
    mutationFn: createSource,
    onSuccess: () => {
      toast.success("Source created successfully!");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error creating source!");
      setLoading(false);
    },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Create Source</h2>

      <label className="text-gray-400 text-sm">Source Type:</label>
      <div className="mb-4 flex space-x-2">
        <Button
          onClick={() => setSourceType("url")}
          active={sourceType === "url"}
        >
          URL
        </Button>
        <Button
          onClick={() => setSourceType("text")}
          active={sourceType === "text"}
        >
          Text
        </Button>
        <Button
          onClick={() => setSourceType("pdf")}
          active={sourceType === "pdf"}
        >
          PDF
        </Button>
      </div>
      {sourceType === "url" && (
        <div className="mb-4">
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            fullWidth
            label="Enter URL"
          />
        </div>
      )}
      {(sourceType === "text" || sourceType === "pdf") && (
        <div className="mb-4">
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            fullWidth
            label="Enter Title"
          />
        </div>
      )}
      {sourceType === "pdf" && (
        <div className="mb-4">
          <label className="text-gray-400 text-sm" htmlFor="file-upload">
            Upload File:
          </label>
          <div className="flex flex-col md:flex-row items-center">
            <label
              className="bg-retroDark-accent hover:bg-retroDark-accent-hover cursor-pointer px-4 py-2 text-white rounded transition duration-300 ease-in-out w-full md:w-auto flex justify-center"
              htmlFor="file-upload"
            >
              Upload file
            </label>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files) {
                  const files = e.target.files;
                  if (files.length > 0) {
                    setPdfFile(files[0]);
                  } else {
                    console.error("No files were selected.");
                  }
                } else {
                  console.error("No files were selected.");
                }
              }}
              className="hidden"
            />
            {pdfFile && (
              <span className="md:ml-2 md:mt-0 mt-2">{pdfFile.name}</span>
            )}
          </div>
        </div>
      )}
      {sourceType === "text" && (
        <div className="mb-4">
          <TextField
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter Text"
            isTextArea
            fullWidth
            label="Enter Text"
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:justify-end items-center gap-4">
        {!isAuthenticated && (
          <Alert
            type="info"
            message={ADMIN_ACCESS_MESSAGE}
            className="w-full"
          />
        )}
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!isAuthenticated}
          className="w-full md:w-auto font-bold"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateSource;
