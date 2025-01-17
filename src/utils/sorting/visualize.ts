type Props = {
  sortedArray: number[];
  swapArray: [number, number][];
  setDisableButtons: (disable: boolean) => void;
  setElements: (elements: number[]) => void;
  delay: number;
  isMerge?: boolean;
};

export const animate = ({
  sortedArray,
  swapArray,
  setDisableButtons,
  setElements,
  delay,
  isMerge = false,
}: Props) => {
  if (isMerge) {
    animateMerge({
      sortedArray,
      swapArray,
      setDisableButtons,
      setElements,
      delay,
    });
  } else {
    animateElements({
      sortedArray,
      swapArray,
      setDisableButtons,
      setElements,
      delay,
    });
  }
};

const animateElements = (
  {
    sortedArray,
    swapArray,
    setDisableButtons,
    setElements,
    delay,
  }: Omit<Props, "isMerge"> // props without isMerge
) => {
  if (swapArray.length === 0) {
    setDisableButtons(false);
    return;
  }

  swapArray.forEach(([first, second], index) => {
    const firstElement = document.getElementById(`bar-${first}`);
    const secondElement = document.getElementById(`bar-${second}`);
    if (!firstElement || !secondElement) return;

    setTimeout(() => {
      // Highlight bars being swapped
      firstElement.classList.remove("bg-retroDark-accent");
      secondElement.classList.remove("bg-retroDark-accent");
      firstElement.classList.add("bg-highlight");
      secondElement.classList.add("bg-highlight");

      // Swap heights
      const firstHeight = firstElement.style.height;
      firstElement.style.height = secondElement.style.height;
      secondElement.style.height = firstHeight;

      setTimeout(() => {
        // Reset to default colors after swap
        firstElement.classList.remove("bg-highlight");
        secondElement.classList.remove("bg-highlight");
        firstElement.classList.add("bg-retroDark-accent");
        secondElement.classList.add("bg-retroDark-accent");

        // Finalize animation
        if (index === swapArray.length - 1) {
          setElements(sortedArray);
          setDisableButtons(false);
        }
      }, delay * 2);
    }, delay * index * 2);
  });
};

const animateMerge = ({
  sortedArray,
  swapArray,
  setDisableButtons,
  setElements,
  delay,
}: Omit<Props, "isMerge">): void => {
  swapArray.forEach(([newHeight, myIndex], index) => {
    const element = document.getElementById(`bar-${myIndex}`);
    if (!element) return;

    setTimeout(() => {
      // Highlight the bar being updated
      element.classList.remove("bg-retroDark-accent");
      element.classList.add("bg-highlight");

      // Update height
      element.style.height = `${newHeight}px`;

      setTimeout(() => {
        // Reset color after updating
        element.classList.remove("bg-highlight");
        element.classList.add("bg-retroDark-accent");

        // Finalize animation
        if (index === swapArray.length - 1) {
          setElements(sortedArray);
          setDisableButtons(false);
        }
      }, delay * 3);
    }, delay * index * 3);
  });
};
