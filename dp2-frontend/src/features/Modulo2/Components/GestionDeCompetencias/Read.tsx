import { useState } from 'react';
import { Form, FormControl, InputGroup, Button, Table, Modal  } from 'react-bootstrap';
import AgregarCompetencia from './Create';
import ActualizarCompetencia from './Update';
import BorrarCompetencia from './Delete';
import { Download,Upload,ArrowRightCircleFill,Pencil,Trash } from 'react-bootstrap-icons';
import './Read.css';
import axiosInt from "@config/axios";
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

    const tablaHardcode = [
        { codigo: 'TEC000001', nombre: 'Liderazgo Técnico', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Técnico' },
        { codigo: 'TEC000002', nombre: 'Comunicación Efectiva', asignadoAPuesto: 'No', estado: 'Inactivo', tipo: 'Habilidades blandas' },
        { codigo: 'TEC000003', nombre: 'Resolución de Problemas', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Conocimiento' },
        { codigo: 'TEC000004', nombre: 'Trabajo en Equipo', asignadoAPuesto: 'Sí', estado: 'Inactivo', tipo: 'Técnico' },
        { codigo: 'TEC000005', nombre: 'Creatividad e Innovación', asignadoAPuesto: 'No', estado: 'Activo', tipo: 'Habilidades blandas' },
        { codigo: 'TEC000006', nombre: 'Gestión del Tiempo', asignadoAPuesto: 'Sí', estado: 'Inactivo', tipo: 'Conocimiento' },
        { codigo: 'TEC000007', nombre: 'Pensamiento Analítico', asignadoAPuesto: 'No', estado: 'Activo', tipo: 'Técnico' },
        { codigo: 'TEC000008', nombre: 'Negociación', asignadoAPuesto: 'No', estado: 'Inactivo', tipo: 'Habilidades blandas' },
        { codigo: 'TEC000009', nombre: 'Planificación Estratégica', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Conocimiento' },
        { codigo: 'TEC000010', nombre: 'Comunicación Interpersonal', asignadoAPuesto: 'No', estado: 'Inactivo', tipo: 'Técnico' },
        { codigo: 'TEC000011', nombre: 'Liderazgo de Equipos', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Habilidades blandas' },
        { codigo: 'TEC000012', nombre: 'Resiliencia', asignadoAPuesto: 'No', estado: 'Activo', tipo: 'Conocimiento' },
        { codigo: 'TEC000013', nombre: 'Adaptabilidad', asignadoAPuesto: 'Sí', estado: 'Inactivo', tipo: 'Técnico' },
        { codigo: 'TEC000014', nombre: 'Comunicación Escrita', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Habilidades blandas' },
        { codigo: 'TEC000015', nombre: 'Habilidades de Presentación', asignadoAPuesto: 'No', estado: 'Inactivo', tipo: 'Conocimiento' },
        { codigo: 'TEC000016', nombre: 'Resolución de Conflictos', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Técnico' },
        { codigo: 'TEC000017', nombre: 'Pensamiento Crítico', asignadoAPuesto: 'No', estado: 'Activo', tipo: 'Habilidades blandas' },
        { codigo: 'TEC000018', nombre: 'Empatía', asignadoAPuesto: 'No', estado: 'Inactivo', tipo: 'Conocimiento' },
        { codigo: 'TEC000019', nombre: 'Toma de Decisiones', asignadoAPuesto: 'Sí', estado: 'Activo', tipo: 'Técnico' },
        { codigo: 'TEC000020', nombre: 'Trabajo Bajo Presión', asignadoAPuesto: 'Sí', estado: 'Inactivo', tipo: 'Habilidades blandas' },
      ];


    /*
    const register = async (email, name, password) => {
    const response = await axiosInt.post('/api/account/register', {
      email,
      name,
      password
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };


  const loadsCourses = () =>
    {
        setLoadingInit(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response)
            {
                setLPName(response.data.nombre);
                setLoadingInit(false);
            })
            .catch(function (error)
            {
                console.log(error);
                setLoadingInit(false);
            });
    }

    useEffect(() =>
    {
        loadsCourses();
    }, []);



    axiosInt.delete(`capacitaciones/learning_path/${learningPathId}/course/detail/${id}`)
            .then(function (response)
            {
                const updatedCourses = courses.filter((course: any) => course.id !== id);
                setCourses(updatedCourses);
            })
            .catch(function (error)
            {
                console.log(error);
            });
     */
    const tablaApi=[];

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
      const indice = tablaHardcode.findIndex((competencia) => competencia.codigo=== nuevaCompetencia.codigo);
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
      competenciasData.filter((competencia) => competencia.codigo !== id);
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
          competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.tipo === tipoCompetencia);
        }      
        if (estado) {
          competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.estado === estado);
        }
        if (palabrasClave) {
            const palabrasClaveLower = palabrasClave.toLowerCase();
            competenciasFiltradas = competenciasFiltradas.filter(competencia =>
              competencia.codigo.toLowerCase().includes(palabrasClaveLower) ||
              competencia.nombre.toLowerCase().includes(palabrasClaveLower) ||
              competencia.estado.toLowerCase().includes(palabrasClaveLower) ||
              competencia.tipo.toLowerCase().includes(palabrasClaveLower)
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
                <th onClick={() => handleOrdenarPorCampo('codigo')}>
                    Código
                    {campoOrdenamiento === 'codigo' && (
                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                </th>
                <th onClick={() => handleOrdenarPorCampo('nombre')}>
                    Nombre
                    {campoOrdenamiento === 'nombre' && (
                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                </th>
                <th onClick={() => handleOrdenarPorCampo('tipo')}>
                    Tipo de competencia
                    {campoOrdenamiento === 'tipo' && (
                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                </th>
                <th onClick={() => handleOrdenarPorCampo('asignadoAPuesto')}>
                    Asignado a algún puesto
                    {campoOrdenamiento === 'asignadoAPuesto' && (
                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                </th>
                <th onClick={() => handleOrdenarPorCampo('estado')}>
                    Estado
                    {campoOrdenamiento === 'estado' && (
                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltradosYOrdenados.map((competencia, index) => (
                <tr key={index}>
                  <td>{competencia.codigo}</td>
                  <td>{competencia.nombre}</td>
                  <td>{competencia.tipo}</td>
                  <td>{competencia.asignadoAPuesto}</td>
                  <td>{competencia.estado}</td>
                  <td>
                    <Button variant="link" size="sm">
                    <ArrowRightCircleFill color='gray'></ArrowRightCircleFill>
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                    <Button variant="link" size="sm" onClick={
                      ()=>{handleMostrarPopUpActualizar({ codigo: competencia.codigo, nombre: competencia.nombre, asignadoAPuesto: competencia.asignadoAPuesto, estado:competencia.estado, tipo: competencia.tipo });}}>
                      <Pencil></Pencil>
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="link" size="sm" onClick={
                      ()=>{handleMostrarPopUpBorrar({ codigo: competencia.codigo, nombre: competencia.nombre, asignadoAPuesto: competencia.asignadoAPuesto, estado:competencia.estado, tipo: competencia.tipo });}}>
                      <Trash color='red'></Trash>
                      <i className="bi bi-trash"></i>
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
                {/* Agregar más opciones de tipo de competencia aquí */}
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
                <Form.Control as="select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="">Todos</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
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