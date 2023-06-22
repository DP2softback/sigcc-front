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
		const timer = setTimeout(() => {
			performSearch(searchQuery);
		}, 300); // Intervalo de tiempo (en milisegundos) antes de realizar la búsqueda

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
			//console.log(posiciones);
			setSearchResults(posiciones);
		};

		fetchData();
	}, []);

	const performSearch = (query) => {
		if (query == "") {
			setFilteredResults([]);
		} else {
			//console.log(searchResults);
			setFilteredResults(
				searchResults.filter((item) =>
					item.position_name.toLowerCase().includes(query.toLowerCase())
				)
			);
		}
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
								placeholder="Escribe aquí el nombre del puesto de trabajo buscado."
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
									<th style={{ minWidth: "7rem" }}>Área</th>
									<th style={{ minWidth: "16rem" }}>Nombre del puesto</th>
									<th style={{ minWidth: "10rem" }}>Tipo de jornada</th>
									<th style={{ minWidth: "10rem" }}>Modalidad</th>
									<th style={{ minWidth: "5rem" }}>Cantidad actual</th>
									<th style={{ minWidth: "5rem" }}>Cantidad requerida</th>
									<th style={{ minWidth: "12rem" }}>Fecha de modificación</th>
								</tr>
							</thead>
							<tbody>
								{filteredResults.map((result) => (
									<tr
										key={result.id}
										onClick={() => selectOption(result)}
										className={selectedResult === result.id ? "selected" : ""}>
										<td>{result.area_name}</td>
										<td>{result.position_name}</td>
										<td>{result.position_detail.tipoJornada}</td>
										<td>{result.position_detail.modalidadTrabajo}</td>
										<td>{result.availableQuantity}</td>
										<td>{result.unavailableQuantity}</td>
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
