import React from "react";

type Props = {
  array: number[];
};

const VisitedArray: React.FC<Props> = ({ array }) => {
  return (
    <div className="mt-4 bg-retroDark-200 p-4 rounded shadow-lg">
      <h3 className="text-lg md:text-xl font-bold mb-3 text-retroText-light">
        Visited Nodes:
      </h3>
      {array.length === 0 ? (
        <p className="text-gray-400 italic">No nodes visited yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {array.map((node, index) => (
            <div
              key={index}
              className="bg-retroDark-accent text-white font-bold p-2 h-9 w-9 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-md hover:bg-retroDark-accent-hover text-md md:text-lg"
            >
              {node}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitedArray;
