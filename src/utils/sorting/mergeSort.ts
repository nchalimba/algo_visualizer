import { SortingElement } from "@/app/types";

export const mergeSort = (
  elements: SortingElement[],
  swapArray: [number, number][],
  helperArray: SortingElement[] = [],
  low: number = 0,
  high: number = elements.length - 1
): void => {
  if (low >= high) {
    // Subarray of length 1 or 0
    return;
  }

  const mid = low + Math.floor((high - low) / 2);
  mergeSort(elements, swapArray, helperArray, low, mid);
  mergeSort(elements, swapArray, helperArray, mid + 1, high);
  merge(elements, helperArray, swapArray, low, mid, high);
};

const merge = (
  elements: SortingElement[],
  helperArray: SortingElement[],
  swapArray: [number, number][],
  low: number,
  mid: number,
  high: number
): void => {
  for (let i = low; i <= high; i++) {
    helperArray[i] = { ...elements[i] };
  }

  let firstPointer = low;
  let secondPointer = mid + 1;
  for (let i = low; i <= high; i++) {
    if (firstPointer > mid) {
      // Left partition exhausted
      swapArray.push([helperArray[secondPointer].value, i]);
      elements[i] = { ...helperArray[secondPointer++] };
    } else if (secondPointer > high) {
      // Right partition exhausted
      swapArray.push([helperArray[firstPointer].value, i]);
      elements[i] = { ...helperArray[firstPointer++] };
    } else if (
      helperArray[firstPointer].value <= helperArray[secondPointer].value
    ) {
      // Take from left partition
      swapArray.push([helperArray[firstPointer].value, i]);
      elements[i] = { ...helperArray[firstPointer++] };
    } else {
      // Take from right partition
      swapArray.push([helperArray[secondPointer].value, i]);
      elements[i] = { ...helperArray[secondPointer++] };
    }
  }
};
