import React, { useState } from 'react';
import Navbar from '../components/pathfinding/Navbar';
import Grid from '../components/pathfinding/Grid';

const PathfindingContainer = () => {
  const [grid, setGrid] = useState([]);
  const [disableControls, setDisableControls] = useState(false);
  const [startNodePosition, setStartNodePosition] = useState({ x: 0, y: 0 });
  const [endNodePosition, setEndNodePosition] = useState({ x: 9, y: 9 });

  return (
    <div>
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
