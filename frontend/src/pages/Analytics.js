import React from 'react';
import Card from '../components/Card';
import '../styles/Analytics.scss';

// TODO: call to endpoint to retrieve analytics
const Analytics = () => {
  return (
    <div className="analytics">
      <h1>analytics</h1>
      <Card primaryEmotions />
      <Card primaryEmotions={false} />
    </div>
  );
}

export default Analytics;