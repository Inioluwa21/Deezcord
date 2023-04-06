import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function AdminMessageHistory() {
  const { currentChannel } = useContext(AuthContext);
  // const { messageId, setMessageId } = useState();
  var messageId;
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);

  function removeAMessage(messageId) {
    const messageInfo = {
      id: messageId,
    };
    axios
      .post('http://localhost:81/deleteMessage', messageInfo)
      .then((response) => {});
  }

  function removeAReply(replyId) {
    const replyInfo = {
      id: replyId,
    };
    axios
      .post('http://localhost:81/deleteReply', replyInfo)
      .then((response) => {});
  }

  function handleUpVote(id, postType) {
    const upVoteInfo = {
      postid: id,
      type: postType,
    };
    axios
      .post('http://localhost:81/toggleUpVote', upVoteInfo)
      .then((response) => {});
    window.location.reload();
  }

  function handleDownVote(id, postType) {
    const downVoteInfo = {
      postid: id,
      type: postType,
    };
    axios
      .post('http://localhost:81/toggleDownVote', downVoteInfo)
      .then((response) => {});
    window.location.reload();
  }
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
    const replyInfo = {
      username: '',
      data: document.getElementById('data').value,
      postId: messageId,
      channelname: currentChannel,
    };

    axios
      .post('http://localhost:81/postReply', replyInfo)
      .then((response) => {});

    window.location.reload();
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
          messages.upvotes,
          messages.downvotes,
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
        replies.upvotes,
        replies.downvotes,
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
        <div
          key={item}
          style={{
            width: '100%',
            backgroundColor: '#bd03',
            border: '#fff',
            borderRadius: '5px',
          }}
        >
          <div>
            <p>{item[2]} says</p>
            <p>
              <b>{item[0]}</b>
            </p>
            <button onClick={() => handleUpVote(item[1], 'message')}>
              👍 {item[3]}
            </button>
            <button onClick={() => handleDownVote(item[1], 'message')}>
              👎 {item[4]}
            </button>
            <button onClick={() => removeAMessage(item[1])}>Remove</button>
          </div>
          {replies
            .filter((replyItem) => replyItem[1] === item[1])
            .map((replyItem) => (
              <div key={replyItem}>
                <div style={{ display: 'flex' }}>
                  <p style={{ textIndent: '10px' }}>
                    {' '}
                    {replyItem[2]} replies: {replyItem[0]}
                  </p>{' '}
                  <button
                    onClick={() => setTheMessageId(replyItem[3])}
                    style={{ height: '20px' }}
                  >
                    Reply
                  </button>
                  <button
                    style={{ height: '24px' }}
                    onClick={() => handleUpVote(replyItem[3], 'reply')}
                  >
                    👍 {replyItem[4]}
                  </button>
                  <button
                    style={{ height: '24px' }}
                    onClick={() => handleDownVote(replyItem[3], 'reply')}
                  >
                    👎 {replyItem[5]}
                  </button>
                  <button
                    style={{ height: '20px' }}
                    onClick={() => removeAReply(replyItem[3])}
                  >
                    Remove
                  </button>
                </div>
                {replies
                  .filter((nestedReply) => nestedReply[1] === replyItem[3])
                  .map((nestedReply) => (
                    <div key={nestedReply}>
                      <div style={{ display: 'flex' }}>
                        <p style={{ textIndent: '60px' }}>
                          {nestedReply[2]} replies: {nestedReply[0]}
                        </p>
                        <button style={{ height: '20px' }}>Reply</button>
                        <button
                          style={{ height: '24px' }}
                          onClick={() => handleUpVote(nestedReply[3], 'reply')}
                        >
                          👍 {nestedReply[4]}
                        </button>
                        <button
                          style={{ height: '24px' }}
                          onClick={() =>
                            handleDownVote(nestedReply[3], 'reply')
                          }
                        >
                          👎 {item[5]}
                        </button>
                        <button
                          style={{ height: '20px' }}
                          onClick={() => removeAReply(nestedReply[3])}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
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

export default AdminMessageHistory;
