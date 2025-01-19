import { SortingElement } from "@/app/types";

type Props = {
  swapArray: [number, number][];
  setDisableButtons: (disable: boolean) => void;
  setElements: React.Dispatch<React.SetStateAction<SortingElement[]>>;
  delay: number;
  isMerge?: boolean;
};

export const animate = ({
  swapArray,
  setDisableButtons,
  setElements,
  delay,
  isMerge = false,
}: Props) => {
  if (isMerge) {
    animateMerge({
      swapArray,
      setDisableButtons,
      setElements,
      delay,
    });
  } else {
    animateElements({
      swapArray,
      setDisableButtons,
      setElements,
      delay,
    });
  }
};

const animateElements = ({
  swapArray,
  setDisableButtons,
  setElements,
  delay,
}: Omit<Props, "isMerge">) => {
  if (swapArray.length === 0) {
    setDisableButtons(false);
    return;
  }

  swapArray.forEach(([first, second], index) => {
    setTimeout(() => {
      // Highlight elements being swapped
      setElements((prevElements) => {
        return prevElements.map((el, idx) => ({
          ...el,
          isActive: idx === first || idx === second,
        }));
      });

      // Swap values after delay
      setTimeout(() => {
        setElements((prevElements) => {
          // Deep clone the array to ensure React detects changes
          const newElements = prevElements.map((el) => ({ ...el }));

          // Perform the swap
          [newElements[first].value, newElements[second].value] = [
            newElements[second].value,
            newElements[first].value,
          ];

          // Reset active states
          newElements[first].isActive = false;
          newElements[second].isActive = false;

          // Final step: re-enable buttons if last swap
          if (index === swapArray.length - 1) {
            setTimeout(() => setDisableButtons(false), 0);
          }

          return newElements;
        });
      }, delay); // Delay for the swap animation
    }, delay * index * 2);
  });
};

const animateMerge = ({
  swapArray,
  setDisableButtons,
  setElements,
  delay,
}: Omit<Props, "isMerge">): void => {
  if (swapArray.length === 0) {
    setDisableButtons(false);
    return;
  }

  swapArray.forEach(([newValue, myIndex], index) => {
    setTimeout(() => {
      // Highlight the element being updated
      setElements((prevElements) => {
        return prevElements.map((el, idx) => ({
          ...el,
          isActive: idx === myIndex,
        }));
      });

      // Update the value after a delay
      setTimeout(() => {
        setElements((prevElements) => {
          const newElements = prevElements.map((el) => ({ ...el }));

          // Update the value at the specific index
          newElements[myIndex].value = newValue;

          // Reset active state
          newElements[myIndex].isActive = false;

          // Finalize animation if it's the last update
          if (index === swapArray.length - 1) {
            setTimeout(() => setDisableButtons(false), 0);
          }

          return newElements;
        });
      }, delay); // Delay for the value update
    }, delay * index * 2); // Delay between each update
  });
};
