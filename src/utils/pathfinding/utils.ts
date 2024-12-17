// Define types for Node if not already defined
export interface Node {
  x: number;
  y: number;
  weight: number;
  isWall: boolean;
}

export const getNeighbours = (
  row: number,
  col: number,
  grid: Node[][]
): Node[] => {
  const neighbours: Node[] = [];
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours;
};

export const getNodeKey = (node: Node): string => {
  return `${node.x};${node.y}`;
};
