"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineChat } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 3000); // Show prompt after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPrompt(false); // Hide prompt when chat is opened
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble */}
      {!isOpen && (
        <div className="relative group">
          {/* Chat Icon */}
          <button
            onClick={toggleChat}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg hover:scale-105 transform transition animate-pulse"
          >
            <MdOutlineChat size={28} />
          </button>
          {/* Message Prompt */}
          {showPrompt && (
            <div className="absolute bottom-16 right-0 bg-gray-800 text-white text-sm py-2 px-4 rounded-lg shadow-md animate-fade-in">
              Need help? Click here!
              <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[400px] bg-gray-900 text-white rounded-lg shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-t-lg">
            <h3 className="text-lg font-semibold">Ask Me Anything!</h3>
            <button
              onClick={toggleChat}
              className="text-gray-300 hover:text-white"
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-sm text-gray-400">
              Your chat will appear here...
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-b-lg flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 p-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
