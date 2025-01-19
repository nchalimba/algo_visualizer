import React from "react";
import Bar from "./Bar";
import { SortingElement } from "@/app/types";

type Props = {
  elements: SortingElement[];
};

const SortingElements: React.FC<Props> = ({ elements }) => {
  return (
    <div className="relative w-full h-96 ">
      {/* Bars */}
      <div className="flex items-start w-full h-full">
        {elements.map((element, index) => (
          <Bar
            key={index}
            bar={element}
            index={index}
            amountBars={elements.length}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingElements;
