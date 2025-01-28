import React from "react";

type TextFieldProps = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  isTextArea?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  isTextArea = false,
}) => {
  return isTextArea ? (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 bg-retroDark-300 text-retroText.primary rounded-lg focus:outline-none focus:ring-2 focus:ring-retroDark-accent w-full"
      style={{ minHeight: "100px", width: "100%" }}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 bg-retroDark-300 text-retroText.primary rounded-lg focus:outline-none focus:ring-2 focus:ring-retroDark-accent w-full"
      style={{ width: "100%" }}
    />
  );
};

export default TextField;
