import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Inicio de Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
               required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Constraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            </div>
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
