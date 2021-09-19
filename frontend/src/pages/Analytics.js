import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Analytics = () => {
  return (
    <div>
      <h1>analytics</h1>
      <PieChart
        paddingAngle={2}
        data={[
          { title: 'Bob', value: 55, color: '#BA4863' },
          { title: 'Alice', value: 35, color: '#F2D9DB' },
          { title: 'Mallory', value: 10, color: '#E6A2AA' },
        ]
      }
      />
    </div>
  );
}

export default Analytics;