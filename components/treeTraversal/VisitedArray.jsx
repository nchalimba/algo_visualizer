import React from 'react';
import styles from '../../styles/treeTraversal/VisitedArray.module.css';

const VisitedArray = ({ array }) => {
  return <div className={styles.array}>{JSON.stringify(array)}</div>;
};

export default VisitedArray;
