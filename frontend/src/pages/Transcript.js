import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Transcript.scss';



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

const rightBubble = (text) => {
  return (
    <div className="transcript__rightBubble">{text}</div>
  )
}

const leftBubble = (text) => {
  return (
    <div className="transcript__leftBubble">{text}</div>
  )
}

const Transcript = (props) => {
  const { date } = props;
  const [data,setData] = useState({});

  const history = useHistory();
  return (
    <div className="transcript">
      {dateBubble(date, history)}
      <div className="transcript__chat">
        {rightBubble("People used to say to me that you were too selfish to be an artist")}
        {rightBubble("I used to defend you")}
        {rightBubble("But they’re absolutely right")}
        {leftBubble("All your best acting is behind you")}
        {leftBubble("You’re back to being a hack")}
        {rightBubble("You gaslighted me")}
        {rightBubble("You’re a fucking villain")}
        {leftBubble("You want to present yourself as a victim because it’s a good legal strategy fine")}
        {leftBubble("But you and I both know you  chose this life")}
        {leftBubble("You wanted it until you didn’t")}
        {leftBubble("You used me so you could get out of LA")}
        {rightBubble("I didn’t use you")}
        {leftBubble("You did and then you blamed me for it you always made me aware of what I was doing wrong how I was falling short")}
        {leftBubble("Life with you was joyless")}
      </div>

      <div className="transcript__endText">
        End of transcript
      </div>
    </div >

  );
}

export default Transcript;