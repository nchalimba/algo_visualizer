import { PathNode } from "@/app/types";

export const generateMaze = (
  grid: PathNode[][],
  startNode: { x: number; y: number },
  endNode: { x: number; y: number }
): PathNode[][] => {
  const rows = grid.length;
  const cols = grid[0].length;

  // Deep copy of grid
  grid = grid.map((row) => row.map((node) => ({ ...node })));

  // Initialize all cells as walls except start and end
  grid.forEach((row) => {
    row.forEach((node) => {
      if (node.isStart || node.isEnd) {
        node.isWall = false;
      } else {
        node.isWall = true;
      }
    });
  });

  //grid.forEach((row) => row.forEach((node) => (node.isWall = true)));

  // Helper function to get valid neighbors
  function getNeighbors(
    x: number,
    y: number
  ): { nx: number; ny: number; wx: number; wy: number }[] {
    const directions = [
      { dx: 0, dy: -2 }, // Up
      { dx: 0, dy: 2 }, // Down
      { dx: -2, dy: 0 }, // Left
      { dx: 2, dy: 0 }, // Right
    ];

    const neighbors: { nx: number; ny: number; wx: number; wy: number }[] = [];
    for (const { dx, dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const wx = x + dx / 2;
      const wy = y + dy / 2;

      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny].isWall) {
        neighbors.push({ nx, ny, wx, wy });
      }
    }
    return neighbors;
  }

  // Ensure buffer zones around start and end nodes
  const createBufferZone = (x: number, y: number) => {
    const bufferDirections = [
      { dx: 0, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
    for (const { dx, dy } of bufferDirections) {
      const bx = x + dx;
      const by = y + dy;
      if (bx >= 0 && by >= 0 && bx < rows && by < cols) {
        grid[bx][by].isWall = false;
      }
    }
  };

  // Ensure clear paths from start and end nodes
  const ensurePathToMaze = (x: number, y: number) => {
    const directions = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];
    for (const { dx, dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny].isWall) {
        grid[nx][ny].isWall = false;
        break;
      }
    }
  };

  // Create buffer zones and clear paths for start and end nodes
  createBufferZone(startNode.x, startNode.y);
  ensurePathToMaze(startNode.x, startNode.y);

  createBufferZone(endNode.x, endNode.y);
  ensurePathToMaze(endNode.x, endNode.y);

  // Start with a random cell that isn't in the buffer zone
  let startX = Math.floor(Math.random() * rows);
  let startY = Math.floor(Math.random() * cols);
  while (!grid[startX][startY].isWall) {
    startX = Math.floor(Math.random() * rows);
    startY = Math.floor(Math.random() * cols);
  }

  grid[startX][startY].isWall = false;

  // Walls list
  const walls: { nx: number; ny: number; wx: number; wy: number }[] =
    getNeighbors(startX, startY);

  // Process walls
  while (walls.length > 0) {
    const randomIndex = Math.floor(Math.random() * walls.length);
    const { nx, ny, wx, wy } = walls.splice(randomIndex, 1)[0];

    // Check if the neighboring cell is unvisited
    if (grid[nx][ny].isWall) {
      // Remove wall
      grid[wx][wy].isWall = false;
      grid[nx][ny].isWall = false;

      // Add the new cell's neighbors
      walls.push(...getNeighbors(nx, ny));
    }
  }

  return grid;
};
