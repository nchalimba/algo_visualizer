import React, { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import Message from "./Message";
import LoadingIndicator from "../common/LoadingIndicator";
import useMessages from "@/hooks/useMessages";
import Alert from "../common/Alert";
import clsx from "clsx";

type Props = {
  errorMessage: string | null;
};

const MessageContainer = ({ errorMessage }: Props) => {
  const { messages, error: loadingError, isLoading } = useMessages();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = debounce(() => {
    const container = containerRef.current;
    if (container) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (loadingError) {
    return (
      <div className="flex-grow flex items-center justify-center space-x-3 my-5">
        <Alert type="error" message="Error: could not fetch messages" />
      </div>
    );
  }
  const containerClasses = clsx("flex-grow space-y-2 px-2 md:px-2", {
    "overflow-hidden": !messages || messages.length === 0,
    "overflow-auto": messages && messages.length > 0,
  });

  return (
    <div ref={containerRef} className={containerClasses}>
      {!messages || messages.length === 0 ? (
        <p className="text-gray-400 italic flex h-full items-center justify-center p-6 text-center text-lg">
          Hi there, I&apos;m your AI assistant! Ask me anything related to data
          structures and algorithms.
        </p>
      ) : (
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      )}
      {errorMessage && (
        <div className="my-5 mx-1">
          <Alert type="error" message={errorMessage} />
        </div>
      )}
      <div className="h-2" ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
