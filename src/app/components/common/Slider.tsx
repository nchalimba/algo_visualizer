import React from "react";

type Props = {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  disabled?: boolean;
};

const Slider: React.FC<Props> = ({
  label,
  value,
  onChange,
  min,
  max,
  disabled,
}) => {
  return (
    <div className="flex flex-col items-center">
      <label className="text-retroText-primary text-md mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="
          w-42 h-2 bg-retroDark-300 rounded-lg
          appearance-none 
          peer
        "
      />
    </div>
  );
};

export default Slider;
