import React from "react";
import { FaTimesCircle } from "react-icons/fa";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="bg-alert bg-opacity-10 outline outline-alert text-alert pr-4 pl-2 py-2 rounded font-bold flex items-center gap-2">
      <FaTimesCircle />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
