import React from 'react';
import axios from 'axios';

// make axios call store is some form of use state array, display everything in it

function ChannelComponent(props) {
  return (
    <div>
      <button onClick={props.func}># {props.argument}</button>
    </div>
  );
}

export default ChannelComponent;
