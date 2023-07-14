import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { ArrowRightCircleFill, Pencil, Trash, Upload } from 'react-bootstrap-icons';
import { comp, Competencia, tipoCompetencia, AreaActiva } from '@features/Modulo2/Components/GestionDeCompetencias/Tipos'
import { TOKEN_SERVICE, URL_SERVICE } from '@features/Modulo2/services/ServicesApis'
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectDemandCourses.css'
const tiposCompetencia: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3']; // Array predefinido de tipos de competencia
const SelectDemandCourses: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, selectedRows, areaSeleccionada, a } = location.state;
  console.log(location.state)
  const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
  const [tipoOrden, setTipoOrden] = useState('ascendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [mostrarPopUpAsignar, setmostrarPopUpAsignar] = useState(false);
  const [mostrarPopUpGenerar, setmostrarPopUpGenerar] = useState(false);
  const [mostrarPopUpCrear, setmostrarPopUpCrear] = useState(false);
  const [mostrarPopUpBorrar, setmostrarPopUpBorrar] = useState(false);
  const [competencias, setCompetencias] = useState([]);
  const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
  const [lleno, setLleno] = useState(0)
  const [competenciasLista, setCompetenciasLista] = useState([
    { id: 1, nombre: 'Competencia 1', seleccionada: false },
    { id: 2, nombre: 'Competencia 2', seleccionada: false },
    { id: 3, nombre: 'Competencia 3', seleccionada: false },
    // Agrega más competencias si es necesario
  ]);
  const [cursosLista, setCursosLista] = useState([]);
  const [comLista, setComLista] = useState<comp[]>([]);
  const hardcodeTable = [
    { id: 1, code: '001', name: 'Java Avanzado', type: 'Java A', active: true },
    { id: 2, code: '002', name: 'Python Básico', type: 'Python B', active: false },
    { id: 3, code: '003', name: 'C# Avanzado', type: 'C# A', active: true },
    { id: 4, code: '004', name: 'JavaScript Intermedio', type: 'JavaScript I', active: true },
    { id: 5, code: '005', name: 'Ruby Básico', type: 'Ruby B', active: false },
    { id: 6, code: '006', name: 'PHP Avanzado', type: 'PHP A', active: true },
    { id: 7, code: '007', name: 'C++ Intermedio', type: 'C++ I', active: false },
    { id: 8, code: '008', name: 'Swift Básico', type: 'Swift B', active: true },
    { id: 9, code: '009', name: 'Go Avanzado', type: 'Go A', active: false },
    { id: 10, code: '010', name: 'R Intermedio', type: 'R I', active: true },
  ];
  const hardcodeCards = [
    { id: 1, name: "Java 'A'", demanda: 100 },
    { id: 2, name: "Python 'B'", demanda: 50 },
    { id: 3, name: "JavaScript 'C'", demanda: 80 },
    { id: 4, name: "C# 'D'", demanda: 70 },
    { id: 5, name: "Ruby 'E'", demanda: 40 }
  ]
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
    fetchCompetencias();
  }, []);
  const filtrarCompetencias = () => {
    var competenciasFiltradas = competencias;
    if (tipoFiltro) {
      estadoFiltro !== '' ?
        competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.type === tipoFiltro) :
        competenciasFiltradas = competenciasFiltradas;
    }
    if (estadoFiltro) {
      competenciasFiltradas = competenciasFiltradas.filter(competencia => (competencia.isActive == (estadoFiltro === 'Activo' ? true : false)));
    }
    if (searchQuery) {
      const palabrasClaveLower = searchQuery.toLowerCase();
      competenciasFiltradas = competenciasFiltradas.filter(competencia =>
        competencia.id.toString().toLowerCase().includes(palabrasClaveLower) ||
        competencia.name.toLowerCase().includes(palabrasClaveLower) ||
        //competencia.code.toString().toLowerCase().includes(palabrasClaveLower) ||
        competencia.type.toString().toLowerCase().includes(palabrasClaveLower) ||
        competencia.isActive.toString().toLowerCase().includes(palabrasClaveLower)
      );
    }
    return competenciasFiltradas;
  };
  const filteredCompetencias = filtrarCompetencias().filter((competencia) => {
    /*
    const searchMatch =
      competencia.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competencia.code.toLowerCase().includes(searchQuery.toLowerCase());
   */
    const tipoMatch = tipoFiltro === 0 || competencia.type === tipoFiltro;
    const estadoMatch = estadoFiltro === '' || competencia.isActive === (estadoFiltro === 'Activo');

    return tipoMatch && estadoMatch;
  });
  const handleSearch = async () => {
    try {
      const body = JSON.stringify(data);
      console.log(data)
      const response = await fetch(URL_SERVICE + '/gaps/trainingNeedGenerateCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN_SERVICE,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res)
        setComLista(res);
      } else {
        console.log('Error al obtener los datos de competencias');
      }
    } catch (error) {
      console.log('Error al obtener los datos de competencias:', error);
    }

  };
  const handleMostrarPopUpCrear = () => {
    setmostrarPopUpCrear(true);
    setLleno(lleno + 1)
    console.log(lleno)
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
  const handleMostrarPopUpBorrar = (competencia) => {
    setCompetenciaSeleccionada(competencia);
    setmostrarPopUpBorrar(true);
  };
  const borrarCompetencia = async (id) => {
    try {
      const response = await fetch(`https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competences/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': TOKEN_SERVICE
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
  const handleMostrarPopUpAsignar = (competencia) => {
    setCompetenciaSeleccionada(competencia);
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
  const handleMostrarPopUpGenerar = async (competencia) => {
    setCompetenciaSeleccionada(competencia);
    setLleno(lleno + 1)
    console.log(lleno)
    setmostrarPopUpGenerar(true);
    try {
      const empleadosId = selectedRows.map(id => ({
        empleado: id
      }));
      const body = {
        "area": areaSeleccionada,
        "posicion": parseInt(a),
        "empleados": [] /*selectedRows.length > 0 ? empleadosId : []*/,
        "cursos": comLista
      };
      console.log(body)
      const response = await fetch(URL_SERVICE + '/gaps/trainingNeedCourse ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN_SERVICE,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const res = await response.json();
        console.log("funciona")
        console.log(res)
        setCursosLista(res);
      } else {
        console.log('Error al obtener los datos de competencias');
      }
    } catch (error) {
      console.log('Error al obtener los datos de competencias:', error);
    }


  };
  const confirmarCompetencia = async (id) => {
    const competenciasSeleccionadas = competenciasLista.filter(
      (competencia) => competencia.seleccionada
    );
    console.log(competenciasSeleccionadas);
    handleCerrarPopUpAsignar();
  };
  const handleConfirmar = (competenciaId) => {
    const competenciasActualizadas = competenciasLista.map((competencia) => {
      if (competencia.id === competenciaId) {
        return { ...competencia, seleccionada: !competencia.seleccionada };
      }
      return competencia;
    });
    setCompetenciasLista(competenciasActualizadas);
  };
  const handleCerrarPopUpGenerar = () => {
    setmostrarPopUpGenerar(false);
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
        {data.map((competencia) => (
          <div key={competencia.id} className="card">
            <h4>Competencia: {competencia.competencia_nombre}</h4>
            <p>Demanda: {competencia.cantidad} Empleados</p>
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
            <th onClick={() => handleOrdenarPorCampo('name')}>Nombre {campoOrdenamiento === 'name' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('type')}>Competencias {campoOrdenamiento === 'type' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
            <th onClick={() => handleOrdenarPorCampo('active')}>Para Demanda? {campoOrdenamiento === 'active' && (tipoOrden === 'ascendente' ? <ArrowRightCircleFill /> : <ArrowRightCircleFill className="flip" />)}</th>
          </tr>
        </thead>
        <tbody>
          {comLista.map((competencia) => (
            <tr key={competencia.curso}>
              <td>{competencia.curso_nombre}</td>
              <td>{competencia.competencias.map((compe) => (compe.competencia_nombre + " "))}</td>
              <td>Si</td>
            </tr>
          ))}
        </tbody>
      </Table>)
  }
  const renderConfirmacion = () => {
    return (
      <Modal show={mostrarPopUpGenerar} onHide={handleCerrarPopUpGenerar}>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje de confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container-fluid'>
            <p>¿Seguro que desea asignar los cursos seleccionados?</p>

            <Button className="Search2" onClick={() => { navigate(-1) }}>
              Aceptar
            </Button>
            <Button variant="secondary" className='Search2' onClick={handleCerrarPopUpGenerar}>
              Cancelar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  const renderAlerta = () => {
    return (
      <Modal show={mostrarPopUpGenerar} onHide={handleCerrarPopUpGenerar}>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje de alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container-fluid'>
            <p>¿Seguro que desea asignar los cursos seleccionados? No se estan cubriendo todas las comptencias</p>
            <div className='espacio'>
              <Button className="botones2" onClick={() => { }}>
                Aceptar
              </Button>
              <Button variant="secondary" className='botones2' onClick={handleCerrarPopUpGenerar}>
                Cancelar
              </Button>
            </div>
          </div>

        </Modal.Body>
      </Modal>
    )
  }
  return (
    <div className='pantalla'>
      <div className='titles'>
        <h2 className='Head'>Demanda de capacitación</h2>
        <p className="text-muted subtitle">Generar la demanda de capacitación.</p>
      </div>

      <div className='container-fluid'>

        <div className='row'>

          <div className='col-6'>
            <h2 className='Head2'>Necesidades de competencias</h2>
            {renderCards()}
          </div>

          <div className='col-6'>
            <h2 className='Head2'>Lista de cursos</h2>
            <div className='container-fluid tabla'>
              {renderTablaCompetencias()}
            </div>
          </div>
        </div>

        <div className='row'>
        </div>
        <div className='row'>
          <div className="col-sm-3 botones2 justify-content-center">
            <Button variant="outline-secondary" className='Search' onClick={() => { navigate(-1) }}>
              Regresar
            </Button>{' '}
            <Button variant="primary" className='Search' onClick={handleSearch}>
              Generar lista
            </Button>{' '}
          </div>
          <div className="col-md-9  justify-content-center">
            <Button variant="primary" className='Search3' onClick={handleMostrarPopUpGenerar}>
              Generar demanda
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


            <Button className="Search2" onClick={asignarCompetencia}>
              Aceptar
            </Button>

            <Button variant="secondary" className='Search2' onClick={handleCerrarPopUpAsignar}>
              Cancelar
            </Button>






          </div>
        </Modal.Body>
      </Modal>
      {renderConfirmacion()}
    </div>
  );
};
export default SelectDemandCourses;