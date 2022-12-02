const visualizeShortestPath = ({
  path,
  startNode,
  endNode,
  setDisableControls,
  delay,
  nodeStyles,
}) => {
  if (path.length === 0) setDisableControls(false);
  for (let i = 0; i <= path.length; i++) {
    setTimeout(() => {
      if (i === path.length) {
        setDisableControls(false);
        return;
      }
      const node = path[i];
      if (node !== startNode && node !== endNode)
        document.getElementById(
          `node-${node.x}-${node.y}`
        ).className = `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`;
    }, delay * i);
  }
};

export const visualizePath = ({
  path,
  visitedNodes,
  startNode,
  endNode,
  setDisableControls,
  delay,
  nodeStyles,
}) => {
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        visualizeShortestPath({
          path,
          startNode,
          endNode,
          setDisableControls,
          delay,
          nodeStyles,
        });
      }, delay * i);
    } else {
      setTimeout(() => {
        const node = visitedNodes[i];
        if (node !== startNode && node !== endNode)
          document.getElementById(
            `node-${node.x}-${node.y}`
          ).className = `${nodeStyles.node} ${nodeStyles.nodeVisited}`;
      }, delay * i);
    }
  }
};
