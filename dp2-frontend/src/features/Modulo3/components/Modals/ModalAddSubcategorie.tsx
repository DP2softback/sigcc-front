import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./ModalExportarReporte.css";
import { getPlantillas } from "@features/Modulo3/services/templates";
import Template from "@features/Modulo3/components/Cards/Template/Template";
import { navigateTo } from "@features/Modulo3/utils/functions";
import '../../screens/Categorias/Categorias.css'
import { agregarSubcategorias } from "@features/Modulo3/services/categories";
import { ToastContainer, toast } from "react-toastify";

const competenciasIni= ["Competencia 1","Competencia 2","Competencia 3"]
const ModalAddSubcategorie = (props) => {
	const { show, setShow,idCategory } = props;
	const handleClose = () => {
		setShow(false);
	};
    const [subcategorias, setSubcategorias] = useState([]);
    const [subcategoriaName, setSubcategoriaName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [competencias, setCompetencias] = useState(competenciasIni);
    function getBackgroundColor(categoryIndex: number) {
        return categoryIndex % 2 == 0
          ? 'bg-blue'
          : 'bg-white';
      }
      const handleAgregar = () => {
        const newSubcategory = {
          name: subcategoriaName,
          description:"",
          competence: selectedOption,
        };
    
        subcategorias.push(newSubcategory)
        setSubcategoriaName("");
        setSelectedOption('');
      };
    
      const handleEliminar = (nombre: string) => {
        const subcatAux = subcategorias.filter(sub => sub.nombre != nombre);
        setSubcategorias(subcatAux)
      };
      const handleOptionSelect = (option) => {
        setSelectedOption(option);
      };
      const handleChangeSubcategoriaName = (event) => {
        setSubcategoriaName(event.target.value);
      };
    const table = (
        <Table striped className='ca-tableCategorie'>
          <thead className='bg-white'>
            <tr>
              <th className='subcategorie_name'>Subcategoría</th>
              <th className='competencia_name'>Competencia</th>
              <th className='text-end competencia'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subcategorias.map((row, index) => {
              const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
              return (
                <tr key={row.id} className={rowStyle}>
                  <td className='subcategorie_name'>{row.name}</td>
                  <td className='competencia_name'>{row.competence}</td>
                  <td className='text-center'>                
                    <div className='acciones'>
                    <Button variant="outline-danger" className='accion' onClick={() => handleEliminar(row.nombre)}>
                      Eliminar
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
        <Form className='ca-indexFilters'>
          <Form.Group className='flex1 ca-nameSubcat'>
            <label className='label-estilizado' htmlFor='nombreSubcategoría'>Nombre de subcategoría</label>
            <Form.Control placeholder='Ingrese el nombre de la subcategoría' id="nombreSubcategoría" value={subcategoriaName} onChange={handleChangeSubcategoriaName}/>
          </Form.Group>
          <Form.Group className='flex1 ca-competencia'>
            <div >
              <label className='label-estilizado' htmlFor="dropdown">Competencia relacionada</label>
            </div>
            <Form.Select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
              <option hidden>Seleccione la competencia relacionada</option>
              {competencias.map((competencia,index) => {
                return (
                  <option key={index}> {competencia} </option>
                );
                  })}
            </Form.Select>
          </Form.Group>
          <Button className="ca-buttonAdd" onClick={handleAgregar}>
            Agregar
          </Button>
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
    const handleGuardar = ()=>{
      console.log(subcategorias);
      (async () => { 
        const response = await agregarSubcategorias(subcategorias,idCategory);
        if (response){
          toast.success("Se ha añadido correctamente las subcategorias");
          setShow(false);
          closeNotification();
        }
        })();
    }
	return (
		<Modal show={show} onHide={handleClose}>
      			    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />  

			<Modal.Header closeButton>
				<Modal.Title>Agregar Subcategoría</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>          {subcategoriasForm}
					{table}</div>
			</Modal.Body>
            <Modal.Footer>
            <Button variant='outline-primary' className='boton-dejar mr-10' onClick={() => setShow(false)}>
       			Volver
     		</Button>
            <Button variant="primary" onClick={handleGuardar}>
              Agregar
            </Button>
            </Modal.Footer>
		</Modal>
	);
};
export default ModalAddSubcategorie;
