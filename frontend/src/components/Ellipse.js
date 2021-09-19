import React from 'react';


const Ellipse = (props) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21"{...props}>
      <circle cx="10.5" cy="10.5" r="10" fill="#BA4863"/>
    </svg>
  );
}

export default Ellipse;