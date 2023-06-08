import React, { useState } from 'react';
import './Login.css';
import useRefMounted from '@hooks/useRefMounted';
import useAuth from '@hooks/useAuth';

const Login = () => {

  const { login } = useAuth();
  const isMountedRef = useRefMounted();

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

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      await login(username, password);

      if (isMountedRef.current) {
        // setStatus({ success: true });
        // setSubmitting(false);
      }
    } catch (err) {
      if (isMountedRef.current) {
        // setStatus({ success: false });
        // setErrors({ submit: "Las credenciales ingresadas son incorrectas" });
        // setSubmitting(false);
      }
    }
  };

  return ( 
    <div className="container">
      {/* <div className="row justify-content-left d-flex justify-content-center">
        <img src="" alt="Imagen MEDIA PANTALLA" />
      </div> */}
      <div className="row justify-content-right d-flex justify-content-center">
        <div className="col-sm-6 py-3">
          {/* <h2 className="text-center mb-4">!Hola! Estamos felices de verte de nuevo. Ingrese su informacion de incio de sesion para continuar</h2>
          <img src="" alt="Imagen LOGO" /> */}
          <h2 className="text-center mb-4">Iniciar Sesion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario:</label>
              <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" id="rememberMe" className="form-check-input" checked={rememberMe} onChange={handleRememberMeChange} />
              {/* <label htmlFor="rememberMe" className="form-check-label">Recordarme</label> */}
            </div>
            <div className="mb-3">
              <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>Iniciar sesión</button>
          </form>
          {/* <div className="mt-4">
            <label>¿Eres nuevo?</label>
            <a href="#" className="text-decoration-none">Crear una cuenta</a>
          </div>
          <div className="mt-3">
            <label>o Ingresar con:</label>
          </div>
          <button className="btn btn-light w-100">Continuar con Google</button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
