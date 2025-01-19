type Props = {
  visited: number[];
  updateNode: (index: number, isActive: boolean) => void;
  setVisitedArray: React.Dispatch<React.SetStateAction<number[]>>;
  setDisableButtons: React.Dispatch<React.SetStateAction<boolean>>;
  delay: number;
};

export const animateTree = ({
  visited,
  updateNode,
  setVisitedArray,
  setDisableButtons,
  delay,
}: Props): void => {
  setVisitedArray([]);
  visited.forEach((node, index) => {
    setTimeout(() => {
      updateNode(node, true);
      setVisitedArray((prev) => [...prev, node]);

      setTimeout(() => {
        updateNode(node, false);
        if (index === visited.length - 1) {
          setDisableButtons(false);
        }
      }, delay * 2);
    }, delay * index * 2);
  });
};
