import swap from "./swap";

export const insertionSort = (
  elements: number[],
  swapArray: [number, number][]
): void => {
  for (let i = 1; i < elements.length; i++) {
    let j = i;
    while (j > 0 && elements[j] < elements[j - 1]) {
      swapArray.push([j - 1, j]);
      swap(elements, j - 1, j);
      j--;
    }
  }
};
