import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button, Table, Modal  } from 'react-bootstrap';
import UpdateCompetencia from './Update';
import DeleteCompetencia from './Delete';
import { Download,Upload,ArrowRightCircleFill,Pencil,Trash } from 'react-bootstrap-icons';
import { set } from 'zod';
import { useHref } from 'react-router-dom';
const DetalleCompetenciasArea = () => {
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [puesto, setPuesto] = useState('');
    const [palabrasClave, setPalabrasClave] = useState('');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [mostrarPopUpCrear , setmostrarPopUpCrear] = useState(false);
    const [mostrarPopUpActualizar, setmostrarPopUpActualizar] = useState(false);
    const [mostrarPopUpBorrar, setmostrarPopUpBorrar] = useState(false);
    const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
    // Datos de ejemplo para la tabla
    const tablaHardcode = [
        {
          id: 1,
          nombres: 'Juan',
          apellidos: 'Pérez',
          puesto: 'Desarrollador',
          area: 'Tecnología',
          revisarCompetencias: 'Sí',
          telefono: '123456789',
          estado: 'Activo',
        },
        {
          id: 2,
          nombres: 'María',
          apellidos: 'González',
          puesto: 'Analista',
          area: 'Finanzas',
          revisarCompetencias: 'No',
          telefono: '987654321',
          estado: 'Inactivo',
        },
        {
          id: 3,
          nombres: 'Carlos',
          apellidos: 'López',
          puesto: 'Gerente',
          area: 'Operaciones',
          revisarCompetencias: 'Sí',
          telefono: '456789123',
          estado: 'Activo',
        },
        {
          id: 4,
          nombres: 'Laura',
          apellidos: 'Rodríguez',
          puesto: 'Diseñadora',
          area: 'Creatividad',
          revisarCompetencias: 'Sí',
          telefono: '321654987',
          estado: 'Inactivo',
        },
        {
          id: 5,
          nombres: 'Pedro',
          apellidos: 'Hernández',
          puesto: 'Contador',
          area: 'Contabilidad',
          revisarCompetencias: 'No',
          telefono: '789123456',
          estado: 'Activo',
        },
        {
          id: 6,
          nombres: 'Ana',
          apellidos: 'Sánchez',
          puesto: 'Asistente Administrativo',
          area: 'Administración',
          revisarCompetencias: 'Sí',
          telefono: '654987321',
          estado: 'Inactivo',
        },
        {
          id: 7,
          nombres: 'David',
          apellidos: 'Martínez',
          puesto: 'Ingeniero',
          area: 'Ingeniería',
          revisarCompetencias: 'Sí',
          telefono: '369852147',
          estado: 'Activo',
        },
        {
          id: 8,
          nombres: 'Isabel',
          apellidos: 'Luna',
          puesto: 'Analista de Marketing',
          area: 'Marketing',
          revisarCompetencias: 'No',
          telefono: '258741369',
          estado: 'Inactivo',
        },
        {
          id: 9,
          nombres: 'Roberto',
          apellidos: 'Romero',
          puesto: 'Coordinador de Proyectos',
          area: 'Proyectos',
          revisarCompetencias: 'Sí',
          telefono: '741963852',
          estado: 'Activo',
        },
        {
          id: 10,
          nombres: 'Julia',
          apellidos: 'Vargas',
          puesto: 'Asistente de Recursos Humanos',
          area: 'Recursos Humanos',
          revisarCompetencias: 'Sí',
          telefono: '159263487',
          estado: 'Inactivo',
        },
        {
          id: 11,
          nombres: 'Fernando',
          apellidos: 'Gómez',
          puesto: 'Arquitecto',
          area: 'Arquitectura',
          revisarCompetencias: 'No',
          telefono: '369852147',
          estado: 'Activo',
        },
        {
          id: 12,
          nombres: 'Carolina',
          apellidos: 'Díaz',
          puesto: 'Asesor Financiero',
          area: 'Finanzas',
          revisarCompetencias: 'Sí',
          telefono: '258741369',
          estado: 'Inactivo',
        },
        {
          id: 13,
          nombres: 'Sergio',
          apellidos: 'Torres',
          puesto: 'Programador',
          area: 'Tecnología',
          revisarCompetencias: 'No',
          telefono: '741963852',
          estado: 'Activo',
        },
        {
          id: 14,
          nombres: 'Valentina',
          apellidos: 'Rojas',
          puesto: 'Ejecutiva de Ventas',
          area: 'Ventas',
          revisarCompetencias: 'Sí',
          telefono: '159263487',
          estado: 'Inactivo',
        },
        {
          id: 15,
          nombres: 'Andrés',
          apellidos: 'Castro',
          puesto: 'Consultor',
          area: 'Consultoría',
          revisarCompetencias: 'Sí',
          telefono: '123456789',
          estado: 'Activo',
        },
        {
          id: 16,
          nombres: 'Daniela',
          apellidos: 'Mendoza',
          puesto: 'Analista de Datos',
          area: 'Análisis de Datos',
          revisarCompetencias: 'No',
          telefono: '987654321',
          estado: 'Inactivo',
        },
        {
          id: 17,
          nombres: 'Hugo',
          apellidos: 'Silva',
          puesto: 'Desarrollador',
          area: 'Tecnología',
          revisarCompetencias: 'Sí',
          telefono: '456789123',
          estado: 'Activo',
        },
        {
          id: 18,
          nombres: 'Lucía',
          apellidos: 'Torres',
          puesto: 'Analista',
          area: 'Finanzas',
          revisarCompetencias: 'No',
          telefono: '321654987',
          estado: 'Inactivo',
        },
        {
          id: 19,
          nombres: 'Diego',
          apellidos: 'Ramírez',
          puesto: 'Gerente',
          area: 'Operaciones',
          revisarCompetencias: 'Sí',
          telefono: '789123456',
          estado: 'Activo',
        },
        {
          id: 20,
          nombres: 'Valeria',
          apellidos: 'Ortega',
          puesto: 'Analista de Marketing',
          area: 'Marketing',
          revisarCompetencias: 'No',
          telefono: '654987321',
          estado: 'Inactivo',
        },
      ];
      
    
      
    const [competenciasData, setCompetenciasData] = useState(tablaHardcode);

  
    const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setPuesto(event.target.value);
    };
    
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
        setPuesto('');
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

        if (puesto) {
          competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.puesto === puesto);
        }

        if (palabrasClave) {
            const palabrasClaveLower = palabrasClave.toLowerCase();
            competenciasFiltradas = competenciasFiltradas.filter(competencia =>
              competencia.nombres.toLowerCase().includes(palabrasClaveLower) ||
              competencia.apellidos.toLowerCase().includes(palabrasClaveLower) ||
              competencia.puesto.toLowerCase().includes(palabrasClaveLower) ||
              competencia.area.toLowerCase().includes(palabrasClaveLower) ||
              competencia.telefono.toLowerCase().includes(palabrasClaveLower) ||
              competencia.estado.toLowerCase().includes(palabrasClaveLower)
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
                    <th onClick={() => handleOrdenarPorCampo('nombres')}>
                    Nombres
                    {campoOrdenamiento === 'nombres' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('apellidos')}>
                    Apellidos
                    {campoOrdenamiento === 'apellidos' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('puesto')}>
                    Puesto
                    {campoOrdenamiento === 'puesto' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('area')}>
                    Área
                    {campoOrdenamiento === 'area' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('revisarCompetencias')}>
                    Revisar competencias
                    {campoOrdenamiento === 'revisarCompetencias' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('telefono')}>
                    Teléfono
                    {campoOrdenamiento === 'telefono' && (
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
                <td>{competencia.nombres}</td>
                <td>{competencia.apellidos}</td>
                <td>{competencia.puesto}</td>
                <td>{competencia.area}</td>
                <td>{competencia.revisarCompetencias}</td>
                <td>{competencia.telefono}</td>
                <td>{competencia.estado}</td>
                <td>
                    <Button variant="link" size="sm">
                    <ArrowRightCircleFill color='gray'></ArrowRightCircleFill>
                      <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                    <Button variant="link" size="sm" onClick={
                      ()=>{handleMostrarPopUpActualizar(competencia);}}>
                      <Pencil></Pencil>
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="link" size="sm" onClick={
                      ()=>{handleMostrarPopUpBorrar(competencia);}}>
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
      <h2>Competencias por empleado del área de TI</h2>
      <p className="text-muted">Consultar competencias de los empleados.</p>
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
                <Form.Label>Puesto de trabajo</Form.Label>
                <Form.Control as="select" value={puesto} onChange={(e) => setPuesto(e.target.value)}>
                    <option value="">Todos</option>
                    {tablaHardcode.map((competencia, index) => (
                    <option key={index} value={competencia.puesto}>{competencia.puesto}</option>
                    ))}
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
              <Button variant="outline-secondary" className="me-2" onClick={()=>{}}>
                Regresar
              </Button>
            </div>
    </div>
  );
};

export default DetalleCompetenciasArea;
