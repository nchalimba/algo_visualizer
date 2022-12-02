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
  console.log('PQ', priorityQueue);
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
  console.log('dist map', distMap);
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
  console.log(path);
  return path;
};

const getHeuristic = (node, endNode) => {
  console.log('Node 1:', node);
  console.log('Node 2:', endNode);
  const xDistance = Math.abs(endNode.x - node.x);
  const yDistance = Math.abs(endNode.y - node.y);
  const heuristic = Math.sqrt(xDistance ** 2 + yDistance ** 2);
  console.log('Heuristic: ', heuristic);
  return heuristic;
};
