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
      "bg-retroDark-accent": isStart || isPath,
      "bg-red-600": isEnd,
      "bg-retroDark-400": isWall,
      "bg-retroDark-300": !isStart && !isEnd && !isWall,
      "cursor-pointer": isMovable && (isStart || isEnd),
      "bg-gray-100": isVisited && !isStart && !isEnd && !isPath,
    }
  );

  return (
    <div className={nodeClasses} id={id}>
      {isEnd && <FaFlagCheckered className="w-4 h-4" />}
      {isStart && <FaPersonWalking className="w-4 h-4" />}
    </div>
  );
};
