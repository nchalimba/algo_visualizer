import React, { useState } from "react";

import {
  SelectOption,
  SortingElement,
  SortingSettings,
  SortType,
} from "../../types";

import Slider from "../common/Slider";
import Button from "../common/Button";
import sort from "@/utils/sorting/sort";
import { animate } from "@/utils/sorting/visualize";
import { FaBolt, FaPlay } from "react-icons/fa";
import Select from "../common/Select";

type Props = {
  settings: SortingSettings;
  setSettings: React.Dispatch<React.SetStateAction<SortingSettings>>;
  setForceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  elements: SortingElement[];
  setElements: React.Dispatch<React.SetStateAction<SortingElement[]>>;
};

const algoOptions = [
  { label: "Merge Sort", value: "merge_sort" },
  { label: "Insertion Sort", value: "insertion_sort" },
  { label: "Quick Sort", value: "quick_sort" },
  { label: "Heap Sort", value: "heap_sort" },
];

const Navbar: React.FC<Props> = ({
  settings,
  setSettings,
  setForceUpdate,
  elements,
  setElements,
}) => {
  const [loading, setLoading] = useState(false);
  const [disableButtons, setDisableButtons] = useState(true);

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, delay: Number(event.target.value) }));
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      length: Number(event.target.value),
    }));
  };

  const handleSort = () => {
    if (!settings.algoType) return;
    setLoading(true);
    const { swapArray } = sort(settings.algoType as SortType, elements);

    animate({
      swapArray,
      setDisableButtons: setLoading,
      setElements,
      delay: settings.delay,
      isMerge: settings.algoType === "merge_sort",
    });
  };

  const handleAlgoChange = (value: SelectOption<string>) => {
    setSettings((prev) => ({ ...prev, algoType: value.value }));
    setDisableButtons(false);
  };

  const handleGenerateNew = () => {
    setForceUpdate((prev) => !prev);
  };

  return (
    <nav className="p-4 text-white flex flex-col lg:flex-row lg:gap-4 items-center justify-between w-full border-b border-retroDark-400">
      <div className="flex items-center space-x-4">
        <Button
          onClick={handleGenerateNew}
          disabled={disableButtons || loading}
        >
          <div className="flex items-center gap-2">
            <FaBolt className="text-xs" />
            <span className="hidden md:inline">New</span>
          </div>
        </Button>
        <div className="hidden md:inline">
          <Select
            className="md:w-40 lg:w-40"
            options={algoOptions}
            disabled={loading}
            value={
              algoOptions.find(
                (option) => option.value === settings.algoType
              ) || null
            }
            placeholder="Select Algo..."
            onChange={(value) => handleAlgoChange(value)}
          />
        </div>
        <Button onClick={handleSort} disabled={disableButtons || loading}>
          <div className="flex items-center gap-2">
            <FaPlay className="text-xs" />
            <span className="hidden md:inline">Start</span>
          </div>
        </Button>
      </div>

      <div className="mt-4 md:hidden">
        <Select
          className="w-40"
          options={algoOptions}
          disabled={loading}
          value={
            algoOptions.find((option) => option.value === settings.algoType) ||
            null
          }
          placeholder="Select algo..."
          onChange={(value) => handleAlgoChange(value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-4 lg:mt-0">
        <Slider
          label={`Length: ${settings.length}`}
          value={settings.length}
          onChange={handleLengthChange}
          min={5}
          max={500}
        />
        <Slider
          label={`Delay: ${settings.delay * 2} ms`}
          value={settings.delay}
          onChange={handleDelayChange}
          min={1}
          max={100}
        />
      </div>
    </nav>
  );
};

export default Navbar;
