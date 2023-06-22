import React, { useEffect, useState } from 'react';
import { Form, FormControl, InputGroup, Button, Table, Modal  } from 'react-bootstrap';
import UpdateCompetencia from './Update';
import DeleteCompetencia from './Delete';
import {ArrowRightCircleFill,Pencil,Trash } from 'react-bootstrap-icons';
import { useLocation,  useNavigate  } from 'react-router-dom';
import {EmpleadoDeArea} from '@features/Modulo2/Components/GestionDeCompetencias/Tipos';
import './DetalleCompetenciasArea.css';
import { GAPS_ANALYSIS_MODULE, GAPS_EMPLOYEES_AREA, GAPS_EMPLOYEES_AREA_DETAIL_EMPLOYEE } from '@features/Modulo2/routes/path';

import {TOKEN_SERVICE} from '@features/Modulo2/Services/ServicesApis'
const DetalleCompetenciasArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const { tipoCompetencia } = location.state;
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [position__name, setposition__name] = useState('');
    const [palabrasClave, setPalabrasClave] = useState('');
    const [busquedaRelizada, setBusquedaRealizada] = useState(false);
    const [mostrarPopUpActualizar, setmostrarPopUpActualizar] = useState(false);
    const [mostrarPopUpBorrar, setmostrarPopUpBorrar] = useState(false);
    const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
    const [empleados, setEmpleados] = useState<EmpleadoDeArea[]>([]);
      useEffect(() => {
  
        const fetchAreasActivas = async () => {
        try {
          
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            },
            body: JSON.stringify({ 
              area: 2,
              posicion:  2,
            }),
          };
          const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/employeeArea', requestOptions);
          const data = await response.json();
          setEmpleados(data);
        } catch (error) {
          console.error('Error fetching competencias:', error);
        }
      }
      fetchAreasActivas();
    }, []);     
    const actualizarCompetencia = (nuevaCompetencia) => {
      var tablaAux = empleados;
      const indice = empleados.findIndex((competencia) => competencia.id=== nuevaCompetencia.id);
      if (indice !== -1) {
        tablaAux[indice] = nuevaCompetencia;
      }
      setEmpleados(tablaAux);
      handleCerrarPopUpActualizar();
    };
    console.log(empleados);
    const handleMostrarPopUpActualizar = (competencia) => {
      setCompetenciaSeleccionada(competencia);
      setmostrarPopUpActualizar(true);
    };
    
    const handleCerrarPopUpActualizar = () => { 
      setmostrarPopUpActualizar(false);
    };
    
    const borrarCompetencia = (id) => {
      const updatedCompetencias = 
      empleados.filter((competencia) => competencia.id !== id);
      setEmpleados(updatedCompetencias);
      setCompetenciaSeleccionada(null);
      handleCerrarPopUpBorrar();
    };
    
    const handleMostrarPopUpBorrar  = (competencia) => {     
      setCompetenciaSeleccionada(competencia);
      setmostrarPopUpBorrar(true);
    };
    
    const handleCerrarPopUpBorrar = () => {
      setmostrarPopUpBorrar(false);
    };
    
    const limpiarFiltros = () => {
        setposition__name('');
    };

    const handleClick = (usuario) => {        
      navigate(`/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEES_AREA}/${GAPS_EMPLOYEES_AREA_DETAIL_EMPLOYEE}`, { state: { usuario } });
      };

    const handleOrdenarPorCampo = (campo) => {
        // Si se hace clic en el mismo campo, cambia el tipo de orden
        if (campo === campoOrdenamiento) {
          setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
          setCampoOrdenamiento(campo);
          setTipoOrden('ascendente');
        }
      };
      // Filtrado de datos
    const filtrarCompetencias = () => {
        var competenciasFiltradas = empleados;

        if (position__name) {
          competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.position__name === position__name);
        }

        if (palabrasClave) {
            const palabrasClaveLower = palabrasClave.toLowerCase();
            competenciasFiltradas = competenciasFiltradas.filter(competencia =>
              competencia.user__first_name.toLowerCase().includes(palabrasClaveLower) ||
              competencia.user__last_name.toLowerCase().includes(palabrasClaveLower) ||
              competencia.position__name.toLowerCase().includes(palabrasClaveLower) ||
              competencia.area__name.toLowerCase().includes(palabrasClaveLower) ||
              competencia.user__email.toLowerCase().includes(palabrasClaveLower) ||
              competencia.user__is_active.toString().toLowerCase().includes(palabrasClaveLower)
            );
          } 

      
        return competenciasFiltradas;
    };
    // Obtiene los datos ordenados
      const datosFiltradosYOrdenados = filtrarCompetencias().sort((a, b) => {
        if (a[campoOrdenamiento] < b[campoOrdenamiento]) {
          return tipoOrden === 'ascendente' ? -1 : 1;
        }
        if (a[campoOrdenamiento] > b[campoOrdenamiento]) {
          return tipoOrden === 'ascendente' ? 1 : -1;
        }
        return 0;
      });
  
    const renderTablaCompetencias = () => {
        const competenciasFiltradas = filtrarCompetencias();
      
        if (busquedaRelizada && competenciasFiltradas.length === 0) {
            return <p>No se encontraron resultados.</p>;
          }
        return (
            <Table striped bordered>
            <thead>
                <tr>
                    <th onClick={() => handleOrdenarPorCampo('user__first_name')}>
                    Nombre
                    {campoOrdenamiento === 'user__first_name' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('user__last_name')}>
                    Apellidos
                    {campoOrdenamiento === 'user__last_name' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('user__email')}>
                    Correo
                    {campoOrdenamiento === 'user__email' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('user__is_active')}>
                    Estado
                    {campoOrdenamiento === 'user__is_active' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
              {datosFiltradosYOrdenados.map((competencia, index) => (
                <tr key={index}>
                <td>{competencia.user__first_name}</td>
                <td>{competencia.user__last_name}</td>
                <td>{competencia.user__email}</td>
                <td>{competencia.user__is_active? 'Activo': 'Inactivo'}</td>
                <td>
                    <Button variant="link" size="sm" onClick={
                      ()=>{handleClick(competencia);}}>
                    <ArrowRightCircleFill color='gray'></ArrowRightCircleFill>
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      };

  return (
    <div className="pantalla">
      <div className='titles'>
      <h2 className='Head'>Empleados del puesto de asistente</h2>
      <p className="text-muted subtitle">Consultar capacidades de los empleados.</p>
      </div>

      <Form className="FormComp">
        <div className= "container-fluid">
          <div className='row primera'>
              <InputGroup className="col basicSearch">
              <FormControl
                placeholder="Ingrese palabras clave, código o nombre de las capacidades"
                aria-label="Buscar capacidades"
                aria-describedby="buscar-icono"
                value={palabrasClave}
                onChange={(e) => setPalabrasClave(e.target.value)}
              />
              <Button variant="outline-secondary" id="buscar-icono" onClick={() => setBusquedaRealizada(true)}>
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
            <div className="col-sm-3 botones">
              <Button variant="primary" className ="col-sm-4">Buscar</Button>
            </div>
          </div>
        </div>
      </Form>
        
      {mostrarPopUpActualizar  && (
        <Modal show={mostrarPopUpActualizar} onHide={handleCerrarPopUpActualizar}>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar competencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateCompetencia actualizarCompetencia={actualizarCompetencia} competencia={competenciaSeleccionada}  />
            </Modal.Body>
        </Modal>
      )}
      

      {mostrarPopUpBorrar  && (
        <Modal show={mostrarPopUpBorrar} onHide={handleCerrarPopUpBorrar}>
            <Modal.Header closeButton>
                <Modal.Title>Borrar competencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeleteCompetencia borrarCompetencia={borrarCompetencia} competencia={competenciaSeleccionada} />
            </Modal.Body>
        </Modal>
      )}
      <div className='container-fluid'>
         {renderTablaCompetencias()}
      </div>
      <div className="col-sm-3 botones">
              <Button variant="outline-secondary" className="me-2" onClick={()=>{navigate(-1)}}>
                Regresar
              </Button>
            </div>
    </div>
  );
};

export default DetalleCompetenciasArea;
