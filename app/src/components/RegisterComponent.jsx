import React from 'react';
import '../stylings/signin.css';
import { useNavigate } from 'react-router-dom';

function RegisterComponent() {
  const navigate = useNavigate();
  function goToSignInPage() {
    navigate('/Signin');
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
          <button className="signInButton" onClick={goToSignInPage}>
            {' '}
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
