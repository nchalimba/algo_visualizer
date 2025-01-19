import React from "react";
import Button from "../common/Button";
import { FaHand, FaEraser, FaPen } from "react-icons/fa6";

type Props = {
  activeMode: "move" | "draw" | "erase" | null;
  setActiveMode: React.Dispatch<
    React.SetStateAction<"move" | "draw" | "erase" | null>
  >;
  disableControls: boolean;
};

const Toolbar: React.FC<Props> = ({
  activeMode,
  setActiveMode,
  disableControls,
}) => {
  return (
    <div className="flex justify-center gap-6">
      <Button
        active={activeMode === "move"}
        disabled={disableControls}
        onClick={() => setActiveMode("move")}
      >
        <FaHand />
      </Button>
      <Button
        active={activeMode === "draw"}
        disabled={disableControls}
        onClick={() => setActiveMode("draw")}
      >
        <FaPen />
      </Button>
      <Button
        active={activeMode === "erase"}
        disabled={disableControls}
        onClick={() => setActiveMode("erase")}
      >
        <FaEraser />
      </Button>
    </div>
  );
};

export default Toolbar;
