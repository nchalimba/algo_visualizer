import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMessages, getMessages } from "@/api/message";
import Button from "../common/Button";
import { FaTrash } from "react-icons/fa";

const DeleteButton = () => {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

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
  };

  return (
    <Button error onClick={handleDelete} disabled={disabled}>
      <FaTrash />
    </Button>
  );
};

export default DeleteButton;
