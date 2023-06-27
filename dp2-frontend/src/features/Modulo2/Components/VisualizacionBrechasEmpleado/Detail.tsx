import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import React from 'react'
import { Button, Form, FormControl, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import './Detail.css';

const TrainingNeeds = () => {
  const navigate = useNavigate();
  const [palabrasClave, setPalabrasClave] = React.useState('');
  const [tipoCompetenciaString, setTipoCompetenciaString] = React.useState('');
  const [tipoCompetenciaSelected, setTipoCompetenciaSelected] = React.useState(null);
  const [tiposCompetencia, setTiposCompetencia] = React.useState(null);
  const [tipoOrden, setTipoOrden] = React.useState('ascendente');
  const [campoOrdenamiento, setCampoOrdenamiento] = React.useState('');
  const [trainingNeed, setTrainingNeed] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    axiosEmployeeGaps
      .get("gaps/competenceTypes")
      .then(function (response) {
        let temp = {
          id: -1,
          name: "Tipos de capacidad"
        }
        let temp2 = {
          id: 0,
          name: "Todas"
        }
        let tipoCom = [];
        tipoCom.push(temp);
        tipoCom.push(temp2);
        response.data.forEach(res => tipoCom.push(res));
        setTipoCompetenciaString(temp.name);
        setTipoCompetenciaSelected(temp);
        setTiposCompetencia(tipoCom);
        const obj = {
          estado: 0,
          tipo: 0,
          activo: 2,
          idEmpleado: 1 // Cambiar idEmpleado logeado
        }
        axiosEmployeeGaps
          .post("gaps/trainingNeedSearch", obj)
          .then(function (response) {
            setTrainingNeed(response.data);
            setIsLoading(false);
          })
          .catch(function(error){
            console.log(error);
            setIsLoading(false);
        })
      })
      .catch(function(error){
        console.log(error);
        setIsLoading(false);
    })
  }, [])

  const handleTipoCompetencias = (string) => {
    setTipoCompetenciaString(string);
    setTipoCompetenciaSelected(tiposCompetencia.filter(competencia => competencia.name === string)[0]);
  }

  const limpiarFiltros = () => {
    setPalabrasClave('')
    setTipoCompetenciaString('');
  };

  const handleSearch = () => {
    console.log(tipoCompetenciaSelected.id);
    const obj = {
      estado: 0,
      tipo: tipoCompetenciaSelected.id,
      activo: 2,
      idEmpleado: 1 // Cambiar idEmpleado logeado
    }
    axiosEmployeeGaps
      .post("gaps/trainingNeedSearch", obj)
      .then(function (response) {
        setTrainingNeed(response.data);
      })
  }

  const handleOrdenarPorCampo = (campo) => {
    if (campo === campoOrdenamiento) {
      setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
    } else {
      setCampoOrdenamiento(campo);
      setTipoOrden('ascendente');
    }
  };

  const returnLevel = (number) => {
    if (number === 'A') return "Alto";
    if (number === 'M') return "Medio";
    if (number === 'B') return "Bajo";
    //if (number === 4) return "Alto";
    return " "
  }

  return (
    <>
      <div className='row'>
        <h2>Necesidades de capacitación</h2>
        <p className="text-muted">Necesidades de capacitación del empleado</p>
        {/* {isLoading ? <></> : 
        <Form className="row align-items-center mb-4">
          <Form.Group className="col-6">
            <FormControl
              placeholder="Ingrese palabras clave, código o nombre de las capacidad"
              aria-label="Buscar capacidades"
              aria-describedby="buscar-icono"
              value={palabrasClave}
              onChange={(e) => setPalabrasClave(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="filtroTipoCompetencia" className="col-3">
            <select
              className="form-select"
              value={tipoCompetenciaString}
              onChange={(e) => handleTipoCompetencias(e.target.value)}
            >
              {tiposCompetencia && tiposCompetencia.map((tipoCom, index) => (
                <option value={tipoCom.name} hidden={tipoCom.id === -1}>{tipoCom.name}</option>
              ))}
            </select>
          </Form.Group>

          <div className="col-3">
            <Button variant="outline-secondary" className="me-2" onClick={limpiarFiltros}>
              Limpiar Filtros
            </Button>
            <Button variant="primary" onClick={handleSearch}>Buscar</Button>
          </div>
        </Form>
        } */}

        {isLoading ? <LoadingScreen/> :     
        <div className='row align-items-start'>
          <div className="table-container">
            {trainingNeed && trainingNeed.length === 0 ? <p>No se encontraron resultados.</p> :
            <div className="table-need">
              <Table striped bordered className='table-need'>
                <thead>
                  <tr>
                    <th onClick={() => handleOrdenarPorCampo('competence__name')}>
                      Capacidad
                      {campoOrdenamiento === 'competence__name' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                      )}
                    </th>
                    {/* <th onClick={() => handleOrdenarPorCampo('competence__type__name')}>
                      Tipo de capacidad
                      {campoOrdenamiento === 'competence__type__name' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                      )}
                    </th> */}
                    <th onClick={() => handleOrdenarPorCampo('levelCurrent')}>
                      Nivel actual
                      {campoOrdenamiento === 'levelCurrent' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                      )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('levelRequired')}>
                      Nivel requerido
                      {campoOrdenamiento === 'levelRequired' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                      )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('levelGap')}>
                      Niveles faltanes
                      {campoOrdenamiento === 'levelGap' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                      )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('description')}>
                      Observación
                      {campoOrdenamiento === 'description' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className='table-need'>
                  {trainingNeed && trainingNeed.map((competence, index) => (
                    <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                      <td>{competence.capacity__name}</td>
                      {/* <td>{competence.capacity__type__name}</td> */}
                      <td>{returnLevel(competence.levelCurrent)}</td>
                      <td>{returnLevel(competence.levelRequired)}</td>
                      <td>{competence.levelGap}</td>
                      <td>{competence.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            }
          </div>
        </div>
        }
        <div className="d-flex justify-content-start">
          <button className='btn btn-outline-primary mb-2' onClick={() => navigate(-1)}>
            Regresar
          </button>
        </div>
      </div>
    </>
  )
}

export default TrainingNeeds