import React, { useState } from 'react';
import styles from '../../styles/treeTraversal/Navbar.module.css';
import {
  inorderDFS,
  postorderDFS,
  preorderDFS,
} from '../../utils/treeTraversal/dfs';
import { bfs } from '../../utils/treeTraversal/bfs';
import TypeButton from './TypeButton';
import { animateTree } from '../../utils/treeTraversal/visualize';

const Navbar = ({ tree, setTree, setVisitedArray }) => {
  const [disableButtons, setDisableButtons] = useState(false);
  const [delay, setDelay] = useState(30);
  const [traversalType, setTraversalType] = useState('inorder');

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
    setDisableButtons(true);
    const visited = [];
    treeTraversalMap[traversalType](tree, visited);
    console.log('Visited:', visited);
    animateTree({ visited, setVisitedArray, setDisableButtons, delay });
  };

  return (
    <nav className="navbar">
      <div className={styles.buttons}>
        <div className={styles.buttonContainer}>
          dfs
          <div className={styles.dfsButtons}>
            <TypeButton
              currentType="inorder"
              type={traversalType}
              label="Inorder"
              setType={setTraversalType}
            />
            <TypeButton
              currentType="postorder"
              type={traversalType}
              label="Postorder"
              setType={setTraversalType}
            />
            <TypeButton
              currentType="preorder"
              type={traversalType}
              label="Preorder"
              setType={setTraversalType}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          bfs
          <div className={styles.bfsButton}>
            <TypeButton
              currentType="levelorder"
              type={traversalType}
              label="Level Order"
              setType={setTraversalType}
            />
          </div>
        </div>

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
