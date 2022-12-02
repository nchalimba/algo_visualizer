import swap from './swap';

export const quickSort = (
  elements,
  swapArray,
  low = 0,
  high = elements.length - 1
) => {
  if (low >= high) return;

  const partitioningIndex = partition(elements, swapArray, low, high);
  quickSort(elements, swapArray, low, partitioningIndex - 1);
  quickSort(elements, swapArray, partitioningIndex + 1, high);
};

const partition = (elements, swapArray, low, high) => {
  const pivot = elements[high];

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (elements[j] < pivot) {
      i++;
      swapArray.push([i, j]);
      swap(elements, i, j);
    }
  }
  swapArray.push([i + 1, high]);
  swap(elements, i + 1, high);
  return i + 1;
};
