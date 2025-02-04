import { ChatMessage } from "@/app/types";
import React, { useState } from "react";
import clsx from "clsx";
import MarkdownContainer from "../common/MarkdownContainer";
import {
  FaArrowDown,
  FaArrowUp,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
} from "react-icons/fa";

type MessageProps = {
  message: ChatMessage;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const [showSources, setShowSources] = useState(false);

  const messageClasses = clsx(
    "text-retroText.primary p-3 rounded-lg max-w-[min(80%,1000px)] break-words",
    {
      "bg-retroDark-400": message.type === "user",
      "bg-retroDark-300": message.type !== "user",
    }
  );

  const containerClasses = clsx("flex items-start", {
    "justify-end": message.type === "user",
    "justify-start": message.type !== "user",
  });

  const hasValidSources = message.sources && message.sources.length > 0;

  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div key={message.id} className={containerClasses}>
      <div className={messageClasses}>
        {message.loading && !message.content ? (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 animate-pulse">
            Loading...
          </span>
        ) : (
          <>
            <MarkdownContainer content={message.content} />
            {hasValidSources && (
              <div className="mt-2">
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="flex items-center text-xs text-retroText-light hover:text-retroText-accent transition-colors"
                >
                  {showSources ? (
                    <FaChevronUp className="w-3 h-3 mr-1" />
                  ) : (
                    <FaChevronDown className="w-3 h-3 mr-1" />
                  )}
                  Sources ({message.sources.length})
                </button>
                {showSources && (
                  <div className="mt-2 pl-2 text-sm text-retroText-light border-l border-retroDark-400">
                    {message.sources.map((source, index) => {
                      const isSourceUrl = isUrl(source.source_label);
                      return (
                        <div key={source.source_key} className="mt-1 first:mt-0">
                          {isSourceUrl ? (
                            <a
                              href={source.source_label}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center hover:text-retroText-accent transition-colors"
                            >
                              {source.source_label}
                              <FaExternalLinkAlt className="ml-1 w-3 h-3" />
                            </a>
                          ) : (
                            source.source_label
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
