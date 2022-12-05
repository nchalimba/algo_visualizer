import React, { useState } from 'react';
import NodeComponent from './Node';
import { Node } from './Navbar';
import styles from '../../styles/pathfinding/Grid.module.css';
import { MdPanTool, MdEdit, MdEditOff } from 'react-icons/md';

const Grid = ({
  grid,
  setGrid,
  disableControls,
  startNodePosition,
  endNodePosition,
  setStartNodePosition,
  setEndNodePosition,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mode, setMode] = useState('move');
  const [selectedNode, setSelectedNode] = useState(null);
  //CREATES Grid

  const handlePointerOver = (row, col) => {
    if (disableControls || !isMouseDown) return;

    const currentNode = grid[row][col];
    if (currentNode.isStart || currentNode.isEnd) return;
    if (mode === 'move') {
      if (currentNode.isWall) return;
      if (selectedNode === 'start') {
        setNode(startNodePosition.x, startNodePosition.y);
        setNode(row, col, selectedNode);
        setStartNodePosition({ x: row, y: col });
        //setNode(row, col, )
      } else if (selectedNode === 'end') {
        setNode(endNodePosition.x, endNodePosition.y);
        setNode(row, col, selectedNode);
        setEndNodePosition({ x: row, y: col });
      }
    } else if (mode === 'paint') {
      if (!currentNode.isWall) setNode(row, col, mode);
    } else {
      if (currentNode.isWall) setNode(row, col);
    }
  };

  const handlePointerDown = (row, col) => {
    if (disableControls) return;

    const currentNode = grid[row][col];
    if (mode === 'move') {
      if (currentNode.isStart) setSelectedNode('start');
      if (currentNode.isEnd) setSelectedNode('end');
    } else if (mode === 'paint') {
      if (!currentNode.isStart && !currentNode.isEnd) setNode(row, col, mode);
    } else {
      if (currentNode.isWall) setNode(row, col);
    }
  };

  const setNode = (row, col, type = 'blank') => {
    setGrid((prev) => {
      return prev.map((currentRow, rowIndex) => {
        return currentRow.map((node, columnIndex) => {
          if (rowIndex !== row || columnIndex !== col) return node;

          const newNode = new Node(node.x, node.y);
          newNode.isStart = false;
          newNode.isEnd = false;
          newNode.isWall = false;
          if (type === 'paint') {
            newNode.isWall = !node.isStart && !node.isEnd;
          } else if (type === 'start') {
            newNode.isStart = true;
          } else if (type === 'end') {
            newNode.isEnd = true;
          }
          return newNode;
        });
      });
    });
  };

  //set mode to default
  const toggleMode = (newMode) => {
    if (newMode === mode) {
      setMode('move');
    } else {
      setMode(newMode);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button
          className={`btn icon-btn ${mode === 'move' && 'btn-active'}`}
          onClick={() => toggleMode('move')}
        >
          <MdPanTool size="1.5rem" />
        </button>
        <button
          className={`btn icon-btn ${mode === 'paint' && 'btn-active'}`}
          onClick={() => toggleMode('paint')}
        >
          <MdEdit size="1.5rem" />
        </button>
        <button
          className={`btn icon-btn ${mode === 'erase' && 'btn-active'}`}
          onClick={() => toggleMode('erase')}
        >
          <MdEditOff size="1.5rem" />
        </button>
      </div>
      <div
        onPointerDown={(e) => setIsMouseDown(true)}
        onPointerUp={(e) => {
          setIsMouseDown(false);
          setSelectedNode(null);
        }}
        onPointerLeave={(e) => {
          setIsMouseDown(false);
          setSelectedNode(null);
        }}
      >
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={styles.rowWrapper}>
              {row.map((col, colIndex) => {
                const { isStart, isEnd, isWall } = col;
                return (
                  <NodeComponent
                    key={colIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    row={rowIndex}
                    col={colIndex}
                    isWall={isWall}
                    handlePointerDown={handlePointerDown}
                    handlePointerOver={handlePointerOver}
                    isMoveMode={mode === 'move'}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
