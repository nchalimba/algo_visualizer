import { PathNode } from "@/app/types";
import clsx from "clsx";
import React from "react";
import { FaFlagCheckered, FaPersonWalking } from "react-icons/fa6";

export const Node: React.FC<PathNode & { isMovable?: boolean; id: string }> = ({
  isStart,
  isEnd,
  isWall,
  isVisited,
  isPath,
  isMovable,
  id,
}) => {
  const nodeClasses = clsx(
    "w-10 h-10 border rounded-lg border-retroDark-100 flex items-center justify-center",
    {
      "bg-retroDark-400": isWall, // Wall styles take precedence
      "bg-retroDark-accent": !isWall && (isStart || isPath), // Path and start styles
      "bg-red-600": !isWall && isEnd, // End node
      "bg-gray-100": !isWall && isVisited && !isStart && !isEnd && !isPath, // Visited node
      "bg-retroDark-300":
        !isWall && !isStart && !isEnd && !isPath && !isVisited, // Default node
    },
    {
      "cursor-pointer": isMovable && (isStart || isEnd), // Allow movement for start/end
    }
  );

  return (
    <div className={nodeClasses} id={id}>
      {isEnd && <FaFlagCheckered className="w-4 h-4" />}
      {isStart && <FaPersonWalking className="w-4 h-4" />}
    </div>
  );
};
