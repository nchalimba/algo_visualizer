"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/pathfinding/Navbar";
import Grid from "../components/pathfinding/Grid";
import { PathFindingSettings, PathNode } from "../types";
import { generateMaze } from "@/utils/pathfinding/generateMaze";
import { visualizePath } from "@/utils/pathfinding/visualize";
import { bfs } from "@/utils/pathfinding/bfs";
import { dijkstras } from "@/utils/pathfinding/dijkstras";
import { astar } from "@/utils/pathfinding/astar";

const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;
const DEFAULT_DELAY = 10;

const algoMap = {
  bfs: bfs,
  dijkstra: dijkstras,
  astar: astar,
};

const initializeGrid = (
  randomizeWalls: boolean,
  rows: number,
  cols: number
) => {
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => ({
      x: i,
      y: j,
      isStart: i === 0 && j === 0,
      isEnd: i === rows - 1 && j === cols - 1,
      isWall:
        randomizeWalls &&
        !(i === 0 && j === 0) &&
        !(i === rows - 1 && j === cols - 1) &&
        Math.random() < 0.25,
      weight: 1,
    }))
  );
};

const PathfindingPage = () => {
  const [settings, setSettings] = useState<PathFindingSettings>({
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    delay: DEFAULT_DELAY,
    algo: null,
    randomizeWalls: false,
    toggleNew: false,
  });

  const [grid, setGrid] = useState<PathNode[][]>(
    initializeGrid(false, DEFAULT_ROWS, DEFAULT_COLS)
  );

  const [disableControls, setDisableControls] = useState(false);
  const [startNodePosition, setStartNodePosition] = useState({ x: 0, y: 0 });
  const [endNodePosition, setEndNodePosition] = useState({
    x: DEFAULT_ROWS - 1,
    y: DEFAULT_COLS - 1,
  });

  const [isVisualizationActive, setIsVisualizationActive] = useState(false);

  // Reinitialize grid on settings change
  useEffect(() => {
    const newGrid = initializeGrid(
      settings.randomizeWalls,
      settings.rows,
      settings.cols
    );
    setIsVisualizationActive(false);
    setStartNodePosition({ x: 0, y: 0 });
    setEndNodePosition({
      x: settings.rows - 1,
      y: settings.cols - 1,
    });
    setGrid(newGrid);
  }, [
    settings.randomizeWalls,
    settings.rows,
    settings.cols,
    settings.toggleNew,
  ]);

  const onGenerateMaze = () => {
    setIsVisualizationActive(false);
    const newGrid = generateMaze(grid, startNodePosition, endNodePosition);
    setGrid(newGrid);
  };

  const updateNode = (x: number, y: number, type: "visited" | "path") => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const node = { ...newGrid[x][y] };
      if (type === "visited") node.isVisited = true;
      else if (type === "path") node.isPath = true;
      newGrid[x][y] = node;
      return newGrid;
    });
  };

  const removeVisitedAndPath = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          isVisited: false,
          isPath: false,
        }))
      );
      return newGrid;
    });
  };

  const visualizePathForCurrentState = async () => {
    if (!settings.algo) return;
    const algo = algoMap[settings.algo];
    const startNode = grid[startNodePosition.x][startNodePosition.y];
    const endNode = grid[endNodePosition.x][endNodePosition.y];
    const { path, visitedNodes } = algo(startNode, endNode, grid);

    // Visualize path without delay
    await visualizePath({
      path,
      visitedNodes,
      startNode,
      endNode,
      updateNode,
      delay: 0,
    });
  };

  // Re-visualize path on start/end node movement only if a visualization was started
  useEffect(() => {
    if (!isVisualizationActive) return; // Do nothing if no visualization has been started
    removeVisitedAndPath(); // Clear previous visuals
    visualizePathForCurrentState();
  }, [startNodePosition, endNodePosition]);

  const onStart = async () => {
    if (!settings.algo) return;
    const algo = algoMap[settings.algo];
    removeVisitedAndPath();
    const startNode = grid[startNodePosition.x][startNodePosition.y];
    const endNode = grid[endNodePosition.x][endNodePosition.y];
    const { path, visitedNodes } = algo(startNode, endNode, grid);

    setDisableControls(true);
    setIsVisualizationActive(true); // Mark visualization as started
    await visualizePath({
      path,
      visitedNodes,
      startNode,
      endNode,
      updateNode,
      delay: settings.delay,
    });
    setDisableControls(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-200">
      <Navbar
        onGenerateMaze={onGenerateMaze}
        onStart={onStart}
        settings={settings}
        setSettings={setSettings}
        disableControls={disableControls}
      />
      <div className="mt-6">
        <Grid
          grid={grid}
          setGrid={setGrid}
          disableControls={disableControls}
          startNodePosition={startNodePosition}
          endNodePosition={endNodePosition}
          setStartNodePosition={setStartNodePosition}
          setEndNodePosition={setEndNodePosition}
        />
      </div>
    </div>
  );
};

export default PathfindingPage;
