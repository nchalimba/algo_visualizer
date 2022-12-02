import { getNeighbours, getNodeKey } from './utils';

export const bfs = (startNode, endNode, grid) => {
  const visitedNodes = [];

  const visitedSet = new Set();
  const queue = [{ node: startNode, prev: null }];

  const pathMap = {};
  while (queue.length > 0) {
    const { node, prev } = queue.shift();
    if (visitedSet.has(node) || node.isWall) continue;
    pathMap[getNodeKey(node)] = prev;
    visitedNodes.push(node);
    visitedSet.add(node);

    if (node === endNode) break;

    const neighbours = getNeighbours(node.x, node.y, grid);
    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      queue.push({ node: neighbour, prev: node });
    }
  }

  const path = buildPath(pathMap, endNode);
  return { path, visitedNodes };
};

const buildPath = (pathMap, endNode) => {
  const path = [];
  if (!(getNodeKey(endNode) in pathMap)) return path;

  let currentNode = endNode;
  while (currentNode) {
    path.push(currentNode);
    currentNode = pathMap[getNodeKey(currentNode)];
  }
  return path;
};
