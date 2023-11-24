// App.js

import React, { useState, useEffect } from 'react';
import Login from './Login';
import CloudStoreTable from './CloudStoreTable';
import './App.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAdminLoggedIn) {
      // Store the login state in localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
    } else {
      // Remove the login state from localStorage
      localStorage.removeItem('isAdminLoggedIn');
    }
  }, [isAdminLoggedIn]);

  const handleAdminLogin = () => {
    // For simplicity, hardcoding admin credentials
    const correctUsername = 'organix';
    const correctPassword = 'organix@123';

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
