import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./ModalExportarReporte.css";
import { navigateTo } from "@features/Modulo3/utils/functions";
import '../../screens/Categorias/Categorias.css'
import { agregarCategoria, listarCompetenciasFree } from "@features/Modulo3/services/categories";
import { ToastContainer, toast } from "react-toastify";
import { PlusCircle } from "react-bootstrap-icons";

const ModalAddCategorie = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaName, setCategoriaName] = useState('');
  const [subcategoriaName, setSubcategoriaName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [competencias, setCompetencias] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdown,setDropdown] = useState(false);
  const [formError, setFormError] = useState(false); 

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await listarCompetenciasFree();
      if (response) {
        setCompetencias(response);
      }
      setIsLoading(false);
    })();
  }, []);

  function getBackgroundColor(categoryIndex: number) {
    return categoryIndex % 2 == 0
      ? 'bg-blue'
      : 'bg-white';
  }

  const handleAgregar = () => {
    if (subcategoriaName.trim() !== '') {
      const newSubcategory = {
        name: subcategoriaName,
        description: "",
      };

      subcategorias.push(newSubcategory)
      setSubcategoriaName("");
      setSelectedOption('');
      setFormError(false); 
    } else {
      setFormError(true); 
    }
  };
  const handleAgregarExistente = () => {
    if (selectedOption !== '') {
      const newSubcategory = {
        name: selectedOption,
        id: selectedId,
      };

      subcategorias.push(newSubcategory)
      setSubcategoriaName("");
      setSelectedOption('');
      const updatedCompetencias = competencias.filter((competencia) => competencia.name !== selectedOption);
      setCompetencias(updatedCompetencias);
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const handleEliminar = (nombre: string) => {
    const subcatAux = subcategorias.filter(sub => sub.name != nombre);
    setSubcategorias(subcatAux)
  };

  const handleOptionSelect = (option) => {
    const selectedCompetencia = competencias.find((competencia) => competencia.name === option);
    setSelectedOption(option);
    setSelectedId(selectedCompetencia.id);
  };

  const handleChangeSubcategoriaName = (event) => {
    setSubcategoriaName(event.target.value);
  };

  const handleChangeCategoriaName = (event) => { 
    setCategoriaName(event.target.value);
  };

  const table = (
    <Table striped className='ca-tableCategorie'>
      <thead className='bg-white'>
        <tr>
          <th className='subcategorie_name'>Competencias</th>
          <th className='text-end competencia'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {subcategorias.map((row, index) => {
          const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
          return (
            <tr key={row.id} className={rowStyle}>
              <td className='subcategorie_name'>{row.name}</td>

              <td className='text-center'>
                <div className='acciones'>
                  <Button variant="outline-danger" className='accion' onClick={() => handleEliminar(row.name)}>
                    Quitar
                  </Button>
                </div>

              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
  const subcategoriasForm = (
    <Form>
      <Form.Group>
        <div className="label-input-container">
          <label className="label-estilizado" htmlFor="nombreSubcategoría">
            Nombre de la categoría
          </label>
          <div className="input-button-container">
            <Form.Control
              placeholder="Ingrese el nombre de la categoría"
              id="nombrCategoría"
              value={categoriaName}
              onChange={handleChangeCategoriaName}
            />
          </div>
        </div>
      </Form.Group>
      <label className="label-estilizado" style={{ marginTop: "20px", marginBottom: "10px" }} htmlFor="nombreSubcategoría">
        A continuación, cree las competencias que pertenecerán a la nueva categoría
      </label>
      <Form.Group>
        <div className="label-input-container">
          <label className="label-estilizado" htmlFor="nombreSubcategoría">
            Nueva competencia
          </label>
          <div className="input-button-container">
            <Form.Control
              placeholder="Ingrese el nombre de la competencia"
              id="nombreSubcategoría"
              value={subcategoriaName}
              onChange={handleChangeSubcategoriaName}
              isInvalid={formError} 
            />
            {formError && <Form.Control.Feedback type="invalid" className="input-feedback">Ingrese un nombre de competencia válido.</Form.Control.Feedback>}

            <Button variant="outline-primary" onClick={handleAgregar} className="ca-buttonAdd">
              +
            </Button>
          </div>
        </div>
      </Form.Group>
      <Form.Group>
        <div className="label-input-container">
          <label className="label-estilizado" htmlFor="dropdown">
            Competencias existentes
          </label>
          <div className="input-button-container">
            <Form.Select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)} disabled={competencias.length === 0} isInvalid={dropdown}>
              {competencias.length === 0 && (
              <option hidden>No hay competencias libres</option>
              )}
              {competencias.length > 0 && (
                <>
                <option hidden>Seleccione una competencia</option>
                {competencias.map((competencia, index) => {
                  return <option key={competencia.id}> {competencia.name} </option>;
                })}
                </>)}
            </Form.Select>
            {dropdown  && (
              <Form.Control.Feedback type="invalid" className="input-feedback">
                Seleccione una competencia.
              </Form.Control.Feedback>
            )}
            <Button variant="outline-primary" onClick={handleAgregarExistente} className="ca-buttonAdd" disabled={competencias.length === 0}>
              +
            </Button>
          </div>
        </div>
      </Form.Group>
    </Form>
  );



  function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const closeNotification = async () => {
    await delay(4000);
    window.location.reload();
  };

  const closeNotificationError = async () => {
    await delay(4000);
  };

  const handleGuardar = () => {
    const data = { nombre: categoriaName, Subcategorias: subcategorias };
    if(categoriaName!=''){
      if (subcategorias.length > 0) {
        (async () => {
          const response = await agregarCategoria(data);
          if (response) {
            toast.success("Se ha añadido correctamente la categoría con sus competencias");
            setShow(false);
            closeNotification();
          }
        })();
      }else{
        toast.error("Debe asignar al menos una competencia a la nueva categoría");
        //setShow(false);
        closeNotificationError();
      }
    }else{
      toast.error("Debe asignar un nombre a la nueva categoría");
      //setShow(false);
      closeNotificationError();
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {subcategoriasForm}
          {table}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-primary' className='boton-dejar mr-10' onClick={() => setShow(false)}>
          Volver
        </Button>
        <Button variant="primary" onClick={handleGuardar} disabled={subcategorias.length === 0 || categoriaName===''} >
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalAddCategorie;
