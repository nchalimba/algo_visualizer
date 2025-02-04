import React, { FormEvent, useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createIndex } from "@/api/vectorIndex";
import { IndexSourceType } from "@/app/types";
import { getCreateIndexSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/app/context/AuthContext";
import WarningMessage from "../chat/WarningMessage";
import InfoMessage from "../chat/InfoMessage";
import ErrorMessage from "../chat/ErrorMessage";
import { ADMIN_ACCESS_MESSAGE } from "@/utils/constants";

const CreateIndex = () => {
  const [indexType, setIndexType] = useState<IndexSourceType>("url");
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
    const schema = getCreateIndexSchema(indexType);

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

    createIndexMutation.mutate({
      type: indexType,
      titleOrUrl: indexType === "url" ? url : title,
      text: indexType === "text" ? textContent : undefined,
      file: indexType === "pdf" ? pdfFile : undefined,
      jwt,
    });
  };

  const createIndexMutation = useMutation({
    mutationFn: createIndex,
    onSuccess: () => {
      toast.success("Index created successfully!");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error creating index!");
      setLoading(false);
    },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Create Index</h2>

      <label className="text-gray-400 text-sm">Source Type:</label>
      <div className="mb-4 flex space-x-2">
        <Button
          onClick={() => setIndexType("url")}
          active={indexType === "url"}
        >
          URL
        </Button>
        <Button
          onClick={() => setIndexType("text")}
          active={indexType === "text"}
        >
          Text
        </Button>
        <Button
          onClick={() => setIndexType("pdf")}
          active={indexType === "pdf"}
        >
          PDF
        </Button>
      </div>
      {indexType === "url" && (
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
      {(indexType === "text" || indexType === "pdf") && (
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
      {indexType === "pdf" && (
        <div className="mb-4">
          <label className="text-gray-400 text-sm" htmlFor="file-upload">
            Upload File:
          </label>
          <div className="flex items-center">
            <label
              className="bg-retroDark-accent hover:bg-retroDark-accent-hover cursor-pointer px-4 py-2 text-white rounded transition duration-300 ease-in-out"
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
            {pdfFile && <span className="ml-2">{pdfFile.name}</span>}
          </div>
        </div>
      )}
      {indexType === "text" && (
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
      <div className="flex justify-end items-center gap-4">
        {!isAuthenticated && <InfoMessage message={ADMIN_ACCESS_MESSAGE} />}
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!isAuthenticated}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateIndex;
