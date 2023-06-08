import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import {
	Modal,
	Form,
	FormControl,
	Button,
	Table,
	ListGroup
} from "react-bootstrap";
import "./SearchInputResponsable.css";

const SearchInputResponsable = ({ onClose, onSelect }) => {
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
			{ id: 1, nombre: "Puesto 1 - Proceso seleccion", fecha: "A" },
			{ id: 2, nombre: "Puesto 2 - Proceso seleccion", fecha: "A" },
			{ id: 3, nombre: "Puesto 3 - Proceso seleccion", fecha: "A" },
			{ id: 4, nombre: "Puesto 4 - Proceso seleccion", fecha: "A" }
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

	// NUEVA TABLA
	const ExpandedComponent = ({ data }) => (
		<pre>{JSON.stringify(data, null, 2)}</pre>
	);

	const columns = [
		{
			name: "Title",
			selector: (row) => row.title,
			sortable: true
		},
		{
			name: "Year",
			selector: (row) => row.year,
			sortable: true
		}
	];

	const data = [
		{
			id: 1,
			title: "Beetlejuice",
			year: "1988"
		},
		{
			id: 2,
			title: "Ghostbusters",
			year: "1984"
		}
	];

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
					<Modal.Title>Buscar informaciónD</Modal.Title>
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
					<div>
						{" "}
						<DataTable
							columns={columns}
							data={data}
							expandableRows
							expandableRowsComponent={ExpandedComponent}
						/>
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

export default SearchInputResponsable;
