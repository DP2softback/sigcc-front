import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart1 from './Barchart1';
import './Read.css'
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';

const Read = () => {

    const [palabrasClave, setPalabrasClave] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [tipoCompetenciaString, setTipoCompetenciaString] = useState('');
    const [tipoCompetenciaSelected, setTipoCompetenciaSelected] = useState(null);
    const [tiposCompetencia, setTiposCompetencia] = useState(null);
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [employeeCompetences, setEmployeeCompetences] = useState(null);

    React.useEffect(() => {
        axiosEmployeeGaps
        .get("gaps/competenceTypes")
        .then(function (response){
            let temp = {
                id: -1,
                name: "Tipos de competencia"
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
                idCompetencia: 0,
                palabraClave: "",
                idTipoCompetencia: 0,
                activo: 1,
                idEmpleado: 1// Cambiar idEmpleado logeado
            }
            axiosEmployeeGaps
            .post("gaps/competenceSearch", obj)
            .then(function (response){
                setEmployeeCompetences(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        })
    }, []);

    //para el grafico
    const optionsBar = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const dataBar = {
        labels: ['H1', 'H2', 'H3', 'H4', 'H5'],
        datasets: [
            {
                label: 'Valores',
                data: [3, 5, 1, 1, 3],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
            },
        ],
    };

    const limpiarFiltros = () => {
        setPalabrasClave('')
        setTipoCompetenciaString('');
    };

    const handleOrdenarPorCampo = (campo) => {
        if (campo === campoOrdenamiento) {
            setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
            setCampoOrdenamiento(campo);
            setTipoOrden('ascendente');
        }
    };

    const handleTipoCompetencias = (string) => {
        setTipoCompetenciaString(string);
        setTipoCompetenciaSelected(tiposCompetencia.filter(competencia => competencia.name === string)[0]);
    }

    const handleSearch = () => {
        const obj = {
            idCompetencia: 0,
            palabraClave: palabrasClave,
            idTipoCompetencia: tipoCompetenciaSelected.id,
            activo: 1,
            idEmpleado: 1 // Cambiar idEmpleado logeado
        }
        axiosEmployeeGaps
        .post("gaps/competenceSearch", obj)
        .then(function (response){
            setEmployeeCompetences(response.data);
        })
    }

    const returnLevel = (number) => {
        if(number === 1)return "Muy bajo";
        if(number === 2)return "Bajo";
        if(number === 3)return "Medio";
        if(number === 4)return "Alto";
        return "Muy alto"
    }

    return (
        <>
            <div className='row'>
                <h2>Mis brechas de competencias</h2>
                <p className="text-muted">Visualización de estadísticas de los niveles requeridos por competencias</p>
                <Form className="row align-items-center mb-4">
                    <Form.Group className="col-6">
                        <FormControl
                            placeholder="Ingrese palabras clave, código o nombre de las competencias"
                            aria-label="Buscar competencias"
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
            </div>

            <div className='row align-items-start'>
                <div className='col-sm-12 col-md-6'>
                    <div className="table-container">
                    {employeeCompetences && employeeCompetences.length === 0 ? <p>No se encontraron resultados.</p> : 
                        <Table striped bordered className='tableGapsEmployees'>
                            <thead>
                                <tr>
                                    <th onClick={() => handleOrdenarPorCampo('competence__name')}>
                                        Nombre
                                        {campoOrdenamiento === 'competence__name' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('competence__type__name')}>
                                        Tipo
                                        {campoOrdenamiento === 'competence__type__name' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
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
                                    <th onClick={() => handleOrdenarPorCampo('likeness')}>
                                        % de adecuacion
                                        {campoOrdenamiento === 'likeness' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeCompetences && employeeCompetences.map((competence, index) => (
                                    <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                                        <td>{competence.competence__name}</td>
                                        <td>{competence.competence__type__name}</td>
                                        <td>{returnLevel(competence.levelCurrent)}</td>
                                        <td>{returnLevel(competence.levelRequired)}</td>
                                        <td>{Math.round(competence.likeness) + "%"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button>
                            Ver necesidades de capaticación
                        </Button>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='chart-container'>
                        <BarChart1 dataBarProps={employeeCompetences}/>
                    </div>
                </div>
            </div>


        </>               
    )
}

export default Read