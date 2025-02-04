import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

type Props = {
  message: string;
};

const WarningMessage = ({ message }: Props) => {
  return (
    <div className="bg-warning bg-opacity-10 outline outline-warning text-warning pr-4 pl-2 py-2 rounded font-bold flex items-center gap-2">
      <FaExclamationTriangle />
      <span>{message}</span>
    </div>
  );
};

export default WarningMessage;
