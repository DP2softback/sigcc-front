import { useState, useEffect, useRef } from "react";
import "./Login.css";
import ImgLogin from "@assets/images/IMG_Login.png";
import ImgLogo from "@assets/images/output-onlinepngtools.png";
import { Google } from "react-bootstrap-icons";
import { useLoginMutation } from "@redux/api/authApiSlice";
import { setCredentials } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import LoaderSpinner from "@components/LoaderSpinner";
import { Roles } from "@routes/types/roles";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const [login, { isLoading, isError }] = useLoginMutation();

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
		e.preventDefault();

		let userCredentials = new FormData();
		userCredentials.append("email", username);
		userCredentials.append("password", password);

		try {
			const userResponse = await login(userCredentials).unwrap();
			dispatch(
				setCredentials({
					user: {
						email: username,
						password: password,
						roles: [
							Roles.HR_ADMIN,
							Roles.HR_WORKER,
							Roles.CANDIDATE,
							Roles.HR_MANAGER,
							Roles.WORKER,
							Roles.GENERAL_MANAGER,
							Roles.HEAD_OF_AREA,
						]
					},
					token: userResponse.token
				})
			);
			setUsername("");
			setPassword("");
			navigate("/");
		} catch (err) {
			if (!err?.originalStatus) {
				// isLoading: true until timeout occurs
				setErrMsg("No Server Response");
			} else if (err.originalStatus === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.originalStatus === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col Ocultar">
					<img
						className="imgMedio"
						src={ImgLogin}
						alt="Imagen MEDIA PANTALLA"
					/>
				</div>
				<div className="col justify-content-right d-flex justify-content-center">
					<div className="col-sm-6">

            <div className="row Portal">
                <div className="col-3">
                  <img src={ImgLogo} alt="Imagen LOGO" />
                </div>
                <div className="col-9 PortalTexto">
                  <h2 className="text-left Title">
                    SIGCC
                  </h2>
                  </div>
            </div>
						<h2 className="text-center mb-4">
							!Hola! Estamos felices de verte de nuevo. Ingrese su informacion
							de incio de sesion para continuar
						</h2>

						<h2 className="text-left mb-4">Iniciar sesión</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="username" className="form-label">
									Usuario:
								</label>
								<input
									type="text"
									id="username"
									className="form-control"
									value={username}
									onChange={handleUsernameChange}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Contraseña:
								</label>
								<input
									type="password"
									id="password"
									className="form-control"
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
							<div className="mb-3 form-check">
								<input
									type="checkbox"
									id="rememberMe"
									className="form-check-input"
									checked={rememberMe}
									onChange={handleRememberMeChange}
								/>
								<label htmlFor="rememberMe" className="form-check-label">
									Recordarme
								</label>
							</div>
							<div className="mb-3">
								<a href="#" className="text-decoration-none">
									¿Olvidaste tu contraseña?
								</a>
							</div>
							<button type="submit" className="btn btn-primary w-100">
								{isLoading ? <LoaderSpinner /> : "Iniciar sesión"}
							</button>
						</form>
						<div className="text-center mt-4">
							<label>¿Eres nuevo?</label>
							<a href="#" className="text-decoration-none">
								{" "}
								Crear una cuenta
							</a>
						</div>
						<div className="text-center mt-3">
							<label>o Ingresar con:</label>
						</div>
						<button className="btn btn-outline-secondary w-100">
							<Google></Google> Continuar con Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
