export const animate = (
  sortedArray,
  swapArray,
  setDisableButtons,
  setElements,
  delay,
  isMerge = false
) => {
  if (isMerge) {
    animateMerge(sortedArray, swapArray, setDisableButtons, setElements, delay);
  } else {
    animateElements(
      sortedArray,
      swapArray,
      setDisableButtons,
      setElements,
      delay
    );
  }
};

const animateElements = (
  sortedArray,
  swapArray,
  setDisableButtons,
  setElements,
  delay
) => {
  if (swapArray.length === 0) {
    setDisableButtons(false);
    return;
  }
  swapArray.forEach(([first, second], index) => {
    const firstElement = document.getElementById(first);
    const secondElement = document.getElementById(second);
    if (!firstElement || !secondElement) return;
    setTimeout(() => {
      firstElement.style.backgroundColor = 'teal';
      secondElement.style.backgroundColor = 'teal';
      const firstHeight = firstElement.style.height;
      firstElement.style.height = secondElement.style.height;
      secondElement.style.height = firstHeight;

      setTimeout(() => {
        firstElement.style.backgroundColor = '#3d3a4b';
        secondElement.style.backgroundColor = '#3d3a4b';
        if (index === swapArray.length - 1) {
          setElements(sortedArray);
          setDisableButtons(false);
        }
      }, delay * 2);
    }, delay * index * 2);
  });
};

const animateMerge = (
  sortedArray,
  swapArray,
  setDisableButtons,
  setElements,
  delay
) => {
  swapArray.forEach(([newHeight, myIndex], index) => {
    const element = document.getElementById(myIndex);
    if (!element) return;
    setTimeout(() => {
      element.style.backgroundColor = 'teal';
      element.style.height = `${newHeight}px`;
      setTimeout(() => {
        element.style.backgroundColor = '#3d3a4b';
        if (index === swapArray.length - 1) {
          setElements(sortedArray);
          setDisableButtons(false);
        }
      }, delay * 3);
    }, delay * index * 3);
  });
};
