import React, { useState } from 'react';
import styles from '../../styles/treeTraversal/Navbar.module.css';
import {
  inorderDFS,
  postorderDFS,
  preorderDFS,
} from '../../utils/treeTraversal/dfs';
import { bfs } from '../../utils/treeTraversal/bfs';
import { animateTree } from '../../utils/treeTraversal/visualize';
import Select from '../Select';

const algoOptions = [
  { label: 'Inorder', value: 'inorder' },
  { label: 'Postorder', value: 'postorder' },
  { label: 'Preorder', value: 'preorder' },
  { label: 'Level Order', value: 'levelorder' },
];
const Navbar = ({ tree, setTree, setVisitedArray }) => {
  const [disableButtons, setDisableButtons] = useState(false);
  const [delay, setDelay] = useState(30);
  const [traversalType, setTraversalType] = useState();

  const handleLengthChange = (e) => {
    const newTree = [];
    for (let i = 0; i < e.target.value; i++) {
      newTree.push(i);
    }
    setTree(newTree);
  };
  const handleDelayChange = (e) => {
    setDelay(e.target.value * 2);
  };

  const treeTraversalMap = {
    inorder: inorderDFS,
    preorder: preorderDFS,
    postorder: postorderDFS,
    levelorder: bfs,
  };
  const handleStart = () => {
    if (!traversalType) return;
    setDisableButtons(true);
    const visited = [];
    treeTraversalMap[traversalType](tree, visited);
    animateTree({ visited, setVisitedArray, setDisableButtons, delay });
  };

  return (
    <nav className="navbar">
      <div className={styles.buttons}>
        <Select
          options={algoOptions}
          value={algoOptions.find((option) => option.value === traversalType)}
          placeholder="Select algo..."
          onChange={(value) => setTraversalType(value?.value)}
        />

        <button
          className="btn btn-primary"
          onClick={handleStart}
          disabled={disableButtons}
        >
          Start
        </button>
      </div>
      <div className={styles.sliders}>
        <div className={styles.slider}>
          <label htmlFor="length">Length: {tree.length}</label>
          <input
            disabled={disableButtons}
            type="range"
            name="length"
            id="length"
            defaultValue={1}
            min={1}
            max={15}
            onChange={handleLengthChange}
          />
        </div>
        <div className={styles.slider}>
          <label htmlFor="delay">Delay: {delay} ms</label>
          <input
            disabled={disableButtons}
            type="range"
            name="delay"
            id="delay"
            min={30}
            defaultValue={30}
            onChange={handleDelayChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
