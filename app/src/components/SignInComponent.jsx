import React from 'react';
import '../stylings/signin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInComponent() {
  const navigate = useNavigate();
  function goToRegisterPage() {
    navigate('/Register');
  }

  function loginAUser() {
    const userInfo = {
      username: document.getElementById('userName1').value,
      password: document.getElementById('password1').value,
    };
    alert('got here');

    axios.post('http://localhost:81/login', userInfo).then((response) => {
      if (response == 'User exists') {
        //navigate to home page
      }
    });
  }
  return (
    <div className="signIn">
      <div className="signInForm">
        <form>
          <h1>Sign In</h1>
          <div>
            <input
              type="text"
              className="signInInputField"
              id="userName1"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="text"
              className="signInInputField"
              id="password1"
              placeholder="Password"
            />
          </div>
          <button className="signInButton" onClick={loginAUser}>
            {' '}
            Sign In
          </button>
          <p className="register-link" onClick={goToRegisterPage}>
            Create an account
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInComponent;
