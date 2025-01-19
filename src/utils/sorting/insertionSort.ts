import { SortingElement } from "@/app/types";
import swap from "./swap";

export const insertionSort = (
  elements: SortingElement[],
  swapArray: [number, number][]
): void => {
  for (let i = 1; i < elements.length; i++) {
    let j = i;
    while (j > 0 && elements[j].value < elements[j - 1].value) {
      swapArray.push([j - 1, j]);
      swap(elements, j - 1, j);
      j--;
    }
  }
};
