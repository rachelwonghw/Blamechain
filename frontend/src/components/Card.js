import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import '../styles/Card.scss';

//TODO: made it dynamic based on data received from endpoint 
const color1 = '#BA4863';
const color2 = '#F2D9DB';
// const color3 = '#E6A2AA';

const Card = (props) => {
  const { upsetOverall } = props;
  const [data, setData] = useState({});
  let aliceUpset = 0.0;
  let aliceStarted = 0.0;
  let aliceUpsetPercentage = 100;
  let aliceStartedPercentage = 100;
  let bobUpsetPercentage = 100;
  let bobStartedPercentage = 100;

  const populatePieChart = () => {
    return(
      upsetOverall ? [
        { title: 'Bob', value: bobUpsetPercentage, color: color1 },
            { title: 'Alice', value: aliceUpsetPercentage, color: color2 },
        ]: [
          { title: 'Bob', value: bobStartedPercentage, color: color1 },
          { title: 'Alice', value: aliceStartedPercentage, color: color2 },
        ]
    )};

  useEffect(() => {
    axios.get("https://us-central1-blame-game-326403.cloudfunctions.net/everything")
      .then(res => {
        setData(res.data.analytics);
        console.log(res.data.analytics);
      })
      .finally(() => {
        aliceUpset = (data.most_upset_counter.Alice /(data.most_upset_counter.Alice + data.most_upset_counter.Bob));
        aliceStarted = (data.start_argument_counters.Alice / (data.start_argument_counters.Alice + data.start_argument_counters.Bob));
        aliceUpsetPercentage = Math.round(aliceUpset*100);
        aliceStartedPercentage = Math.round(aliceStarted*100);
        bobUpsetPercentage = Math.round(100-aliceUpsetPercentage);
        bobStartedPercentage = Math.round(100-aliceStartedPercentage);
      });
  }, []);

  return (
    <div className="card">
      <div className="card__title">
        {upsetOverall ? "Who is more upset overall?" : "Who started it?"}
      </div>
      <div className="card__emotions">
        <div className="card__piechart">
          <PieChart
            radius={PieChart.defaultProps.radius - 10}
            data={populatePieChart()}
          />
        </div>
        <div className="card_analytics__wrapper">
          <div className="card__analytics">{upsetOverall ? `Bob — ${bobUpsetPercentage}%` : `Bob - ${bobStartedPercentage}%`}</div>
          <div className="card__analytics">{upsetOverall ? `Alice — ${aliceUpsetPercentage}%` : `Alice - ${aliceStartedPercentage}%`}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;