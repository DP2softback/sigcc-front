import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart1 from './Barchart1';
import './Read.css'
import { getCompetencesTypes, getEmployeeCompetences } from '@features/Modulo2/services/EmployeeGapsServices';

const Read = () => {

    const [palabrasClave, setPalabrasClave] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [tipoCompetenciaString, setTipoCompetenciaString] = useState('');
    const [tipoCompetenciaSelected, setTipoCompetenciaSelected] = useState(null);
    const [tiposCompetencia, setTiposCompetencia] = useState(null);
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [employeeCompetences, setEmployeeCompetences] = useState(null);
    const [competenciasData, setCompetenciasData] = useState([
        { nombre: 'Programación en Java', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.45 },
        { nombre: 'Liderazgo', tipo: 'Habilidades blandas', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 1.00 },
        { nombre: 'Programación modular', tipo: 'Conocimiento', nivelActual: 'Medio', nivelRequerido: 'Alto', porcAdecuacion: 0.86 },
        { nombre: 'Uso de Microsoft Word', tipo: 'Técnico', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 1.00 },
        { nombre: 'Innovación', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Gestión del Tiempo', tipo: 'Conocimiento', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.95 },
        { nombre: 'Pensamiento Analítico', tipo: 'Técnico', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 0.40 },
        { nombre: 'Negociación', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.49 },
        { nombre: 'Planificación Estratégica', tipo: 'Conocimiento', nivelActual: 'Alto', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Comunicación Interpersonal', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Alto', porcAdecuacion: 0.15 },
        { nombre: 'Resiliencia', tipo: 'Conocimiento', nivelActual: 'Medio', nivelRequerido: 'Alto', porcAdecuacion: 0.68 },
        { nombre: 'Adaptabilidad', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.52 },
        { nombre: 'Comunicación Escrita', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Habilidades de Presentación', tipo: 'Conocimiento', nivelActual: 'Medio', nivelRequerido: 'Alto', porcAdecuacion: 0.75 },
        { nombre: 'Resolución de Conflictos', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Alto', porcAdecuacion: 0.20 },
        { nombre: 'Pensamiento Crítico', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.40 },
        { nombre: 'Empatía', tipo: 'Conocimiento', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 1.00 },
        { nombre: 'Toma de Decisiones', tipo: 'Técnico', nivelActual: 'Medio', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Trabajo Bajo Presión', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelRequerido: 'Alto', porcAdecuacion: 0.20 },
    ]);

    React.useEffect(() => {
        getCompetencesTypes()
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
            response.forEach(res => tipoCom.push(res));
            setTipoCompetenciaString(temp.name);
            setTiposCompetencia(tipoCom);
            const obj = {
                idCompetencia: 0,
                palabraClave: "",
                idTipoCompetencia: 0,
                activo: 1,
                idEmpleado: 3
            }
            getEmployeeCompetences(obj)
            .then(function (response){
                console.log(response);
                setEmployeeCompetences(response);
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
        setPalabrasClave('');
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
        console.log(tiposCompetencia.filter(competencia => competencia.name === string))
        setTipoCompetenciaSelected(tiposCompetencia.filter(competencia => competencia.name === string));
    }

    const handleSearch = () => {
        console.log(tipoCompetenciaSelected[0])
        console.log(tipoCompetenciaSelected[0].id)
        const obj = {
            idCompetencia: 0,
            palabraClave: palabrasClave,
            idTipoCompetencia: tipoCompetenciaSelected[0].id,
            activo: 1,
            idEmpleado: 3
        }
        getEmployeeCompetences(obj)
        .then(function (response){
            console.log(response);
            setEmployeeCompetences(response);
        })
    }

    return (
        <div className='container-fluid container-view'>
            <div className='row'>
                <h2>Consolidado de competencias</h2>
                <p className="text-muted">Agrega, edita y desactiva competencias</p>
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
                                    <th onClick={() => handleOrdenarPorCampo('nombre')}>
                                        Nombre
                                        {campoOrdenamiento === 'nombre' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('tipo')}>
                                        Tipo
                                        {campoOrdenamiento === 'tipo' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('nivelActual')}>
                                        Nivel actual
                                        {campoOrdenamiento === 'nivelActual' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('nivelRequerido')}>
                                        Nivel requerido
                                        {campoOrdenamiento === 'nivelRequerido' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('porcAdecuacion')}>
                                        % de adecuacion
                                        {campoOrdenamiento === 'porcAdecuacion' && (
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
                                        <td>{competence.levelCurrent}</td>
                                        <td>{competence.levelRequired}</td>
                                        <td>{Math.round(competence.likeness) + "%"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='chart-container'>
                        <BarChart1/>
                    </div>
                    
                </div>
            </div>


        </div>               
    )
}

export default Read