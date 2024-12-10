import { Node, getNeighbours, getNodeKey } from "./utils";

interface QueueNode {
  node: Node;
  prev: Node | null;
}

export const bfs = (
  startNode: Node,
  endNode: Node,
  grid: Node[][]
): { path: Node[]; visitedNodes: Node[] } => {
  const visitedNodes: Node[] = [];
  const visitedSet = new Set<Node>();
  const queue: QueueNode[] = [{ node: startNode, prev: null }];
  const pathMap: Record<string, Node | null> = {};

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
  pathMap: Record<string, Node | null>,
  endNode: Node
): Node[] => {
  const path: Node[] = [];
  const endKey = getNodeKey(endNode);

  if (!(endKey in pathMap)) return path;

  let currentNode: Node | null = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = pathMap[getNodeKey(currentNode)];
  }

  return path;
};
