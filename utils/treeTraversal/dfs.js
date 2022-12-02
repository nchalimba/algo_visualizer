export const dfs = (tree, visited, type, index = 0) => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  dfs(tree, visited, type, leftChildIndex);
  dfs(tree, visited, type, rightChildIndex);
  visited.push(index);
};

export const inorderDFS = (tree, visited, index = 0) => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  inorderDFS(tree, visited, leftChildIndex);
  visited.push(index);
  inorderDFS(tree, visited, rightChildIndex);
};
export const preorderDFS = (tree, visited, index = 0) => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  visited.push(index);
  preorderDFS(tree, visited, leftChildIndex);
  preorderDFS(tree, visited, rightChildIndex);
};
export const postorderDFS = (tree, visited, index = 0) => {
  if (tree[index] == null) return;

  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  postorderDFS(tree, visited, leftChildIndex);
  postorderDFS(tree, visited, rightChildIndex);
  visited.push(index);
};
