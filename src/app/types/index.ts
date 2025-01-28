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

/* API */

export type HealthResponse = {
  vector_store: "up" | "down";
  db: "up" | "down";
};
export type Source = {
  source_key: string;
  source_label: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  type: string;
  step: number;
  sources: Source[];
  loading?: boolean;
};

export type ChatResponse = {
  done: boolean;
  text: string;
  error?: string;
};
/*
return {
            "llm_provider": app_config.model.llm_provider,
            "llm": app_config.model.llm_model,
            "embedding_model": app_config.model.embedding_model,
            "rag_version": app_config.info.version,
            "chunk_size": app_config.chunk_size,
            "chunk_overlap": app_config.chunk_overlap,
            "vector_dimension": app_config.vector_db.vector_dimension,
            "sources": self.vector_store.get_distinct_sources()
        }
*/
export type InfoResponse = {
  llm_provider: string;
  llm: string;
  embedding_model: string;
  rag_version: string;
  chunk_size: number;
  chunk_overlap: number;
  vector_dimension: number;
  sources: string[];
};
