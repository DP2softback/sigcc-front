import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import AgregarCompetencia from './Create';
import ActualizarCompetencia from './Update';
import BorrarCompetencia from './Delete';
import Info from './Info';
import {Competencia,tipoCompetencia} from './Tipos'
import './Read.css';
import {TOKEN_SERVICE, URL_SERVICE}from '@features/Modulo2/services/ServicesApis'
const CompetenciasRead: React.FC = () => {
  const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
  const [tipoOrden, setTipoOrden] = useState('ascendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState(2);
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
    const fetchCompetencias = async () => {
      try {
        const body = {
          idCompetencia: 0,
          palabraClave: searchQuery,
          idTipoCompetencia: 2,
          activo:2,
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
  useEffect(() => {
    
  }, [competencias, tipoCompetencias]);
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
    const tipoMatch = tipoFiltro === 2 || competencia.type === tipoFiltro;
    const estadoMatch = estadoFiltro === '' || competencia.isActive === (estadoFiltro === 'Activo');
    return searchMatch && tipoMatch && estadoMatch;
  });
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
        isActive: nuevaCompetencia.isActive,
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
    window.location.reload();
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
const actualizarCompetencia = async (competenciaActualizada) => {
  console.log(competenciaActualizada)
  const body = {
    id: competenciaActualizada.id,
    name: competenciaActualizada.name,
    description: competenciaActualizada.description,
    isActive: competenciaActualizada.isActive,
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
    window.location.reload();
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
    window.location.reload();
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
            <th onClick={() => handleOrdenarPorCampo('type')}>Tipo de Competencia {campoOrdenamiento === 'type' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('isActive')}>Estado {campoOrdenamiento === 'isActive' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
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
    </Table>
   )
  }
  return (
    <div className='pantalla'>
      <div className='titles'>
      <h2 className='Head'>Gestión de Competencias</h2>
      <p className="text-muted subtitle">Agrega, edita y desactiva competencias.</p>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6 basicSearch'>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Buscar competencia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className='col-sm-3 botones'>
            <Form.Group className="mb-3" controlId="tipoFiltro">
                <Form.Control as="select" value={tipoFiltro} onChange={(e) => {setTipoFiltro(parseInt(e.target.value));console.log(e.target.value)}}>
                  <option value="2">Todos los tipos</option>
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
              <div className="col-md-12">
                <Button variant="primary" className='button1' onClick={handleMostrarPopUpCrear}>
                  Agregar competencia
                </Button>
                <Button variant="outline-secondary" className='button1' onClick={handleLimpiarFiltros}>
                  Limpiar filtros
                </Button>{' '}
              </div>  
          </div>
        </div>  

      <Modal show={mostrarPopUpCrear} onHide={handleCerrarPopUpCrear}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Competencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgregarCompetencia agregarCompetencia={agregarCompetencia} tipoCompetencias ={tipoCompetencias}/>
          <div className='botonCerrar'>
          <Button variant="secondary"  onClick={handleCerrarPopUpCrear}>
            Cerrar
          </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={mostrarPopUpInfo} onHide={handleCerrarPopUpInfo}>
        <Modal.Header closeButton>
          <Modal.Title>{'Informacion de Competencia: ' + ' ' + name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Info competencia ={competenciaSeleccionada} tipo = {tipo}/>
          <div className='botonCerrar'>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={mostrarPopUpActualizar} onHide={handleCerrarPopUpActualizar}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Competencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <ActualizarCompetencia actualizarCompetencia={actualizarCompetencia} competencia={competenciaSeleccionada} tipoCompetencias ={tipoCompetencias}/>
          <div className='botonCerrar'>
            <Button variant="secondary" onClick={handleCerrarPopUpActualizar}>
              Cerrar
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={mostrarPopUpBorrar} onHide={handleCerrarPopUpBorrar}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Competencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BorrarCompetencia borrarCompetencia={borrarCompetencia} competencia={competenciaSeleccionada}/>
          <div className='botonCerrar2'>
          <Button variant="secondary" onClick={handleCerrarPopUpBorrar}>
            Cerrar
          </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className='container-fluid tabla'>
         {renderTablaCompetencias()}
      </div>
    </div>
  );
};
export default CompetenciasRead;