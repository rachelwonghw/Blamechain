import React from 'react';
import Ellipse from './Ellipse';
import '../styles/Button.scss';

const Button = () => {
  return (
    <div type="button" className="button">
      <Ellipse />
      <span className="button__text">
        Start Recording
      </span>
    </div>
  );
}

export default Button;