import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function MessageHistory() {
  const { currentChannel } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  function postMessage() {
    const postInfo = {
      username: '',
      data: document.getElementById('data').value,
      channelname: currentChannel,
    };
    axios
      .post('http://localhost:81/createMessage', postInfo)
      .then((response) => {});

    window.location.reload();
  }
  function makeAReply(messageId){

  }
  function getAllMessages() {
    // alert(currentChannel);
    const channelInfo = {
      channelname: currentChannel,
    };
    axios
      .get('http://localhost:81/getMessages', channelInfo)
      .then((response) => {
        const theMessages = response.data.map((messages) => [messages.data, messages.id]);
        setMessages(theMessages);
      });
  }

  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <div>
      {messages.map((item) => (
        <div key={item}>
          <p>{item[0]}</p>
          <button>Reply</button>
        </div>
      ))}
      <br />
      <br />
      <label for="data">Message: </label>
      <input type="text" id="data" name="data" />
      <br />
      <br />

      <button id="submitButton" onClick={postMessage}>
        Submit
      </button>
      <br></br>
    </div>
  );
}

export default MessageHistory;
