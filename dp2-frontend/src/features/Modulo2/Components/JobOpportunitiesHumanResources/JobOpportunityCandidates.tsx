import React from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import detailTableIcon from '../../assets/icons/detail-table.svg'
import { EMPLOYEES_JOB_OPPORTUNITIES, EMPLOYEES_JOB_STATISTICS, GAPS_ANALYSIS_MODULE } from '@features/Modulo2/routes/path';
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import './JobOpportunityCandidates.css'

const JobOpportunityCandidates = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [candidates, setCandidates] = React.useState([]);
    const [jobOpp, setJobOpp] = React.useState(state.jobOpp);
    const [tipoOrden, setTipoOrden] = React.useState('ascendente');
    const [campoOrdenamiento, setCampoOrdenamiento] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const obj = { oferta: jobOpp.id }
        axiosEmployeeGaps
            .post("gaps/searchEmployeeSuggestedXJobOffer", obj)
            .then(function (response) {
                setCandidates(response.data)
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            })
    }, []);

    const handleOrdenarPorCampo = (campo) => {
        if (campo === campoOrdenamiento) {
            setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
            setCampoOrdenamiento(campo);
            setTipoOrden('ascendente');
        }
    };

    const returnLevel = (number) => {
        if (number === 1) return "Muy bajo";
        if (number === 2) return "Bajo";
        if (number === 3) return "Medio";
        if (number === 4) return "Alto";
        return "Muy alto"
    }

    const handleStats = (cand) => {
        navigate(`/${GAPS_ANALYSIS_MODULE}/${EMPLOYEES_JOB_OPPORTUNITIES}/${EMPLOYEES_JOB_STATISTICS}`, {
            state: {
                candidate: cand
            }
        })
    }

    return (
        <>
            <div className='row'>
                <h2>Posibles candidatos afines a UX/UI Designer</h2>

                {isLoading ? <LoadingScreen /> :
                    <>
                        <p className="text-muted">Lista de candidatos</p>
                        <br />
                        {candidates && candidates.length === 0 ? <p>No se encontraron resultados.</p> :
                            <div className='table-overflow'>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleOrdenarPorCampo('first_name')}>
                                                Nombres
                                                {campoOrdenamiento === 'first_name' && (
                                                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                                )}
                                            </th>
                                            <th onClick={() => handleOrdenarPorCampo('last_name')}>
                                                Apellidos
                                                {campoOrdenamiento === 'last_name' && (
                                                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                                )}
                                            </th>
                                            <th onClick={() => handleOrdenarPorCampo('position_name')}>
                                                Puesto
                                                {campoOrdenamiento === 'position_name' && (
                                                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                                )}
                                            </th>
                                            <th onClick={() => handleOrdenarPorCampo('area_name')}>
                                                Área perteneciente
                                                {campoOrdenamiento === 'area_name' && (
                                                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                                )}
                                            </th>
                                            <th onClick={() => handleOrdenarPorCampo('adecuacion')}>
                                                Adecuación
                                                {campoOrdenamiento === 'adecuacion' && (
                                                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                                )}
                                            </th>
                                            <th onClick={() => handleOrdenarPorCampo('email')}>
                                                Email
                                                {campoOrdenamiento === 'email' && (
                                                    <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                                )}
                                            </th>
                                            <th>
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-overflow'>
                                        {candidates && candidates.map((cand, index) => (
                                            <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                                                <td>{cand.first_name}</td>
                                                <td>{cand.last_name}</td>
                                                <td>{cand.position_name}</td>
                                                <td>{cand.area_name}</td>
                                                <td>{Math.round(cand.adecuacion) + '%'}</td>
                                                <td>{cand.email}</td>
                                                <td className="text-center">
                                                    <img src={detailTableIcon} title='Notificar' onClick={() => handleStats(cand)} style={{ cursor: "pointer" }}></img>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        }
                        <button className='btn btn-outline-primary col-1 ms-3 btn-sm' onClick={() => navigate(-1)}>Regresar</button>
                    </>
                }
            </div>
        </>
    )
}

export default JobOpportunityCandidates