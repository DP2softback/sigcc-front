import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./ModalExportarReporte.css";
import { navigateTo } from "@features/Modulo3/utils/functions";
import '../../screens/Categorias/Categorias.css'
import { agregarSubcategorias, listarCompetenciasFree } from "@features/Modulo3/services/categories";
import { ToastContainer, toast } from "react-toastify";
import { PlusCircle } from "react-bootstrap-icons";

const ModalAddSubcategorie = (props) => {
	const { show, setShow,idCategory } = props;
	const handleClose = () => {
		setShow(false);
	};
    const [subcategorias, setSubcategorias] = useState([]);
    const [subcategoriaName, setSubcategoriaName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [competencias, setCompetencias] = useState([]);
    const [selectedId,setSelectedId]=useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      (async () => {
         const response= await listarCompetenciasFree();
         if(response){
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
        const newSubcategory = {
          name: subcategoriaName,
          description:"",
        };
    
        subcategorias.push(newSubcategory)
        setSubcategoriaName("");
        setSelectedOption('');
      };
      const handleAgregarExistente = () => {
        const newSubcategory = {
          name:selectedOption,
          id:selectedId,
        };
    
        subcategorias.push(newSubcategory)
        setSubcategoriaName("");
        setSelectedOption('');
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
                Nueva competencia
              </label>
              <div className="input-button-container">
                <Form.Control
                  placeholder="Ingrese el nombre de la competencia"
                  id="nombreSubcategoría"
                  value={subcategoriaName}
                  onChange={handleChangeSubcategoriaName}
                />
                <Button variant="outline-primary" onClick={handleAgregar} className="ca-buttonAdd">
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
    const handleGuardar = ()=>{
      (async () => { 
        const response = await agregarSubcategorias(subcategorias,idCategory);
        if (response){
          toast.success("Se ha añadido correctamente las competencias");
          setShow(false);
          closeNotification();
        }
        })();
    }
	return (
		<Modal show={show} onHide={handleClose}>
      			    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />  

			<Modal.Header closeButton>
				<Modal.Title>Agregar Competencia</Modal.Title>
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
