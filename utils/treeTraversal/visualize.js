export const animateTree = ({
  visited,
  setVisitedArray,
  setDisableButtons,
  delay,
}) => {
  setVisitedArray([]);
  visited.forEach((nodeNumber, index) => {
    const node = document.getElementById(`node_${nodeNumber}`);
    if (!node) return;
    setTimeout(() => {
      node.style.backgroundColor = 'teal';
      setVisitedArray((prev) => [...prev, nodeNumber]);
      setTimeout(() => {
        node.style.backgroundColor = 'white';
        if (index === visited.length - 1) {
          setDisableButtons(false);
        }
      }, delay * 2);
    }, delay * index * 2);
  });
};
