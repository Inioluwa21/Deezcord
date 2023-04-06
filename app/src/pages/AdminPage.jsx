import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminMessageHistory from '../components/AdminMessageHistory';
import '../stylings/chat.css';
function AdminPage() {
  return (
    <div className="chat-page">
      <div className="side-bar">
        <h1>DEEZCORD</h1>
        <AdminSideBar />
      </div>
      <div className="message-history">
        <AdminMessageHistory />
      </div>
    </div>
  );
}

export default AdminPage;
