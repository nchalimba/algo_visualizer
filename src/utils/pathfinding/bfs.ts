import { PathNode, QueueNode } from "@/app/types";
import { getNeighbours, getNodeKey } from "./utils";

export const bfs = (
  startNode: PathNode,
  endNode: PathNode,
  grid: PathNode[][]
): { path: PathNode[]; visitedNodes: PathNode[] } => {
  console.log("grid1", grid);
  console.log("endNode", endNode);
  console.log("startNode", startNode);
  const visitedNodes: PathNode[] = [];
  const visitedSet = new Set<PathNode>();
  const queue: QueueNode[] = [{ node: startNode, prev: null }];
  const pathMap: Record<string, PathNode | null> = {};

  // BFS loop
  while (queue.length > 0) {
    const current = queue.shift();

    // Handle case where queue might return undefined
    if (!current) break;

    const { node, prev } = current;

    // Skip already visited nodes or walls
    if (visitedSet.has(node) || node.isWall) continue;

    // Map the current node to its previous node for path reconstruction
    pathMap[getNodeKey(node)] = prev;
    visitedNodes.push(node);
    visitedSet.add(node);

    // Exit early if we find the end node
    if (node === endNode) break;

    // Process neighbors
    const neighbours = getNeighbours(node.x, node.y, grid);
    for (const neighbour of neighbours) {
      if (!visitedSet.has(neighbour) && !neighbour.isWall) {
        queue.push({ node: neighbour, prev: node });
      }
    }
  }

  // Reconstruct the shortest path from the path map
  const path = buildPath(pathMap, endNode);
  return { path, visitedNodes };
};

const buildPath = (
  pathMap: Record<string, PathNode | null>,
  endNode: PathNode
): PathNode[] => {
  const path: PathNode[] = [];
  const endKey = getNodeKey(endNode);

  if (!(endKey in pathMap)) return path;

  let currentNode: PathNode | null = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = pathMap[getNodeKey(currentNode)];
  }

  return path;
};
