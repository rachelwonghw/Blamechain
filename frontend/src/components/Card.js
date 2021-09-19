import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import '../styles/Card.scss';

//TODO: made it dynamic based on data received from endpoint 
const color1 = '#BA4863';
const color2 = '#F2D9DB';
// const color3 = '#E6A2AA';

const Card = (props) => {
  const { upsetOverall } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://us-central1-blame-game-326403.cloudfunctions.net/everything")
      .then(res => {
        setData(res.data.analytics);
      });
  }, []);

  const data = upsetOverall ? [
    { title: 'Bob', value: 65, color: color1 },
    { title: 'Alice', value: 35, color: color2 },
  ] : [
    { title: 'Bob', value: 39, color: color1 },
    { title: 'Alice', value: 61, color: color2 },
  ];

  return (
    <div className="card">
      <div className="card__title">
        {upsetOverall ? "Who is more upset overall?" : "Who started it?"}
      </div>
      <div className="card__emotions">
        <div className="card__piechart">
          <PieChart
            radius={PieChart.defaultProps.radius - 10}
            data={data}
          />
        </div>
        <div className="card_analytics__wrapper">
          <div className="card__analytics">{upsetOverall ? 'Bob — 65%' : 'Alice - 61%'}</div>
          <div className="card__analytics">{upsetOverall ? 'Alice — 35%' : 'Bob - 39%'}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;