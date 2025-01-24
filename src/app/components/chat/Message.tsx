import { ChatMessage } from "@/app/types";
import React from "react";
import clsx from "clsx";

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const messageClasses = clsx({
    "bg-retroDark-400": message.type === "user",
    "bg-retroDark-300": message.type !== "user",
  });

  const containerClasses = clsx(
    {
      "justify-end": message.type === "user",
      "justify-start": message.type !== "user",
    },
    "flex items-start"
  );

  return (
    <div key={message.id} className={containerClasses}>
      <div
        className={clsx(
          messageClasses,
          "text-retroText.primary p-3 rounded-lg max-w-[80%] break-words"
        )}
      >
        {message.loading && !message.content ? (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 animate-pulse">
            Loading...
          </span>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
