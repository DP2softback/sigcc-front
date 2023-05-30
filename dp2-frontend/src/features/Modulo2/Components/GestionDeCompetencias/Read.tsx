import { useState } from 'react';
import { Form, FormControl, InputGroup, Button, Table, Modal  } from 'react-bootstrap';
import AgregarCompetencia from './Create';
import ActualizarCompetencia from './Update';
import BorrarCompetencia from './Delete';
import { Download,Upload,ArrowRightCircleFill,Pencil,Trash, Cast } from 'react-bootstrap-icons';
import './Read.css';
import axiosInt from "@config/axios";

type Competencia = {
  id: number;
  abreviatura: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};

const CompetenciasListar = () => {
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [tipoCompetencia, setTipoCompetencia] = useState('');
    const [estado, setEstado] = useState('');
    const [palabrasClave, setPalabrasClave] = useState('');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [mostrarPopUpCrear , setmostrarPopUpCrear] = useState(false);
    const [mostrarPopUpActualizar, setmostrarPopUpActualizar] = useState(false);
    const [mostrarPopUpBorrar, setmostrarPopUpBorrar] = useState(false);
    const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);

    const tablaHardcode: Competencia[] = [
        {
          id: 1,
          abreviatura: 'TEC',
          nombre: 'Técnico',
          descripcion: 'Competencias que involucran conocimientos de tecnologías',
          activo: true
        },
        {
          id: 2,
          abreviatura: 'ADM',
          nombre: 'Administrativo',
          descripcion: 'Competencias que involucran conocimientos de administración',
          activo: true
        },
        {
          id: 3,
          abreviatura: 'ART',
          nombre: 'Artístico',
          descripcion: 'Competencias que involucran habilidades artísticas',
          activo: true
        }
      ];


    const tablaApi=[];
    //console.log(tablaApi)

    const [competenciasData, setCompetenciasData] = useState(tablaHardcode);

    const agregarCompetencia = (nuevaCompetencia) => {
        setCompetenciasData([...competenciasData, nuevaCompetencia]);
        handleCerrarPopUpCrear();
    };
    
    const handleMostrarPopUpCrear  = () => {
      setmostrarPopUpCrear(true);
    };
    
    const handleCerrarPopUpCrear = () => {
      setmostrarPopUpCrear(false);
    };
    
    const actualizarCompetencia = (nuevaCompetencia) => {
      var tablaAux = tablaHardcode;
      const indice = tablaHardcode.findIndex((competencia) => competencia.id=== nuevaCompetencia.id);
      if (indice !== -1) {
        tablaAux[indice] = nuevaCompetencia;
      }
      setCompetenciasData(tablaAux);
      handleCerrarPopUpActualizar();
    };
    
    const handleMostrarPopUpActualizar = (competencia) => {
      setCompetenciaSeleccionada(competencia);
      setmostrarPopUpActualizar(true);
    };
    
    const handleCerrarPopUpActualizar = () => { 
      setmostrarPopUpActualizar(false);
    };
    
    const borrarCompetencia = (id) => {
      const updatedCompetencias = 
      competenciasData.filter((competencia) => competencia.id !== id);
      setCompetenciasData(updatedCompetencias);
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
        setTipoCompetencia('');
        setEstado('');
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
        var competenciasFiltradas = competenciasData;
        if (tipoCompetencia) {
          estado !== ''?  
          competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.abreviatura === tipoCompetencia):
          competenciasFiltradas = competenciasFiltradas;
        }      
        if (estado) {
          competenciasFiltradas = competenciasFiltradas.filter(competencia => (competencia.activo  == !!JSON.parse(estado.toLowerCase())));
        }
        if (palabrasClave) {
            const palabrasClaveLower = palabrasClave.toLowerCase();
            competenciasFiltradas = competenciasFiltradas.filter(competencia =>
              competencia.id.toString().toLowerCase().includes(palabrasClaveLower) ||
              competencia.nombre.toLowerCase().includes(palabrasClaveLower) ||
              competencia.abreviatura.toLowerCase().includes(palabrasClaveLower) ||
              competencia.activo.toString().toLowerCase().includes(palabrasClaveLower)||
              competencia.descripcion.toLowerCase().includes(palabrasClaveLower)
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
        if (busquedaRealizada && competenciasFiltradas.length === 0) {
            return <p>No se encontraron resultados.</p>;
          }
        return (
            <Table striped bordered>
            <thead>
              <tr>
            <th onClick={() => handleOrdenarPorCampo('id')}>ID {campoOrdenamiento === 'id' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('abreviatura')}>Abreviatura {campoOrdenamiento === 'abreviatura' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('nombre')}>Nombre {campoOrdenamiento === 'nombre' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('descripcion')}>Descripción {campoOrdenamiento === 'descripcion' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('activo')}>Activo {campoOrdenamiento === 'activo' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltradosYOrdenados.map((competencia) => (
                <tr key={competencia.id}>
                <td>{competencia.id}</td>
                <td>{competencia.abreviatura}</td>
                <td>{competencia.nombre}</td>
                <td>{competencia.descripcion}</td>
                <td>{competencia.activo ? 'Activo' : 'Inactivo'}</td>
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
          </Table>
        );
      };

  return (
    <div className="pantalla">
      <div className='titles'>
      <h2>Gestión de Competencias</h2>
      <p className="text-muted">Agrega, edita y desactiva competencias.</p>
      </div>
      <Form className="FormComp">
        <div className= "container-fluid">
          <div className='row'>
              <InputGroup className="col basicSearch">
              <FormControl
                placeholder="Ingrese palabras clave, código o nombre de las competencias"
                aria-label="Buscar competencias"
                aria-describedby="buscar-icono"
                value={palabrasClave}
                onChange={(e) => setPalabrasClave(e.target.value)}
              />
              <Button variant="outline-secondary" id="buscar-icono" onClick={() => setBusquedaRealizada(true)}>
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
            <Form.Group className="col-sm-3" controlId="filtroTipoCompetencia">
              <Form.Label>Tipo de competencia</Form.Label>
              <Form.Control as="select" value={tipoCompetencia} onChange={(e) => setTipoCompetencia(e.target.value)}>
                <option value="">Todos</option>
                <option value="Técnico">Técnico</option>
                <option value="Habilidades blandas">Habilidades blandas</option>
                <option value="Conocimiento">Conocimiento</option>
              </Form.Control>
            </Form.Group>
            <div className="col-sm-3 botones">
              <Button variant="outline-secondary" className="me-2" onClick={limpiarFiltros}>
                Limpiar Filtros
              </Button>
              <Button variant="primary">Buscar</Button>
            </div>
          </div>
        </div>
      </Form>
      <div className='container-fluid'>
          <div className='row descargas'>
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
              <Form.Group className="col-sm-3" controlId="filtroEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Control as="select" value={(estado)} onChange={(e) => setEstado(e.target.value)}>
                  <option value= '' >Todos</option>
                  <option value= 'true'>Activo</option>
                  <option value='false'>Inactivo</option>
                </Form.Control>
              </Form.Group>
              <div className="col botones">
                <div className="pop-up">
                    <Button className="btn btn-primary" variant="primary"  onClick={handleMostrarPopUpCrear}>Agregar Competencia</Button>
                </div>
              </div>
          </div>
      </div>
      {mostrarPopUpCrear  && (
        <Modal show={mostrarPopUpCrear} onHide={handleCerrarPopUpCrear}>
            <Modal.Header closeButton>
                <Modal.Title>Crear competencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AgregarCompetencia agregarCompetencia={agregarCompetencia} />
            </Modal.Body>
        </Modal>
      )}      
      {mostrarPopUpActualizar  && (
        <Modal show={mostrarPopUpActualizar} onHide={handleCerrarPopUpActualizar}>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar competencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ActualizarCompetencia actualizarCompetencia={actualizarCompetencia} competencia={competenciaSeleccionada}  />
            </Modal.Body>
        </Modal>
      )}
      {mostrarPopUpBorrar  && (
        <Modal show={mostrarPopUpBorrar} onHide={handleCerrarPopUpBorrar}>
            <Modal.Header closeButton>
                <Modal.Title>Borrar competencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BorrarCompetencia borrarCompetencia={borrarCompetencia} competencia={competenciaSeleccionada} />
            </Modal.Body>
        </Modal>
      )}
      <div className='container-fluid'>
         {renderTablaCompetencias()}
      </div>
    </div>
  );
};
export default CompetenciasListar;
