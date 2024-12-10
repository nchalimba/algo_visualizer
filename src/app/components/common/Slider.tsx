import React from "react";

interface SliderProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange, min }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="text-retroText-primary text-lg mb-2">{label}</label>
      <input
        type="range"
        min={min}
        value={value}
        onChange={onChange}
        className="
          w-48 h-2 bg-retroDark-300 rounded-lg
          appearance-none 
          peer
        "
      />
    </div>
  );
};

export default Slider;
