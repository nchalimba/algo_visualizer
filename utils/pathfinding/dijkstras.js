import { MinHeap } from './minHeap';
import { getNeighbours, getNodeKey } from './utils';

export const dijkstras = (startNode, endNode, grid) => {
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
