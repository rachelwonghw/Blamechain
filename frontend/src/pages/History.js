import React from 'react';
import Tile from '../components/Tile';

const dates = [
  1631910840000,
  1631913281000,
  1631247080000,
  1630537710000,
  1630110285000
];

const History = () => {
  return (
    <div>
      <h1>History</h1>
      {dates.map((item) => {
        return <Tile date={item} onClick={() => console.log(item)} />
      })}
      
    </div>
  );
}

export default History;