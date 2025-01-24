"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import RagStatus from "../components/chat/RagStatus";
import { getMessages, handleMessageStream, sendMessage } from "@/api/message";
import { ChatMessage } from "../types";
import Message from "../components/chat/Message";
import InputContainer from "../components/chat/InputContainer";
import ErrorMessage from "../components/chat/ErrorMessage";
import DeleteButton from "../components/chat/DeleteButton";

const ChatBotPage = () => {
  const {
    data: messages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

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
      handleMessageStream(response, updateMessage, () => {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      }),
    onError: (error) => setErrorMessage(error.message),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    const message = input.value;
    sendMessageMutation.mutate(message);
    input.value = "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage message="Error: could not fetch messages" />;
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.12))] md:h-[calc(100vh-theme(spacing.12))] flex flex-col bg-retroDark-100">
      {/* Header */}
      <div className="flex justify-between items-center p-2 border-b border-retroDark-200">
        <h1 className="text-xl text-retroText.primary font-retro">
          AI Assistant
        </h1>
        <div className="flex items-center gap-2">
          <DeleteButton />
          <RagStatus />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-auto space-y-2">
        {!messages || messages.length === 0 ? (
          <p className="text-gray-400 italic flex h-full items-center justify-center p-6 text-center text-lg">
            Hi there, I&apos;m your AI assistant! Ask me anything related to
            data structures and algorithms.
          </p>
        ) : (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className="h-2" ref={messagesEndRef} />
      </div>

      <InputContainer handleSend={handleSend} inputRef={inputRef} />
    </div>
  );
};

export default ChatBotPage;
