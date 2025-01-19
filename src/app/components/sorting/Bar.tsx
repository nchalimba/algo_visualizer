import { SortingElement } from "@/app/types";
import clsx from "clsx";
import React from "react";

type Props = {
  bar: SortingElement;
  index: number;
  amountBars: number;
};

const Bar = ({ bar, index, amountBars }: Props) => {
  const barClasses = clsx("rounded-sm rounded-t-none", {
    "bg-highlight": bar.isActive,
    "bg-retroDark-accent": !bar.isActive,
  });
  return (
    <div
      key={index}
      id={`bar-${index}`}
      className={barClasses}
      style={{
        height: `${bar.value}px`, // Height of the bar, grows downwards
        width: `${100 / amountBars}%`, // Ensure bars are evenly spaced with no gap
      }}
    />
  );
};

export default Bar;
