import { TreeNode } from "@/app/types";

// Generic DFS traversal
export const dfs = (
  tree: TreeNode[],
  visited: number[],
  type: string,
  index = 0
): void => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  // DFS traversal based on type (in-order, pre-order, post-order)
  if (type === "preorder") {
    visited.push(index);
  }

  dfs(tree, visited, type, leftChildIndex);

  if (type === "inorder") {
    visited.push(index);
  }

  dfs(tree, visited, type, rightChildIndex);

  if (type === "postorder") {
    visited.push(index);
  }
};

// Inorder DFS traversal
export const inorderDFS = (
  tree: TreeNode[],
  visited: number[],
  index = 0
): void => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  inorderDFS(tree, visited, leftChildIndex);
  visited.push(index);
  inorderDFS(tree, visited, rightChildIndex);
};

// Preorder DFS traversal
export const preorderDFS = (
  tree: TreeNode[],
  visited: number[],
  index = 0
): void => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  visited.push(index);
  preorderDFS(tree, visited, leftChildIndex);
  preorderDFS(tree, visited, rightChildIndex);
};

// Postorder DFS traversal
export const postorderDFS = (
  tree: TreeNode[],
  visited: number[],
  index = 0
): void => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  postorderDFS(tree, visited, leftChildIndex);
  postorderDFS(tree, visited, rightChildIndex);
  visited.push(index);
};
