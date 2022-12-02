import React from 'react';
import styles from '../../styles/treeTraversal/Node.module.css';

const Node = ({ tree, index }) => {
  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  const hasRightChild = rightChildIndex < tree.length;
  const hasLeftChild = leftChildIndex < tree.length;
  return (
    <div className={styles.container}>
      <div className={styles.parent} id={`node_${index}`}>
        <p>{index}</p>
      </div>
      <div className={styles.children}>
        {hasLeftChild && <Node tree={tree} index={leftChildIndex}></Node>}
        {hasRightChild && <Node tree={tree} index={rightChildIndex} />}
      </div>
    </div>
  );
};

export default Node;
