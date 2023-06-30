import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import {Competencia,Posicion, AreaActiva} from '@features/Modulo2/Components/GestionDeCompetencias/Tipos'
import {TOKEN_SERVICE, URL_SERVICE}from '@features/Modulo2/services/ServicesApis'
import { useNavigate } from 'react-router-dom';
import { DEMAND_COMPANY_COURSES, DEMAND_COMPANY_COURSES_LIST, GAPS_ANALYSIS_MODULE } from '@features/Modulo2/routes/path';
import './AreaEmpDemandCourses.css'

const tiposCompetencia: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3']; // Array predefinido de tipos de competencia
const SelectDemandCourses: React.FC = () => {
  const navigate = useNavigate(); 
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [areas, setAreas] = useState<AreaActiva[]>([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [posiciones, setPosiciones] = useState<Posicion[]>([]);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState('');
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
  const [datosCargados, setDatosCargados] = useState(false);
  const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
  const [tipoOrden, setTipoOrden] = useState('ascendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [mostrarPopUpCrear , setmostrarPopUpCrear] = useState(false);
  useEffect(() => {
      const fetchCompetencias = async () => {
        try {
          const body = {
            idCompetencia: 0,
            palabraClave: searchQuery,
            idTipoCompetencia: tipoFiltro === 0 ? 0 : tiposCompetencia[tipoFiltro + 1],
            activo: estadoFiltro === 'Activo' ? 1 : estadoFiltro === 'Inactivo' ? 0 : 2,
            idEmpleado: 0,
          };

          const response = await fetch(URL_SERVICE + '/gaps/competenceSearch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            },
            body: JSON.stringify(body),
          });

          if (response.ok) {
            const data = await response.json();
            setCompetencias(data);
          } else {
            console.log('Error al obtener los datos de competencias');
          }
        } catch (error) {
          console.log('Error al obtener los datos de competencias:', error);
        }
      };

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
  const handleAreaChange = async (value) => {
    setAreaSeleccionada(value);
    console.log('area: ' + value)
    if (value) {
      try {
        const response = await fetch(URL_SERVICE + '/gaps/employeePosition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN_SERVICE,
          },
          body: JSON.stringify({ area: value })
        });
        if (response.ok) {
          const data = await response.json();
          setPosiciones(data);
        } else {
          console.error('Error al obtener las posiciones');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      setPosiciones([]);
    }

  }
  const handlePositionChange = (value) => {
    setPosicionSeleccionada(value);
  };
  const handleTipoFiltroChange = (value) => {
    setTipoFiltro(value);
    setCompetenciaSeleccionada(null);
  };
 ;const handleBuscarClick = async () => {
    if (!competenciaSeleccionada) {
      return;
    }

    try {
      const body = {
        idCompetencia: 0,
        palabraClave: '',
        idTipoCompetencia: competenciaSeleccionada,
        activo: estadoFiltro === 'Activo' ? 1 : estadoFiltro === 'Inactivo' ? 0 : 2,
        idEmpleado: 0,
      };

      const response = await fetch(URL_SERVICE + '/gaps/competenceSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN_SERVICE,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setCompetencias(data);
        setDatosCargados(true);
      } else {
        console.log('Error al obtener los datos de competencias');
      }
    } catch (error) {
      console.log('Error al obtener los datos de competencias:', error);
    }
  };
  const handleMostrarPopUpCrear  = () => {       
      navigate(`/${GAPS_ANALYSIS_MODULE}/${DEMAND_COMPANY_COURSES}/${DEMAND_COMPANY_COURSES_LIST}`);
  };
  const agregarCompetencia = (nuevaCompetencia) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN_SERVICE
        },
        body: JSON.stringify({
          name: nuevaCompetencia.name,
          description: nuevaCompetencia.description,
          active: nuevaCompetencia.active,
          type: nuevaCompetencia.type
        })
      };
      fetch(URL_SERVICE + '/gaps/competences', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Competencia agregada:', data);
        })
        .catch(error => {
          console.error('Error al agregar competencia:', error);
        });
      handleCerrarPopUpCrear();
  };
  const handleCerrarPopUpCrear = () => {
      setmostrarPopUpCrear(false);
  };
  const filtrarCompetencias = () => {
      var competenciasFiltradas = competencias;
      if (tipoFiltro) {
        estadoFiltro !== ''?  
        competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.type === tipoFiltro):
        competenciasFiltradas = competenciasFiltradas;
      }      
      if (estadoFiltro) {
        competenciasFiltradas = competenciasFiltradas.filter(competencia => (competencia.active  == (estadoFiltro === 'Activo'? true : false)));
      }
      if (searchQuery) {
          const palabrasClaveLower = searchQuery.toLowerCase();
          competenciasFiltradas = competenciasFiltradas.filter(competencia =>
            competencia.id.toString().toLowerCase().includes(palabrasClaveLower) ||
            competencia.name.toLowerCase().includes(palabrasClaveLower) ||
            //competencia.code.toString().toLowerCase().includes(palabrasClaveLower) ||
            competencia.type.toString().toLowerCase().includes(palabrasClaveLower)||
            competencia.active.toString().toLowerCase().includes(palabrasClaveLower)
          );
        }
      return competenciasFiltradas;
  };
  const filteredCompetencias = filtrarCompetencias().filter((competencia) => {
      const searchMatch =
        competencia.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competencia.code.toLowerCase().includes(searchQuery.toLowerCase());
      const tipoMatch = tipoFiltro === 0 || competencia.type === tipoFiltro;
      const estadoMatch = estadoFiltro === '' || competencia.active === (estadoFiltro === 'Activo');
      return searchMatch && tipoMatch && estadoMatch;
  });
  const handleSearch = () => {
      // Lógica para realizar la búsqueda
  };
  const handleLimpiarFiltros = () => {
      setSearchQuery('');
      setTipoFiltro(0);
      setEstadoFiltro('');
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
    if (!datosCargados) {
      return null;
    }   
    if (competencias.length === 0) {
      return <p>No se encontraron competencias</p>;
    }
      return (
      <Table striped bordered hover>
        <thead>
          <tr>
              <th onClick={() => handleOrdenarPorCampo('code')}>Nombres {campoOrdenamiento === 'code' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('name')}>Apellidos {campoOrdenamiento === 'name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('type')}>Posicion {campoOrdenamiento === 'type' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('active')}>Área {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('active')}>Email {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
              <th onClick={() => handleOrdenarPorCampo('active')}>Estado {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltradosYOrdenados.map((competencia) => (
            <tr key={competencia.id}>
              <td>{competencia.code}</td>
              <td>{competencia.name}</td>
              <td>{areas.find((tipo) => tipo.id == competencia.type)?.name}</td>
              <td>{competencia.active ? 'Activo' : 'Inactivo'}</td>
              <td>{competencia.active ? 'Activo' : 'Inactivo'}</td>
              <td>{competencia.active ? 'Activo' : 'Inactivo'}</td>
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
                  <Form.Control as="select" value={areaSeleccionada} onChange={(e) => handleAreaChange(e.target.value)}>
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
              <Form.Group controlId="estadoFiltro">
                <Form.Control as="select" value={estadoFiltro} onChange={(e) =>{ setEstadoFiltro(e.target.value); console.log(e.target.value)}}>
                  <option value="">Posición</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Control>
              </Form.Group>
            </div>
         </div>
            <div className='row'>
              <div className="col-sm-3 botones2 justify-content-center">
                <Button variant="outline-secondary" className='Search' onClick={handleLimpiarFiltros}>
                  Limpiar filtros
                </Button>{' '}
                <Button variant="primary" className='Search' onClick={handleSearch}>
                  Buscar
                </Button>{' '}
              </div>
              
              <div className="col-sm-3 botones2 justify-content-center">          
                <Button variant="primary" className='Search2' onClick={handleMostrarPopUpCrear}>
                Generar demanda
                </Button>
              </div>  
          </div>
        </div>  

          <div className='container-fluid'>
          {renderListaPosicion()}
        </div>

        <div className='container-fluid'>
          {renderTablaCompetencias()}
        </div>


      </div>
  );
};
export default SelectDemandCourses;