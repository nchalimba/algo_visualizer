import clsx from "clsx";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TextFieldProps = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  isTextArea?: boolean;
  fullWidth?: boolean;
  label: string;
  password?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  isTextArea = false,
  fullWidth = false,
  label,
  password = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = clsx(
    "p-3 bg-retroDark-350 text-retroText.primary rounded-lg focus:outline-none focus:ring-2 focus:ring-retroDark-accent",
    {
      "w-full": fullWidth,
      "pr-10": password,
    }
  );

  return isTextArea ? (
    <div>
      <label className="text-gray-400 text-sm block">{label}:</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  ) : (
    <div className="relative">
      <label className="text-gray-400 text-sm block">{label}:</label>
      <input
        type={password && !showPassword ? "password" : "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />

      {password && (
        <button
          className="absolute right-3 bottom-4"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out" />
          ) : (
            <FaEye className="h-4 w-4 text-retroDark-accent hover:text-gray-600 transition duration-300 ease-in-out" />
          )}
        </button>
      )}
    </div>
  );
};

export default TextField;
