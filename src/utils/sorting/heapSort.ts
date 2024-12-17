import swap from "./swap";

export const heapSort = (
  elements: number[],
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
  elements: number[],
  swapArray: [number, number][],
  index: number,
  length: number = elements.length
): void => {
  let largest = index;
  const left = index * 2 + 1;
  const right = index * 2 + 2;

  if (left < length && elements[left] > elements[largest]) {
    largest = left;
  }
  if (right < length && elements[right] > elements[largest]) {
    largest = right;
  }

  if (largest !== index) {
    swapArray.push([index, largest]);
    swap(elements, index, largest);
    heapify(elements, swapArray, largest, length);
  }
};
