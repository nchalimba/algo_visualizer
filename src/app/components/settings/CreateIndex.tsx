import React, { FormEvent, useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";

const CreateIndex = () => {
  const [indexType, setIndexType] = useState("URL");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null | undefined>(null);
  const [textContent, setTextContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Create Index</h2>

      <label className="text-gray-400">Source Type:</label>
      <div className="mb-4 flex space-x-2">
        <Button
          onClick={() => setIndexType("URL")}
          active={indexType === "URL"}
        >
          URL
        </Button>
        <Button
          onClick={() => setIndexType("Text")}
          active={indexType === "Text"}
        >
          Text
        </Button>
        <Button
          onClick={() => setIndexType("PDF")}
          active={indexType === "PDF"}
        >
          PDF
        </Button>
      </div>
      {indexType === "URL" && (
        <div className="mb-4">
          <label className="text-gray-400">Enter URL:</label>
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
      )}
      {(indexType === "Text" || indexType === "PDF") && (
        <div className="mb-4">
          <label className="text-gray-400">Enter Title:</label>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
        </div>
      )}
      {indexType === "PDF" && (
        <div className="mb-4">
          <label
            className="bg-retroDark-accent hover:bg-retroDark-accent-hover cursor-pointer px-4 py-3 text-white rounded transition duration-300 ease-in-out"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            id="file_input"
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
        </div>
      )}
      {indexType === "Text" && (
        <div className="mb-4">
          <label className="text-gray-400">Enter Text:</label>
          <TextField
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter Text"
            isTextArea
          />
        </div>
      )}
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default CreateIndex;
