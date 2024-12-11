import React from "react";

interface NodeProps {
  tree: number[];
  index: number;
}

const Node: React.FC<NodeProps> = ({ tree, index }) => {
  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  const hasLeftChild = leftChildIndex < tree.length;
  const hasRightChild = rightChildIndex < tree.length;

  return (
    <div className="flex flex-col items-center mb-8">
      {/* Parent Node */}
      <div
        className="bg-retroDark-accent text-white p-4 rounded-full w-16 text-center"
        id={`node-${index}`}
      >
        <p>{tree[index]}</p>
      </div>

      {/* Children */}
      <div className="flex justify-between w-full mt-4 gap-4">
        {hasLeftChild && (
          <div className="flex flex-col items-center">
            <Node tree={tree} index={leftChildIndex} />
          </div>
        )}
        {hasRightChild && (
          <div className="flex flex-col items-center">
            <Node tree={tree} index={rightChildIndex} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Node;
