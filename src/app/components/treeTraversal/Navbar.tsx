import React, { useState } from "react";

import { TreeTraversalAlgo, TreeTraversalSettings } from "../../types";
import Button from "../common/Button";
import Select, { Option } from "../common/Select";
import Slider from "../common/Slider";
import { FaPlay } from "react-icons/fa";
import {
  inorderDFS,
  postorderDFS,
  preorderDFS,
} from "@/utils/treeTraversal/dfs";
import { animateTree } from "@/utils/treeTraversal/visualize";
import { bfs } from "@/utils/treeTraversal/bfs";

interface NavbarProps {
  settings: TreeTraversalSettings;
  setSettings: React.Dispatch<React.SetStateAction<TreeTraversalSettings>>;
  setTree: React.Dispatch<React.SetStateAction<number[]>>;
  setVisitedArray: React.Dispatch<React.SetStateAction<number[]>>;
  tree: number[];
}
const algoOptions: Option<TreeTraversalAlgo>[] = [
  { label: "Inorder", value: "inorder" },
  { label: "Postorder", value: "postorder" },
  { label: "Preorder", value: "preorder" },
  { label: "Level Order", value: "levelorder" },
];

const treeTraversalMap = {
  inorder: inorderDFS,
  preorder: preorderDFS,
  postorder: postorderDFS,
  levelorder: bfs,
};

const Navbar: React.FC<NavbarProps> = ({
  settings,
  tree,
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

  const handleAlgoChange = (value: {
    label: string;
    value: TreeTraversalAlgo;
  }) => {
    setSettings((prev) => ({ ...prev, algo: value.value }));
  };

  const handleStart = () => {
    if (!settings.algo) return;
    setDisableButtons(true);
    const visited: number[] = [];
    treeTraversalMap[settings.algo](tree, visited, 0);
    animateTree({
      visited,
      setVisitedArray,
      setDisableButtons,
      delay: settings.delay,
    });
  };

  return (
    <nav className="p-4 bg-retroDark-200 text-white flex flex-col lg:flex-row lg:gap-4 items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        {/* Select Algorithm */}
        <Select
          options={algoOptions}
          value={algoOptions.find((option) => option.value === settings.algo)}
          placeholder="Select algo..."
          onChange={(value) => handleAlgoChange(value)}
        />

        {/* Start Button */}
        <Button onClick={handleStart} disabled={disableButtons}>
          <div className="flex items-center gap-2">
            <FaPlay className="text-xs" />
            <span className="hidden md:inline">Start</span>
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
          max={15}
        />

        {/* Delay Slider */}
        <Slider
          label={`Delay: ${settings.delay} ms`}
          value={settings.delay}
          onChange={handleDelayChange}
          min={1}
          max={1000}
        />
      </div>
    </nav>
  );
};

export default Navbar;
