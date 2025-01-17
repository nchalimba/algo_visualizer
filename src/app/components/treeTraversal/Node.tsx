import React from "react";

type Props = {
  tree: number[];
  index: number;
};

const Node: React.FC<Props> = ({ tree, index }) => {
  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  const hasLeftChild = leftChildIndex < tree.length;
  const hasRightChild = rightChildIndex < tree.length;

  return (
    <div className="flex flex-col items-center">
      {/* Parent Node */}
      <div
        className="bg-retroDark-accent text-white h-9 w-9 md:w-12 md:h-12 flex items-center justify-center rounded-full text-center"
        id={`node-${index}`}
      >
        <p className="text-md md:text-lg font-bold">{tree[index]}</p>
      </div>

      {/* Children */}
      <div className="flex justify-between w-full mt-3 gap-1 md:gap-3">
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
