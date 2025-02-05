import React from "react";
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";
import clsx from "clsx";

type Props = {
  message: string;
  className?: string;
  type: "info" | "warning" | "error";
};

const Alert = ({ message, className = "", type }: Props) => {
  const classes = clsx(
    "bg-opacity-10 outline pr-4 pl-2 py-2 rounded font-bold flex items-center gap-2",
    {
      [className]: className,
      "bg-info outline-info text-info": type === "info",
      "bg-alert outline-alert text-alert": type === "error",
      "bg-warning outline-warning text-warning": type === "warning",
    }
  );

  return (
    <div className={classes}>
      {type === "info" ? (
        <FaInfoCircle className="h-4 w-4 min-h-4 min-w-4" />
      ) : type === "warning" ? (
        <FaExclamationTriangle className="h-4 w-4 min-h-4 min-w-4" />
      ) : (
        <FaTimesCircle className="h-4 w-4 min-h-4 min-w-4" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
