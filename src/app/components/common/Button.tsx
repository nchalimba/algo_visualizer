import React from "react";
import { clsx } from "clsx";
import { FaSpinner } from "react-icons/fa";
import { FaHurricane } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
  onClick:
    | ((event: React.FormEvent) => void)
    | ((event: React.FormEvent) => Promise<void>);
  disabled?: boolean;
  active?: boolean;
  error?: boolean;
  loading?: boolean;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  active = false,
  error = false,
  loading = false,
}: Props) => {
  const buttonClasses = clsx(
    "relative flex items-center gap-3 px-4 py-2 text-white rounded disabled:bg-gray-500 transition duration-300 ease-in-out",
    {
      "bg-retroDark-accent-active": active,
      "bg-red-500 hover:bg-red-600": error,
      "bg-retroDark-accent": !error && !active,
      "hover:bg-retroDark-accent-hover": !error,
    }
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AiOutlineLoading className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className={loading ? "invisible" : "block"}>{children}</div>
    </button>
  );
};

export default Button;
