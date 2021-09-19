import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/Analytics.scss';
import Button from '../components/Button';

// TODO: call to endpoint to retrieve analytics
const Analytics = () => {
  let history = useHistory();
  return (
    <div className="analytics">
      {
        <div className="analytics__tab">
          <div
            className={`analytics__tab__button analytics__tab__button--${window.location.pathname === "/home"? '' : "in"}active`}
            onClick={() => history.push('/home')}
          >
            History
          </div>
          <div
            className={`analytics__tab__button analytics__tab__button--${window.location.pathname === "/home"? 'in' : ''}active analytics__tab__button--right`}
            onClick={() => history.push('/analytics')}
          >
            Analytics
          </div>
        </div>
      }
      <Card upsetOverall />
      <Card upsetOverall={false} />
      <Button />
    </div>
  );
}

export default Analytics;