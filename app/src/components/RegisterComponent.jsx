import React from 'react';
import '../stylings/signin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterComponent() {
  const navigate = useNavigate();
  function goToSignInPage() {
    navigate('/Signin');
  }

  function registerAUser() {
    const userInfo = {
      username: document.getElementById('userName').value,
      password: document.getElementById('password').value,
    };

    axios.post('http://localhost:81/register', userInfo).then((response) => {});
    goToSignInPage();
  }
  return (
    <div className="signIn">
      <div className="signInForm">
        <form>
          <h1>Create An Account</h1>
          <div>
            <input
              type="text"
              className="signInInputField"
              id="userName"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="text"
              className="signInInputField"
              id="password"
              placeholder="Password"
            />
          </div>
        </form>
        <button className="signInButton" onClick={registerAUser}>
          {' '}
          Enter
        </button>
      </div>
    </div>
  );
}

export default RegisterComponent;
