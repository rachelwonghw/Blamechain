import React from 'react';
import Card from '../components/Card';
import '../styles/Analytics.scss';
import Button from '../components/Button';
import Logo from '../components/Logo';

// TODO: call to endpoint to retrieve analytics
const Analytics = () => {
  return (
    <div className="analytics">
      <Logo className="analytics__logo" />
      <Card upsetOverall />
      <Card upsetOverall={false} />
      <Button />
    </div>
  );
}

export default Analytics;