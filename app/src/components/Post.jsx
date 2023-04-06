import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Post(props) {
  const [replies, setReplies] = useState([]);
  //axios function to get all replies with a post id
  function getAllReplies() {
    var postInfo = {
      postId: props.id,
    };
    axios.get('http://localhost:81/getReplies', postInfo).then((response) => {
      const theReplies = response.data.map((reply) => [
        reply.username,
        reply.data,
      ]);
      setReplies(theReplies);
    });
  }
  return (
    <div>
      <div className="postDiv">
        <h2>{props.name}</h2>
        <h1>{props.topic}</h1>
        <h3>{props.bodytext}</h3>
      </div>

      {replies.map((item) => (
        <div key={item}>
          <h3>{item.username}</h3>
          <p>{item.data}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Post;
