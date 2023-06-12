import React, { useState, useEffect } from "react";

import {
	Modal,
	Form,
	FormControl,
	Button,
	Table,
	ListGroup
} from "react-bootstrap";
import "./SearchInput.css";
import {
	SAMPLE_TOKEN,
	LOCAL_CONNECTION,
	LIST_ALL_PROCESOS_SELECCION
} from "@features/Modulo4/utils/constants";
import { ajax } from "@features/Modulo4/tools/ajax";
import moment from "moment";

const SearchInput = ({ onClose, onSelect }) => {
	const [showModal, setShowModal] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	const openModal = () => {
		// Lógica para abrir el modal y realizar la búsqueda inicial
		setShowModal(true);
		//performSearch("ejemplo");
	};

	const closeModal = () => {
		// Lógica para cerrar el modal
		setShowModal(false);
		onClose();
	};

	// proceso de busqueda
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);
	const [selectedResult, setSelectedResult] = useState(null);
	const [resultToSend, setResultToSend] = useState(null);

	useEffect(() => {
		console.log(searchQuery);
		// Establecer un temporizador para retrasar la ejecución de la búsqueda después de que el usuario deje de escribir
		const timer = setTimeout(() => {
			performSearch(searchQuery);
		}, 300); // Intervalo de tiempo (en milisegundos) antes de realizar la búsqueda

		// Limpiar el temporizador anterior cada vez que se escriba una nueva entrada
		return () => clearTimeout(timer);
	}, [searchQuery]);

	// OBTIENE LOS PROCESOS DE SELECCION
	const getProcesosSeleccion = async () => {
		const optionsRequest = {
			method: "GET",
			url: LOCAL_CONNECTION + LIST_ALL_PROCESOS_SELECCION,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		};
		return await ajax(optionsRequest);
	};

	useEffect(() => {
		const fetchData = async () => {
			const procesos_seleccion = await getProcesosSeleccion();
			setSearchResults(procesos_seleccion);
		};

		fetchData();
	}, []);

	const performSearch = (query) => {
		// Lógica para realizar la búsqueda y actualizar los resultados
		/*
		const results = [
			{ id: 1, nombre: "Puesto 1", fecha: "2023-03-04" },
			{ id: 2, nombre: "Puesto 2", fecha: "2023-03-04" },
			{ id: 3, nombre: "Puesto 3", fecha: "2023-03-04" },
			{ id: 4, nombre: "Puesto 4", fecha: "2023-03-04" }
		];
		//setSearchResults(results);
		*/
		setFilteredResults(
			searchResults.filter((item) =>
				item.name.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	const selectOption = (option: any) => {
		setSelectedResult(option.id);
		setResultToSend(option);
	};

	const closeOnSelectModal = () => {
		if (selectedResult != null) {
			onSelect(resultToSend);
			closeModal();
		}
	};

	return (
		<>
			<Modal
				show={showModal}
				onHide={closeModal}
				size="lg"
				className="custom-modal"
				style={{
					borderCollapse: "collapse",
					height: "100 rem"
				}}>
				<Modal.Header closeButton>
					<Modal.Title>Buscar información</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="searchInput">
							<Form.Label style={{ marginBottom: "3s.78em" }}>
								Buscar:
							</Form.Label>
							<FormControl
								type="text"
								placeholder="Escribe aquí"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								style={{ marginBottom: "3s.78em" }}
							/>
							<div>
								<br />
							</div>
						</Form.Group>
						<Form.Label style={{ marginBottom: "3s.78em" }}>
							Resultados:
						</Form.Label>
					</Form>
					<div
						style={{
							border: "1px solid #ddd",
							borderRadius: "4px",
							maxHeight: "18rem",
							overflowY: "auto",
							borderCollapse: "collapse",
							marginBottom: "1rem",
							height: "20rem"
						}}>
						<Table striped bordered>
							<thead
								style={{
									position: "sticky",
									top: 0,
									backgroundColor: "white"
								}}>
								<tr>
									<th style={{ width: "3rem" }}>Nombre</th>
									<th style={{ minWidth: "14rem" }}>Fecha de creación</th>
									<th style={{ minWidth: "14rem" }}>Fecha de modificación</th>
								</tr>
							</thead>
							<tbody>
								{filteredResults.map((result) => (
									<tr
										key={result.id}
										onClick={() => selectOption(result)}
										className={selectedResult === result.id ? "selected" : ""}>
										<td>{result.name}</td>
										<td>
											{moment(result.creationDate).format("YYYY-MM-DD hh:ss")}
										</td>
										<td>
											{moment(result.modifiedDate).format("YYYY-MM-DD hh:ss")}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Cerrar
					</Button>
					<Button variant="secondary" onClick={closeOnSelectModal}>
						Seleccionar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SearchInput;
