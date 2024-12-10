import { MinHeap } from "./minHeap";
import { getNeighbours, getNodeKey, Node } from "./utils";

interface HeapNode {
  node: Node;
  cost: number; // g(n) + h(n)
  prev: Node | null;
}

export const astar = (
  startNode: Node,
  endNode: Node,
  grid: Node[][]
): { path: Node[]; visitedNodes: Node[] } => {
  const distMap: Record<string, { dist: number; prev: Node | null }> = {};
  const visitedNodes: Node[] = [];
  const visitedSet = new Set<Node>();
  const priorityQueue = new MinHeap<HeapNode>("cost");

  // Add the starting node to the priority queue
  priorityQueue.add({
    node: startNode,
    cost: 0,
    prev: null,
  });

  while (priorityQueue.size() > 0) {
    const heapNode = priorityQueue.remove();

    // Handle case where remove() returns undefined
    if (!heapNode) break;

    const { node, cost, prev } = heapNode;

    // Skip already visited nodes or walls
    if (visitedSet.has(node) || node.isWall) continue;

    visitedNodes.push(node);
    visitedSet.add(node);

    const nodeKey = getNodeKey(node);

    // Update distance map if a shorter path is found
    if (!distMap[nodeKey] || distMap[nodeKey].dist > cost) {
      distMap[nodeKey] = { dist: cost, prev };
    }

    // Exit early if we reach the end node
    if (node === endNode) break;

    // Process neighbors
    const neighbours = getNeighbours(node.x, node.y, grid);
    for (const neighbour of neighbours) {
      if (!visitedSet.has(neighbour) && !neighbour.isWall) {
        const heuristic = getHeuristic(neighbour, endNode); // h(n)
        const newCost = cost + neighbour.weight; // g(n)
        priorityQueue.add({
          node: neighbour,
          cost: newCost + heuristic, // f(n) = g(n) + h(n)
          prev: node,
        });
      }
    }
  }

  // Build the path from the distance map
  const path = buildPath(distMap, endNode);
  return { path, visitedNodes };
};

// Function to reconstruct the path from the distance map
const buildPath = (
  distMap: Record<string, { dist: number; prev: Node | null }>,
  endNode: Node
): Node[] => {
  const path: Node[] = [];
  const endKey = getNodeKey(endNode);

  // If the end node is not in the distance map, there's no path
  if (!(endKey in distMap)) return path;

  let currentNode: Node | null = endNode;

  while (currentNode) {
    path.unshift(currentNode); // Prepend nodes to the path
    const currentKey = getNodeKey(currentNode);
    currentNode = distMap[currentKey]?.prev || null;
  }

  return path;
};

// Heuristic function: Euclidean distance
const getHeuristic = (node: Node, endNode: Node): number => {
  const xDistance = Math.abs(endNode.x - node.x);
  const yDistance = Math.abs(endNode.y - node.y);
  return Math.sqrt(xDistance ** 2 + yDistance ** 2); // Euclidean distance
};
