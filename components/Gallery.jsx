import React from 'react';

const Gallery = ({ banList, handleBan }) => {
  return (
    <div className="ban-list-container">
      <h2>Ban List</h2>
      <ul>
        {banList.map((attribute, index) => (
          <li key={index} onClick={() => handleBan(attribute)}>
            {attribute}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
