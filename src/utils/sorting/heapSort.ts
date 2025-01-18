import { SortingElement } from "@/app/types";
import swap from "./swap";

export const heapSort = (
  elements: SortingElement[],
  swapArray: [number, number][]
): void => {
  const lastParent = Math.floor(elements.length / 2);
  for (let i = lastParent; i >= 0; i--) {
    heapify(elements, swapArray, i);
  }

  for (let i = elements.length - 1; i > 0; i--) {
    swapArray.push([0, i]);
    swap(elements, 0, i);
    heapify(elements, swapArray, 0, i);
  }
};

const heapify = (
  elements: SortingElement[],
  swapArray: [number, number][],
  index: number,
  length: number = elements.length
): void => {
  let largest = index;
  const left = index * 2 + 1;
  const right = index * 2 + 2;

  if (left < length && elements[left].value > elements[largest].value) {
    largest = left;
  }
  if (right < length && elements[right].value > elements[largest].value) {
    largest = right;
  }

  if (largest !== index) {
    swapArray.push([index, largest]);
    swap(elements, index, largest);
    heapify(elements, swapArray, largest, length);
  }
};
