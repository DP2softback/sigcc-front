import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import {Competencia,tipoCompetencia, AreaActiva} from '@features/Modulo2/Components/GestionDeCompetencias/Tipos'
import {TOKEN_SERVICE, URL_SERVICE}from '@features/Modulo2/services/ServicesApis'
import { useNavigate } from 'react-router-dom';
const tiposCompetencia: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3']; // Array predefinido de tipos de competencia
const SelectDemandCourses: React.FC = () => {
  const navigate = useNavigate();
  const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
  const [tipoOrden, setTipoOrden] = useState('ascendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [estadoFiltro, setEstadoFiltro] = useState(''); 
  const [mostrarPopUpAsignar , setmostrarPopUpAsignar] = useState(false);
  const [mostrarPopUpCrear , setmostrarPopUpCrear] = useState(false);
  const [mostrarPopUpActualizar, setmostrarPopUpActualizar] = useState(false);
  const [mostrarPopUpBorrar, setmostrarPopUpBorrar] = useState(false);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
  const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
  const [tipo,setTipo] = useState('')  
  const [name,setName] = useState('')
  const [elements, setElements] = useState(['Curso 1']);
  const [mostrar, setMostrar] = useState(true);
  const [competenciasLista, setCompetenciasLista] = useState([
    { id: 1, nombre: 'Competencia 1', seleccionada: false },
    { id: 2, nombre: 'Competencia 2', seleccionada: false },
    { id: 3, nombre: 'Competencia 3', seleccionada: false },
    // Agrega más competencias si es necesario
  ]);
  useEffect(() => {
    // Función para obtener los datos de competencias desde la API
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
    const fetchTipoCompetencias = async () => {
      try {

        const response = await fetch(URL_SERVICE + '/gaps/competenceTypes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN_SERVICE,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTipoCompetencias(data);
        } else {
          console.log('Error al obtener los datos de competencias');
        }
      } catch (error) {
        console.log('Error al obtener los datos de competencias:', error);
      }
    };

    fetchCompetencias();
    fetchTipoCompetencias();
  }, []);
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
  };
  const handleMostrarPopUpCrear  = () => {
    setmostrarPopUpCrear(true);
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
  const handleMostrarPopUpActualizar = (competencia) => {
    setCompetenciaSeleccionada(competencia);
    setTipo(tipoCompetencias.find((tipo) => tipo.id == competencia.type)?.name)
    setName(competencia.name);
    setmostrarPopUpActualizar(true);
  };
  const actualizarCompetencia = async (competenciaActualizada) => {
    console.log(competenciaActualizada)
    const body = {
      id: competenciaActualizada.id,
      name: competenciaActualizada.name,
      description: competenciaActualizada.description,
      active: competenciaActualizada.active,
      type: competenciaActualizada.type
  }


    try {
      const response = await fetch(
        URL_SERVICE + `/gaps/competences`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN_SERVICE,
          },
          body: JSON.stringify(body)
        }
      );

      if (response.ok) {
        const updatedCompetencia = await response.json();
        var tablaAux = competencias;
        const indice = competencias.findIndex(
          (competencia) => competencia.id === updatedCompetencia.id
        );
        if (indice !== -1) {
          tablaAux[indice] = updatedCompetencia;
        }
        setCompetencias(tablaAux);
        setCompetenciaSeleccionada(null);
        setName('');
        handleCerrarPopUpActualizar();
      } else {
        throw new Error('Error al actualizar la competencia');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCerrarPopUpActualizar = () => { 
    setmostrarPopUpActualizar(false);
  };
  const handleMostrarPopUpBorrar  = (competencia) => {     
    setCompetenciaSeleccionada(competencia);
    setName(competencia.name);
    setmostrarPopUpBorrar(true);
  };
  const borrarCompetencia = async (id) => {
  console.log(id)
  try {
    const response = await fetch(`https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competences/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': TOKEN_SERVICE
      }
    });
    console.log(response)
    if (response.ok) {
      const updatedCompetencias = competencias.filter((competencia) => competencia.id !== id);
      setCompetencias(updatedCompetencias);
      setCompetenciaSeleccionada(null);
      setName('');
      handleCerrarPopUpBorrar();
    } else {
      console.error('Error al borrar la competencia');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud de borrado', error);
  }
  };
  const handleCerrarPopUpBorrar = () => {
    setmostrarPopUpBorrar(false);
  };
  const handleMostrarPopUpAsignar  = (competencia) => {     
    setCompetenciaSeleccionada(competencia);
    setName(competencia.name);
    setmostrarPopUpAsignar(true);
  };
  const asignarCompetencia = async (id) => {
    const competenciasSeleccionadas = competenciasLista.filter(
      (competencia) => competencia.seleccionada
    );
    console.log(competenciasSeleccionadas);
    handleCerrarPopUpAsignar();
  };
  const handleSeleccionCompetencia = (competenciaId) => {
    const competenciasActualizadas = competenciasLista.map((competencia) => {
      if (competencia.id === competenciaId) {
        return { ...competencia, seleccionada: !competencia.seleccionada };
      }
      return competencia;
    });
    setCompetenciasLista(competenciasActualizadas);
  };
  const handleCerrarPopUpAsignar = () => {
    setmostrarPopUpAsignar(false);
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
  const renderCards = () => {
    return (
      <div className="card-container">
        {competencias.map((competencia) => (
          <div key={competencia.id} className="card">
            <h4>Competencia: {competencia.name}</h4>
            <p>Demanda: 10 {/*competencia.demanda*/}</p>
          </div>
        ))}
      </div>
    );
  }
  const renderTablaCompetencias = () => {
    return (
    <Table striped bordered hover>
      <thead>
        <tr>
            <th onClick={() => handleOrdenarPorCampo('code')}>Código {campoOrdenamiento === 'code' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('name')}>Nombre {campoOrdenamiento === 'name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('type')}>Tipo de Capacidad {campoOrdenamiento === 'type' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('active')}>Estado {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th>Acciones</th>        
        </tr>
      </thead>
      <tbody>
        {datosFiltradosYOrdenados.map((competencia) => (
          <tr key={competencia.id}>
            <td>{competencia.code}</td>
            <td>{competencia.name}</td>
            <td>{tipoCompetencias.find((tipo) => tipo.id == competencia.type)?.name}</td>
            <td>{competencia.active ? 'Activo' : 'Inactivo'}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => handleMostrarPopUpBorrar(competencia)}><Trash /></Button>
              <Button variant="secondary" size="sm" onClick={() => handleMostrarPopUpActualizar(competencia)}><Pencil /></Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>)
  }
  const renderTabla2 = () => {
    return (
    <Table striped bordered hover>
      <thead>
        <tr>
            <th onClick={() => handleOrdenarPorCampo('code')}>Nombre {campoOrdenamiento === 'code' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('name')}>Tipo {campoOrdenamiento === 'name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('type')}>Capacidad {campoOrdenamiento === 'type' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('active')}>Costo {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th> </th>          
        </tr>
      </thead>
      <tbody>
        {datosFiltradosYOrdenados.map((competencia) => (
          <tr key={competencia.id}>
            <td>{competencia.code}</td>
            <td>{competencia.name}</td>
            <td>{tipoCompetencias.find((tipo) => tipo.id == competencia.type)?.name}</td>
            <td>{competencia.active ? 'Activo' : 'Inactivo'}</td>
            <td>
              <Button variant="secondary" size="sm" onClick={() => handleMostrarPopUpAsignar(competencia)}><Pencil /></Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>)
  }
  const renderSet = () =>{
    const addElement = () => {
      const newElement = `Curso ${elements.length + 1}`;
      setElements([...elements, newElement]);
    };
    return (
      <>
      <div className="dynamic-card">
      <div className="card">
        <h4>Card Dinámico</h4>
        <ul>
          {elements.map((element, index) => (
            <div>
              <li key={index}>{element}</li>
              <button onClick={addElement}>+</button>
            </div>
          ))}
        </ul> 
      </div>
      <div className="col-sm-3 botones2 justify-content-center">
        <button>Costo de cursos</button>
        <button>Presupuesto</button>
      </div>
      <div className='col-sm-3 basicSearch'>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Nombre de curso, competencia, tipo de competencia"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
      </div>
      <Button variant="primary" className='Search' onClick={handleSearch}>
        Buscar
      </Button>
      {renderTabla2()}
    </div>
      </>
    );
  }
  return (
    <div className='pantalla'>
      <div className='titles'>
      <h2 className='Head'>Demanda de capacitación</h2>
      <p className="text-muted subtitle">Generar la demanda de capacitación.</p>
      </div>

      <div className='container-fluid'>
        <h2 className='Head'>Necesidades de competencias</h2>
         {renderCards()}
      </div>

      <div className='container-fluid'>
        <h2 className='Head'>Lista de cursos</h2>
         {!mostrar && renderTablaCompetencias()}
         {mostrar && renderSet()}
      </div>

      <div className='container-fluid'>
        <div className='row'>
         </div>
            <div className='row'>
              <div className="col-sm-3 botones2 justify-content-center">
                <Button variant="outline-secondary" className='Search' onClick={()=>{navigate(-1)}}>
                Regresar
                </Button>{' '}
                <Button variant="primary" className='Search' onClick={handleSearch}>
                Generar lista
                </Button>{' '}
              </div>
              <div className="col-sm-3 botones2 justify-content-center">          
                <Button variant="primary" className='Search2' onClick={handleMostrarPopUpCrear}>
                Guardar cursos
                </Button>
              </div>  
              <div className="col-sm-3 botones2 justify-content-center">          
                <Button variant="primary" className='Search2' onClick={()=>{mostrar?setMostrar(false):setMostrar(true)}}>
                Cambiar vista
                </Button>
              </div>  
          </div>
        </div>
        <Modal show={mostrarPopUpAsignar} onHide={handleCerrarPopUpAsignar}>
          <Modal.Header closeButton>
            <Modal.Title>Asignar competencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>      
            <div className='container-fluid'>
              <p>Competencias que cubre el curso de Java Avanzado"{competenciaSeleccionada?.name}"?</p>
              <ul>
                {competenciasLista.map((competencia) => (
                  <li key={competencia.id}>
                    <input
                      type="checkbox"
                      checked={competencia.seleccionada}
                      onChange={() => handleSeleccionCompetencia(competencia.id)}
                    />
                    {competencia.nombre}
                  </li>
                ))}
              </ul>              
              <div className='espacio'>
                <Button className="botones2" onClick={asignarCompetencia}>
                  Aceptar
                </Button>
              </div>
            </div>
            <div className='botonCerrar2'>
            <Button variant="secondary" onClick={handleCerrarPopUpAsignar}>
              Cerrar
            </Button>
            </div>
          </Modal.Body>
      </Modal>  

    </div>
  );
};

export default SelectDemandCourses;