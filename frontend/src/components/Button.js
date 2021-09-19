import React, { useState } from 'react';
import axios from 'axios';
import Ellipse from './Ellipse';
import Rectangle from './Rectangle';
import '../styles/Button.scss';

const Button = () => {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);

  const handleOnChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleOnClick = () => {
    setRecording(true);
    const data = new FormData();
    data.append('file', file);
    axios.post("https://us-central1-blame-game-326403.cloudfunctions.net/audio", data, { // receive two parameter endpoint url ,form data
      })
      .then(res => { // then print response status
        console.log(res);
        setRecording(false);
      })
  }

  return (
    <label for="actual-button" className={`button${recording? ` button--recording` : ''}`} onClick={handleOnClick}>
      {recording ? <Rectangle /> :<Ellipse />}
      <span className="button__text" >
        {recording ? 'Recording...' :  'Start Recording'}
        <input type="file" name="file" onChange={handleOnChange} id="actual-button" hidden />
      </span>
    </label>
  );
}

export default Button;