import { PathNode } from "@/app/types";

export const getNeighbours = (
  row: number,
  col: number,
  grid: PathNode[][]
): PathNode[] => {
  const neighbours: PathNode[] = [];
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours;
};

export const getNodeKey = (node: PathNode): string => {
  return `${node.x};${node.y}`;
};
