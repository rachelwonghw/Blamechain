import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/Tile.scss';

const CLASSNAME = "tile";

const Tile = (props) => {
  const { date, onClick } = props;
  const dateObj = new Date(date);

  const handleOnClick = (event) => {
    if (onClick) onClick(event);
  }

  return (
    <div className={`${CLASSNAME}`} onClick={handleOnClick}>
      <span className={`${CLASSNAME}__dateText`}>
        {`${dateObj.toLocaleDateString('en-US')} `}
      </span>
      <span className={`${CLASSNAME}__text ${Math.random()}`}>
        {`${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
      </span>
      <span className={`${CLASSNAME}__icon`}>
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </div>
  );
}

export default Tile;