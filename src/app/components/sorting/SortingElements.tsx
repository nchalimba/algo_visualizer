import React from "react";
import Bar from "./Bar";
import { SortingElement } from "@/app/types";

type Props = {
  elements: SortingElement[];
};

const SortingElements: React.FC<Props> = ({ elements }) => {
  return (
    // hight: 100vh - navbar height but navbar height changes with screen size
    <div className="relative w-full h-full">
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
