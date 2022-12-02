const swap = (elements, index1, index2) => {
  const tmp = elements[index1];
  elements[index1] = elements[index2];
  elements[index2] = tmp;
};

export default swap;
