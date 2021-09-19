import React from 'react';
import Card from '../components/Card';
import '../styles/Analytics.scss';
import Button from '../components/Button';

// TODO: call to endpoint to retrieve analytics
const Analytics = () => {
  return (
    <div className="analytics">
      <h1>Analytics</h1>
      <Card primaryEmotions />
      <Card primaryEmotions={false} />
      <Button />
    </div>
  );
}

export default Analytics;