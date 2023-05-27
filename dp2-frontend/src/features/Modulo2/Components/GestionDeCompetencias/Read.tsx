import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button, Table, Modal, Row  } from 'react-bootstrap';
import AgregarCompetencia from './Create';
import './Read.css';
const CompetenciasListar = () => {
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [tipoCompetencia, setTipoCompetencia] = useState('');
    const [estado, setEstado] = useState('');
    const [palabrasClave, setPalabrasClave] = useState('');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    // Datos de ejemplo para la tabla
    const hardcode = [
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
        // Agrega más filas de ejemplo aquí
      ];
    const [competenciasData, setCompetenciasData] = useState(hardcode);

    const handleTipoCompetenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setTipoCompetencia(event.target.value);
    };
  
    const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setEstado(event.target.value);
    };
    const agregarCompetencia = (nuevaCompetencia) => {
        setCompetenciasData([...competenciasData, nuevaCompetencia]);
        handleCerrarPopUp();
      };
      const handleMostrarPopUp = () => {
        setMostrarPopUp(true);
      };
    
      const handleCerrarPopUp = () => {
        setMostrarPopUp(false);
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
        let competenciasFiltradas = competenciasData;
      
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
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                    <Button variant="link" size="sm">
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="link" size="sm">
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

            <Form.Group className="col-sm-3" controlId="filtrFoTipoCompetencia">
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
          <Button variant="primary" className="me-2">
            <i className="bi bi-upload"></i> Importar lista
          </Button>
          <p className="text-muted">Maximum file size 2MB</p>
        </div>

        <div className="col-sm-3 botones">
          <Button variant="primary">
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
            <Button className="btn btn-primary" variant="primary"  onClick={handleMostrarPopUp}>Agregar Competencia</Button>
        </div>
      </div>

      </div>
      </div>

      <div className='container-fluid'>
      {mostrarPopUp  && (
        <Modal show={mostrarPopUp} onHide={handleCerrarPopUp}>
            <Modal.Header closeButton>
                <Modal.Title>Crear competencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AgregarCompetencia agregarCompetencia={agregarCompetencia} />
            </Modal.Body>
        </Modal>
      )}
      {renderTablaCompetencias()}
      </div>
    </div>
  );
};

export default CompetenciasListar;