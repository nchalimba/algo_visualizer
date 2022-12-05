import React, { useEffect, useState } from 'react';
import styles from '../../styles/pathfinding/Navbar.module.css';
import nodeStyles from '../../styles/pathfinding/Node.module.css';
import { astar } from '../../utils/pathfinding/astar';
import { bfs } from '../../utils/pathfinding/bfs';
import { visualizePath } from '../../utils/pathfinding/visualize';
import { dijkstras } from '../../utils/pathfinding/dijkstras';
import Select from '../Select';

export class Node {
  constructor(i, j, random = false, isStart = false, isEnd = false) {
    this.x = i;
    this.y = j;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.isWall = !random ? false : Math.random() < 0.3;
    this.weight = 1;
  }
}

const algoOptions = [
  { label: 'BFS', value: 'bfs' },
  { label: "Dijkstra's", value: 'dijkstras' },
  { label: 'A* Search', value: 'astar' },
];

const Navbar = ({
  grid,
  setGrid,
  disableControls,
  setDisableControls,
  startNodePosition,
  endNodePosition,
  setStartNodePosition,
  setEndNodePosition,
}) => {
  const [random, setRandom] = useState(false);
  const [amountCols, setAmountCols] = useState(10);
  const [amountRows, setAmountRows] = useState(10);
  const [delay, setDelay] = useState(5);
  const [algoType, setAlgoType] = useState();
  const [isInitialStart, setIsInitialStart] = useState(true);

  const initializeGrid = () => {
    const newGrid = new Array(amountRows);
    for (let i = 0; i < amountRows; i++) {
      newGrid[i] = new Array(amountCols);
    }

    createNodes(newGrid);
    setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
    setIsInitialStart(true);
  }, [random, amountRows, amountCols]);

  useEffect(() => {
    if (!isInitialStart) handleStart(true);
  }, [startNodePosition, endNodePosition]);

  useEffect(() => {
    unstyleGrid();
  }, [grid]);

  const createNodes = (grid) => {
    let newStartNodePosition = {
      x: Math.min(startNodePosition.x, amountRows - 1),
      y: Math.min(startNodePosition.y, amountCols - 1),
    };

    let newEndNodePosition = {
      x: Math.min(endNodePosition.x, amountRows - 1),
      y: Math.min(endNodePosition.y, amountCols - 1),
    };
    if (compareNodeObjects(newStartNodePosition, newEndNodePosition)) {
      //push start node right
      newStartNodePosition.y = newStartNodePosition.y - 1;
    }

    if (!compareNodeObjects(startNodePosition, newStartNodePosition))
      setStartNodePosition(newStartNodePosition);

    if (!compareNodeObjects(endNodePosition, newEndNodePosition))
      setEndNodePosition(newEndNodePosition);

    for (let i = 0; i < amountRows; i++) {
      for (let j = 0; j < amountCols; j++) {
        const isStart =
          i === newStartNodePosition.x && j == newStartNodePosition.y;
        const isEnd = i === newEndNodePosition.x && j == newEndNodePosition.y;
        const setRandomWall = random && !isStart && !isEnd;
        grid[i][j] = new Node(i, j, setRandomWall, isStart, isEnd);
        unstyleNode(i, j);
      }
    }
  };

  const compareNodeObjects = (node1, node2) => {
    return node1.x === node2.x && node1.y === node2.y;
  };

  const unstyleGrid = () => {
    for (let i = 0; i < amountRows; i++) {
      for (let j = 0; j < amountCols; j++) {
        unstyleNode(i, j);
      }
    }
  };

  const unstyleNode = (row, col) => {
    document
      .getElementById(`node-${row}-${col}`)
      ?.classList.remove(nodeStyles.nodeVisited, nodeStyles.nodeShortestPath);
  };

  const algoMap = {
    bfs: bfs,
    astar: astar,
    dijkstras: dijkstras,
  };

  const handleStart = (disableAnimation = false) => {
    if (!algoType) return;
    setDisableControls(true);
    unstyleGrid();
    const startNode = grid[startNodePosition.x][startNodePosition.y];
    const endNode = grid[endNodePosition.x][endNodePosition.y];

    const { path, visitedNodes } = algoMap[algoType](startNode, endNode, grid);
    const visualizeInput = {
      path,
      visitedNodes,
      startNode,
      endNode,
      setDisableControls,
      delay: disableAnimation ? 0 : delay,
      nodeStyles,
    };
    visualizePath(visualizeInput);
    setIsInitialStart(false);
  };

  return (
    <nav className="navbar">
      <div className={styles.buttons}>
        <button
          disabled={disableControls}
          className="btn btn-primary"
          onClick={() => {
            setRandom(false);
            setIsInitialStart(true);
            initializeGrid();
          }}
        >
          Clear
        </button>
        <button
          disabled={disableControls}
          className="btn btn-primary"
          onClick={() => {
            setRandom(true);
            initializeGrid();
          }}
        >
          Random
        </button>

        <Select
          options={algoOptions}
          value={algoOptions.find((option) => option.value === algoType)}
          placeholder="Select algo..."
          onChange={(value) => setAlgoType(value.value)}
        />

        <button
          className="btn btn-primary"
          disabled={disableControls}
          onClick={() => handleStart()}
        >
          Start
        </button>
      </div>
      <div className={styles.sliders}>
        <div className={styles.slider}>
          <label htmlFor="rows">Rows: {amountRows}</label>
          <input
            disabled={disableControls}
            type="range"
            name="rows"
            id="rows"
            defaultValue={10}
            min={2}
            max={15}
            onChange={(e) => {
              setAmountRows(e.target.value);
            }}
          />
        </div>
        <div className={styles.slider}>
          <label htmlFor="cols">Cols: {amountCols}</label>
          <input
            disabled={disableControls}
            type="range"
            name="cols"
            id="cols"
            defaultValue={10}
            min={2}
            max={15}
            onChange={(e) => {
              setAmountCols(e.target.value);
            }}
          />
        </div>
        <div className={styles.slider}>
          <label htmlFor="delay">Delay: {delay} ms</label>
          <input
            disabled={disableControls}
            type="range"
            name="delay"
            id="delay"
            min={1}
            defaultValue={5}
            onChange={(e) => {
              setDelay(e.target.value);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
