import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { DAYS_UNIT } from '@features/Modulo3/utils/constants';
import { formatEmployeeCode, obtenerFechaActual, obtenerFechaHaceUnAnio } from '@features/Modulo3/utils/functions';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import { Button, Form } from 'react-bootstrap';
const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const JobOpportunityStats = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoading, setIsLoading] = React.useState(true);
    const [candidate, setCandidate] = React.useState(null);
    const [filters, setFilters] = React.useState({
        fecha_inicio: obtenerFechaHaceUnAnio(),
        fecha_fin: obtenerFechaActual()
      });
    const [matchRate, setMatchRate] = React.useState(null);

    React.useEffect(() => {
        console.log(state.candidate);
        setCandidate(state.candidate);
        setIsLoading(false);
    }, [])

    function onFiltersChange (e) {
        const { name, value } = e.target;
        setFilters((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }

    const handleMatchRate = () => {
        setMatchRate(matchRate ? null : 10);
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
                            <h5>Evaluación continua</h5>
                        </div>
                        <div className='d-flex justify-content-end col-9'>
                            {!matchRate && 
                            <>
                                <div>
                                    <Form.Control
                                        type="date"
                                        className="me-2 w-auto"
                                        name="fecha_inicio"
                                        value={filters.fecha_inicio || ""}
                                        onChange={onFiltersChange}
                                        size="sm"
                                    />
                                </div>
                                <div>
                                    <Form.Control
                                        type="date"
                                        className="me-2 w-auto"
                                        name="fecha_fin"
                                        value={filters.fecha_fin || ""}
                                        onChange={onFiltersChange}
                                        size="sm"
                                    />
                                </div>
                                <div className='d-flex'>
                                    <Button className='me-2 px-2' size="sm">Buscar</Button>
                                </div>
                            </>
                            }
                            <div className='d-flex'>
                                <Button className='me-2 px-2' size="sm" onClick={handleMatchRate}>{matchRate ? 'Ver evaluación continua' : 'Ver adecuación'}</Button>
                            </div>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-5'>
                            <EmployeeCard
                                id={candidate.id}
                                name={candidate.user__first_name + ' ' + candidate.user__last_name}
                                photoURL={examplePhoto}
                                position={candidate.position__name}
                                code={formatEmployeeCode(candidate.id)}
                                lastEvaluation={candidate.time_since_last_evaluation != null ? candidate.time_since_last_evaluation : 'No realizada'}
                                lastEvaluationUnit={candidate.time_since_last_evaluation != null ? DAYS_UNIT : ''}
                                area={'Área de ' + candidate.area__name}
                                email={candidate.user__email}
                                matchRate={matchRate}
                            />
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