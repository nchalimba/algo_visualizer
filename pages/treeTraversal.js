import React, { useState } from 'react';
import styles from '../styles/treeTraversal/TreeContainer.module.css';
import Navbar from '../components/treeTraversal/Navbar';
import VisitedArray from '../components/treeTraversal/VisitedArray';
import Node from '../components/treeTraversal/Node';

const TreeContainer = () => {
  const [tree, setTree] = useState([0]);
  const [visitedArray, setVisitedArray] = useState([]);

  return (
    <div className={styles.container}>
      <Navbar setTree={setTree} tree={tree} setVisitedArray={setVisitedArray} />
      <Node tree={tree} index={0} />
      <VisitedArray array={visitedArray} />
    </div>
  );
};

export default TreeContainer;
