import { PathNode } from "@/app/types";
import { Node } from "./utils";

type SetDisableControls = (disabled: boolean) => void;

interface VisualizeParams {
  path: Node[];
  setGrid: React.Dispatch<React.SetStateAction<PathNode[][]>>;
  visitedNodes: Node[];
  startNode: Node;
  endNode: Node;
  setDisableControls: SetDisableControls;
  delay: number;
}

const updateNode = (
  x: number,
  y: number,
  setGrid: React.Dispatch<React.SetStateAction<PathNode[][]>>,
  type: "visited" | "path"
) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const node = { ...newGrid[x][y] }; // Clone the node
    if (type === "visited") node.isVisited = true;
    else if (type === "path") node.isPath = true;
    newGrid[x][y] = node;
    return newGrid;
  });
};

export const visualizePath = ({
  path,
  setGrid,
  visitedNodes,
  startNode,
  endNode,
  setDisableControls,
  delay,
}: VisualizeParams): void => {
  // Disable controls during animation
  setDisableControls(true);
  visitedNodes.forEach((node, index) => {
    const element = document.getElementById(`grid-node-${node.x}-${node.y}`);
    if (!element || node === endNode) return;

    setTimeout(() => {
      updateNode(node.x, node.y, setGrid, "visited");

      // Finalize animation of visited nodes
      if (index === visitedNodes.length - 2) {
        visualizeShortestPath({
          path,
          setGrid,
          startNode,
          endNode,
          setDisableControls,
          delay,
        });
      }
    }, delay * index);
  });
};

interface VisualizeShortestPathParams {
  path: Node[];
  startNode: Node;
  endNode: Node;
  setGrid: React.Dispatch<React.SetStateAction<PathNode[][]>>;
  setDisableControls: SetDisableControls;
  delay: number;
}

const visualizeShortestPath = ({
  path,
  setGrid,
  startNode,
  endNode,
  setDisableControls,
  delay,
}: VisualizeShortestPathParams): void => {
  if (path.length === 0) {
    setDisableControls(false);
    return;
  }

  path.forEach((node, index) => {
    const element = document.getElementById(`grid-node-${node.x}-${node.y}`);
    if (!element || node === endNode) return;
    setTimeout(() => {
      // Animate shortest path nodes
      updateNode(node.x, node.y, setGrid, "path");

      // Finalize animation of shortest path
      if (index === path.length - 1) {
        setDisableControls(false);
      }
    }, delay * index);
  });
};
