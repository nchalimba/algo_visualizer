import React from 'react';
import styles from '../../styles/sorting/SortingElements.module.css';

const SortingElements = ({ elements }) => {
  return (
    <div className={styles.sortingElements}>
      {elements.map((element, key) => (
        <div
          key={key}
          className={styles.element}
          style={{ height: element }}
          id={key}
        ></div>
      ))}
    </div>
  );
};

export default SortingElements;
