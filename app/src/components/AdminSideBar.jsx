import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ChannelComponent from './ChannelComponent';
import { AuthContext } from '../AuthContext';
import MessageHistory from './MessageHistory';

function AdminSideBar() {
  const { setCurrentChannel } = useContext(AuthContext);

  const [channels, setChannels] = useState([]);

  function removeAUser() {
    const userInfo = {
      username: document.getElementById('userToRemove').value,
    };

    axios
      .post('http://localhost:81/deleteUser', userInfo)
      .then((response) => {});
    window.location.reload();
  }

  function removeAChannel(channelId) {
    const channelInfo = {
      id: channelId,
    };
    axios.post('http://localhost:81/deleteChannel', channelInfo);
    window.location.reload();
  }
  function setTheCurrentChannel(chanName) {
    setCurrentChannel(chanName);
    const channelInfo = {
      channelname: chanName,
    };
    axios
      .post('http://localhost:81/setCurrentChannel', channelInfo)
      .then((response) => {});
    window.location.reload();
  }

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
      const channelNames = response.data.map((channel) => [
        channel.name,
        channel.id,
      ]);
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ChannelComponent
              argument={item[0]}
              // onClick={() => callMessagesForTheChannel()}
              func={() => setTheCurrentChannel(item[0])}
            />
            <button onClick={() => removeAChannel(item[1])}>Remove</button>
          </div>
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
      <h3>Remove A User</h3>
      <form>
        <div>
          <input
            type="text"
            className="removeUser"
            id="userToRemove"
            placeholder="enter username"
          />
        </div>
      </form>
      <button onClick={removeAUser}>Remove</button>
    </div>
  );
}

export default AdminSideBar;
