import React, { useState } from 'react';
import styles from '../styles/treeTraversal/TreeContainer.module.css';
import Navbar from '../components/treeTraversal/Navbar';
import VisitedArray from '../components/treeTraversal/VisitedArray';
import Node from '../components/treeTraversal/Node';
import Head from 'next/head';

const TreeContainer = () => {
  const [tree, setTree] = useState([0]);
  const [visitedArray, setVisitedArray] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tree Traversal Visualizer</title>
        <meta
          name="description"
          content="Visualizes tree traversal algorithms"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar setTree={setTree} tree={tree} setVisitedArray={setVisitedArray} />
      <Node tree={tree} index={0} />
      <VisitedArray array={visitedArray} />
    </div>
  );
};

export default TreeContainer;
