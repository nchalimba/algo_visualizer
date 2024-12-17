import { insertionSort } from "./insertionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { heapSort } from "./heapSort";

export type SortType =
  | "insertion_sort"
  | "merge_sort"
  | "quick_sort"
  | "heap_sort";

interface SortResult {
  sortedArray: number[];
  swapArray: [number, number][];
}

const sortMap: Record<
  SortType,
  (elements: number[], swapArray: [number, number][]) => void
> = {
  insertion_sort: insertionSort,
  merge_sort: mergeSort,
  quick_sort: quickSort,
  heap_sort: heapSort,
};

const sort = (type: SortType, elements: number[]): SortResult => {
  const sortedArray = [...elements];
  const swapArray: [number, number][] = [];
  sortMap[type](sortedArray, swapArray);
  return { sortedArray, swapArray };
};

export default sort;
