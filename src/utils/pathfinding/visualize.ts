import { Node } from "./utils";

interface VisualizeShortestPathParams {
  path: Node[];
  startNode: Node;
  endNode: Node;
  setDisableControls: (disabled: boolean) => void;
  delay: number;
  nodeStyles: {
    node: string;
    nodeShortestPath: string;
    nodeVisited: string; // Added this property
  };
}

interface VisualizePathParams extends VisualizeShortestPathParams {
  visitedNodes: Node[];
}

const visualizeShortestPath = ({
  path,
  startNode,
  endNode,
  setDisableControls,
  delay,
  nodeStyles,
}: VisualizeShortestPathParams): void => {
  if (path.length === 0) {
    setDisableControls(false);
    return;
  }

  for (let i = 0; i <= path.length; i++) {
    setTimeout(() => {
      if (i === path.length) {
        setDisableControls(false);
        return;
      }

      const node = path[i];
      if (node !== startNode && node !== endNode) {
        const element = document.getElementById(`node-${node.x}-${node.y}`);
        if (element) {
          element.className = `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`;
        }
      }
    }, delay * i);
  }
};

export const visualizePath = ({
  path,
  visitedNodes,
  startNode,
  endNode,
  setDisableControls,
  delay,
  nodeStyles,
}: VisualizePathParams): void => {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        visualizeShortestPath({
          path,
          startNode,
          endNode,
          setDisableControls,
          delay,
          nodeStyles,
        });
      }, delay * i);
    } else {
      setTimeout(() => {
        const node = visitedNodes[i];
        if (node !== startNode && node !== endNode) {
          const element = document.getElementById(`node-${node.x}-${node.y}`);
          if (element) {
            element.className = `${nodeStyles.node} ${nodeStyles.nodeVisited}`;
          }
        }
      }, delay * i);
    }
  }
};
