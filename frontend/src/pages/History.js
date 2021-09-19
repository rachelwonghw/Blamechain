import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tile from '../components/Tile';
import Button from '../components/Button';
import Searchbar from '../components/Searchbar';
import '../styles/History.scss';
import axios from 'axios';

const dates = [
  1631910840000,
  1631913281000,
  1631247080000,
  1630537710000,
  1630110285000
];

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://us-central1-blame-game-326403.cloudfunctions.net/everything")
      .then(res => {
        setData(res.data.conversations);
      });
  }, []);


  let history = useHistory();
  return (
    <div className="history">
      {
        <div className="history__tab">
          <div
            className={`history__tab__button history__tab__button--${window.location.pathname === "/home"? '' : "in"}active`}
            onClick={() => history.push('/home')}
          >
            History
          </div>
          <div
            className={`history__tab__button history__tab__button--${window.location.pathname === "/home"? 'in' : ''}active history__tab__button--right`}
            onClick={() => history.push('/analytics')}
          >
            Analytics
          </div>
        </div>
      }
      <Searchbar />
      {dates.map((item, index) => {
        return <Tile date={item} onClick={() => history.push(`/transcript/${index}`)} id={index} />
      })}
      <Button />
    </div>
  );
}

export default History;