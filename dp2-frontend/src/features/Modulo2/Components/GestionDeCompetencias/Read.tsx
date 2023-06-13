import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Download, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import AgregarCompetencia from './Create';
import ActualizarCompetencia from './Update';
import BorrarCompetencia from './Delete';
import {Competencia,tipoCompetencia} from './Tipos'
import './Read.css';

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

        const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competenceSearch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf',
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

        const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competenceTypes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf',
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
          competencia.code.toLowerCase().includes(palabrasClaveLower) ||
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

  const handleMostrarPopUpCrear  = () => {
    setmostrarPopUpCrear(true);
  };

  const agregarCompetencia = (nuevaCompetencia) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf'
      },
      body: JSON.stringify({
        name: nuevaCompetencia.name,
        description: nuevaCompetencia.description,
        active: nuevaCompetencia.active,
        type: nuevaCompetencia.type
      })
    };
  
    fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competences', requestOptions)
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
  try {
    const response = await fetch(
      'https://o4vwfhvzsh.execute-api.us-east-1.amazonaws.com/dev-modulo-brechas/api/v1/gaps/competences',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf',
        },
        body: JSON.stringify(competenciaActualizada),
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
    setmostrarPopUpBorrar(true);
  };


/*
//BORRADO LOCAL
  const borrarCompetencia = (id) => {
    const updatedCompetencias = 
    competencias.filter((competencia) => competencia.id !== id);
    setCompetencias(updatedCompetencias);
    setCompetenciaSeleccionada(null);
    handleCerrarPopUpBorrar();
  };
*/

const borrarCompetencia = async (id) => {
  try {
    const response = await fetch(`https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competences?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf'
      }
    });

    if (response.ok) {
      const updatedCompetencias = competencias.filter((competencia) => competencia.id !== id);
      setCompetencias(updatedCompetencias);
      setCompetenciaSeleccionada(null);
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
    
    return (<Table striped bordered hover>
      <thead>
        <tr>
            <th onClick={() => handleOrdenarPorCampo('code')}>Código {campoOrdenamiento === 'code' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('name')}>Nombre {campoOrdenamiento === 'name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('description')}>Descripción {campoOrdenamiento === 'description' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('type')}>Tipo de Competencia {campoOrdenamiento === 'type' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('active')}>Activo {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th>Acciones</th>        
        </tr>
      </thead>
      <tbody>
        {datosFiltradosYOrdenados.map((competencia) => (
          <tr key={competencia.id}>
            <td>{competencia.code}</td>
            <td>{competencia.name}</td>
            <td>{competencia.description}</td>
            <td>{tipoCompetencias.find((tipo) => tipo.id == competencia.type)?.name}</td>
            <td>{competencia.active ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Button variant="link" size="sm">
                    <ArrowRightCircleFill color='gray'></ArrowRightCircleFill>
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                    <Button variant="secondary" onClick={() => handleMostrarPopUpActualizar(competencia)}><Pencil /></Button>
                    <Button variant="danger" onClick={() => handleMostrarPopUpBorrar(competencia)}><Trash /></Button>
                  </td>
          </tr>
        ))}
      </tbody>
    </Table>)
  }

  return (
    <div className='pantalla'>
      <div className='titles'>
      <h2>Gestión de Competencias</h2>
      <p className="text-muted">Agrega, edita y desactiva competencias.</p>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-3 basicSearch'>
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


            <div className="col-sm-3 botones">
                    <Button variant="outline-primary" className="me-2">
                    <Download></Download>
                      <i className="bi bi-upload"></i> Importar lista
                    </Button>
                    <p className="text-muted">Maximum file size 2MB</p>
              </div>
              <div className="col-sm-3 botones">
                    <Button variant="outline-primary">
                    <Upload></Upload>
                      <i className="bi bi-download"></i> Exportar lista
                    </Button>
                    <p className="text-muted">Maximum file size 2MB</p>
              </div>

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
                  Agregar competencia
                </Button>
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





      <div className='container-fluid'>
         {renderTablaCompetencias()}
      </div>


    </div>
  );
};

export default CompetenciasRead;