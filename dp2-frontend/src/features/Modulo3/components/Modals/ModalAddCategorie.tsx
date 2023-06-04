import React, { useState } from 'react'
import { InputGroup, Button, Modal, Accordion, Form, FormCheck } from 'react-bootstrap';
import './ModalExportarReporte.css'
import { Icon8Square } from 'react-bootstrap-icons';

const ModalAddCategorie = (props) => {
    const {showAC, setShowAC , categorias, setCategorias } = props;
    const handleClose = () => {
        setShowAC(false);
      };
      const [subcategorias, setSubcategorias] = useState([]);
      const [subcategoriaActual, setSubcategoriaActual] = useState('');
      const [nombreCategoria, setNombreCategoria] = useState('');

      const handleAddSubcategoria = () => {
        if (subcategoriaActual) {
          setSubcategorias([...subcategorias, subcategoriaActual]);
          setSubcategoriaActual('');
        }
      };

      const handleAgregar = () => {
        const lastId = categorias.length > 0 ? categorias[categorias.length - 1].id : 0;
        console.log(nombreCategoria);
        const nuevaCategoria = {
          id: lastId + 1,
          name: nombreCategoria,
          subcategories: subcategorias,
        };
        setCategorias([...categorias, nuevaCategoria]);
        setShowAC(false);
      };
      return (
        <Modal show={showAC} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <p>Categorías</p>
            </div>
            <div className="row-input">
              <Form.Control
                className="textbox-cat"
                placeholder="Ingrese el nombre de la categoría"
                value={nombreCategoria}
                onChange={(event) => setNombreCategoria(event.target.value)}
              />
            </div>
            <div className="row">
              <p>Subcategorías</p>
            </div>
            <div className="row-input">
              <Form.Control
                className="textbox-sub"
                placeholder="Ingrese el nombre de la subcategoría"
                value={subcategoriaActual}
                onChange={(event) => setSubcategoriaActual(event.target.value)}
              />
              <Button
                className="boton-add"
                variant="secondary"
                onClick={handleAddSubcategoria}
              >
                +
              </Button>
            </div>
            <div className="row-input">
              <div className="subcategoria-buttons-container">
                {subcategorias.map((subcategoria, index) => (
                  <Button
                    key={index}
                    variant="primary"
                    className="subcategoria-button"
                    disabled
                  >
                    {subcategoria}
                  </Button>
                ))}
              </div>
            </div>
          </Modal.Body>
      
          <Modal.Footer>
            <Button variant="primary" onClick={handleAgregar}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>
      );
                }
export default ModalAddCategorie;