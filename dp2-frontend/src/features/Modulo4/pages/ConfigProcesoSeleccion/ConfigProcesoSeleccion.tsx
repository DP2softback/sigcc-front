import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
	ButtonGroup,
	FormGroup,
	FormControl,
	FormText,
	FormLabel,
	FormSelect
} from "react-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import "./ConfigProcesoSeleccion.css";

import { Fragment, ChangeEvent, useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInputProcesoSeleccion/SearchInput";
import { ajax } from "@features/Modulo4/tools/ajax";
import moment from "moment";
import SearchInputResponsablesNuevo from "./SearchInputResponsablesNuevo/SearchInputResponsablesNuevo";
import {
	SAMPLE_TOKEN,
	LOCAL_CONNECTION,
	CREATE_PROCESO_SELECCION,
	GET_TIPO_ETAPAS_PROCESO_SELECCION
} from "@features/Modulo4/utils/constants";

/*
{
    "position": 1,
    "available_positions_quantity": "1",
    "name": "Proceso en Nombre de prueba",
    "process_stages": [
        {
            "stage_type": 1,
            "order": 1,
            "start_date": "2023-06-12",
            "end_date": "2023-06-12",
            "name": "asdf",
            "description": "asdf"
        },
        {
            "stage_type": 1,
            "order": 2,
            "start_date": "2023-06-12",
            "end_date": "2023-06-12",
            "name": "df",
            "description": "dsfds"
        }
    ],
    "employees": [
        {
            "employee": 3
        },
        {
            "employee": 1
        }
    ]
}

*/

function ConfigProcesoSeleccion(props: any) {
	const navigate = useNavigate();

	/*
	useEffect(() => {
		setSelectedIdPuestoLaboral(1);
		setCantVacantes(1);
		setSelectedPuestoLaboral("Proceso en Nombre de prueb!!!a");
		setRows([
			{
				id: 1,
				idTipoEtapa: 1,
				nombreTipoEtapa: "dsf",
				nombreEtapa: "df",
				descripcionEtapa: "",
				fechaInicio: new Date(),
				fechaFin: new Date(),
				estado: ""
			}
		]);
		setArrResponsables([
			{
				id: 1,
				user: {
					id: 2,
					password:
						"pbkdf2_sha256$216000$smhYwuNQNpRV$2loGVwY2W3TSeowjsPSdk08goKrYn70j0s5I/aVkX0Q=",
					last_login: null,
					is_superuser: false,
					username: "Joseson",
					first_name: "Jose",
					last_name: "Joseson",
					is_staff: false,
					is_active: true,
					date_joined: "2023-05-25T13:35:51-05:00",
					created: "2023-05-25T13:35:51.109000-05:00",
					modified: "2023-06-01T10:31:41.234000-05:00",
					deleted: null,
					email: "Jose@joseson.com",
					second_name: "",
					maiden_name: "",
					recovery_code: null,
					groups: [],
					user_permissions: [],
					roles: [2]
				}
			}
		]);
	}, []);
	*/

	const createPS = async () => {
		//console.log(rows);
		const listaEtapas = rows.map(
			({
				idTipoEtapa,
				id,
				fechaInicio,
				fechaFin,
				nombreEtapa,
				descripcionEtapa
			}) => ({
				stage_type: idTipoEtapa,
				order: id,
				start_date: moment(fechaInicio).format("YYYY-MM-DD"),
				end_date: moment(fechaFin).format("YYYY-MM-DD"),
				name: nombreEtapa,
				description: descripcionEtapa
			})
		);

		const listaIdResponsables = arrResponsables.map(({ id }) => ({
			employee: id
		}));

		const dataPost = {
			position: selectedIdPuestoLaboral,
			available_positions_quantity: cantVacantes,
			name: selectedPuestoLaboral,
			process_stages: listaEtapas,
			employees: listaIdResponsables
		};

		const optionsRequest = {
			method: "POST",
			url: LOCAL_CONNECTION + CREATE_PROCESO_SELECCION,
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

	// PUESTO DE TRABAJO FIJO
	const handleSelectedPuestoLaboralFijo = (event: any) => {};

	// PUESTO DE TRABAJO
	const [selectedIdPuestoLaboral, setSelectedIdPuestoLaboral] = useState(null);
	const [selectedPuestoLaboralFijo, setSelectedPuestoLaboralFijo] =
		useState("");
	const [selectedPuestoLaboral, setSelectedPuestoLaboral] = useState("");
	const [isSelectedNombreOfertaValid, setIsSelectedNombreOfertaValid] =
		useState(true);

	const handleNombrePuestoSeleccionado = (event: any) => {
		const optionValue = event.target.value;
		const isValid = optionValue.trim() !== "";
		setIsSelectedNombreOfertaValid(isValid);
		setSelectedPuestoLaboral(optionValue);
	};

	// CANTIDAD DE VACANTES
	const [cantVacantes, setCantVacantes] = useState(1);
	const [isCantVacantesValid, setIsCantVacantesValid] = useState(true);
	const handlecantVacantes = (event: any) => {
		const optionValue = event.target.value;
		setCantVacantes(optionValue);
		const numericValue = parseInt(optionValue);
		if (
			isNaN(numericValue) ||
			!Number.isInteger(numericValue) ||
			optionValue !== numericValue.toString() ||
			numericValue <= 0
		)
			setIsCantVacantesValid(false);
		else setIsCantVacantesValid(true);
	};

	// CREAR TIPO ETAPA SELECCION
	const [selectedTipoEtapaSelec, setSelectedTipoEtapaSelec] = useState(null);
	const [optionsTipoEtapaSelec, setOptionsTipoEtapaSelec] = useState<any[]>([]);

	const getTiposEtapas = async () => {
		const optionsRequest = {
			method: "GET",
			url: LOCAL_CONNECTION + GET_TIPO_ETAPAS_PROCESO_SELECCION,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		};
		return await ajax(optionsRequest);
	};

	useEffect(() => {
		const fetchData = async () => {
			const tiposEtapas = await getTiposEtapas();
			setOptionsTipoEtapaSelec(tiposEtapas);
		};

		fetchData();
	}, []);

	// TABLA DE ETAPAS DEL PROCESO DE SELECCIÓN
	const handleOptionsTipoEtapaSelec = (option: any) => {
		setSelectedTipoEtapaSelec(option.name);
		newRow.idTipoEtapa = option.id;
		newRow.nombreTipoEtapa = option.name;
	};

	interface TableRow {
		id: number;
		idTipoEtapa: number;
		porcenCalifica: number;
		nombreTipoEtapa: string;
		nombreEtapa: string;
		descripcionEtapa: string;
		fechaInicio: Date | string;
		fechaFin: Date | string;
		estado: string;
	}
	const [rows, setRows] = useState<TableRow[]>([]);
	const [newRow, setNewRow] = useState<TableRow>({
		id: 0,
		idTipoEtapa: 0,
		porcenCalifica: 0,
		nombreTipoEtapa: "",
		nombreEtapa: "",
		descripcionEtapa: "",
		fechaInicio: new Date(),
		fechaFin: new Date(),
		estado: ""
	});
	const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
	const [showModal, setShowModal] = useState(false);

	const [isPorcenCalificaOk, setIsPorcenCalificaOk] = useState(true);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "porcenCalifica") {
			const numericValue = parseInt(value);
			if (
				isNaN(numericValue) ||
				!Number.isInteger(numericValue) ||
				value !== numericValue.toString() ||
				numericValue < 0 ||
				numericValue > 100
			)
				setIsPorcenCalificaOk(false);
			else setIsPorcenCalificaOk(true);
		}

		if (selectedRow) {
			setSelectedRow((prevRow) => ({ ...prevRow, [name]: value }));
		} else {
			setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
		}
	};

	// VALIDA MODAL
	const [validatedModal, setValidatedModal] = useState(false);
	const handleSubmitModal = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidatedModal(true);
		event.preventDefault();
	};

	/*
	useEffect(() => {
		console.log("validatedModal", validatedModal);
	}, [validatedModal]);

	useEffect(() => {
		console.log("newRow", newRow);
	}, [newRow]);
	*/

	const [idCounter, setIdCounter] = useState(0); // Contador para el ID
	const handleAddRowEtapa = () => {
		//console.log("newRow", newRow);
		//console.log("selectedRow", selectedRow);
		if (
			siNuevaEtapa == true &&
			(newRow.nombreTipoEtapa == "" ||
				newRow.nombreEtapa == "" ||
				newRow.fechaInicio == "" ||
				newRow.fechaFin == "")
		) {
			return;
		}

		if (
			siNuevaEtapa == false &&
			(selectedRow.nombreTipoEtapa == "" ||
				selectedRow.nombreEtapa == "" ||
				selectedRow.fechaInicio == "" ||
				selectedRow.fechaFin == "")
		) {
			return;
		}

		setValidatedModal(true);

		if (selectedRow === null) {
			// Agregar nueva fila
			// Usar el valor actual del contador más 1 como nuevo ID
			setRows((prevRows) => [
				...prevRows,
				{ ...newRow, id: idCounter + 1, estado: "Sin configurar" }
			]);
		} else {
			// Actualizar fila existente
			setRows((prevRows) =>
				prevRows.map((row) => {
					if (row.id === selectedRow.id) {
						return { ...row, ...selectedRow };
					}
					return row;
				})
			);
		}

		setNewRow({
			id: 0,
			idTipoEtapa: 0,
			porcenCalifica: 0,
			nombreTipoEtapa: "",
			nombreEtapa: "",
			descripcionEtapa: "",
			fechaInicio: new Date(),
			fechaFin: new Date(),
			estado: ""
		});
		setSelectedRow(null);
		setShowModal(false);
		setIdCounter((prevCounter) => prevCounter + 1); // Incrementar el contador en 1
	};

	const handleDeleteRow = (id: number) => {
		setRows((prevRows) => prevRows.filter((row) => row.id !== id));
	};

	const [siNuevaEtapa, setSiNuevaEtapa] = useState(true);
	const openModal = (row: TableRow | null, SiNuevaEtapaEstado: boolean) => {
		setSelectedRow(row);
		setShowModal(true);
		setSiNuevaEtapa(SiNuevaEtapaEstado);
	};
	const closeModal = () => {
		setShowModal(false);
	};

	// MODAL DE PUESTO BUSCADOR, ABRE Y RETORNA LOS VALORES
	const [showModalBuscador, setShowModalBuscador] = useState(false);
	const handleShowBuscadorFromButtom = () => {
		setShowModalBuscador(true);
	};
	const handleCloseBuscadorFromButtom = () => {
		setShowModalBuscador(false);
	};
	const handleOptionSelectBuscador = (selectedOptionPuesto) => {
		let nombrePosicionFijo =
			selectedOptionPuesto.area_name +
			" " +
			selectedOptionPuesto.position_name +
			" " +
			selectedOptionPuesto.position_detail.tipoJornada +
			" " +
			selectedOptionPuesto.position_detail.modalidadTrabajo;

		setSelectedIdPuestoLaboral(selectedOptionPuesto.id);
		setSelectedPuestoLaboralFijo(nombrePosicionFijo);
		setSelectedPuestoLaboral(
			"Proc. selección en " + selectedOptionPuesto.position_name
		);
	};

	// MODAL DE RESPONSABLE BUSCADOR, ABRE Y RETORNA LOS VALORES
	const [arrResponsables, setArrResponsables] = useState([]);
	const [cantResponsables, setCantResponsables] = useState(0);

	useEffect(() => {
		setCantResponsables(arrResponsables.length);
	}, [arrResponsables]);

	const [showModalBuscadorResponsable, setShowModalBuscadorResponsable] =
		useState(false);
	const handleShowBuscadorResponsableFromButtom = () => {
		setShowModalBuscadorResponsable(true);
	};
	const handleCloseBuscadorResponsableFromButtom = () => {
		setShowModalBuscadorResponsable(false);
	};
	const handleOptionSelectBuscadorResponsable = (responsables) => {
		setArrResponsables(responsables);
		setCantResponsables(responsables.length);
	};

	// ESTOS MODAL BOTONES DE ELIMINAR Y GUARDAR TODO EL PROCECSO
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const handleDelete = () => {
		setShowDeleteModal(false);
	};
	const handleSaveChanges = () => {
		createPS();
		setShowSaveModal(false);
		console.log("guardado final");
		navigate(0);
	};

	useEffect(() => {
		console.log("selectedRow", selectedRow);
	}, [selectedRow]);

	return (
		<div
			style={{
				paddingLeft: "2rem",
				paddingRight: "4rem"
			}}>
			<div className="row">
				<div className="col">
					<h1>Configurar proceso de selección</h1>
					<p>
						<small className="opacity-50" style={{ marginBottom: "10rem" }}>
							Portal que presenta la configuración disponible para el proceso de
							selección de una posición.
						</small>
					</p>
				</div>
			</div>

			<div className="row" style={{ paddingTop: "1rem" }}>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group as={Row} className="mb-3">
						<Form.Group as={Row}>
							<Form.Label style={{ fontSize: "15px" }}>
								Puesto de trabajo: (*)
							</Form.Label>
						</Form.Group>
						<Form.Group xs={10} as={Col}>
							<Form.Control
								as="textarea"
								type="text"
								placeholder="Seleccionar el nombre del puesto para el proceso de selección."
								value={selectedPuestoLaboralFijo}
								onChange={handleSelectedPuestoLaboralFijo}
								rows={2}
								className="readonly-text"
							/>
						</Form.Group>
						<Form.Group xs={2} as={Col}>
							<Button
								style={{
									width: "10rem",
									maxWidth: "10rem",
									minHeight: "100%"
								}}
								onClick={handleShowBuscadorFromButtom}>
								Buscar puesto de trabajo
							</Button>
						</Form.Group>
					</Form.Group>
					<Form.Group className="mb-2" as={Row}>
						<Col>
							<Row>
								<Form.Label sm="2" style={{ fontSize: "15px" }}>
									Nombre del proceso de selección para un puesto: (*)
								</Form.Label>
							</Row>
							<Row>
								<Form.Group xs={12} as={Col}>
									<Form.Control
										type="text"
										placeholder="Especificar el puesto de trabajo para el proceso de selección."
										value={selectedPuestoLaboral}
										onChange={handleNombrePuestoSeleccionado}
										disabled={selectedPuestoLaboral == "" ? true : false}
										required
										className={!isSelectedNombreOfertaValid ? "is-invalid" : ""}
									/>
									<Form.Control.Feedback type="invalid">
										Seleccionar el puesto de trabajo para el proceso de
										selección.
									</Form.Control.Feedback>
								</Form.Group>
							</Row>
						</Col>
					</Form.Group>
					<Form.Group className="mb-2" as={Row}>
						<Form.Group className="mb-2" as={Col}>
							<Form.Group className="mb-2" as={Row}>
								<Form.Label
									column
									style={{
										alignItems: "center",
										justifyContent: "center",
										height: "2rem",
										fontSize: "15px"
									}}>
									Cantidad de vacantes: (*)
								</Form.Label>
							</Form.Group>
							<Form.Group>
								<Form.Control
									style={{ width: "15rem", maxWidth: "15rem" }}
									type="text"
									placeholder="Número de vacantes"
									value={cantVacantes}
									onChange={handlecantVacantes}
									required
									isInvalid={!isCantVacantesValid}
									isValid={!isCantVacantesValid}
								/>
								<Form.Control.Feedback type="invalid">
									Valores enteros mayores a 0.
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Group>
						<Form.Group className="mb-2" as={Col}>
							<Col>
								<Row>
									<Form.Label
										column
										style={{
											alignItems: "center",
											justifyContent: "center",
											fontSize: "15px"
										}}>
										Responsables del proceso:
									</Form.Label>
								</Row>
							</Col>
							<Row>
								<Col>
									<Form.Control
										type="text"
										placeholder="Cantidad responsables"
										value={cantResponsables + " responsable(s) seleccionado(s)"}
										required
										disabled
										readOnly={true}
										style={{ width: "18rem", maxWidth: "18rem" }}
									/>
									<Form.Control.Feedback></Form.Control.Feedback>
								</Col>
								<Col>
									<div style={{ paddingLeft: "3.5rem" }}>
										<Button
											variant="primary"
											style={{
												width: "10rem",
												maxWidth: "10rem"
											}}
											className="ml-auto custom"
											onClick={handleShowBuscadorResponsableFromButtom}>
											Ver responsables
										</Button>
									</div>
								</Col>
							</Row>
						</Form.Group>
					</Form.Group>
					<br />
					<Form.Group className="mb-2">
						<Row>
							<Col
								md={{
									span: 4
								}}>
								<h1>
									<small
										className="opacity-90"
										style={{
											marginTop: "100px",
											fontSize: "17px",
											verticalAlign: "bottom"
										}}>
										Etapas del proceso de selección:
									</small>
								</h1>
							</Col>
							<Col
								md={{
									span: 1,
									offset: 6
								}}>
								<Button
									variant="primary"
									onClick={() => openModal(null, true)}
									style={{ width: "10rem", maxWidth: "10rem" }}
									className="ml-auto custom">
									Agregar etapa
								</Button>
							</Col>
						</Row>
					</Form.Group>

					{/* EMPIEZA LA TABLA ------------------------------------------------------------------- */}
					<div style={{ paddingLeft: "1%", maxWidth: "99%" }}>
						<Form.Group
							className="mb-1"
							as={Row}
							controlId="validationCustom04"
							style={{
								border: "1px solid #ddd",
								borderRadius: "4px",
								maxHeight: "18rem",
								overflowY: "auto",
								borderCollapse: "collapse",
								marginBottom: "18rem",
								height: "500px"
							}}>
							<Table striped={true} bordered>
								<thead
									style={{
										position: "sticky",
										top: 0,
										backgroundColor: "white",
										zIndex: "1"
									}}>
									<tr>
										<th style={{ width: "2rem" }}>N°</th>
										<th style={{ width: "9rem" }}>Tipo de etapa</th>
										<th style={{ width: "15rem" }}>Nombre de la etapa</th>
										<th style={{ width: "8rem" }}>Fecha inicio</th>
										<th style={{ width: "8rem" }}>Fecha fin</th>
										<th>Estado</th>
										<th style={{ width: "12rem" }}>Acciones</th>
									</tr>
								</thead>
								<tbody>
									{rows.map((row) => (
										<tr key={row.id}>
											<td>{row.id}</td>
											<td>{row.nombreTipoEtapa}</td>
											<td>{row.nombreEtapa}</td>
											<td>
												{row.fechaInicio instanceof Date
													? row.fechaInicio.toLocaleDateString()
													: row.fechaInicio}
											</td>
											<td>
												{row.fechaFin instanceof Date
													? row.fechaFin.toLocaleDateString()
													: row.fechaFin}
											</td>
											<td>{row.estado}</td>
											<td>
												<ButtonGroup>
													{/* Revisar etapa */}
													<Button variant="light" className="custom-btn">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
														</svg>
													</Button>
													{/* Crear etapa */}
													<Button variant="light" className="custom-btn">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
														</svg>
													</Button>
													{/* Editar etapa */}
													<Button
														variant="light"
														onClick={() => openModal(row, false)}>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
															<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
														</svg>
													</Button>
													{/* Eliminar etapa */}
													<Button
														variant="danger"
														onClick={() => handleDeleteRow(row.id)}>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
															<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
														</svg>
													</Button>
												</ButtonGroup>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Form.Group>
					</div>
					{/* Termina LA TABLA -------------------------------------------------------------------- */}

					<Row style={{ position: "static", borderTop: "10rem" }}>
						<p></p>
						<p></p>
						<Form.Group>
							<Row>
								<Col
									md={{
										span: 2
									}}>
									<Button
										variant="danger"
										style={{ width: "10rem", maxWidth: "10rem" }}
										onClick={() => setShowDeleteModal(true)}>
										Eliminar proceso
									</Button>
								</Col>
								<Col
									md={{
										span: 2,
										offset: 8
									}}>
									<Button
										type="submit"
										variant="primary"
										style={{ width: "10rem", maxWidth: "10rem" }}
										onClick={() => {
											if (
												selectedPuestoLaboral != "" &&
												typeof +cantVacantes == "number" &&
												+cantVacantes > 0
											) {
												setShowSaveModal(true);
											} else {
												setIsSelectedNombreOfertaValid(false);
											}
										}}>
										Guardar proceso
									</Button>
								</Col>
							</Row>
						</Form.Group>
					</Row>
				</Form>
			</div>

			<Modal show={showModal} onHide={closeModal}>
				<Form
					noValidate
					validated={validatedModal}
					onSubmit={handleSubmitModal}>
					<Modal.Header closeButton>
						<Modal.Title>
							{selectedRow
								? "Editar Información de la etapa"
								: "Agregar Información de la etapa"}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Seleccionar el tipo de etapa:</Form.Label>
							{selectedRow == null ? (
								<Dropdown drop="down-centered" align="end" className="mb-2">
									<Dropdown.Toggle
										variant="secondary"
										id="dropdown-basic"
										style={{ width: "100%", textAlign: "center" }}>
										{"Seleccionar el tipo de etapa:   \u00A0"}
									</Dropdown.Toggle>
									<Dropdown.Menu style={{ width: "100%", textAlign: "center" }}>
										{optionsTipoEtapaSelec
											? optionsTipoEtapaSelec.map((optionRow) => (
													<Dropdown.Item
														key={optionRow.id}
														onClick={() =>
															handleOptionsTipoEtapaSelec(optionRow)
														}>
														{optionRow.name}
													</Dropdown.Item>
											  ))
											: []}
									</Dropdown.Menu>
								</Dropdown>
							) : (
								""
							)}
							<Form.Control
								type="text"
								name="nombreTipoEtapa"
								value={
									selectedRow
										? selectedRow.nombreTipoEtapa
										: newRow.nombreTipoEtapa
								}
								placeholder="Tipo de etapa"
								style={{
									maxHeight: "8rem",
									textAlign: "center"
								}}
								onChange={() => {}}
								className="readonly-text"
								required
							/>
							<Form.Label
								id="passwordHelpBlock"
								muted
								style={{ fontSize: "0.8rem", maxHeight: "2rem" }}>
								* Al guardar el tipo de etapa no se puede modificar.
							</Form.Label>
						</Form.Group>

						{(newRow && newRow.idTipoEtapa == 2) ||
						(selectedRow && selectedRow.idTipoEtapa == 2) ? (
							<Form.Group>
								<Row>
									<Col xs="4" style={{ paddingTop: "0.5rem" }}>
										<Form.Label>Porcentaje a calificar:</Form.Label>
									</Col>
									<Col xs="6">
										<Form.Control
											type="text"
											name="porcenCalifica"
											value={
												selectedRow
													? selectedRow.porcenCalifica
													: newRow.porcenCalifica
											}
											placeholder="Escribir el porcentaje para la etapa."
											onChange={handleInputChange}
											style={stylesSelect}
											isInvalid={!isPorcenCalificaOk}
											isValid={!isPorcenCalificaOk}
											required
										/>
										<Form.Control.Feedback type="invalid">
											Valores enteros entre 0 y 100.
										</Form.Control.Feedback>
									</Col>
									<Col style={{ paddingTop: "0.5rem" }}>%</Col>
								</Row>
							</Form.Group>
						) : null}
						<hr />
						<Form.Group>
							<Form.Label>Nombre de la etapa:</Form.Label>
							<Form.Control
								type="text"
								name="nombreEtapa"
								value={
									selectedRow ? selectedRow.nombreEtapa : newRow.nombreEtapa
								}
								placeholder="Escribir el nombre de la etapa."
								onChange={handleInputChange}
								style={stylesSelect}
								required
							/>
							<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Descripción de la etapa:</Form.Label>
							<Form.Control
								as="textarea"
								type="text"
								rows={2}
								name="descripcionEtapa"
								value={
									selectedRow
										? selectedRow.descripcionEtapa
										: newRow.descripcionEtapa
								}
								placeholder="Escribir la descripción de la etapa del proceso de selección."
								onChange={handleInputChange}
								style={stylesSelect}
								required
							/>
							<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Fecha de inicio:</Form.Label>
							<Form.Control
								type="date"
								name="fechaInicio"
								value={
									selectedRow
										? new Date(selectedRow.fechaInicio)
												.toISOString()
												.slice(0, 10)
										: new Date(newRow.fechaInicio).toISOString().slice(0, 10)
								}
								onChange={handleInputChange}
								style={stylesSelect}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Fecha de fin:</Form.Label>
							<Form.Control
								type="date"
								name="fechaFin"
								value={
									selectedRow
										? new Date(selectedRow.fechaFin).toISOString().slice(0, 10)
										: new Date(newRow.fechaFin).toISOString().slice(0, 10)
								}
								onChange={handleInputChange}
								style={stylesSelect}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ width: "8rem", maxWidth: "8rem" }}
							variant="secondary"
							onClick={closeModal}>
							Cancelar
						</Button>
						<Button
							style={{ width: "8rem", maxWidth: "8rem" }}
							type="submit"
							variant="primary"
							onClick={handleAddRowEtapa}>
							{selectedRow ? "Guardar etapa" : "Agregar etapa"}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/* Modal para Eliminar */}
			<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmar Eliminación</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					¿Estás seguro de que deseas eliminar esta oferta laboral?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
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
					<Button variant="secondary" onClick={() => setShowSaveModal(false)}>
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

			{showModalBuscadorResponsable && (
				<SearchInputResponsablesNuevo
					arrResponsables={arrResponsables}
					onClose={handleCloseBuscadorResponsableFromButtom}
					onSelect={handleOptionSelectBuscadorResponsable}
				/>
			)}
		</div>
	);
}

export default ConfigProcesoSeleccion;
