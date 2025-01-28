import React from "react";
import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  onClick:
    | ((event: React.FormEvent) => void)
    | ((event: React.FormEvent) => Promise<void>);
  disabled?: boolean;
  active?: boolean;
  error?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  active = false,
  error = false,
}) => {
  const buttonClasses = clsx(
    "px-4 py-2 text-white rounded disabled:bg-gray-500 transition duration-300 ease-in-out",
    {
      "bg-retroDark-accent-active": active,
      "bg-red-500 hover:bg-red-600": error,
      "bg-retroDark-accent": !error && !active,
      "hover:bg-retroDark-accent-hover": !error,
    }
  );
  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
