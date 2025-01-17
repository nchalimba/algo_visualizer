type Props = {
  visited: number[];
  setVisitedArray: React.Dispatch<React.SetStateAction<number[]>>;
  setDisableButtons: React.Dispatch<React.SetStateAction<boolean>>;
  delay: number;
};

export const animateTree = ({
  visited,
  setVisitedArray,
  setDisableButtons,
  delay,
}: Props): void => {
  setVisitedArray([]);
  visited.forEach((nodeNumber, index) => {
    const node = document.getElementById(`node-${nodeNumber}`);
    if (!node) return;

    setTimeout(() => {
      node.classList.remove("bg-retroDark-accent");
      node.classList.add("bg-highlight");
      setVisitedArray((prev) => [...prev, nodeNumber]);

      setTimeout(() => {
        node.classList.remove("bg-highlight");
        node.classList.add("bg-retroDark-accent");
        if (index === visited.length - 1) {
          setDisableButtons(false);
        }
      }, delay * 2);
    }, delay * index * 2);
  });
};
