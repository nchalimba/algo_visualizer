import React, { useState } from "react";
import { Node } from "./Node";
import Toolbar from "./Toolbar";
import { PathNode } from "@/app/types";

interface GridProps {
  grid: PathNode[][];
  setGrid: React.Dispatch<React.SetStateAction<PathNode[][]>>;
  disableControls: boolean;
  startNodePosition: { x: number; y: number };
  endNodePosition: { x: number; y: number };
  setStartNodePosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setEndNodePosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
}

const Grid: React.FC<GridProps> = ({
  grid,
  setGrid,
  startNodePosition,
  endNodePosition,
  setStartNodePosition,
  setEndNodePosition,
  disableControls,
}) => {
  const [activeMode, setActiveMode] = useState<
    "move" | "draw" | "erase" | null
  >("move");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [movingNode, setMovingNode] = useState<"start" | "end" | null>(null);

  const handleNodeInteraction = (
    row: number,
    col: number,
    isMouseDown: boolean
  ) => {
    if (disableControls) return;

    const updatedGrid = grid.map((row) => [...row]);
    const node = updatedGrid[row][col];

    if (activeMode === "move") {
      if (!isMouseDown) return;

      if (movingNode === "start") {
        updatedGrid[startNodePosition.x][startNodePosition.y].isStart = false;
        updatedGrid[row][col].isStart = true;
        setStartNodePosition({ x: row, y: col });
      } else if (movingNode === "end") {
        updatedGrid[endNodePosition.x][endNodePosition.y].isEnd = false;
        updatedGrid[row][col].isEnd = true;
        setEndNodePosition({ x: row, y: col });
      } else if (node.isStart) {
        setMovingNode("start");
      } else if (node.isEnd) {
        setMovingNode("end");
      }
    } else if (activeMode === "draw") {
      if (!node.isStart && !node.isEnd) {
        node.isWall = true;
      }
    } else if (activeMode === "erase") {
      if (!node.isStart && !node.isEnd) {
        node.isWall = false;
      }
    }

    setGrid(updatedGrid);
  };

  return (
    <div className="flex flex-col gap-6">
      <Toolbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        disableControls={disableControls}
      />
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 1fr)` }}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => {
          setIsMouseDown(false);
          setMovingNode(null);
        }}
        onMouseLeave={() => {
          setIsMouseDown(false);
          setMovingNode(null);
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((node, colIndex) => (
            <div
              key={`grid-node-${rowIndex}-${colIndex}`}
              onMouseDown={() =>
                handleNodeInteraction(rowIndex, colIndex, true)
              }
              onMouseEnter={() =>
                isMouseDown && handleNodeInteraction(rowIndex, colIndex, true)
              }
              className="transition-all duration-150"
            >
              <Node
                {...node}
                id={`grid-node-${rowIndex}-${colIndex}`}
                isMovable={activeMode === "move"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
