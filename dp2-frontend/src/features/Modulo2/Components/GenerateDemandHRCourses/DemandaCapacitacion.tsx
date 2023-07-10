import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import {Competencia,tipoCompetencia} from '@features/Modulo2/Components/GestionDeCompetencias/Tipos'
import {TOKEN_SERVICE, URL_SERVICE}from '@features/Modulo2/services/ServicesApis'
import './DemandaCapacitacion.css';

const tiposCompetencia: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3']; // Array predefinido de tipos de competencia

const CompetenciasRead: React.FC = () => {
  const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
  const [tipoOrden, setTipoOrden] = useState('ascendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [estadoFiltro, setEstadoFiltro] = useState(''); 
  const [mostrarPopUpCrear , setmostrarPopUpCrear] = useState(false);
  const [mostrarPopUpActualizar, setmostrarPopUpActualizar] = useState(false);
  const [mostrarPopUpBorrar, setmostrarPopUpBorrar] = useState(false);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
  const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
  const [mostrarPopUpInfo,setmostrarPopUpInfo] = useState(null)
  const [tipo,setTipo] = useState('')  
  const [name,setName] = useState('')
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
      competenciasFiltradas = competenciasFiltradas.filter(competencia => (competencia.isActive  == (estadoFiltro === 'Activo'? true : false)));
    }
    if (searchQuery) {
        const palabrasClaveLower = searchQuery.toLowerCase();
        competenciasFiltradas = competenciasFiltradas.filter(competencia =>
          competencia.id.toString().toLowerCase().includes(palabrasClaveLower) ||
          competencia.name.toLowerCase().includes(palabrasClaveLower) ||
          //competencia.code.toString().toLowerCase().includes(palabrasClaveLower) ||
          competencia.type.toString().toLowerCase().includes(palabrasClaveLower)||
          competencia.isActive.toString().toLowerCase().includes(palabrasClaveLower)
        );
      }
    return competenciasFiltradas;
};
  const filteredCompetencias = filtrarCompetencias().filter((competencia) => {
    const searchMatch =
      competencia.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competencia.code.toLowerCase().includes(searchQuery.toLowerCase());
    const tipoMatch = tipoFiltro === 0 || competencia.type === tipoFiltro;
    const estadoMatch = estadoFiltro === '' || competencia.isActive === (estadoFiltro === 'Activo');

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

  const handleMostrarPopUpInfo  = (competencia) => {
    setCompetenciaSeleccionada(competencia);
    setTipo(tipoCompetencias.find((tipo) => tipo.id == competencia.type)?.name)
    setName(competencia.name);
    setmostrarPopUpInfo(true);
  };



  const handleCerrarPopUpInfo = () => {
    setmostrarPopUpInfo(false);
  };



  
  const handleMostrarPopUpActualizar = (competencia) => {
    setCompetenciaSeleccionada(competencia);
    setTipo(tipoCompetencias.find((tipo) => tipo.id == competencia.type)?.name)
    setName(competencia.name);
    setmostrarPopUpActualizar(true);
  };

/*
//ACTUALIZADO LOCAL
  
  const actualizarCompetencia = (competenciaActualizada) => {
    var tablaAux = competencias;
    const indice = competencias.findIndex((competencia) => competencia.id=== competenciaActualizada.id);
    if (indice !== -1) {
      tablaAux[indice] = competenciaActualizada;
    }
    setCompetencias(tablaAux);
    handleCerrarPopUpActualizar();
  };
*/

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
            <td>{competencia.isActive ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Button variant="link" size="sm" onClick={() => handleMostrarPopUpInfo(competencia)}>
                    <ArrowRightCircleFill color='gray'></ArrowRightCircleFill>
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleMostrarPopUpActualizar(competencia)}><Pencil /></Button>
                    <Button variant="danger" size="sm" onClick={() => handleMostrarPopUpBorrar(competencia)}><Trash /></Button>
                 
                  </td>
          </tr>
        ))}
      </tbody>
    </Table>)
  }

  return (
    <div className='pantalla'>
      <div className='titles'>
      <h2 className='Head'>Gestión de Capacidades</h2>
      <p className="text-muted subtitle">Agrega, edita y desactiva capacidades.</p>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-3 basicSearch'>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Buscar capacidad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className='col-sm-3 botones'>
            <Form.Group className="mb-3" controlId="tipoFiltro">
                <Form.Control as="select" value={tipoFiltro} onChange={(e) => setTipoFiltro(parseInt(e.target.value))}>
                  <option value="">Todos los tipos</option>
                  {tipoCompetencias.map((tipo) => (
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
                  <option value="">Todos los estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Control>
              </Form.Group>
            </div>
         </div>
            <div className='row'>
              <div className="col-md-6 botones2 justify-content-center">
                <Button variant="outline-secondary" className='Search' onClick={handleLimpiarFiltros}>
                  Limpiar filtros
                </Button>{' '}
                <Button variant="primary" className='Search' onClick={handleSearch}>
                  Buscar
                </Button>{' '}
              </div>
              <div className="col-md-6 botones2 justify-content-center">          
                <Button variant="primary" className='Search2' onClick={handleMostrarPopUpCrear}>
                  Agregar capacidad
                </Button>
              </div>  
          </div>
        </div>  

      <div className='container-fluid'>
         {renderTablaCompetencias()}
      </div>


    </div>
  );
};

export default CompetenciasRead;