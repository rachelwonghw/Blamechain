import React from 'react';

const Rectangle = (props) => {
  return (
    <svg width="18" height="17" viewBox="0 0 18 17" {...props}>
      <rect x="0.5" width="17" height="17" fill="#BA4863"/>
    </svg>
  );
}

export default Rectangle;