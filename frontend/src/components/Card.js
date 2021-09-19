import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import '../styles/Card.scss';

//TODO: made it dynamic based on data received from endpoint 
// and maybe click on pie chart to show different emotions and the respective analytics
const color1 = '#BA4863';
const color2 = '#F2D9DB';
const color3 = '#E6A2AA';

const Card = (props) => {
  const { primaryEmotions } = props;

  return (
    <div className="card">
      <div className="card__title">
        {primaryEmotions ? "Primary Emotions" : "Who started it?"}
      </div>
      <div className="card__emotions">
        <div className="card__piechart">
          <PieChart
            segmentsShift={(index) => index === 1 ? 2 : 0.5}
            radius={PieChart.defaultProps.radius - 20}
            data={[
              { title: 'Angry', value: 45, color: color1 },
              { title: 'Annoyed', value: 35, color: color2 },
              { title: 'Frustration', value: 20, color: color3 },
            ]
          }
          />
        </div>
        <div className="card_analytics__wrapper">
          {primaryEmotions? <div className="card__analytics__bold">Angry</div> : ''}
          <div className="card__analytics">Bob -- 65%</div>
          <div className="card__analytics">Alice -- 35%</div>
        </div>
      </div>
    </div>
  );
}

export default Card;