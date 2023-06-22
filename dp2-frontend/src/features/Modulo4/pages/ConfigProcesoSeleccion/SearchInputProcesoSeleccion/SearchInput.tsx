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
	GET_POSICIONES_TRABAJO
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

	// OBTIENE LAS POSICIONES DE TRABAJO
	const getPosicionesTrabajo = async () => {
		const optionsRequest = {
			method: "GET",
			url: LOCAL_CONNECTION + GET_POSICIONES_TRABAJO,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		};
		return await ajax(optionsRequest);
	};

	useEffect(() => {
		const fetchData = async () => {
			const posiciones = await getPosicionesTrabajo();
			console.log(posiciones);
			setSearchResults(posiciones);
		};

		fetchData();
	}, []);

	const performSearch = (query) => {
		// Lógica para realizar la búsqueda y actualizar los resultados
		/*
		const results = [
			{ id: 1, nombre: "Ingeniero de Software Senior", fecha: "2023-03-04" },
			{ id: 2, nombre: "Desarrollador Full Stack", fecha: "2023-03-05" },
			{
				id: 3,
				nombre: "Especialista en Marketing Digital",
				fecha: "2023-03-06"
			},
			{ id: 4, nombre: "Analista de Datos", fecha: "2023-03-07" },
			{ id: 5, nombre: "Diseñador UX/UI", fecha: "2023-03-08" },
			{ id: 6, nombre: "Project Manager", fecha: "2023-03-09" },
			{ id: 7, nombre: "Consultor Financiero", fecha: "2023-03-10" },
			{
				id: 8,
				nombre: "Especialista en Recursos Humanos",
				fecha: "2023-03-11"
			},
			{ id: 9, nombre: "Técnico de Soporte IT", fecha: "2023-03-12" },
			{ id: 10, nombre: "Ingeniero de Redes", fecha: "2023-03-13" }
		];*/
		//setSearchResults(results);
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

	//				className="custom-modal"

	return (
		<div
			style={{
				minWidth: "30rem",
				maxWidth: "30rem"
			}}>
			<Modal
				show={showModal}
				onHide={closeModal}
				size="lg"
				style={{
					borderCollapse: "collapse"
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
							overflowX: "auto",
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
									<th style={{ minWidth: "20rem" }}>Nombre del puesto</th>
									<th style={{ minWidth: "14rem" }}>Tipo de jornada</th>
									<th style={{ minWidth: "10rem" }}>Fecha de creación</th>
									<th style={{ minWidth: "12rem" }}>Fecha de modificación</th>
								</tr>
							</thead>
							<tbody>
								{filteredResults.map((result) => (
									<tr
										key={result.id}
										onClick={() => selectOption(result)}
										className={selectedResult === result.id ? "selected" : ""}>
										<td>{result.name}</td>
										<td>{result.tipoJornada}</td>
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
		</div>
	);
};

export default SearchInput;
