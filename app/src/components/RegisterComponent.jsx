import React from 'react';
import '../stylings/signin.css';

function RegisterComponent() {
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
          <button className="signInButton"> Enter</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
