import { Node } from "./utils";
import { sleep } from "../utils";

type VisualizeParams = {
  path: Node[];
  visitedNodes: Node[];
  startNode: Node;
  endNode: Node;
  delay: number;
  updateNode: (x: number, y: number, type: "visited" | "path") => void;
};

export const visualizePath = async ({
  path,
  visitedNodes,
  startNode,
  endNode,
  delay,
  updateNode,
}: VisualizeParams): Promise<void> => {
  for (let i = 0; i < visitedNodes.length; i++) {
    const node = visitedNodes[i];
    if (node === endNode) continue;
    updateNode(node.x, node.y, "visited");
    if (delay) await sleep(delay);
    if (i !== visitedNodes.length - 2) continue;

    if (path.length === 0) return;

    for (const node of path) {
      if (node === startNode || node === endNode) continue;
      updateNode(node.x, node.y, "path");
      if (delay) await sleep(delay);
    }
  }
};
