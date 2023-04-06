import React from 'react';
import SideBar from '../components/SideBar';
import MessageHistory from '../components/MessageHistory';
import '../stylings/chat.css';
function ChatPage() {
  return (
    <div className="chat-page">
      <div className="side-bar">
        <h1>CHAT</h1>
        <SideBar />
      </div>
      <div className="message-history">
        <MessageHistory />
      </div>
    </div>
  );
}

export default ChatPage;
