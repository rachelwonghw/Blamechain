import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Transcript.scss';
import axios from 'axios';


const dateBubble = (date, history) => {
  const dateObj = new Date(date);
  return (
    <div className="transcript__dateBubble">
      <div 
        className="transcript__backButton"
        onClick={() => {
          history.goBack();
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div className="transcript__dateBubble__text">
        {`${dateObj.toLocaleDateString('en-US')} ${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
      </div>
    </div>
  );
}

const rightBubble = (text, index) => {
  return (
    <div key={index} className="transcript__rightBubble">{text}</div>
  )
}

const leftBubble = (text, index) => {
  return (
    <div key={index} className="transcript__leftBubble">{text}</div>
  )
}

const Transcript = (props) => {
  const { date } = props;
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://us-central1-blame-game-326403.cloudfunctions.net/everything")
      .then(res => {
        setData(res.data.conversations[params.id]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  const history = useHistory();
  console.log(data);
  return !loading && (
    <div className="transcript">
      {dateBubble(date, history)}
      <div className="transcript__chat">
        {data.messages.map((obj, index) => {
          return index % 2 === 0 ? rightBubble(Object.values(obj)[0], index) : leftBubble(Object.values(obj)[0], index);
        })}
      </div>

      <div className="transcript__endText">
        End of transcript
      </div>
    </div >

  );
}

export default Transcript;