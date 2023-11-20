import React, { useState } from 'react';
import Login from './Login';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };

  const handleProtectedRequest = async () => {
    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error making protected request:', error);
    }
  };

  return (
    <div className="App container">
      {token ? (
        <div>
          <h1>Contenido Protegido</h1>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <button onClick={handleProtectedRequest}>Hacer solicitud protegida</button>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;
