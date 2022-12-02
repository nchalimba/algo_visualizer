import swap from './swap';

export const insertionSort = (elements, swapArray) => {
  for (let i = 1; i < elements.length; i++) {
    let j = i;
    while (j > 0 && elements[j] < elements[j - 1]) {
      swapArray.push([j - 1, j]);
      swap(elements, j - 1, j);
      j--;
    }
  }
};
