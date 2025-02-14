import React, { useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import { useMutation } from "@tanstack/react-query";
import { deleteSource } from "@/api/source";
import toast from "react-hot-toast";
import { getDeleteSourceSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/app/context/AuthContext";
import { ADMIN_ACCESS_MESSAGE } from "@/utils/constants";
import Alert from "../common/Alert";

const DeleteSource = () => {
  const [titleOrUrl, setTitleOrUrl] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { jwt, isAuthenticated } = useAuth();

  const handleDelete = () => {
    setModalOpen(false);
    setLoading(true);
    if (!jwt) return toast.error(ADMIN_ACCESS_MESSAGE);
    deleteSourceMutation.mutate({ titleOrUrl, jwt });
  };

  const handleClickDelete = () => {
    const schema = getDeleteSourceSchema();
    const result = schema.safeParse({ titleOrUrl });
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

  const deleteSourceMutation = useMutation({
    mutationFn: deleteSource,
    onSuccess: () => {
      toast.success("Source deleted successfully!");
      setModalOpen(false);
      setLoading(false);
      setTitleOrUrl("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error deleting source!");
      setLoading(false);
      setTitleOrUrl("");
    },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Delete Source</h2>
      <div className="mb-4">
        <TextField
          label="Title / URL"
          value={titleOrUrl}
          onChange={(e) => setTitleOrUrl(e.target.value)}
          placeholder="Enter Title or URL"
          fullWidth
        />
        <div className="flex flex-col md:flex-row md:justify-end items-center gap-4 mt-4">
          {!isAuthenticated && (
            <Alert
              type="info"
              message={ADMIN_ACCESS_MESSAGE}
              className="w-full"
            />
          )}
          <Button
            loading={loading}
            onClick={handleClickDelete}
            type="error"
            disabled={!isAuthenticated}
            className="w-full md:w-auto font-bold"
          >
            Delete
          </Button>
        </div>
      </div>

      <DeleteConfirmationModal
        type="source"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => handleDelete()}
        titleOrUrl={titleOrUrl}
      />
    </div>
  );
};

export default DeleteSource;
