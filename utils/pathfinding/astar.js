import { MinHeap } from './minHeap';
import { getNeighbours, getNodeKey } from './utils';

export const astar = (startNode, endNode, grid) => {
  /*
    Output: {node: {prev, dist}}
    
    */

  const distMap = {};
  const visitedNodes = [];

  const visitedSet = new Set();
  const priorityQueue = new MinHeap('cost');
  priorityQueue.add({
    node: startNode,
    cost: 0,
    prev: null,
  });

  while (priorityQueue.size() > 0) {
    const { node, cost, prev } = priorityQueue.remove();
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
      const heuristic = getHeuristic(neighbour, endNode);
      priorityQueue.add({
        node: neighbour,
        cost: cost + neighbour.weight + heuristic,
        prev: node,
      });
    }
  }
  const path = buildPath(distMap, endNode);
  return { path, visitedNodes };
};

const buildPath = (distMap, endNode) => {
  const path = [];
  if (!(getNodeKey(endNode) in distMap)) return path;

  let currentNode = endNode;
  while (currentNode) {
    path.push(currentNode);
    currentNode = distMap[getNodeKey(currentNode)].prev;
  }
  return path;
};

const getHeuristic = (node, endNode) => {
  const xDistance = Math.abs(endNode.x - node.x);
  const yDistance = Math.abs(endNode.y - node.y);
  const heuristic = Math.sqrt(xDistance ** 2 + yDistance ** 2);
  return heuristic;
};
