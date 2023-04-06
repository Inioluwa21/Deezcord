import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function MessageHistory() {
  const { currentChannel } = useContext(AuthContext);
  // const { messageId, setMessageId } = useState();
  var messageId;
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);

  function setTheMessageId(mId) {
    messageId = mId;
  }
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
  function makeAReply() {
    alert(messageId);
    const replyInfo = {
      username: '',
      data: document.getElementById('data').value,
      postId: messageId,
      channelname: currentChannel,
    };

    axios
      .post('http://localhost:81/postReply', replyInfo)
      .then((response) => {});
  }
  function getAllMessages() {
    // alert(currentChannel);
    const channelInfo = {
      channelname: currentChannel,
    };
    axios
      .get('http://localhost:81/getMessages', channelInfo)
      .then((response) => {
        const theMessages = response.data.map((messages) => [
          messages.data,
          messages.id,
          messages.username,
        ]);
        setMessages(theMessages);
      });
    getAllReplies();
  }

  function getAllReplies() {
    axios.get('http://localhost:81/getReplies').then((response) => {
      const theReplies = response.data.map((replies) => [
        replies.data,
        replies.postid,
        replies.username,
        replies.id,
      ]);
      setReplies(theReplies);
    });
  }
  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <div>
      {messages.map((item) => (
        <div key={item}>
          <p>
            <b>{item[0]}</b>
          </p>
          {replies
            .filter((replyItem) => replyItem[1] === item[1])
            .map((replyItem) => (
              <div key={replyItem}>
                <p> {replyItem[0]}</p>
              </div>
            ))}
          <button onClick={() => setTheMessageId(item[1])}>Reply</button>
        </div>
      ))}
      <br />
      <br />
      <label for="data">Message: </label>
      <input type="text" id="data" name="data" />
      <br />
      <br />

      <button
        id="submitButton"
        className="theSubmitButton"
        onClick={postMessage}
      >
        Submit
      </button>
      <button id="replyButton" className="theReplyButton" onClick={makeAReply}>
        Reply
      </button>
      <br></br>
    </div>
  );
}

export default MessageHistory;
