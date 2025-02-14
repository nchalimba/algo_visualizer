import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoadingIndicator = () => {
  return (
    <div className="flex-grow flex items-center justify-center space-x-3">
      <AiOutlineLoading className="h-4 w-4 animate-spin text-gray-400" />

      <p className="text-gray-400 italic text-center text-lg">Loading...</p>
    </div>
  );
};

export default LoadingIndicator;
