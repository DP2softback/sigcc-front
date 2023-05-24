import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para autenticar al usuario con los datos proporcionados (username y password)
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);
  };

  return ( 
    <div className="container">
      <div className="row justify-content-left">
        <img src="" alt="Imagen MEDIA PANTALLA" />
      </div>
      <div className="row justify-content-right">
        <div className="col-sm-6">
          <h2 className="text-center mb-4">!Hola! Estamos felices de verte de nuevo. Ingrese su informacion de incio de sesion para continuar</h2>
          <img src="" alt="Imagen LOGO" />
          <h2 className="text-center mb-4">Iniciar Sesion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>git
              <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" id="rememberMe" className="form-check-input" checked={rememberMe} onChange={handleRememberMeChange} />
              <label htmlFor="rememberMe" className="form-check-label">Recordarme</label>
            </div>
            <div className="mb-3">
              <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
          </form>
          <div className="mt-4">
            <label>¿Eres nuevo?</label>
            <a href="#" className="text-decoration-none">Crear una cuenta</a>
          </div>
          <div className="mt-3">
            <label>o Ingresar con:</label>
          </div>
          <button className="btn btn-light w-100">Continuar con Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
