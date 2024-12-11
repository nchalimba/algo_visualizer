import React from "react";

interface VisitedArrayProps {
  array: number[];
}

const VisitedArray: React.FC<VisitedArrayProps> = ({ array }) => {
  return (
    <div className="mt-4 bg-gray-800 p-4 rounded">
      <h3>Visited Nodes:</h3>
      <pre className="text-white">{JSON.stringify(array, null, 2)}</pre>
    </div>
  );
};

export default VisitedArray;
