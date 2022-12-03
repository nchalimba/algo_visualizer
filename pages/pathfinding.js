import React, { useState } from 'react';
import Navbar from '../components/pathfinding/Navbar';
import Grid from '../components/pathfinding/Grid';
import Head from 'next/head';

const PathfindingContainer = () => {
  const [grid, setGrid] = useState([]);
  const [disableControls, setDisableControls] = useState(false);
  const [startNodePosition, setStartNodePosition] = useState({ x: 0, y: 0 });
  const [endNodePosition, setEndNodePosition] = useState({ x: 9, y: 9 });

  return (
    <div>
      <Head>
        <title>Path Visualizer</title>
        <meta name="description" content="Visualizes pathfinding algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        grid={grid}
        setGrid={setGrid}
        disableControls={disableControls}
        setDisableControls={setDisableControls}
        startNodePosition={startNodePosition}
        endNodePosition={endNodePosition}
        setStartNodePosition={setStartNodePosition}
        setEndNodePosition={setEndNodePosition}
      />
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
  );
};

export default PathfindingContainer;
