import React from "react";
import { BsTrash } from "react-icons/bs";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
    ButtonGroup,
    FormGroup,
    FormControl,
    FormText,
    FormLabel,
    FormSelect,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import axiosInt from "@config/axios";
import { Fragment, ChangeEvent, useEffect, useRef, useState } from "react";
import Sidebar from "@components/Sidebar";
import sidebarItems from "../../utils/sidebarItems";
import PhotoCard from "@features/Modulo4/components/PhotoCard";
import SearchInput from "@features/Modulo4/components/SearchInput";
import CustomInput from "@features/Modulo4/components/CustomInput";
import { TextCenter } from "react-bootstrap-icons";

function ConfigProcesoSeleccion(props: any) {
    const createLP = () => {
        /*
        const data = {
            nombre: refLpName.current?.value,
            descripcion: refLpDescription.current?.value,
        };

        axiosInt
            .post("capacitaciones/learning_path/", data)
            .then(function (response) {
                navigate(
                    `/modulo1/rutadeaprendizaje/detalle/${response.data.id}`
                );
            })
            .catch(function (error) {
                console.log(error);
            });
            */
    };
    const loadLPs = () => {
        /*
        axiosInt
            .get("capacitaciones/learning_path/")
            .then(function (response) {
                setLps(response.data);
                setLpsFiltered(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });*/
    };

    useEffect(() => {
        loadLPs();
    }, []);

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
        marginBottom: "0.78rem",
    };

    // AREA DE TRABAJO

    const [selectedPuestoSeleecionado, setSelectedPuestoSeleecionado] =
        useState("");
    const [cantVacantes, setCantVacantes] = useState("");
    const [isSelectedNombreOfertaValid, setIsSelectedNombreOfertaValid] =
        useState(true);

    const handleNombrePuestoSeleccionado = (event: any) => {
        const optionValue = event.target.value;
        const isValid = optionValue.trim() !== "";

        setIsSelectedNombreOfertaValid(isValid);
        setSelectedPuestoSeleecionado(optionValue);
    };

    useEffect(() => {
        console.log(isSelectedNombreOfertaValid);
    }, [isSelectedNombreOfertaValid]);

    const handlecantVacantes = (event: any) => {
        const optionValue = event.target.value;
        setCantVacantes(optionValue);
    };

    const optionsTipoJornada = [
        { value: "", label: "Selecciona una opción" },
        { value: "opcion1", label: "Tipo jornada 1" },
        { value: "opcion2", label: "Tipo jornada 2" },
        { value: "opcion3", label: "Tipo jornada 3" },
    ];

    // TABLA DE ETAPAS DEL PROCESO DE SELECCIÓN
    interface TableRow {
        id: number;
        nombreEtapa: string;
        descripcionEtapa: string;
        fechaInicio: Date | string;
        fechaFin: Date | string;
        estado: string;
    }
    const [rows, setRows] = useState<TableRow[]>([]);
    const [newRow, setNewRow] = useState<TableRow>({
        id: 0,
        nombreEtapa: "",
        descripcionEtapa: "",
        fechaInicio: new Date(),
        fechaFin: new Date(),
        estado: "",
    });
    const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (selectedRow) {
            console.log("------");
            console.log("evento");
            setSelectedRow((prevRow) => ({
                ...prevRow,
                [name]: value,
            }));
        } else {
            setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
        }
    };

    /*
    useEffect(() => {
        console.log(rows);
    }, [rows]);

    useEffect(() => {
        console.log(newRow);
    }, [newRow]);

    useEffect(() => {
        console.log(selectedRow);
    }, [selectedRow]);
    */

    const [idCounter, setIdCounter] = useState(0); // Contador para el ID
    const handleAddRow = () => {
        if (selectedRow === null) {
            // Agregar nueva fila
            setRows((prevRows) => [
                ...prevRows,
                { ...newRow, id: idCounter + 1, estado: "Sin configurar" }, // Usar el valor actual del contador más 1 como nuevo ID
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
            nombreEtapa: "",
            descripcionEtapa: "",
            fechaInicio: new Date(),
            fechaFin: new Date(),
            estado: "",
        });
        setSelectedRow(null);
        setShowModal(false);
        setIdCounter((prevCounter) => prevCounter + 1); // Incrementar el contador en 1
    };

    const handleDeleteRow = (id: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const openModal = (row: TableRow | null) => {
        setSelectedRow(row);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
        setSelectedPuestoSeleecionado(selectedOption);
    };

    // ESTOS MODAL SE USARAN EN LOS BOTONES DE ELIMINAR Y GUARDAR
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const handleDelete = () => {
        // Lógica para eliminar
        setShowDeleteModal(false);
    };

    const handleSaveChanges = () => {
        // Lógica para guardar cambios
        setShowSaveModal(false);
    };

    return (
        <Sidebar
            items={sidebarItems}
            active="/modulo1/configurar-oferta-laboral"
        >
            <div className="row">
                <div className="col">
                    <h1>Configurar proceso de selección</h1>
                    <p>
                        <small
                            className="opacity-50"
                            style={{ marginBottom: "10rem" }}
                        >
                            Portal que presenta la configuración disponible para
                            el proceso de selección de una posición.
                        </small>
                    </p>
                </div>
            </div>
            <div className="row">
                {/* FILA   ------- */}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="col-9">
                        <Form.Group
                            className="mb-2"
                            as={Row}
                            controlId="validationCustom01"
                        >
                            <Col>
                                <Form.Label>Nombre del puesto:</Form.Label>
                                <Row>
                                    <Col xs="10">
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            placeholder="Especificar el nombre del puesto"
                                            value={selectedPuestoSeleecionado}
                                            onChange={
                                                handleNombrePuestoSeleccionado
                                            }
                                            rows={3}
                                            required
                                            className={
                                                !isSelectedNombreOfertaValid
                                                    ? "is-invalid"
                                                    : ""
                                            }
                                        />
                                        <Form.Control.Feedback></Form.Control.Feedback>
                                    </Col>
                                    <Col>
                                        <Button
                                            onClick={
                                                handleShowBuscadorFromButtom
                                            }
                                        >
                                            Buscar puesto de trabajo
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            as={Row}
                            controlId="validationCustom02"
                        >
                            <Col md={2}>
                                <Form.Label style={{}}>
                                    Cantidad de vacantes:
                                </Form.Label>
                            </Col>
                            <Col md={{ span: 4, offset: 0 }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Número de vacantes"
                                    value={cantVacantes}
                                    onChange={handlecantVacantes}
                                    required
                                />
                                <Form.Control.Feedback></Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-1"
                            as={Row}
                            controlId="validationCustom03"
                        >
                            <Col>
                                <h5>
                                    <small
                                        className="opacity-90"
                                        style={{ marginTop: "100px" }}
                                    >
                                        Etapas del proceso de selección.
                                    </small>
                                </h5>
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => openModal(null)}
                                        style={stylesSelect}
                                        className="ml-auto custom"
                                    >
                                        Agregar etapa
                                    </Button>
                                </div>
                            </Col>
                        </Form.Group>
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
                                height: "500px",
                            }}
                        >
                            {/*---------------------------------------------------------------------------- */}
                            {/* AQUI EMPIEZA TODA LA TABLA*/}

                            <Table striped={true} bordered>
                                <thead
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        backgroundColor: "white",
                                        zIndex: "1",
                                    }}
                                >
                                    <tr>
                                        <th style={{ width: "50px" }}>Orden</th>
                                        <th style={{ width: "240px" }}>
                                            Nombre de la etapa
                                        </th>
                                        <th style={{ width: "130px" }}>
                                            Fecha de Inicio
                                        </th>
                                        <th style={{ width: "130px" }}>
                                            Fecha de Fin
                                        </th>
                                        <th>Estado</th>
                                        <th style={{ width: "145px" }}>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
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
                                                    <Button
                                                        variant="light"
                                                        onClick={() =>
                                                            openModal(row)
                                                        }
                                                        className="custom-btn"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                                        </svg>
                                                    </Button>
                                                    <Button
                                                        variant="light"
                                                        onClick={() =>
                                                            openModal(row)
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                        </svg>
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            handleDeleteRow(
                                                                row.id
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                        >
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

                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {selectedRow
                                            ? "Editar Información"
                                            : "Agregar Información"}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>
                                                Nombre etapa
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nombreEtapa"
                                                value={
                                                    selectedRow
                                                        ? selectedRow.nombreEtapa
                                                        : newRow.nombreEtapa
                                                }
                                                placeholder="Nombre Etapa"
                                                onChange={handleInputChange}
                                                style={stylesSelect}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Descripcion etapa
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="descripcionEtapa"
                                                value={
                                                    selectedRow
                                                        ? selectedRow.descripcionEtapa
                                                        : newRow.descripcionEtapa
                                                }
                                                placeholder="Descripción de la Etapa"
                                                onChange={handleInputChange}
                                                style={stylesSelect}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Fecha inicio
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="fechaInicio"
                                                value={
                                                    selectedRow
                                                        ? new Date(
                                                              selectedRow.fechaInicio
                                                          )
                                                              .toISOString()
                                                              .slice(0, 10)
                                                        : new Date(
                                                              newRow.fechaInicio
                                                          )
                                                              .toISOString()
                                                              .slice(0, 10)
                                                }
                                                onChange={handleInputChange}
                                                style={stylesSelect}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Fecha fin</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="fechaFin"
                                                value={
                                                    selectedRow
                                                        ? new Date(
                                                              selectedRow.fechaFin
                                                          )
                                                              .toISOString()
                                                              .slice(0, 10)
                                                        : new Date(
                                                              newRow.fechaFin
                                                          )
                                                              .toISOString()
                                                              .slice(0, 10)
                                                }
                                                onChange={handleInputChange}
                                                style={stylesSelect}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={closeModal}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleAddRow}
                                    >
                                        {selectedRow
                                            ? "Guardar Cambios"
                                            : "Agregar"}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Form.Group>

                        {/* AQUI termina LA TABLA*/}
                        {/*---------------------------------------------------------------------------- */}
                    </div>

                    <Row style={{ position: "static", borderTop: "10rem" }}>
                        <p></p>
                        <p></p>
                        <Col>
                            {/* Botón Eliminar */}
                            <Button
                                variant="danger"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                Eliminar proceso
                            </Button>
                        </Col>
                        <Col xs="auto" className="d-flex justify-content-end">
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={() => {
                                    if (
                                        selectedPuestoSeleecionado != "" &&
                                        typeof +cantVacantes == "number" &&
                                        +cantVacantes != 0
                                    ) {
                                        setShowSaveModal(true);
                                    } else {
                                        setIsSelectedNombreOfertaValid(false);
                                    }
                                }}
                            >
                                Guardar Cambios
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            {/* Modal para Eliminar */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta oferta laboral?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
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
                        onClick={() => setShowSaveModal(false)}
                    >
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
        </Sidebar>
    );
}

export default ConfigProcesoSeleccion;

/*
<div>
                <p>
                    Opción seleccionada:
                    {selectedPuestoSeleecionado +
                        " " +
                        cantVacantes +
                        " " +
                        rows}
                </p>
            </div>
*/

/*{showModalBuscador && (
                <SearchInput
                    onClose={handleCloseBuscadorFromButtom}
                    onSelect={handleOptionSelectBuscador}
                />
            )}

*/
