import React from "react";
import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  active = false,
}) => {
  const buttonClasses = clsx(
    "px-4 py-2 bg-retroDark-accent text-white rounded hover:bg-retroDark-accent-hover disabled:bg-gray-500 transition duration-300 ease-in-out",
    {
      "bg-retroDark-accent-active": active,
    }
  );
  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
