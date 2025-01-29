import React, { useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useMutation } from "@tanstack/react-query";
import { deleteIndex } from "@/api/vectorIndex";
import toast from "react-hot-toast";
import { getDeleteIndexSchema } from "@/utils/validationSchemas";

const DeleteIndex = () => {
  const [indexTitleOrUrl, setIndexTitleOrUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setModalOpen(false);
    setLoading(true);
    deleteIndexMutation.mutate(indexTitleOrUrl);
  };

  const handleClickDelete = () => {
    const schema = getDeleteIndexSchema();
    const result = schema.safeParse({ titleOrUrl: indexTitleOrUrl });
    if (!result.success) {
      const errors = Object.values(result.error.flatten().fieldErrors)
        .flat()
        .join(", ");
      toast.error(errors || "Invalid input");
      console.log(result.error);
      return;
    }
    setModalOpen(true);
  };

  const deleteIndexMutation = useMutation({
    mutationFn: deleteIndex,
    onSuccess: () => {
      toast.success("Index deleted successfully!");
      setModalOpen(false);
      setLoading(false);
      setIndexTitleOrUrl("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error deleting index!");
      setLoading(false);
      setIndexTitleOrUrl("");
    },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Delete Index</h2>
      <div className="mb-4">
        <label className="text-gray-400 text-sm">Title / URL:</label>
        <TextField
          value={indexTitleOrUrl}
          onChange={(e) => setIndexTitleOrUrl(e.target.value)}
          placeholder="Enter Title or URL"
        />
        <div className="flex justify-end mt-4">
          <Button loading={loading} onClick={handleClickDelete} error>
            Delete
          </Button>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete()}
        indexTitleOrUrl={indexTitleOrUrl}
      />
    </div>
  );
};

export default DeleteIndex;
