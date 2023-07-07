import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import {EmpleadoDeArea,Posicion, AreaActiva} from '@features/Modulo2/Components/GestionDeCompetencias/Tipos'
import {TOKEN_SERVICE, URL_SERVICE}from '@features/Modulo2/services/ServicesApis'
import { useNavigate } from 'react-router-dom';
import { DEMAND_COMPANY_COURSES, DEMAND_COMPANY_COURSES_LIST, GAPS_ANALYSIS_MODULE } from '@features/Modulo2/routes/path';
import './AreaEmpDemandCourses.css'
import { set } from 'lodash';
const SelectDemandCourses: React.FC = () => {
  const navigate = useNavigate(); 
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [buscar, setBuscar] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [areas, setAreas] = useState<AreaActiva[]>([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState(-1);
  const [posiciones, setPosiciones] = useState<Posicion[]>([]);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(0);
  const [competencias, setCompetencias] = useState<EmpleadoDeArea[]>([]);
  const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
  const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
  const [tipoOrden, setTipoOrden] = useState('ascendente');
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
      const fetchareas = async () => {
        try {
          const response = await fetch(URL_SERVICE + '/gaps/employeeArea', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAreas(data);
          } else {
            console.log('Error al obtener los datos de competencias');
          }
        } catch (error) {
          console.log('Error al obtener los datos de competencias:', error);
        }
      };
      fetchareas();
  }, []);
  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      const allRowIds = datosFiltradosYOrdenados.map((competencia) => competencia.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };
  const handleSelectRow = (competenciaId, e) => {
    if (e.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, competenciaId]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== competenciaId)
      );
    }
  };
  const isRowSelected = (competenciaId) => selectedRows.includes(competenciaId);

  const handleAreaChange = async (value) => {
    setAreaSeleccionada(value);
    if (value) {
      try {
        const body = {
          area: value,
        };
        const response = await fetch(URL_SERVICE + '/gaps/employeePosition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN_SERVICE,
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const data = await response.json();
          setPosiciones(data);
        } else {
          console.log('Error al obtener los datos de posiciones');
        }
      } catch (error) {
        console.log('Error al obtener los datos de posiciones:', error);
      }
    } else {
      setPosiciones([]);
    }
  }
  const handlePositionChange = async (value) => {
    setPosicionSeleccionada(value);
  };
 const handleBuscarClick = async (posicion,area) => {
  setBuscar(true);
  if (area!= -1) {
    try {
      const body = {
        area: area,
        posicion:  parseInt(posicion),
      };
      console.log(body)
      const response = await fetch(URL_SERVICE + '/gaps/employeeArea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN_SERVICE,
        },
        body: JSON.stringify(body),
      });

      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setCompetencias(data);
      } else {
        console.log('Error al obtener los datos de posiciones');
      }
    }catch (error) {
      console.error('Error fetching competencias:', error);
    }
  } else {
    setPosiciones([]);
  }
  };
  const filtrarCompetencias = () => {
      var competenciasFiltradas = competencias;
      if (tipoFiltro) {
        estadoFiltro !== ''?  
        competenciasFiltradas = competenciasFiltradas.filter(competencia => parseInt(competencia.area__name) == areaSeleccionada):
        competenciasFiltradas = competenciasFiltradas;
      }      
      if (estadoFiltro) {
        competenciasFiltradas = competenciasFiltradas.filter(competencia => (parseInt(competencia.position__name)  == posicionSeleccionada));
      }
      return competenciasFiltradas;
  };
  const filteredCompetencias = filtrarCompetencias().filter((competencia) => {
      const tipoMatch = tipoFiltro === 0 || parseInt(competencia.area__name) == areaSeleccionada;
      const estadoMatch = estadoFiltro === '' || parseInt(competencia.position__name) == posicionSeleccionada;
      return   tipoMatch && estadoMatch;
  });
  const handleLimpiarFiltros = () => {
      setAreaSeleccionada(-1);
      setPosicionSeleccionada(0);
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
  const datosFiltradosYOrdenados = filteredCompetencias.sort((a, b) => {
      if (a[campoOrdenamiento] < b[campoOrdenamiento]) {
        return tipoOrden === 'ascendente' ? -1 : 1;
      }
      if (a[campoOrdenamiento] > b[campoOrdenamiento]) {
        return tipoOrden === 'ascendente' ? 1 : -1;
      }
      return 0;
  });
  const renderTablaCompetencias = () => { 
    if (!competencias) {
      return null;
    }   
    if (competencias.length === 0) {
      return <p>No se encontraron competencias</p>;
    }
      return (
      <Table striped bordered hover>
        <thead>
          <tr>
              <th>
              </th>
              <th onClick={() => handleOrdenarPorCampo('user__first_name')}>Nombres {campoOrdenamiento === 'user__first_name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('user__last_name')}>Apellidos {campoOrdenamiento === 'user__last_name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('position__name')}>Posicion {campoOrdenamiento === 'position__name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('user__email')}>Email {campoOrdenamiento === 'user__email' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('id')}>ID {campoOrdenamiento === 'id' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltradosYOrdenados.map((competencia) => (
            <tr key={competencia.id}>
              <td>
              <Form.Check
                type="checkbox"
                id={`checkbox-select-${competencia.id}`}
                checked={isRowSelected(competencia.id)}
                onChange={(e) => handleSelectRow(competencia.id, e)}
              />
              </td>
              <td>{competencia.user__first_name}</td>
              <td>{competencia.user__last_name}</td>
              <td>{competencia.position__name}</td>
              <td>{competencia.user__email}</td>
              <td>{competencia.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>)
  }
  const renderListaPosicion = () => {
    if (!competenciaSeleccionada) {
      return null;
    }
    return (
      <Form.Select>
        <option>Posición 1</option>
        <option>Posición 2</option>
        <option>Posición 3</option>
        {/* ... */}
      </Form.Select>
    );
  };
  return (
      <div className='pantalla'>
        <div className='titles'>
        <h2 className='Head'>Demanda de capacitación</h2>
        <p className="text-muted subtitle">Generar la demanda de capacitación.</p>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-3 botones'>
              <Form.Group className="mb-3" controlId="tipoFiltro">
                  <Form.Control as="select" value={areaSeleccionada} onChange={(e) => handleAreaChange(parseInt(e.target.value))}>
                    <option value="">Área</option>
                    {areas.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className='col-sm-3 botones'>
              <Form.Group className="mb-3" controlId="tipoFiltro">
                  <Form.Control as="select" value={posicionSeleccionada} onChange={(e) => handlePositionChange(e.target.value)}>
                    <option value="">Posicion</option>
                    {areaSeleccionada!== -1 ?posiciones.map((tipo) => (
                      <option key={tipo.position__id} value={tipo.position__id}>
                        {tipo.position__name}
                      </option>
                    )): <option>Ingrese un area primero</option>}
                  </Form.Control>
                </Form.Group>
              </div>
         </div>
            <div className='row'>
              <div className="col-sm-3 botones2 justify-content-center">
                <Button variant="outline-secondary" className='Search' onClick={handleLimpiarFiltros}>
                  Limpiar filtros
                </Button>{' '}
                <Button variant="primary" className='Search' onClick={()=>{handleBuscarClick(posicionSeleccionada,areaSeleccionada)}}>
                  Buscar
                </Button>{' '}
              </div>              
              <div className="col-sm-3 botones2 justify-content-center">          
                <Button variant="primary" className='Search2' onClick={()=>{navigate(`/${GAPS_ANALYSIS_MODULE}/${DEMAND_COMPANY_COURSES}/${DEMAND_COMPANY_COURSES_LIST}`)}}>
                Generar demanda
                </Button>
              </div>  
          </div>
        </div>
          <div className='container-fluid'>
          {renderListaPosicion()}
        </div>
        <div className='container-fluid'>
          <Form.Check
                type="checkbox"
                id="checkbox-select-all"
                label="Seleccionar todos"
                checked={selectedRows.length === datosFiltradosYOrdenados.length}
                onChange={handleSelectAllRows}
          />
        </div>
        <div className='container-fluid'>
          {(posicionSeleccionada!==-1 && buscar) ? renderTablaCompetencias() : "Seleccione un AREA y/o POSICION"}
        </div>
      </div>
  );
};
export default SelectDemandCourses;