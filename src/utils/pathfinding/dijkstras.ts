import { MinHeap } from "./minHeap";
import { getNeighbours, getNodeKey, Node } from "./utils";

interface DistMap {
  [key: string]: {
    dist: number;
    prev: Node | null;
  };
}

interface HeapNode {
  node: Node;
  cost: number; // Distance from the start node
  prev: Node | null;
}

export const dijkstras = (startNode: Node, endNode: Node, grid: Node[][]) => {
  const distMap: DistMap = {};
  const visitedNodes: Node[] = [];
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

const buildPath = (distMap: DistMap, endNode: Node): Node[] => {
  const path: Node[] = [];
  if (!(getNodeKey(endNode) in distMap)) return path;

  let currentNode: Node | null = endNode;
  while (currentNode) {
    path.push(currentNode);
    currentNode = distMap[getNodeKey(currentNode)].prev;
  }
  return path.reverse();
};
