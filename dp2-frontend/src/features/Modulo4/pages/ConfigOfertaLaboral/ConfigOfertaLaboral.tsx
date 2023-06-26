import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";

import {
	ButtonGroup,
	FormGroup,
	FormControl,
	FormText,
	FormLabel,
	FormSelect
} from "react-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";

import React, {
	Fragment,
	ChangeEvent,
	useEffect,
	useRef,
	useState
} from "react";
import PhotoCard from "@features/Modulo4/components/PhotoCard";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SearchInput from "./SearchInputOfertaLaboral/SearchInput";
import { ajax } from "@features/Modulo4/tools/ajax";

import {
	SAMPLE_TOKEN,
	LOCAL_CONNECTION,
	CREATE_OFERTA_LABORAL
} from "@features/Modulo4/utils/constants";

function ConfigOfertaLaboral(props: any) {
	const navigate = useNavigate();

	const createPS = async () => {
		const dataPost = {
			hiring_process: 1,
			introduction: introduccionOferta,
			offer_introduction: descripcionPuesto,
			responsabilities_introduction: descripcionResponsa
		};

		const optionsRequest = {
			method: "POST",
			url: LOCAL_CONNECTION + CREATE_OFERTA_LABORAL,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			},
			data: dataPost
		};
		console.log("guardado");
		console.log(dataPost);
		return await ajax(optionsRequest);
	};

	// VALIDA INFORMACION
	const [validated, setValidated] = useState(false);
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
		event.preventDefault();
	};

	const stylesSelect = {
		display: "flex",
		alignItems: "center",
		marginBottom: "0.78rem"
	};

	// NombreOferta
	const [selectedNombreOferta, setSelectedNombreOferta] = useState("");
	const [selectedNombreOfertaFijo, setSelectedNombreOfertaFijo] = useState("");
	const [isSelectedNombreOfertaValid, setIsSelectedNombreOfertaValid] =
		useState(true);

	const handleNombreOferta = (event: any) => {
		const optionValue = event.target.value;
		const isValid = optionValue.trim() !== "";
		console.log(isValid);

		setIsSelectedNombreOfertaValid(isValid);
		setSelectedNombreOferta(optionValue);
	};

	// DESCRIPCION 3 CON QUILL
	const [introduccionOferta, setIntroduccionOferta] = useState("");
	const [descripcionPuesto, setDescripcionPuesto] = useState("");
	const [descripcionResponsa, setDescripcionResponsa] = useState("");

	const handleChangeIntroOferta = (html) => {
		setIntroduccionOferta(html);
	};

	const handleChangeDescripPuesto = (html) => {
		setDescripcionPuesto(html);
	};

	const handleChangeDescripResponsa = (html) => {
		setDescripcionResponsa(html);
	};

	/*
	// DESCRIPCIONES 3 CUSTOM INPUTS
	const handleInputChangeIntroduccionOferta = (event: any) => {
		const optionValue = event.target.value;
		setIntroduccionOferta(optionValue);
	};
	const handleInputChangeDescripcion = (event: any) => {
		const optionValue = event.target.value;
		setDescripcionPuesto(optionValue);
	};
	const handleInputChangeResponsa = (event: any) => {
		const optionValue = event.target.value;
		setDescripcionResponsa(optionValue);
	};
	*/

	// IMAGEN DE REFERENCIA
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedImage(file);

		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(null);
		}
		inputRef.current?.files &&
			setUploadedFileName(
				inputRef.current.files[0].name.substring(0, 10) + "..."
			);
	};
	const inputRef = useRef<HTMLInputElement>(null);
	const handleUpload = () => {
		inputRef.current?.click();
	};

	// MODAL DEL BUSCADOR, ABRE Y RETORNA LOS VALORES
	const [showModalBuscador, setShowModalBuscador] = useState(false);
	const handleShowBuscadorFromButtom = () => {
		setShowModalBuscador(true);
	};
	const handleCloseBuscadorFromButtom = () => {
		setShowModalBuscador(false);
	};
	const handleOptionSelectBuscador = (selectedOption) => {
		console.log(selectedOption);
		setSelectedNombreOferta("Oferta laboral - " + selectedOption.name);
		setSelectedNombreOfertaFijo(selectedOption.name);
		setIsSelectedNombreOfertaValid(true);
	};

	// ESTOS MODAL SE USARAN EN LOS BOTONES DE ELIMINAR Y GUARDAR
	const [showPublicarModal, setShowPublicarModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);

	const handlePublicar = () => {
		// Lógica para eliminar
		setShowPublicarModal(false);
	};
	const handleDelete = () => {
		// Lógica para eliminar
		setShowDeleteModal(false);
	};
	const handleSaveChanges = () => {
		// Lógica para guardar cambios
		createPS();
		setShowSaveModal(false);
		navigate(`/selection-offers-and-positions/job-offers/list/`);
	};

	return (
		<div
			style={{
				paddingLeft: "2rem",
				paddingRight: "4rem"
			}}>
			<div className="row">
				<div className="col">
					<h1>Configurar oferta laboral</h1>
					<p>
						<small className="opacity-50" style={{ marginBottom: "10rem" }}>
							Portal que presenta la configuración disponible para la oferta
							laboral de un proceso de selección.
						</small>
					</p>
				</div>
				<div style={{ flex: "0 0 15rem" }} className="col text-end">
					<button
						style={{ width: "10rem", maxWidth: "10rem" }}
						type="button"
						className="btn btn-primary"
						data-bs-target="#createLPModalChoose"
						data-bs-toggle="modal"
						onClick={() => {
							if (
								selectedNombreOferta != "" &&
								introduccionOferta != "" &&
								descripcionPuesto != "" &&
								descripcionResponsa != ""
							) {
								setShowPublicarModal(true);
							} else {
								setIsSelectedNombreOfertaValid(false);
								setValidated(true);
							}
						}}>
						<span className="me-3">Publicar oferta</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							fill="currentColor"
							className="bi bi-plus-circle"
							viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
						</svg>
					</button>

					{/* Modal para Guardar Cambios */}
					<Modal
						show={showPublicarModal}
						onHide={() => setShowPublicarModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Publicar Oferta Laboral</Modal.Title>
						</Modal.Header>
						<Modal.Body>¿Desea publicar la oferta laboral?</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowPublicarModal(false)}>
								Cancelar
							</Button>
							<Button variant="primary" onClick={handlePublicar}>
								Guardar
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
			<div className="row" style={{ paddingTop: "1rem" }}>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group as={Row}>
						<Form.Group as={Col} className="mb-3">
							<Form.Label style={{ fontSize: "15px" }}>
								Proceso de seleccion: (*)
							</Form.Label>
							<Row>
								<Col xs={10}>
									<Form.Control
										as="textarea"
										type="text"
										placeholder="Seleccionar el proceso de seleccion para la oferta laboral"
										value={selectedNombreOfertaFijo}
										rows={2}
										readOnly={true}
										disabled={true}
									/>
								</Col>
								<Col xs={2}>
									<Button
										style={{
											width: "10rem",
											maxWidth: "10rem",
											minHeight: "100%"
										}}
										onClick={handleShowBuscadorFromButtom}>
										Buscar proceso selección
									</Button>
								</Col>
							</Row>
						</Form.Group>
					</Form.Group>

					<Row>
						<Form.Group as={Col} className="mb-3">
							<Form.Label style={{ fontSize: "15px" }}>
								Nombre de la oferta laboral del proceso de seleccion: (*)
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Especificar el proceso de selección para la oferta laboral."
								value={selectedNombreOferta}
								required
								onChange={handleNombreOferta}
								disabled={selectedNombreOferta == "" ? true : false}
								//readOnly // Hace que el input sea de solo lectura
								className={!isSelectedNombreOfertaValid ? "is-invalid" : ""}
							/>
							<Form.Control.Feedback type="invalid">
								Seleccionar el proceso de selección.
							</Form.Control.Feedback>{" "}
						</Form.Group>
					</Row>

					<Row>
						<Form.Group xs={10} as={Col} className="mb-3">
							<Form.Label style={{ fontSize: "15px" }}>
								Introducción a la oferta laboral:
							</Form.Label>
							<ReactQuill
								theme="snow"
								value={introduccionOferta}
								onChange={handleChangeIntroOferta}
								style={{
									height: "8rem",
									marginBottom: "3rem"
								}}
							/>
							{/*
							<Form.Control
								as="textarea"
								type="text"
								placeholder="Introducción a la oferta laboral."
								value={introduccionOferta}
								onChange={handleInputChangeIntroduccionOferta}
								rows={4}
								required
							/>
							<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
							*/}
						</Form.Group>
						<Form.Group as={Col} className="mb-3">
							<Form.Label>Imagen referencial:</Form.Label>
							<div style={{ paddingLeft: "3%" }}>
								<PhotoCard imageSrc={previewUrl} width={7} height={5} />
							</div>
							<input
								style={{
									width: "100%",
									maxWidth: "9rem"
								}}
								type="file"
								ref={inputRef}
								onChange={handleImageUpload}
								className="d-none"
								accept="image/*"
							/>
							<div style={{ paddingTop: "0.4rem" }}>
								<button
									style={{
										width: "8rem",
										height: "2.5rem"
									}}
									onClick={handleUpload}
									className={`btn btn-outline-${
										uploadedFileName ? "success" : "primary"
									}`}>
									{uploadedFileName ? uploadedFileName : "Subir imagen"}
								</button>
							</div>
						</Form.Group>
					</Row>
					<Row>
						<Col>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1">
								<Form.Label style={{ fontSize: "15px" }}>
									Descripción del puesto:
								</Form.Label>

								<ReactQuill
									theme="snow"
									value={descripcionPuesto}
									onChange={handleChangeDescripPuesto}
									style={{
										height: "8rem",
										marginBottom: "3rem"
									}}
								/>
								{/*<Form.Control
									as="textarea"
									placeholder="Descripción del puesto."
									value={descripcionPuesto}
									required
									rows={4}
									onChange={handleInputChangeDescripcion}
								/>
								<Form.Control.Feedback type="invalid"></Form.Control.Feedback> */}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1">
								<Form.Label style={{ fontSize: "15px" }}>
									Descripción de las responsabilidades:
								</Form.Label>
								<ReactQuill
									theme="snow"
									value={descripcionResponsa}
									onChange={handleChangeDescripResponsa}
									style={{
										height: "8rem",
										marginBottom: "3rem"
									}}
								/>
								{/* <Form.Control
									as="textarea"
									placeholder="Descripción de las responsabilidades."
									value={descripcionResponsa}
									required
									rows={4}
									onChange={handleInputChangeResponsa}
								/>
								<Form.Control.Feedback type="invalid"></Form.Control.Feedback>*/}
							</Form.Group>
						</Col>
					</Row>
					<Row style={{ position: "static", borderTop: "10rem" }}>
						<p></p> <p></p>
						<Col>
							{/* Botón Eliminar */}
							<Button
								style={{ width: "10rem", maxWidth: "10rem" }}
								variant="danger"
								onClick={() => setShowDeleteModal(true)}>
								Eliminar oferta
							</Button>
						</Col>
						<Col xs="auto" className="d-flex justify-content-end">
							<Button
								style={{ width: "10rem", maxWidth: "10rem" }}
								type="submit"
								variant="primary"
								onClick={() => {
									if (
										selectedNombreOferta != "" &&
										introduccionOferta != "" &&
										descripcionPuesto != "" &&
										descripcionResponsa != ""
									) {
										setShowSaveModal(true);
									} else {
										setIsSelectedNombreOfertaValid(false);
									}
								}}>
								Guardar Cambios
							</Button>
						</Col>
					</Row>
					<Modal
						show={showDeleteModal}
						onHide={() => setShowDeleteModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Confirmar Eliminación</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							¿Estás seguro de que deseas eliminar esta oferta laboral?
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowDeleteModal(false)}>
								Cancelar
							</Button>
							<Button variant="danger" onClick={handleDelete}>
								Eliminar
							</Button>
						</Modal.Footer>
					</Modal>
					{/* Modal para Guardar Cambios */}
					<Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Guardar Cambios</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							¿Deseas guardar los cambios realizados en la oferta laboral?
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowSaveModal(false)}>
								Cancelar
							</Button>
							<Button variant="primary" onClick={handleSaveChanges}>
								Guardar
							</Button>
						</Modal.Footer>
					</Modal>

					{showModalBuscador && (
						<SearchInput
							onClose={handleCloseBuscadorFromButtom}
							onSelect={handleOptionSelectBuscador}
						/>
					)}
				</Form>
			</div>
		</div>
	);
}

export default ConfigOfertaLaboral;

/*

            <div>
                <p>
                    Opción seleccionada: 
                    {selectedNombreOferta + " " + selectedImage}
                </p>
            </div>

*/
