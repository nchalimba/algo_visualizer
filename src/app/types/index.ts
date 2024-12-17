export interface SortingSettings {
  algoType: string | null;
  length: number;
  delay: number;
}

export interface TreeTraversalSettings {
  algo: TreeTraversalAlgo | null;
  delay: number;
  length: number;
}

export type TreeTraversalAlgo =
  | "inorder"
  | "preorder"
  | "postorder"
  | "levelorder";

export type Tree = (number | null)[];

export type PathFindingSettings = {
  rows: number;
  cols: number;
  delay: number;
  algo: PathFindingAlgo | null;
  randomizeWalls: boolean;
  toggleNew: boolean;
};
export type PathNode = {
  x: number;
  y: number;
  isStart: boolean;
  isVisited?: boolean;
  isPath?: boolean;
  isEnd: boolean;
  isWall: boolean;
  weight: number;
};

export type PathFindingAlgo = "bfs" | "dijkstra" | "astar";

export type SortingElement = number;
