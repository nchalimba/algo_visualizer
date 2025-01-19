import { DistMap, HeapNode, PathNode } from "@/app/types";
import { MinHeap } from "./minHeap";
import { getNeighbours, getNodeKey } from "./utils";

export const dijkstras = (
  startNode: PathNode,
  endNode: PathNode,
  grid: PathNode[][]
) => {
  const distMap: DistMap = {};
  const visitedNodes: PathNode[] = [];
  const visitedSet = new Set<string>(); // Use strings (keys) for tracking
  const priorityQueue = new MinHeap<HeapNode>("cost");

  // Initialize priority queue with the start node
  priorityQueue.add({
    node: startNode,
    cost: 0,
    prev: null,
  });

  while (priorityQueue.size() > 0) {
    const current = priorityQueue.remove();
    if (!current) break;

    const { node, cost, prev } = current;

    const nodeKey = getNodeKey(node);
    if (visitedSet.has(nodeKey) || node.isWall) continue;

    // Mark as visited
    visitedNodes.push(node);
    visitedSet.add(nodeKey);

    // Update distance map
    if (!distMap[nodeKey] || distMap[nodeKey].dist > cost) {
      distMap[nodeKey] = { dist: cost, prev };
    }

    // If end node is reached, terminate early
    if (node === endNode) break;

    // Process neighbors
    const neighbors = getNeighbours(node.x, node.y, grid);
    for (const neighbor of neighbors) {
      if (!visitedSet.has(getNodeKey(neighbor)) && !neighbor.isWall) {
        priorityQueue.add({
          node: neighbor,
          cost: cost + neighbor.weight,
          prev: node,
        });
      }
    }
  }

  const path = buildPath(distMap, endNode);
  return { path, visitedNodes };
};

const buildPath = (distMap: DistMap, endNode: PathNode): PathNode[] => {
  const path: PathNode[] = [];
  if (!(getNodeKey(endNode) in distMap)) return path;

  let currentNode: PathNode | null = endNode;
  while (currentNode) {
    path.push(currentNode);
    currentNode = distMap[getNodeKey(currentNode)].prev;
  }
  return path.reverse();
};
