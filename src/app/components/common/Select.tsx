import { SelectOption } from "@/app/types";
import { sleep } from "@/utils/utils";
import React, { useState, useEffect } from "react";

type Props<T = string> = {
  value: SelectOption<T> | undefined;
  options: SelectOption<T>[];
  onChange: (value: SelectOption<T>) => void;
  placeholder: string;
  disabled?: boolean;
};

const Select = <T,>({
  value,
  options,
  onChange,
  placeholder,
  disabled,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectOption = async (option: SelectOption<T>) => {
    if (option !== value) onChange(option);
    await sleep(100);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      className="relative w-48 lg:w-64"
      tabIndex={0}
      onClick={() => !disabled && setIsOpen((prev) => !prev)}
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
          {options.map((option, index) => (
            <li
              key={String(option.value)}
              className={`px-4 py-2 cursor-pointer ${
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
