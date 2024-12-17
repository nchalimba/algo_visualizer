import React from "react";

interface SortingElementsProps {
  elements: number[];
}

const SortingElements: React.FC<SortingElementsProps> = ({ elements }) => {
  return (
    <div className="relative w-full h-96 ">
      {/* Bars */}
      <div className="flex items-start w-full h-full">
        {elements.map((element, index) => (
          <div
            key={index}
            id={`bar-${index}`}
            className="bg-retroDark-accent rounded-sm rounded-t-none"
            style={{
              height: `${element}px`, // Height of the bar, grows downwards
              width: `${100 / elements.length}%`, // Ensure bars are evenly spaced with no gap
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingElements;
