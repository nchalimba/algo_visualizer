import React from "react";
import { clsx } from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
  onClick:
    | ((event: React.FormEvent) => void)
    | ((event: React.FormEvent) => Promise<void>);
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  type?: "default" | "error" | "text";
  className?: string;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  active = false,
  loading = false,
  type = "default",
  className = "",
}: Props) => {
  const buttonClasses = clsx(
    "relative flex justify-center items-center gap-3 px-4 py-2 rounded disabled:bg-gray-500 transition duration-300 ease-in-out h-10",
    {
      "bg-retroDark-accent-active text-white": active,
      "bg-red-500 hover:bg-red-600 text-white": type === "error",
      "bg-retroDark-accent text-white": type === "default" && !active,
      "hover:bg-retroDark-accent-hover text-white": type === "default",
      "text-white bg-transparent hover:text-gray-300": type === "text",
      [className]: className,
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
