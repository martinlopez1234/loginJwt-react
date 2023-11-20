import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Login = ({ setToken, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      });

      const token = response.data.access_token;
      setToken(token);

      // Obtener el nombre de usuario desde la respuesta y almacenarlo en el estado
      const userNameFromResponse = response.data.logged_in_as;
      setUserName(userNameFromResponse);

      setError(''); // Limpiar cualquier mensaje de error previo
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
