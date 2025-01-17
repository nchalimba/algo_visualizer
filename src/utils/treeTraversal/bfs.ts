import { Tree } from "@/app/types";

export const bfs = (tree: Tree, visited: number[]): void => {
  const queue: number[] = [0]; // Start from the root (index 0)

  while (queue.length > 0) {
    const currentNode = queue.shift() as number; // Safe to assert as number since the queue only contains numbers
    visited.push(currentNode);

    const leftChild = currentNode * 2 + 1;
    const rightChild = currentNode * 2 + 2;

    // Check if the left child exists and is valid (not null)
    if (tree[leftChild] != null) {
      queue.push(leftChild);
    }
    // Check if the right child exists and is valid (not null)
    if (tree[rightChild] != null) {
      queue.push(rightChild);
    }
  }
};
