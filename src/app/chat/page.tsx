"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import RagStatus from "../components/chat/RagStatus";
import { getMessages, handleMessageStream, sendMessage } from "@/api/message";
import { ChatMessage } from "../types";
import InputContainer from "../components/chat/InputContainer";
import DeleteButton from "../components/chat/DeleteButton";
import MessageContainer from "../components/chat/MessageContainer";

const ChatBotPage = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const optimisticUpdate = async (message: string) => {
    await queryClient.cancelQueries({ queryKey: ["messages"] });
    const previousMessages = queryClient.getQueryData(["messages"]);
    queryClient.setQueryData(
      ["messages"],
      (oldMessages: ChatMessage[] = []) => [
        ...oldMessages,
        {
          id: Math.random().toString(),
          type: "user",
          content: message,
        },
        {
          id: Math.random().toString(),
          type: "ai",
          loading: true,
          content: "",
        },
      ]
    );
    return { previousMessages };
  };

  const updateMessage = (messageChunk: string) => {
    queryClient.setQueryData(
      ["messages"],
      (oldMessages: ChatMessage[] = []) => {
        const updatedMessages = oldMessages.map((message) => {
          if (!message.loading) return message;
          return {
            ...message,
            content: message.content + messageChunk,
          };
        });
        return updatedMessages;
      }
    );
  };

  const sendMessageMutation = useMutation({
    onMutate: optimisticUpdate,
    mutationFn: sendMessage,
    onSuccess: (response) =>
      handleMessageStream(response, updateMessage, () =>
        queryClient.invalidateQueries({ queryKey: ["messages"] })
      ),
    onError: (error) => {
      setErrorMessage(error.message);
      // delete the message with loading: true
      queryClient.cancelQueries({ queryKey: ["messages"] });
      const previousMessages = queryClient.getQueryData<ChatMessage[]>([
        "messages",
      ]);
      const updatedMessages = previousMessages?.filter(
        (message) => !message.loading
      );
      queryClient.setQueryData(["messages"], updatedMessages);
    },
    onSettled: () => setLoadingButton(false),
  });

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingButton(true);
    const input = inputRef.current;
    if (!input) return;
    const message = input.value;
    sendMessageMutation.mutate(message);
    input.value = "";
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.12))] md:h-[calc(100vh-theme(spacing.12))] flex flex-col bg-retroDark-100">
      {/* Header */}
      <div className="flex justify-between items-center p-2 border-b border-retroDark-200">
        <h1 className="text-xl text-retroText.primary font-retro">
          AI Assistant
        </h1>
        <div className="flex items-center gap-2">
          <RagStatus />
          <DeleteButton />
        </div>
      </div>

      <MessageContainer errorMessage={errorMessage} />

      <InputContainer
        handleSend={handleSend}
        inputRef={inputRef}
        loadingButton={loadingButton}
      />
    </div>
  );
};

export default ChatBotPage;
