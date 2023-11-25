// Login.js

import React, { useState } from 'react';
import './Login.css';

function Login({ onAdminLogin, adminCredentials, onInputChange }) {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const database = [
    {
      username: 'organix',
      password: 'organix123',
    },
  ];

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = database.find(
      (user) => user.username === adminCredentials.username
    );

    if (userData) {
      console.log("userData ", userData)
      if (userData.password !== adminCredentials.password) {
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        setIsSubmitted(true);
        onAdminLogin();
      }
    } else {
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="left">Username </label>
          <input
            type="text"
            name="username"
            value={adminCredentials.username}
            onChange={onInputChange}
            required
          />
          {renderErrorMessage('uname')}
        </div>
        <div className="input-container">
          <label className="left">Password </label>
          <input
            type="password"
            name="password"
            value={adminCredentials.password}
            onChange={onInputChange}
            required
          />
          {renderErrorMessage('pass')}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default Login;
