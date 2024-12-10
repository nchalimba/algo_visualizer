import { MinHeap } from "./minHeap";
import { getNeighbours, getNodeKey, Node } from "./utils";

// Define types for the distMap and return values
interface DistMap {
  [key: string]: {
    dist: number;
    prev: Node | null;
  };
}

interface DijkstraResult {
  path: Node[];
  visitedNodes: Node[];
}

export const dijkstras = (
  startNode: Node,
  endNode: Node,
  grid: Node[][]
): DijkstraResult => {
  /*
    Output: {node: {prev, dist}}
  */

  const distMap: DistMap = {};
  const visitedNodes: Node[] = [];
  const visitedSet = new Set<Node>();
  const priorityQueue = new MinHeap<{
    node: Node;
    cost: number;
    prev: Node | null;
  }>("cost");

  priorityQueue.add({
    node: startNode,
    cost: 0,
    prev: null,
  });

  while (priorityQueue.size() > 0) {
    priorityQueue.remove();
    const output = priorityQueue.remove();
    if (!output) break;
    const { node, cost, prev } = output;
    if (visitedSet.has(node) || node.isWall) continue;
    visitedNodes.push(node);
    visitedSet.add(node);

    const nodeKey = getNodeKey(node);
    if (!distMap[nodeKey] || distMap[nodeKey].dist > cost) {
      distMap[nodeKey] = { dist: cost, prev };
    }

    if (node === endNode) break;
    const neighbours = getNeighbours(node.x, node.y, grid);
    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      priorityQueue.add({
        node: neighbour,
        cost: cost + neighbour.weight,
        prev: node,
      });
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
  return path.reverse(); // Reverse the path to start from the startNode
};
