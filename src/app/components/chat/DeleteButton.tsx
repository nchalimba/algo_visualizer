import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMessages, getMessages } from "@/api/message";
import Button from "../common/Button";
import { FaTrash } from "react-icons/fa";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import { useState } from "react";
import useMessages from "@/hooks/useMessages";

const DeleteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages } = useMessages();

  const disabled = !messages || messages.length === 0;

  const queryClient = useQueryClient();
  const deleteMessagesMutation = useMutation({
    mutationFn: deleteMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleDelete = () => {
    deleteMessagesMutation.mutate();
    setIsOpen(false);
  };

  return (
    <Button type="error" onClick={() => setIsOpen(true)} disabled={disabled}>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="conversation"
        onConfirm={handleDelete}
      />
      <FaTrash />
    </Button>
  );
};

export default DeleteButton;
