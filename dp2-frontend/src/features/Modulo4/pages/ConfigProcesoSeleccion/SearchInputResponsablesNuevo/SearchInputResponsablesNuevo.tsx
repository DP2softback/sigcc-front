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
import {
	SAMPLE_TOKEN,
	LOCAL_CONNECTION,
	GET_ALL_EMPLOYEES
} from "@features/Modulo4/utils/constants";
import { ajax } from "@features/Modulo4/tools/ajax";
import moment from "moment";

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

	const closeOnSelectModal = () => {
		onSelect(arrSelectedResponsables);
		closeModal();
	};

	// get all trabajadores de RR.HH.
	const getEmployeesRRHH = async () => {
		const optionsRequest = {
			method: "GET",
			url: LOCAL_CONNECTION + GET_ALL_EMPLOYEES,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		};
		return await ajax(optionsRequest);
	};

	useEffect(() => {
		const fetchData = async () => {
			const arrEmpCompleto = await getEmployeesRRHH();
			const arrEmpleados = arrEmpCompleto.map(({ id, user }) => ({
				id: id,
				user: user
			}));
			//console.log("arrEmpleados:", arrEmpleados);
			setSearchResults(arrEmpleados);
		};

		fetchData();
	}, []);

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
		if (query == "") {
			setFilteredResults([]);
		} else {
			setFilteredResults(
				searchResults.filter((persona) =>
					(persona.user.last_name + persona.user.first_name)
						.toLowerCase()
						.includes(query.toLowerCase())
				)
			);
		}
	};

	// TODOS LAS TABLAS ESTRUCTURA
	const columns = [
		{
			name: "Nombre completo",
			selector: (row) => row.user.last_name + " " + row.user.first_name
		},
		{
			name: "Correo eletrónico",
			selector: (row) => row.user.email
		}
	];

	interface TableRow {
		id: number;
		last_name: string;
	}

	// primera tabla
	const [selectedTrabajador, setSelectedReponsable] = useState<TableRow | null>(
		null
	);
	const [arrSelectedResponsables, setArrSelectedResponsables] = useState([]);
	const [toggleClearedTrabajador, setToggleClearedTrabajador] =
		React.useState(false);

	useEffect(() => {
		setArrSelectedResponsables(arrResponsables);
	}, [arrResponsables]);

	const handleChangeSelectTable = ({ selectedRows }) => {
		setSelectedReponsable(selectedRows);
	};

	const handleAddResponsableToTable = () => {
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
	}, [searchResults, selectedTrabajador, toggleClearedTrabajador]);

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
							(selected) => selected.id === responsable.id
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
		<div
			style={{
				minWidth: "40rem",
				maxWidth: "40rem"
			}}>
			<Modal
				show={showModal}
				onHide={closeModal}
				size="xl"
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
					<Row style={{ paddingLeft: "1.6%" }}>
						<Form>
							<Form.Group controlId="searchInput">
								<Form.Label
									style={{ marginBottom: "3s.78em", fontSize: "1rem" }}>
									Búsqueda de personal RR.HH. responsable:
								</Form.Label>
								<FormControl
									type="text"
									placeholder="Escribe el nombre del personal."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									style={{ marginBottom: "3s.78em", maxWidth: "98%" }}
								/>
							</Form.Group>
						</Form>
					</Row>
					<Row>
						<Col>
							<div style={{ height: "20rem" }}>
								<FixedHeaderStory
									title="Resultados de búsqueda"
									noDataComponent="No hay resultados de búsqueda"
									columns={columns}
									data={filteredResults}
									selectableRows
									contextActions={contextActionsTrabajador}
									onSelectedRowsChange={handleChangeSelectTable}
									clearSelectedRows={toggleClearedTrabajador}
									pagination
									fixedHeader
									fixedHeaderScrollHeight="14rem"
									customStyles={customStylesTablesPersonal}
								/>
							</div>
						</Col>
						<Col>
							<div style={{ height: "20rem" }}>
								<FixedHeaderStory
									title="Responsables seleccionados"
									noDataComponent="No hay responsables seleccionados"
									columns={columns}
									data={arrSelectedResponsables}
									selectableRows
									contextActions={contextActions}
									onSelectedRowsChange={handleRowSelected}
									clearSelectedRows={toggleClearedResponsable}
									pagination
									fixedHeader
									fixedHeaderScrollHeight="14rem"
									customStyles={customStylesTablesPersonal}
								/>
							</div>
						</Col>
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
		</div>
	);
};

export default SearchInput;
