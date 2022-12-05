import React, { useEffect, useState } from 'react';
import styles from '../styles/Select.module.css';

const Select = ({ value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectOption = (option) => {
    if (option !== value) onChange(option);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      className={styles.container}
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>{value?.label || placeholder}</span>

      <div className={`${styles.arrow} ${isOpen && styles.up}`}></div>

      <ul className={`${styles.options} ${isOpen && styles.show}`}>
        {options.map((option, index) => (
          <li
            className={`${styles.option} ${
              index === highlightedIndex && styles.highlighted
            }`}
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
