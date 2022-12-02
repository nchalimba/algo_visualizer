import React from 'react';
import styles from '../../styles/pathfinding/Node.module.css';

const Node = ({
  isStart,
  isEnd,
  row,
  col,
  isWall,
  handlePointerDown,
  handlePointerOver,
  isMoveMode,
}) => {
  const classes = isStart
    ? `${styles.nodeStart} ${isMoveMode && styles.pointer}`
    : isWall
    ? styles.isWall
    : isEnd
    ? `${styles.nodeEnd} ${isMoveMode && styles.pointer}`
    : '';

  return (
    <div
      className={`${styles.node} ${classes}`}
      id={`node-${row}-${col}`}
      onPointerDown={() => handlePointerDown(row, col)}
      onPointerOver={() => handlePointerOver(row, col)}
    ></div>
  );
};

export default Node;
