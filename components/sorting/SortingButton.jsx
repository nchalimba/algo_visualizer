import React from 'react';

const SortingButton = ({ type, settings, setSettings }) => {
  const handleSortingTypeChange = () => {
    setSettings((prev) => ({ ...prev, algoType: type }));
  };

  const label = type
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

  return (
    <button
      className={`btn ${settings.algoType === type && 'btn-active'}`}
      onClick={handleSortingTypeChange}
    >
      {label}
    </button>
  );
};

export default SortingButton;
