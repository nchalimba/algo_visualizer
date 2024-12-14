// Components/Navbar.tsx
import React, { useState } from "react";
import Select, { Option } from "../common/Select";
import Slider from "../common/Slider";
import Button from "../common/Button";
import { PathFindingAlgo, PathFindingSettings } from "@/app/types";

interface NavbarProps {
  disableControls: boolean;
  setDisableControls: React.Dispatch<React.SetStateAction<boolean>>;
  settings: PathFindingSettings;
  setSettings: React.Dispatch<React.SetStateAction<PathFindingSettings>>;
  onGenerateMaze: () => void;
  onStart: () => void;
}

const algorithmOptions: Option<PathFindingAlgo>[] = [
  { label: "Breadth-First Search", value: "bfs" },
  { label: "Dijkstra's Algorithm", value: "dijkstra" },
  { label: "A* Search", value: "astar" },
];

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  setSettings,
  disableControls,
  setDisableControls,
  onGenerateMaze,
  onStart,
}) => {
  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, delay: Number(event.target.value) }));
  };

  const handleAlgoChange = (value: {
    label: string;
    value: PathFindingAlgo;
  }) => {
    setSettings((prev) => ({ ...prev, algo: value.value }));
  };

  const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, cols: Number(event.target.value) }));
  };

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, rows: Number(event.target.value) }));
  };

  const handleNew = (randomizeWalls: boolean) => {
    setSettings((prev) => ({
      ...prev,
      toggleNew: !prev.toggleNew,
      randomizeWalls,
    }));
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex flex-col justify-between xl:flex-row items-center gap-4 w-full">
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => {
            handleNew(false);
          }}
          disabled={disableControls}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            onGenerateMaze();
          }}
          disabled={disableControls}
        >
          Random
        </Button>
        <div className="flex-grow">
          <Select
            options={algorithmOptions}
            value={algorithmOptions.find(
              (option) => option.value === settings.algo
            )}
            onChange={handleAlgoChange}
            placeholder="Select Algorithm"
            disabled={disableControls}
          />
        </div>

        <Button onClick={onStart} disabled={disableControls || !settings.algo}>
          Start
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Slider
          label={`Rows: ${settings.rows}`}
          min={2}
          max={20}
          value={settings.rows}
          onChange={handleRowChange}
          disabled={disableControls}
        />
        <Slider
          label={`Cols: ${settings.cols}`}
          min={2}
          max={20}
          value={settings.cols}
          onChange={handleColChange}
          disabled={disableControls}
        />
        <Slider
          label={`Delay: ${settings.delay} ms`}
          min={1}
          max={500}
          value={settings.delay}
          onChange={handleDelayChange}
          disabled={disableControls}
        />
      </div>
    </nav>
  );
};
