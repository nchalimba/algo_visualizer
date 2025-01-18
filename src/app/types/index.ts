/* Sorting */
export type SortingSettings = {
  algoType: string | null;
  length: number;
  delay: number;
};

export type SortingElement = {
  value: number;
  isActive?: boolean;
};

export type SortType =
  | "insertion_sort"
  | "merge_sort"
  | "quick_sort"
  | "heap_sort";

export type SortResult = {
  sortedArray: SortingElement[];
  swapArray: [number, number][];
};

/* Tree Traversal */
export type TreeTraversalSettings = {
  algo: TreeTraversalAlgo | null;
  delay: number;
  length: number;
};

export type TreeTraversalAlgo =
  | "inorder"
  | "preorder"
  | "postorder"
  | "levelorder";

export type TreeNode = {
  key: number;
  isActive?: boolean;
};

// export type Tree = (number | null)[];

/* Pathfinding */
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

export type HeapNode = {
  node: PathNode;
  cost: number;
  prev: PathNode | null;
};

export type QueueNode = {
  node: PathNode;
  prev: PathNode | null;
};

export type DistMap = {
  [key: string]: {
    dist: number;
    prev: PathNode | null;
  };
};

/* Common */
export type SelectOption<T = string> = {
  label: string;
  value: T;
};
