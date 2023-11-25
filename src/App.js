// App.js

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Login from './Login';
import CloudStoreTable from './CloudStoreTable';
import './App.css';

function App() {
  const [cookie, setCookie] = useCookies();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    cookie.isAdminLoggedIn === true
  );
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  });


  useEffect(() => {
    if (isAdminLoggedIn) {
      // Store the login state in localStorage

      setCookie('isAdminLoggedIn', true, {parh: '/'});
    } 
  }, [isAdminLoggedIn]);

  const handleAdminLogin = () => {
    // For simplicity, hardcoding admin credentials
    const correctUsername = 'organix';
    const correctPassword = 'organix123';

    if (
      adminCredentials.username === correctUsername &&
      adminCredentials.password === correctPassword
    ) {
      setIsAdminLoggedIn(true);
    } else {
      // Handle incorrect login
      alert('Incorrect username or password');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdminCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="app-container">
      {isAdminLoggedIn ? (
        <CloudStoreTable />
      ) : (
        <Login
          onAdminLogin={handleAdminLogin}
          adminCredentials={adminCredentials}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
}

export default App;
