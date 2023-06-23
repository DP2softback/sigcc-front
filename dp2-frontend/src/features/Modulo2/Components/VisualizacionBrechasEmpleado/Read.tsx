import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart1 from './Barchart1';
import './Read.css'
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { Navigate, useNavigate } from 'react-router-dom';
import { GAPS_ANALYSIS_MODULE, GAPS_EMPLOYEE_EMP, GAPS_EMPLOYEE_EMP_DETAIL } from '@features/Modulo2/routes/path';

const Read = () => {

    const navigate = useNavigate();
    const [palabrasClave, setPalabrasClave] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [tipoCompetenciaString, setTipoCompetenciaString] = useState('');
    const [tipoCompetenciaSelected, setTipoCompetenciaSelected] = useState(null);
    const [tiposCompetencia, setTiposCompetencia] = useState(null);
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [employeeCompetences, setEmployeeCompetences] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        axiosEmployeeGaps
        .get("gaps/competenceTypes")
        .then(function (response){
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
        setPalabrasClave('');
        setTipoCompetenciaSelected({
            id: -1,
            name: "Tipos de capacidades"
        });
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
        if (number === 'A') return "Alto";
    if (number === 'M') return "Medio";
    if (number === 'B') return "Bajo";
    //if (number === 4) return "Alto";
    return " "
    }

    return (
        <>
            <div className='row'>
                <h2>Mis brechas de capacidades</h2>
                <p className="text-muted">Visualización de estadísticas de los niveles requeridos por capacidades</p>
                {isLoading ? <></> : 
                <Form className="row align-items-center mb-4">
                    <Form.Group className="col-6">
                        <FormControl
                            placeholder="Ingrese palabras clave, código o nombre de las capacidades"
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
                }
            </div>
                     
        {isLoading ? <LoadingScreen/> :           
            <div className='row align-items-start'>
                <div className='col-sm-12 col-md-6'>
                    <div className="table-container">
                    {employeeCompetences && employeeCompetences.length === 0 ? <p>No se encontraron resultados.</p> : 
                        <Table striped bordered className='tableGapsEmployees'>
                            <thead>
                                <tr>
                                    <th onClick={() => handleOrdenarPorCampo('capacity__name')}>
                                        Nombre
                                        {campoOrdenamiento === 'capacity__name' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('capacity__type__name')}>
                                        Tipo
                                        {campoOrdenamiento === 'capacity__type__name' && (
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
                                        <td>{competence.capacity__name}</td>
                                        <td>{competence.capacity__type__name}</td>
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
                        <Button onClick={() => navigate(`/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEE_EMP}/${GAPS_EMPLOYEE_EMP_DETAIL}`)}>
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
        }
        </>
    )
}

export default Read