import React from 'react';
import Tile from '../components/Tile';
import Button from '../components/Button';
import Searchbar from '../components/Searchbar';
import Logo from '../components/Logo';
import '../styles/History.scss';

const dates = [
  1631910840000,
  1631913281000,
  1631247080000,
  1630537710000,
  1630110285000
];

const History = () => {
  return (
    <div className="history">
      <Logo className="history__logo" />
      <Searchbar />
      {dates.map((item) => {
        return <Tile date={item} onClick={() => console.log(item)} />
      })}
      <Button />
    </div>
  );
}

export default History;