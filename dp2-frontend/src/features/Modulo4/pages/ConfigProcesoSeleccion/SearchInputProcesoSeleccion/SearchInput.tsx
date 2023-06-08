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

	const performSearch = (query) => {
		// Lógica para realizar la búsqueda y actualizar los resultados

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
		];
		setSearchResults(results);
		setFilteredResults(
			searchResults.filter((item) =>
				item.nombre.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	const selectOption = (option: any) => {
		setSelectedResult(option.nombre);
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
				size="xl"
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
									<th style={{ width: "0.2rem" }}>Fecha de creación</th>
									<th style={{ width: "12rem" }}>Nombre</th>
								</tr>
							</thead>
							<tbody>
								{filteredResults.map((result) => (
									<tr
										key={result.id}
										onClick={() => selectOption(result)}
										className={
											selectedResult === result.nombre ? "selected" : ""
										}>
										<td>{result.fecha}</td>
										<td>{result.nombre}</td>
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
