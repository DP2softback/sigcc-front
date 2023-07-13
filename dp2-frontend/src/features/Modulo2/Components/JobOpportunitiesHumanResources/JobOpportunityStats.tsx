import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { DAYS_UNIT } from '@features/Modulo3/utils/constants';
import { formatEmployeeCode, obtenerFechaActual, obtenerFechaHaceUnAnio } from '@features/Modulo3/utils/functions';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import { Button, Form } from 'react-bootstrap';
import Linechart from '@features/Modulo2/Components/LineChart/Linechart';
import BarChart1 from '@features/Modulo2/Components/VisualizacionBrechasEmpleado/Barchart1';
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import axiosEmployeeStats from '@features/Modulo2/services/StatsEmployeeServices';
const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='
import { TOKEN } from '@features/Modulo3/utils/constants';
import { formatDashboardJson } from '@features/Modulo3/utils/functions';
const TOKEN_G3 = 'Token ' + TOKEN;

const JobOpportunityStats = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoading, setIsLoading] = React.useState(true);
    const [candidate, setCandidate] = React.useState(state.candidate);
    const [filters, setFilters] = React.useState({
        fecha_inicio: obtenerFechaHaceUnAnio(),
        fecha_fin: obtenerFechaActual()
    });
    const [matchRate, setMatchRate] = React.useState(null);
    const [dashboard, setDashboard] = React.useState(null);
    const [employeeCompetences, setEmployeeCompetences] = React.useState(null);
    const [employeeInfo, setEmployeeInfo] = React.useState(null);

    React.useEffect(() => {
        const obj = {
            idCompetencia: 0,
            palabraClave: "",
            idTipoCompetencia: 2,
            activo: 2,
            idEmpleado: candidate.id
        }
        axiosEmployeeGaps
            .post("gaps/competenceSearch", obj)
            .then(function (response) {
                setEmployeeCompetences(response.data);
                const obj2 = {
                    id: candidate.id,
                    evaluationType: "Evaluación Continua",
                }
                axiosEmployeeStats
                    .post("emp", obj2)
                    .then(function (response) {
                        setEmployeeInfo(response.data);
                        console.log(response.data);
                        const obj3 = {
                            id: candidate.id,
                            evaluationType: "Evaluación Continua",
                            fecha_inicio: filters.fecha_inicio,
                            fecha_fin: filters.fecha_fin
                        }
                        axiosEmployeeStats
                            .post("/LineChartEvaluacionesPersona", obj3)
                            .then(function (response) {
                                setDashboard(formatDashboardJson(response.data));
                                setIsLoading(false);
                            })
                            .catch(function (error) {
                                console.log(error);
                                setIsLoading(false);
                            })
                    })
                    .catch(function (error) {
                        console.log(error);
                        setIsLoading(false);
                    })

            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            })
    }, [])

    function onFiltersChange(e) {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSearch = () => {
        setIsLoading(true);
        const obj = {
            id: candidate.id,
            evaluationType: "Evaluación Continua",
            fecha_inicio: filters.fecha_inicio,
            fecha_fin: filters.fecha_fin
        }
        console.log(obj);
        axiosEmployeeStats
            .post("/emp", obj)
            .then(function (response) {
                console.log(response);
                setEmployeeInfo(response.data);
                axiosEmployeeStats
                    .post("/LineChartEvaluacionesPersona", obj)
                    .then(function (response) {
                        console.log(response);
                        setDashboard(formatDashboardJson(response.data));
                        setIsLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setIsLoading(false);
                    })
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            })
    }

    const handleMatchRate = () => {
        setMatchRate(matchRate ? null : Math.round(candidate.adecuacion));//aca hubo un cambio, estaba constante 10, c puso lo del navigate
    }

    const showlinechart = (
        <div className='chart'>
            {dashboard && (
                <Linechart
                    title={'Evaluaciones continuas'}
                    labelsX={dashboard.months}
                    dataInfoprops={dashboard.data} />
            )}
        </div>
    );

    function EvaluationDays(timeLastEv?): string {
        var stringdays;

        if (timeLastEv === null) {
            stringdays = 'No realizada'
        }
        else if (timeLastEv > 1) {
            stringdays = timeLastEv + ' dias'
        }
        else {
            stringdays = timeLastEv + ' día'
        }
        return stringdays;
    }

    return (
        <>
            <div className='row'>
                <h2>Detalle del candidato</h2>
                <p className="text-muted">Evaluaciones continuas y adecuación de candidatos al puesto de trabajo</p>
                <br />
                {isLoading ? <LoadingScreen /> :
                    <>
                        <div className='row'>
                            <div className='col-3'>
                                {matchRate === null ? <><h5>Evaluación continua</h5></> : <h5>Adecuación al puesto</h5>}
                            </div>
                            <div className='d-flex justify-content-end col-9'>
                                <div className='d-flex'>
                                    <Button className='me-2 px-2' size="sm" onClick={handleMatchRate}>{matchRate ? 'Ver evaluación continua' : 'Ver adecuación'}</Button>
                                </div>
                            </div>
                        </div>
                        <div className='row my-2'>
                            <div className='col-5'>

                                <EmployeeCard
                                    id={candidate.id}
                                    name={candidate.first_name + ' ' + candidate.last_name}
                                    photoURL={examplePhoto}
                                    position={candidate.position_name}
                                    code={formatEmployeeCode(candidate.id)}
                                    lastEvaluation={EvaluationDays(employeeInfo[0].time_since_last_evaluation)}
                                    lastEvaluationUnit={candidate.time_since_last_evaluation != null ? DAYS_UNIT : ''}
                                    area={candidate.area_name}
                                    email={candidate.email}
                                    matchRate={matchRate}
                                />
                            </div>
                            <div className='col-7'>
                                {matchRate === null ? <>{showlinechart}</> : <BarChart1 dataBarProps={employeeCompetences} />}
                            </div>
                        </div>
                        <button className='btn btn-outline-primary col-1 ms-3 btn-sm mt-2' onClick={() => navigate(-1)}>
                            Regresar
                        </button>
                    </>
                }
            </div>
        </>
    )
}

export default JobOpportunityStats