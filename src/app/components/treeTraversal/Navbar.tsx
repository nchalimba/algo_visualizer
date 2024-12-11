import React, { useState } from "react";

import { TreeTraversalSettings } from "../../types";
import Button from "../common/Button";
import Select from "../common/Select";
import Slider from "../common/Slider";
import { FaPlay } from "react-icons/fa";

interface NavbarProps {
  settings: TreeTraversalSettings;
  setSettings: React.Dispatch<React.SetStateAction<TreeTraversalSettings>>;
  setTree: React.Dispatch<React.SetStateAction<number[]>>;
  setVisitedArray: React.Dispatch<React.SetStateAction<number[]>>;
}

const algoOptions = [
  { label: "DFS", value: "DFS" },
  { label: "BFS", value: "BFS" },
];

const Navbar: React.FC<NavbarProps> = ({
  settings,
  setSettings,
  setTree,
  setVisitedArray,
}) => {
  const [disableButtons, setDisableButtons] = useState(false);

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, delay: Number(event.target.value) }));
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value);
    setSettings((prev) => ({ ...prev, length: newLength }));
    setTree(Array.from({ length: newLength }, (_, index) => index));
  };

  const handleAlgoChange = (value: { label: string; value: string }) => {
    setSettings((prev) => ({ ...prev, algo: value.value }));
  };

  const handleStart = () => {
    setDisableButtons(true);
    setVisitedArray([]); // Reset visited nodes array for new traversal
    // Add logic for traversal based on selected algorithm (DFS/BFS)
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex flex-col lg:flex-row items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        {/* Select Algorithm */}
        <Select
          options={algoOptions}
          value={algoOptions.find((option) => option.value === settings.algo)}
          placeholder="Select algo..."
          onChange={handleAlgoChange}
        />

        {/* Start Button */}
        <Button onClick={handleStart} disabled={disableButtons}>
          <div className="flex items-center gap-2">
            <FaPlay className="text-xs" />
            Start
          </div>
        </Button>
      </div>

      <div className="flex gap-8 mt-4 lg:mt-0">
        {/* Length Slider */}
        <Slider
          label={`Length: ${settings.length}`}
          value={settings.length}
          onChange={handleLengthChange}
          min={3}
        />

        {/* Delay Slider */}
        <Slider
          label={`Delay: ${settings.delay} ms`}
          value={settings.delay}
          onChange={handleDelayChange}
          min={1}
        />
      </div>
    </nav>
  );
};

export default Navbar;
