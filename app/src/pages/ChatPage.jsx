import React from 'react';
import SideBar from '../components/SideBar';
import MessageHistory from '../components/MessageHistory';
import { useNavigate } from 'react-router-dom';
import '../stylings/chat.css';
function ChatPage() {
  const navigate = useNavigate();
  function navigateToSearch() {
    navigate('/Search');
  }
  return (
    <div className="chat-page">
      <div className="side-bar">
        <h1>DEEZCORD</h1>
        <SideBar />
      </div>
      <div className="message-history">
        <MessageHistory />
      </div>
      <div>
        <button className="" onClick={navigateToSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
