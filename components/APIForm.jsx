import React from 'react';

const APIForm = ({ onSubmit }) => {
  return (
    <div>
      <h2> Select Cat Attributes: </h2>
      <button type="button" className="button" onClick={onSubmit}>
        Discover a Cat!
      </button>
    </div>
  );
};

export default APIForm;
