import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { heapSort } from "./heapSort";
import { SortingElement, SortResult, SortType } from "@/app/types";

const sortMap: Record<
  SortType,
  (elements: SortingElement[], swapArray: [number, number][]) => void
> = {
  insertion_sort: insertionSort,
  merge_sort: mergeSort,
  quick_sort: quickSort,
  heap_sort: heapSort,
};

const sort = (type: SortType, elements: SortingElement[]): SortResult => {
  const sortedArray = [...elements];
  const swapArray: [number, number][] = [];
  sortMap[type](sortedArray, swapArray);
  return { sortedArray, swapArray };
};

export default sort;
