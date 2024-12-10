import React, { useState, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  value: Option | undefined;
  options: Option[];
  onChange: (value: Option) => void;
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectOption = (option: Option) => {
    if (option !== value) onChange(option);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      className="relative w-48 lg:w-64" // Fixed width
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
    >
      <span className="cursor-pointer p-2 bg-gray-800 text-white rounded w-full block">
        {value?.label || placeholder}
      </span>

      <div
        className={`${
          isOpen ? "rotate-180" : ""
        } absolute right-2 top-2 transform`}
      >
        ▼
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-gray-800 text-white mt-2 rounded shadow-lg z-10">
          {" "}
          {/* z-index for stacking */}
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`px-4 py-2 ${
                index === highlightedIndex ? "bg-retroDark-accent" : ""
              }`}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
