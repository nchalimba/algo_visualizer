import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessages } from "@/api/message";
import Button from "../common/Button";
import { FaTrash } from "react-icons/fa";

const DeleteButton = () => {
  const queryClient = useQueryClient();
  const deleteMessagesMutation = useMutation({
    mutationFn: deleteMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleDelete = () => {
    deleteMessagesMutation.mutate();
  };

  return (
    <Button onClick={handleDelete}>
      <FaTrash />
    </Button>
  );
};

export default DeleteButton;
