import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import '../styles/Card.scss';

//TODO: made it dynamic based on data received from endpoint 
// and maybe click on pie chart to show different emotions and the respective analytics
const color1 = '#BA4863';
const color2 = '#F2D9DB';
// const color3 = '#E6A2AA';

const Card = (props) => {
  const { upsetOverall } = props;

  return (
    <div className="card">
      <div className="card__title">
        {upsetOverall ? "Who is more upset overall?" : "Who started it?"}
      </div>
      <div className="card__emotions">
        <div className="card__piechart">
          <PieChart
            radius={PieChart.defaultProps.radius - 10}
            data={[
              { title: 'Bob', value: 65, color: color1 },
              { title: 'Alice', value: 35, color: color2 },
            ]
            }
          />
        </div>
        <div className="card_analytics__wrapper">
          <div className="card__analytics">Bob — 65%</div>
          <div className="card__analytics">Alice — 35%</div>
        </div>
      </div>
    </div>
  );
}

export default Card;