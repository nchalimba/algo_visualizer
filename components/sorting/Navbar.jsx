import React, { useState } from 'react';
import { animate } from '../../utils/sorting/visualize';
import sort from '../../utils/sorting/sort';
import styles from '../../styles/sorting/Navbar.module.css';
import SortingButton from './SortingButton';

const Navbar = ({
  settings,
  setSettings,
  setForceUpdate,
  elements,
  setElements,
}) => {
  const [disableButtons, setDisableButtons] = useState(false);

  const handleDelayChange = (event) => {
    setSettings((prev) => ({ ...prev, delay: event.target.value }));
  };

  const handleLengthChange = (event) => {
    setSettings((prev) => ({ ...prev, length: event.target.value * 5 }));
  };

  const handleSort = () => {
    setDisableButtons(true);
    const { sortedArray, swapArray } = sort(settings.algoType, elements);

    animate(
      sortedArray,
      swapArray,
      setDisableButtons,
      setElements,
      settings.delay,
      settings.algoType === 'merge_sort'
    );
  };

  const handleGenerateNew = () => {
    setForceUpdate((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className={styles.buttons}>
        <button
          disabled={disableButtons}
          className="btn btn-primary"
          onClick={handleGenerateNew}
        >
          New
        </button>
        <SortingButton
          type={'merge_sort'}
          settings={settings}
          setSettings={setSettings}
        />
        <SortingButton
          type={'insertion_sort'}
          settings={settings}
          setSettings={setSettings}
        />
        <SortingButton
          type={'quick_sort'}
          settings={settings}
          setSettings={setSettings}
        />
        <SortingButton
          type={'heap_sort'}
          settings={settings}
          setSettings={setSettings}
        />
        <button
          className="btn btn-primary"
          disabled={disableButtons}
          onClick={handleSort}
        >
          Start
        </button>
      </div>
      <div className={styles.sliders}>
        <div className={styles.slider}>
          <label htmlFor="length">Length: {settings.length}</label>
          <input
            disabled={disableButtons}
            type="range"
            name="length"
            id="length"
            defaultValue={25 / 5}
            min={1}
            onChange={handleLengthChange}
          />
        </div>
        <div className={styles.slider}>
          <label htmlFor="delay">Delay: {settings.delay * 2} ms</label>
          <input
            disabled={disableButtons}
            type="range"
            name="delay"
            id="delay"
            min={1}
            defaultValue={5}
            onChange={handleDelayChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
