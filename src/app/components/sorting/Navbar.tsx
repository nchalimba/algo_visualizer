import React, { useState } from "react";

import { SortingSettings, SortType } from "../../types";

import Slider from "../common/Slider";
import Button from "../common/Button";
import sort from "@/utils/sorting/sort";
import { animate } from "@/utils/sorting/visualize";
import Select from "../common/Select";
import { FaBolt, FaPlay } from "react-icons/fa";

type Props = {
  settings: SortingSettings;
  setSettings: React.Dispatch<React.SetStateAction<SortingSettings>>;
  setForceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  elements: number[];
  setElements: React.Dispatch<React.SetStateAction<number[]>>;
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
  const [disableButtons, setDisableButtons] = useState(false);

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
    setDisableButtons(true);
    const { sortedArray, swapArray } = sort(
      settings.algoType as SortType,
      elements
    );

    animate({
      sortedArray,
      swapArray,
      setDisableButtons,
      setElements,
      delay: settings.delay,
      isMerge: settings.algoType === "merge_sort",
    });
  };

  const handleGenerateNew = () => {
    setForceUpdate((prev) => !prev);
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex flex-col lg:flex-row lg:gap-4 items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Button onClick={handleGenerateNew} disabled={disableButtons}>
          <div className="flex items-center gap-2">
            <FaBolt className="text-xs" />
            <span className="hidden md:inline">New</span>
          </div>
        </Button>
        <div className="hidden md:inline">
          <Select
            options={algoOptions}
            value={algoOptions.find(
              (option) => option.value === settings.algoType
            )}
            placeholder="Select algo..."
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, algoType: value.value }))
            }
          />
        </div>
        <Button onClick={handleSort} disabled={disableButtons}>
          <div className="flex items-center gap-2">
            <FaPlay className="text-xs" />
            <span className="hidden md:inline">Start</span>
          </div>
        </Button>
      </div>

      <div className="mt-4 md:hidden">
        <Select
          options={algoOptions}
          value={algoOptions.find(
            (option) => option.value === settings.algoType
          )}
          placeholder="Select algo..."
          onChange={(value) =>
            setSettings((prev) => ({ ...prev, algoType: value.value }))
          }
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
