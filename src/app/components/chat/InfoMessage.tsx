import React from "react";
import { FaInfoCircle } from "react-icons/fa";

type Props = {
  message: string;
};

const InfoMessage = ({ message }: Props) => {
  return (
    <div className="bg-info bg-opacity-10 outline outline-info text-info pr-4 pl-2 py-2 rounded font-bold flex items-center gap-2">
      <FaInfoCircle />
      <span>{message}</span>
    </div>
  );
};

export default InfoMessage;
