export const bfs = (tree, visited) => {
  const queue = [0];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visited.push(currentNode);
    const leftChild = currentNode * 2 + 1;
    const rightChild = currentNode * 2 + 2;
    if (tree[leftChild] != null) queue.push(leftChild);
    if (tree[rightChild] != null) queue.push(rightChild);
  }
};
