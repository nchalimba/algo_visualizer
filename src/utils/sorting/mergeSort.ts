export const mergeSort = (
  elements: number[],
  swapArray: [number, number][],
  helperArray: number[] = [],
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
  elements: number[],
  helperArray: number[],
  swapArray: [number, number][],
  low: number,
  mid: number,
  high: number
): void => {
  for (let i = low; i <= high; i++) {
    helperArray[i] = elements[i];
  }

  let firstPointer = low;
  let secondPointer = mid + 1;
  for (let i = low; i <= high; i++) {
    if (firstPointer > mid) {
      swapArray.push([helperArray[secondPointer], i]);
      elements[i] = helperArray[secondPointer++];
    } else if (secondPointer > high) {
      swapArray.push([helperArray[firstPointer], i]);
      elements[i] = helperArray[firstPointer++];
    } else if (helperArray[firstPointer] <= helperArray[secondPointer]) {
      swapArray.push([helperArray[firstPointer], i]);
      elements[i] = helperArray[firstPointer++];
    } else {
      swapArray.push([helperArray[secondPointer], i]);
      elements[i] = helperArray[secondPointer++];
    }
  }
};
