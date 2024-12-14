import React, { useState } from "react";
import { Node } from "./Node";
import { PathNode } from "@/app/types";
import Button from "../common/Button";
import { FaHand } from "react-icons/fa6";
import { FaEraser, FaPen } from "react-icons/fa";

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

  const handleNodeInteraction = (
    row: number,
    col: number,
    isMouseDown: boolean
  ) => {
    if (disableControls) return;

    const updatedGrid = grid.map((row) => [...row]);
    const node = updatedGrid[row][col];

    if (activeMode === "move") {
      // Move start or end node
      if (node.isStart || node.isEnd) return;
      if (isMouseDown) {
        console.log("Hey");
        if (startNodePosition.x === row && startNodePosition.y === col) {
          console.log("hey1");
          updatedGrid[startNodePosition.x][startNodePosition.y].isStart = false;
          updatedGrid[row][col].isStart = true;
          setStartNodePosition({ x: row, y: col });
        } else if (endNodePosition.x === row && endNodePosition.y === col) {
          console.log("hey2");
          updatedGrid[endNodePosition.x][endNodePosition.y].isEnd = false;
          updatedGrid[row][col].isEnd = true;
          setEndNodePosition({ x: row, y: col });
        }
      }
    } else if (activeMode === "draw") {
      // Draw wall
      if (isMouseDown && !node.isStart && !node.isEnd) {
        node.isWall = true;
      }
    } else if (activeMode === "erase") {
      // Erase wall
      if (isMouseDown && !node.isStart && !node.isEnd) {
        node.isWall = false;
      }
    }

    setGrid(updatedGrid);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-6">
        <Button
          active={activeMode === "move"}
          disabled={disableControls}
          onClick={() => setActiveMode("move")}
        >
          <FaHand />
        </Button>
        <Button
          active={activeMode === "draw"}
          disabled={disableControls}
          onClick={() => setActiveMode("draw")}
        >
          <FaPen />
        </Button>
        <Button
          active={activeMode === "erase"}
          disabled={disableControls}
          onClick={() => setActiveMode("erase")}
        >
          <FaEraser />
        </Button>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 1fr)` }}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
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
