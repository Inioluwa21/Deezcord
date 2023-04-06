import React from 'react';
import '../stylings/signin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInComponent() {
  const navigate = useNavigate();
  function goToRegisterPage() {
    navigate('/Register');
  }
  function goToChatPage() {
    navigate('/ChatPage');
  }
  function storeUser(userid, username) {
    const userInfo = {
      userId: userid,
      username: username,
    };
    axios
      .post('http://localhost:81/storeUser', userInfo)
      .then((response) => {});
  }

  function loginAUser() {
    const userInfo = {
      username: document.getElementById('userName1').value,
      password: document.getElementById('password1').value,
    };

    axios.post('http://localhost:81/login', userInfo).then((response) => {
      alert(response.data);
      if (response.data === 'none') {
        alert('Incorrect username or password');
      } else {
        const theUserId = response.data.map((users) => [users.id]);
        const theUserName = response.data.map((users) => [users.username]);
        alert('the: ' + theUserId);
        storeUser(theUserId, theUserName);
        navigate('/Chat');
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
        </form>
        <div>
          <button className="signInButton" onClick={loginAUser}>
            {' '}
            Sign In
          </button>
          <p className="register-link" onClick={goToRegisterPage}>
            Create an account
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInComponent;
