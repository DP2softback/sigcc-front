import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FixedHeaderStory from "react-data-table-component";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
	Modal,
	Form,
	FormControl,
	Button,
	Table,
	ListGroup
} from "react-bootstrap";
import "./SearchInputResponsablesNuevo.css";
import { forEach } from "lodash";

const customStylesTablesPersonal = {
	header: {
		style: {
			fontSize: "1rem" // override the row height
		}
	}
};

const SearchInput = ({ arrResponsables, onClose, onSelect }) => {
	const [showModal, setShowModal] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	const closeModal = () => {
		setShowModal(false);
		onClose();
	};

	// proceso de busqueda
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			performSearch(searchQuery);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	const performSearch = (query) => {
		setSearchResults(data);
		setFilteredResults(
			searchResults.filter((persona) =>
				persona.nombreCompleto.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	const closeOnSelectModal = () => {
		onSelect(arrSelectedResponsables);
		closeModal();
	};

	// TODOS LAS TABLAS ESTRUCTURA
	const columns = [
		{
			name: "Registro",
			selector: (row) => row.registro
		},
		{
			name: "Nombre y apellido",
			selector: (row) => row.nombreCompleto
		}
	];

	const data = [
		{
			idResponsable: 1,
			registro: "R123213",
			nombreCompleto: "Jaime Lannister"
		},
		{
			idResponsable: 2,
			registro: "R333413",
			nombreCompleto: "Eddard Stark"
		},
		{
			idResponsable: 3,
			registro: "R723513",
			nombreCompleto: "Jon Snow"
		},
		{
			idResponsable: 4,
			registro: "R623513",
			nombreCompleto: "Daenerys Targaryen"
		},
		{
			idResponsable: 5,
			registro: "R343513",
			nombreCompleto: "Tyrion Lannister"
		},
		{
			idResponsable: 6,
			registro: "R323513",
			nombreCompleto: "Sansa Stark"
		},
		{
			idResponsable: 7,
			registro: "R555513",
			nombreCompleto: "Arya Stark"
		}
	];

	interface TableRow {
		idResponsable: number;
		registro: string;
		nombreCompleto: string;
	}

	useEffect(() => {
		setArrSelectedResponsables(arrResponsables);
	}, [arrResponsables]);

	// primera tabla
	const [selectedTrabajador, setSelectedReponsable] = useState<TableRow | null>(
		null
	);
	const [arrSelectedResponsables, setArrSelectedResponsables] = useState([]);
	const [toggleClearedTrabajador, setToggleClearedTrabajador] =
		React.useState(false);

	const handleChangeSelectTable = ({ selectedRows }) => {
		setSelectedReponsable(selectedRows);
	};

	const handleAddResponsableToTable = () => {
		console.log("selectedTrabajador:", selectedTrabajador); // Verificar si selectedTrabajador está definido y es un array
		console.log("arrSelectedResponsables:", arrSelectedResponsables); // Verificar si selectedTrabajador está definido y es un array

		setToggleClearedTrabajador(!toggleClearedTrabajador);
		if (Array.isArray(selectedTrabajador) && selectedTrabajador.length > 0) {
			forEach(selectedTrabajador, (trabajador) => {
				setArrSelectedResponsables((arrSelectedResponsables) => {
					if (!arrSelectedResponsables.some((item) => item === trabajador)) {
						return [...arrSelectedResponsables, trabajador];
					}
					return arrSelectedResponsables;
				});
			});
		}
	};

	const contextActionsTrabajador = React.useMemo(() => {
		return (
			<Button
				key="delete"
				onClick={handleAddResponsableToTable}
				style={{
					backgroundColor: "blue",
					width: "10rem",
					maxWidth: "10rem",
					height: "2.4rem",
					maxHeight: "2.4rem"
				}}>
				Agregar
			</Button>
		);
	}, [data, selectedTrabajador, toggleClearedTrabajador]);

	// segunda tabla
	const [selectedResponsable, setSelectedResponsable] = useState<
		TableRow | any
	>(null);
	const [toggleClearedResponsable, setToggleClearedResponsable] =
		React.useState(false);

	const handleRowSelected = React.useCallback((state) => {
		setSelectedResponsable(state.selectedRows);
	}, []);

	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			setToggleClearedResponsable(!toggleClearedResponsable);

			setArrSelectedResponsables(
				arrSelectedResponsables.filter(
					(responsable) =>
						!(selectedResponsable as any[]).some(
							(selected) => selected.idResponsable === responsable.idResponsable
						)
				)
			);
		};

		return (
			<Button
				key="delete"
				onClick={handleDelete}
				style={{
					backgroundColor: "red",
					width: "10rem",
					maxWidth: "10rem",
					height: "2.4rem",
					maxHeight: "2.4rem"
				}}>
				Eliminar
			</Button>
		);
	}, [arrSelectedResponsables, selectedResponsable, toggleClearedResponsable]);

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
					<Modal.Title>
						Búsqueda de personal responsable del proceso de selección
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ paddingLeft: "3%", maxWidth: "98%" }}>
					<Row style={{ paddingLeft: "3%" }}>
						<Form>
							<Form.Group controlId="searchInput">
								<Form.Label style={{ marginBottom: "3s.78em" }}>
									Buscar al personal responsable:
								</Form.Label>
								<FormControl
									type="text"
									placeholder="Escribe aquí el nombre del personal"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									style={{ marginBottom: "3s.78em", maxWidth: "98%" }}
								/>
							</Form.Group>
						</Form>{" "}
					</Row>
					<Row>
						<div style={{ height: "19rem" }}>
							<FixedHeaderStory
								title="Lista del personal de RR.HH."
								columns={columns}
								data={filteredResults}
								selectableRows
								contextActions={contextActionsTrabajador}
								onSelectedRowsChange={handleChangeSelectTable}
								clearSelectedRows={toggleClearedTrabajador}
								pagination
								fixedHeader
								fixedHeaderScrollHeight="12rem"
								customStyles={customStylesTablesPersonal}
							/>
						</div>
					</Row>
					<hr />
					<Row>
						<div style={{ height: "16rem" }}>
							<FixedHeaderStory
								title="Listado de responsables seleccionados"
								columns={columns}
								data={arrSelectedResponsables}
								selectableRows
								contextActions={contextActions}
								onSelectedRowsChange={handleRowSelected}
								clearSelectedRows={toggleClearedResponsable}
								pagination
								fixedHeader
								fixedHeaderScrollHeight="11rem"
								customStyles={customStylesTablesPersonal}
							/>
						</div>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Cerrar
					</Button>
					<Button
						style={{
							width: "10rem",
							maxWidth: "10rem"
						}}
						variant="secondary"
						onClick={closeOnSelectModal}>
						Guardar cambios
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SearchInput;
