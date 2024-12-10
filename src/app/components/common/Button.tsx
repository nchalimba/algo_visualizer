import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 bg-retroDark-accent text-white rounded hover:bg-retroDark-accent-hover disabled:bg-gray-500 transition duration-300 ease-in-out"
  >
    {children}
  </button>
);

export default Button;
