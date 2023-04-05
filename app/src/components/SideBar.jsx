import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChannelComponent from './ChannelComponent';

function SideBar() {
  const [channels, setChannels] = useState([]);

  function addChannel() {
    const channelInfo = {
      name: document.getElementById('channelName').value,
    };

    axios
      .post('http://localhost:81/createChannel', channelInfo)
      .then((response) => {});
  }

  function getAllChannels() {
    axios.get('http://localhost:81/getChannels').then((response) => {
      const channelNames = response.data.map((channel) => channel.name);
      setChannels(channelNames);
    });
  }

  useEffect(() => {
    getAllChannels();
  }, []);

  return (
    <div>
      {channels.map((item) => (
        <div key={item}>
          <ChannelComponent argument={item} />
          <br />
        </div>
      ))}

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
        <button onClick={getAllChannels}>Refresh</button>
      </form>
    </div>
  );
}

export default SideBar;
