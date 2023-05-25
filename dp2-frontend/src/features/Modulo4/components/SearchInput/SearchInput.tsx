import React, { useState, useEffect } from "react";

import {
    Modal,
    Form,
    FormControl,
    Button,
    Table,
    ListGroup,
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

    useEffect(() => {
        console.log(searchQuery);
        // Establecer un temporizador para retrasar la ejecución de la búsqueda después de que el usuario deje de escribir
        const timer = setTimeout(() => {
            performSearch(searchQuery);
        }, 500); // Intervalo de tiempo (en milisegundos) antes de realizar la búsqueda

        // Limpiar el temporizador anterior cada vez que se escriba una nueva entrada
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const performSearch = (query) => {
        // Lógica para realizar la búsqueda y actualizar los resultados

        const results = [
            { id: 1, nombre: "Puesto 1 - Proceso seleccion 1" },
            { id: 2, nombre: "Puesto 1 - Proceso seleccion 2" },
            { id: 3, nombre: "Puesto 1 - Proceso seleccion 3" },
        ];
        setSearchResults(results);
        setFilteredResults(
            searchResults.filter((item) =>
                item.nombre.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const selectOption = (option: any) => {
        console.log("Opción seleccionada:", option);
        setSelectedResult(option.nombre);
    };

    const closeOnSelectModal = () => {
        console.log(selectedResult);
        onSelect(selectedResult);
        closeModal();
    };

    return (
        <>
            <Modal show={showModal} onHide={closeModal} size="lg">
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
                            maxHeight: "20em",
                            overflowY: "auto",
                            marginBottom: "6.78em",
                        }}
                    >
                        <Table striped bordered>
                            <thead
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: "white",
                                }}
                            >
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((result) => (
                                    <tr
                                        key={result.id}
                                        onClick={() => selectOption(result)}
                                        className={
                                            selectedResult === result.nombre
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        <td>{result.id}</td>
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

/*


                    <ListGroup>
                        {filteredResults.map((result) => (
                            <ListGroup.Item
                                key={result.id}
                                onClick={() => selectOption(result)}
                                action
                            >
                                {result.nombre}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>


*/
