import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import Nabvar from './Nabvar';
import Reporteria from './Reporteria';
const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };
const ContentProtegido = () => (
  <div>
    <Nabvar handleLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<Navigate to="/App" />} />
      <Route path="/App" element={<h1>Bienvenido a plataforma</h1>} />
      <Route path="/Reporteria" element={<Reporteria />} />
      
    </Routes>
  </div>
);



  // ... (your other functions)

  return (
    <Router>
      <div className="App container">
        {token ? (
          <div>
            <ContentProtegido />
            
          </div>
        ) : (
          <Login setToken={setToken} />
        )}
      </div>
    </Router>
  );
};

export default App;
