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
    "w-5 min-[450px]:w-6 min-[450px]:h-6 min-[550px]:w-8 min-[550px]:h-8 sm:w-9 sm:h-9 h-5 lg:w-12 lg:h-12 border lg:rounded-lg sm:rounded-md border-retroDark-100 flex items-center justify-center",
    {
      "bg-retroDark-400": isWall, // Wall styles take precedence
      "bg-retroDark-accent": !isWall && (isStart || isPath), // Path and start styles
      "bg-alert": !isWall && isEnd, // End node
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
      {isEnd && (
        <FaFlagCheckered className="w-3 h-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
      )}
      {isStart && (
        <FaPersonWalking className="w-3 h-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
      )}
    </div>
  );
};
