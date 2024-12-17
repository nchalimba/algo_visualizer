const swap = (elements: number[], index1: number, index2: number): void => {
  const tmp = elements[index1];
  elements[index1] = elements[index2];
  elements[index2] = tmp;
};

export default swap;
