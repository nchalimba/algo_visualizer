import { getMessages } from "@/api/message";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import ErrorMessage from "./ErrorMessage";
import Message from "./Message";
import LoadingIndicator from "../common/LoadingIndicator";

type Props = {
  errorMessage: string | null;
};

const MessageContainer = ({ errorMessage }: Props) => {
  const {
    data: messages,
    error: loadingError,
    isLoading,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (loadingError) {
    return (
      <div className="flex-grow flex items-center justify-center space-x-3">
        <ErrorMessage message="Error: could not fetch messages" />
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-auto space-y-2">
      {!messages || messages?.length === 0 ? (
        <p className="text-gray-400 italic flex h-full items-center justify-center p-6 text-center text-lg">
          Hi there, I&apos;m your AI assistant! Ask me anything related to data
          structures and algorithms.
        </p>
      ) : (
        messages?.map((message, index) => (
          <Message key={index} message={message} />
        ))
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className="h-2" ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
