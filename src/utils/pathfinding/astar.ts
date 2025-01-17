import { HeapNode, PathNode } from "@/app/types";
import { MinHeap } from "./minHeap";
import { getNeighbours, getNodeKey } from "./utils";

export const astar = (
  startNode: PathNode,
  endNode: PathNode,
  grid: PathNode[][]
): { path: PathNode[]; visitedNodes: PathNode[] } => {
  const distMap: Record<string, { dist: number; prev: PathNode | null }> = {};
  const visitedNodes: PathNode[] = [];
  const visitedSet = new Set<PathNode>();
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
  distMap: Record<string, { dist: number; prev: PathNode | null }>,
  endNode: PathNode
): PathNode[] => {
  const path: PathNode[] = [];
  const endKey = getNodeKey(endNode);

  // If the end node is not in the distance map, there's no path
  if (!(endKey in distMap)) return path;

  let currentNode: PathNode | null = endNode;

  while (currentNode) {
    path.unshift(currentNode); // Prepend nodes to the path
    const currentKey = getNodeKey(currentNode);
    currentNode = distMap[currentKey]?.prev || null;
  }

  return path;
};

// Heuristic function: Euclidean distance
const getHeuristic = (node: PathNode, endNode: PathNode): number => {
  const xDistance = Math.abs(endNode.x - node.x);
  const yDistance = Math.abs(endNode.y - node.y);
  return Math.sqrt(xDistance ** 2 + yDistance ** 2); // Euclidean distance
};
