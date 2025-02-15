import { SortingElement } from "@/app/types";
import swap from "./swap";

export const quickSort = (
  elements: SortingElement[],
  swapArray: [number, number][],
  low: number = 0,
  high: number = elements.length - 1
): void => {
  if (low >= high) return;

  const partitioningIndex = partition(elements, swapArray, low, high);
  quickSort(elements, swapArray, low, partitioningIndex - 1);
  quickSort(elements, swapArray, partitioningIndex + 1, high);
};

const partition = (
  elements: SortingElement[],
  swapArray: [number, number][],
  low: number,
  high: number
): number => {
  const pivot = elements[high].value;

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (elements[j].value < pivot) {
      i++;
      swapArray.push([i, j]);
      swap(elements, i, j);
    }
  }
  swapArray.push([i + 1, high]);
  swap(elements, i + 1, high);
  return i + 1;
};
