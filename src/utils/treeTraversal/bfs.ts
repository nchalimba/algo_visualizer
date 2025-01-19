import { TreeNode } from "@/app/types";

export const bfs = (tree: TreeNode[], visited: number[]): void => {
  const queue: TreeNode[] = [tree[0]]; // Start from the root (index 0)

  while (queue.length > 0) {
    const currentNode = queue.shift() as TreeNode; // Safe to assert as number since the queue only contains numbers
    visited.push(currentNode.key);

    const leftChild = tree[currentNode.key * 2 + 1];
    const rightChild = tree[currentNode.key * 2 + 2];

    // Check if the left child exists and is valid (not null)
    if (leftChild != null) {
      queue.push(leftChild);
    }
    // Check if the right child exists and is valid (not null)
    if (rightChild != null) {
      queue.push(rightChild);
    }
  }
};
