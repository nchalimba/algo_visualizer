interface AnimateTreeProps {
  visited: number[];
  setVisitedArray: React.Dispatch<React.SetStateAction<number[]>>;
  setDisableButtons: React.Dispatch<React.SetStateAction<boolean>>;
  delay: number;
}

export const animateTree = ({
  visited,
  setVisitedArray,
  setDisableButtons,
  delay,
}: AnimateTreeProps): void => {
  setVisitedArray([]);
  visited.forEach((nodeNumber, index) => {
    console.log("Hi");
    const node = document.getElementById(`node-${nodeNumber}`);
    if (!node) return;

    setTimeout(() => {
      node.style.backgroundColor = "teal";
      setVisitedArray((prev) => [...prev, nodeNumber]);

      setTimeout(() => {
        node.style.backgroundColor = "white";
        if (index === visited.length - 1) {
          setDisableButtons(false);
        }
      }, delay * 2);
    }, delay * index * 2);
  });
};
