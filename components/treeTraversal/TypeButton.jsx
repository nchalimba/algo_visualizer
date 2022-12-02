import React from 'react';

const TypeButton = ({ currentType, label, type, setType }) => {
  return (
    <button
      className={`btn ${currentType === type && 'btn-active'}`}
      onClick={() => setType(currentType)}
    >
      {label}
    </button>
  );
};

export default TypeButton;
