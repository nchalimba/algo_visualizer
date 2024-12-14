import React from "react";

interface VisitedArrayProps {
  array: number[];
}

const VisitedArray: React.FC<VisitedArrayProps> = ({ array }) => {
  return (
    <div className="mt-4 bg-retroDark-200 p-4 rounded shadow-lg">
      <h3 className="text-xl font-bold mb-3 text-retroText-light">
        Visited Nodes:
      </h3>
      {array.length === 0 ? (
        <p className="text-gray-400 italic">No nodes visited yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {array.map((node, index) => (
            <div
              key={index}
              className="bg-retroDark-accent text-white font-medium p-2 w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-blue-400 transition"
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
