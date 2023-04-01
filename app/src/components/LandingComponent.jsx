import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingComponent() {
  const navigate = useNavigate();

  function goToSignInPage() {
    navigate('/Signin');
  }
  return (
    <div>
      <h1>Deezcord is a real time chat tool</h1>
      <h2>It is created by Inioluwa Olaleye for his 353 project</h2>
      <h2>Create an account and begin chatting</h2>
      <button onClick={goToSignInPage}>Get Started</button>
    </div>
  );
}

export default LandingComponent;
