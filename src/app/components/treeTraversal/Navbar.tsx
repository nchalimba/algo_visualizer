import React, { useState } from "react";

import {
  SelectOption,
  TreeNode,
  TreeTraversalAlgo,
  TreeTraversalSettings,
} from "../../types";
import Button from "../common/Button";
import Slider from "../common/Slider";
import { FaPlay } from "react-icons/fa";
import {
  inorderDFS,
  postorderDFS,
  preorderDFS,
} from "@/utils/treeTraversal/dfs";
import { animateTree } from "@/utils/treeTraversal/visualize";
import { bfs } from "@/utils/treeTraversal/bfs";
import Select from "../common/Select";

type Props = {
  settings: TreeTraversalSettings;
  setSettings: React.Dispatch<React.SetStateAction<TreeTraversalSettings>>;
  setTree: React.Dispatch<React.SetStateAction<TreeNode[]>>;
  setVisitedArray: React.Dispatch<React.SetStateAction<number[]>>;
  tree: TreeNode[];
};
const algoOptions: SelectOption<TreeTraversalAlgo>[] = [
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

const Navbar: React.FC<Props> = ({
  settings,
  tree,
  setSettings,
  setTree,
  setVisitedArray,
}) => {
  const [loading, setLoading] = useState(false);
  const [disableButtons, setDisableButtons] = useState(true);

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, delay: Number(event.target.value) }));
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value);
    setSettings((prev) => ({ ...prev, length: newLength }));
    setTree(Array.from({ length: newLength }, (_, index) => ({ key: index })));
  };

  const handleAlgoChange = (value: {
    label: string;
    value: TreeTraversalAlgo;
  }) => {
    setSettings((prev) => ({ ...prev, algo: value.value }));
    setDisableButtons(false);
  };

  const updateNode = (index: number, isActive: boolean) => {
    setTree((prev) => {
      const newTree = prev.map((node) => ({ ...node }));
      newTree[index].isActive = isActive;
      return newTree;
    });
  };

  const handleStart = () => {
    if (!settings.algo) return;
    setLoading(true);
    const visited: number[] = [];
    treeTraversalMap[settings.algo](tree, visited, 0);
    animateTree({
      visited,
      updateNode,
      setVisitedArray,
      setDisableButtons: setLoading,
      delay: settings.delay,
    });
  };

  return (
    <nav className="p-4 text-white flex flex-col lg:flex-row lg:gap-4 items-center justify-between w-full border-b border-retroDark-400">
      <div className="flex items-center space-x-4">
        {/* Select Algorithm */}
        <Select
          options={algoOptions}
          className="w-40 lg:w-40"
          disabled={loading}
          value={
            algoOptions.find((option) => option.value === settings.algo) || null
          }
          placeholder="Select algo..."
          onChange={(value) => handleAlgoChange(value)}
        />

        <Button onClick={handleStart} disabled={disableButtons || loading}>
          <div className="flex items-center gap-2">
            <FaPlay className="text-xs" />
            <span className="hidden md:inline">Start</span>
          </div>
        </Button>
      </div>

      <div className="flex gap-8 mt-4 lg:mt-0">
        <Slider
          label={`Length: ${settings.length}`}
          value={settings.length}
          onChange={handleLengthChange}
          min={3}
          max={15}
        />
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
