import React from "react";
import { BsTrash } from "react-icons/bs";
import {
    Form,
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
import CustomInput from "@features/Modulo4/components/CustomInput";
import { TextCenter } from "react-bootstrap-icons";

function ConfigOfertaLaboral(props: any) {
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

    const handleFilter = (event: any) => {};

    const styleText = {
        width: "100%",
    };

    const stylesSelect = {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.78rem",
    };

    // AREA DE TRABAJO
    const [selectedNombreOferta, setSelectedNombreOferta] = useState("");
    const [selectedAreaTrabajo, setSelectedAreaTrabajo] = useState("");
    const [selectedTipoPuesto, setSelectedTipoPuesto] = useState("");
    const [selectedTipoJornada, setSelectedTipoJornada] = useState("");
    const [selectedGradoExp, setSelectedGradoExp] = useState("");

    const handleNombreOferta = (event: any) => {
        const optionValue = event.target.value;
        setSelectedNombreOferta(optionValue);
    };
    const handleFilterAreaTrabajo = (event: any) => {
        const optionValue = event.target.value;
        setSelectedAreaTrabajo(optionValue);
    };
    const handleFilterTipoPuesto = (event: any) => {
        const optionValue = event.target.value;
        setSelectedTipoPuesto(optionValue);
    };
    const handleFilterTipoJornada = (event: any) => {
        const optionValue = event.target.value;
        setSelectedTipoJornada(optionValue);
    };
    const handleFilterGradoExp = (event: any) => {
        const optionValue = event.target.value;
        setSelectedGradoExp(optionValue);
    };

    const optionsAreaTrabajo = [
        { value: "", label: "Selecciona una opción" },
        { value: "opcion1", label: "Area trabajo 1" },
        { value: "opcion2", label: "Area trabajo 2" },
        { value: "opcion3", label: "Area trabajo 3" },
    ];
    const optionsTipoPuesto = [
        { value: "", label: "Selecciona una opción" },
        { value: "opcion1", label: "Tipo puesto 1" },
        { value: "opcion2", label: "Tipo puesto 2" },
        { value: "opcion3", label: "Tipo puesto 3" },
    ];
    const optionsTipoJornada = [
        { value: "", label: "Selecciona una opción" },
        { value: "opcion1", label: "Tipo jornada 1" },
        { value: "opcion2", label: "Tipo jornada 2" },
        { value: "opcion3", label: "Tipo jornada 3" },
    ];
    const optionsGradoExp = [
        { value: "", label: "Selecciona una opción" },
        { value: "opcion1", label: "Grado experiencia 1" },
        { value: "opcion2", label: "Grado experiencia 2" },
        { value: "opcion3", label: "Grado experiencia 3" },
    ];

    // DESCRIPCIONES 2 CUSTOM INPUTS
    const [descripcionPuesto, setDescripcionPuesto] = useState("");
    const handleInputChangeDescripcion = (event: any) => {
        const optionValue = event.target.value;
        setDescripcionPuesto(optionValue);
    };

    const [descripcionResponsa, setDescripcionResponsa] = useState("");
    const handleInputChangeResponsa = (event: any) => {
        const optionValue = event.target.value;
        setDescripcionResponsa(optionValue);
    };

    // IMAGEN DE REFERENCIA
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(
        null
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        inputRef.current?.click();
    };

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

    useEffect(() => {
        console.log("rows");
        console.log(rows);
    }, [rows]);

    useEffect(() => {
        console.log("newRow");
        console.log(newRow);
    }, [newRow]);

    useEffect(() => {
        console.log("selectedRow");
        console.log(selectedRow);
    }, [selectedRow]);

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
        setShowSaveModal(false);
    };
    return (
        <Sidebar
            items={sidebarItems}
            active="/modulo1/configurar-oferta-laboral"
        >
            <div className="row">
                <div className="col">
                    <h1>Configurar oferta laboral</h1>
                    <p>
                        <small
                            className="opacity-50"
                            style={{ marginBottom: "10rem" }}
                        >
                            Portal que presenta la configuración disponible para
                            el proceso de selección de una oferta laboral.
                        </small>
                    </p>
                </div>
                <div style={{ flex: "0 0 15rem" }} className="col text-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-target="#createLPModalChoose"
                        data-bs-toggle="modal"
                        onClick={() => setShowPublicarModal(true)}
                    >
                        <span className="me-3">Publicar oferta</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </button>

                    {/* Modal para Guardar Cambios */}
                    <Modal
                        show={showPublicarModal}
                        onHide={() => setShowPublicarModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Publicar Oferta Laboral</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Desea publicar la oferta laboral?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowPublicarModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handlePublicar}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="row">
                {/* FILA   ------- */}
                <div className="col-8" style={{ marginRight: "14px" }}>
                    <div style={stylesSelect}>
                        <span style={{ width: "23%" }}>
                            Nombre del puesto: (*)
                        </span>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Especificar el nombre del puesto"
                            onChange={handleNombreOferta}
                        />
                    </div>

                    {/* FILA   ------- */}

                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div style={stylesSelect}>
                                    <span style={{ width: "67%" }}>
                                        Area de trabajo: (*)
                                    </span>
                                    <select
                                        className="form-select"
                                        onChange={handleFilterAreaTrabajo}
                                    >
                                        {optionsAreaTrabajo.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow"></div>
                                </div>{" "}
                            </div>
                            <div className="col">
                                <div style={stylesSelect}>
                                    <span style={{ width: "76%" }}>
                                        Tipo de puesto: (*)
                                    </span>
                                    <select
                                        className="form-select"
                                        onChange={handleFilterTipoPuesto}
                                    >
                                        {optionsTipoPuesto.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow"></div>
                                </div>{" "}
                            </div>
                        </div>

                        {/* FILA   ------- */}

                        <div className="row">
                            <div className="col">
                                <div style={stylesSelect}>
                                    <span style={{ width: "67%" }}>
                                        Tipo de jornada: (*)
                                    </span>
                                    <select
                                        className="form-select"
                                        onChange={handleFilterTipoJornada}
                                    >
                                        {optionsTipoJornada.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow"></div>
                                </div>{" "}
                            </div>
                            <div className="col">
                                <div style={stylesSelect}>
                                    <span style={{ width: "76%" }}>
                                        Grado de experiencia: (*)
                                    </span>
                                    <select
                                        className="form-select"
                                        onChange={handleFilterGradoExp}
                                    >
                                        {optionsGradoExp.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow"></div>
                                </div>{" "}
                            </div>
                        </div>
                    </div>

                    {/*---------------------------------------------------------------------------- */}
                    {/* AQUI TODA LA TABLA*/}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "1rem",
                        }}
                    >
                        <h5>
                            <small
                                className="opacity-90"
                                style={{ marginTop: "100px" }}
                            >
                                Etapas del proceso de selección.
                            </small>
                        </h5>
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="primary"
                                onClick={() => openModal(null)}
                                style={stylesSelect}
                                className="ml-auto"
                            >
                                Agregar etapa
                            </Button>
                        </div>
                    </div>

                    <div
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            maxHeight: "300px",
                            overflowY: "auto",
                        }}
                    >
                        <Table striped={true} bordered>
                            <thead
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: "white",
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
                                    <th style={{ width: "145px" }}>Acciones</th>
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
                                                    className="small-button"
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
                                                        handleDeleteRow(row.id)
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
                                                </Button>{" "}
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
                                        <Form.Label>Nombre etapa</Form.Label>
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
                                        <Form.Label>Fecha inicio</Form.Label>{" "}
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
                                        <Form.Label>Fecha fin</Form.Label>{" "}
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
                                                    : new Date(newRow.fechaFin)
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
                    </div>
                    {/* AQUI termina LA TABLA*/}
                </div>

                {/*---------------------------------------------------------------------------- */}

                <div className="col-3">
                    {/* FILA   ------- */}
                    <span>Imagen referencial:</span>
                    <div className="image-upload">
                        <div>
                            <PhotoCard
                                imageSrc={previewUrl}
                                width={140}
                                height={100}
                            />
                        </div>
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleImageUpload}
                            className="d-none"
                            accept="image/*"
                        />
                        <button
                            style={{
                                width: "140px",
                                height: "40px",
                                marginBottom: "0.78rem",
                            }}
                            onClick={handleUpload}
                            className={`btn btn-outline-${
                                uploadedFileName ? "success" : "primary"
                            }`}
                        >
                            {uploadedFileName
                                ? uploadedFileName
                                : "Subir imagen"}
                        </button>
                    </div>
                    {/* FILA   ------- */}

                    <span>Descripción de la oferta laboral:</span>
                    <div style={{ marginBottom: "0.78rem" }}>
                        <CustomInput
                            placeholder="Descripción de la oferta"
                            onChange={handleInputChangeDescripcion}
                        />
                    </div>
                    <span>Descripción de las responsabilidades:</span>
                    <div style={{ marginBottom: "0.78rem" }}>
                        <CustomInput
                            placeholder="Descripción de las responsabilidades"
                            onChange={handleInputChangeResponsa}
                        />
                    </div>
                </div>

                <div></div>
            </div>
            <div
                className="row"
                style={{ marginBottom: "0.78rem", marginTop: "0.78rem" }}
            >
                <div className="col">
                    {/* Botón Eliminar */}
                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Eliminar
                    </Button>
                </div>
                <div className="col text-end">
                    {/* Botón Guardar Cambios */}
                    <Button
                        variant="primary"
                        onClick={() => setShowSaveModal(true)}
                    >
                        Guardar Cambios
                    </Button>
                </div>
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

            <div>
                <p>
                    Opción seleccionada:{" "}
                    {selectedNombreOferta +
                        " " +
                        selectedAreaTrabajo +
                        " " +
                        selectedTipoPuesto +
                        " " +
                        selectedTipoJornada +
                        " " +
                        selectedGradoExp +
                        " " +
                        rows}
                </p>
            </div>
        </Sidebar>
    );
}

export default ConfigOfertaLaboral;
