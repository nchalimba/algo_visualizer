import React, { useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";

const DeleteIndex = () => {
  const [titleOrUrl, setTitleOrUrl] = useState("");

  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete action for:", titleOrUrl);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Delete Index</h2>
      <div className="mb-4">
        <label className="text-gray-400">Title / URL:</label>
        <TextField
          value={titleOrUrl}
          onChange={(e) => setTitleOrUrl(e.target.value)}
          placeholder="Enter Title or URL"
        />
      </div>
      <Button onClick={handleDelete} error>
        Delete
      </Button>
    </div>
  );
};

export default DeleteIndex;
