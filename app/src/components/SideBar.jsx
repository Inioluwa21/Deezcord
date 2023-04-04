import React from 'react';
import axios from 'axios';
import ChannelComponent from './ChannelComponent';

function SideBar() {
  function addChannel() {
    const channelInfo = {
      name: document.getElementById('channelName').value,
    };

    axios
      .post('http://localhost:81/createChannel', channelInfo)
      .then((response) => {});
  }
  return (
    <div>
      <ChannelComponent />
      <form>
        <div>
          <input
            type="text"
            className="newChannel"
            id="channelName"
            placeholder="Add a new channel"
          />
        </div>
        <button onClick={addChannel}>+ Add</button>
      </form>
    </div>
  );
}

export default SideBar;
