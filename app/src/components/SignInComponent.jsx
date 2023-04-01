import React from 'react';
import '../stylings/signin.css';

function SignInComponent() {
  return (
    <div className="signIn">
      <div className="signInForm">
        <form>
          <h1>Sign In</h1>
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
          <button className="signInButton"> Sign In</button>
          <p className="register-link">Create an account</p>
        </form>
      </div>
    </div>
  );
}

export default SignInComponent;
