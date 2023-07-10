import React from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import detailTableIcon from '../../assets/icons/detail-table.svg'
import { EMPLOYEES_JOB_OPPORTUNITIES, EMPLOYEES_JOB_STATISTICS, GAPS_ANALYSIS_MODULE } from '@features/Modulo2/routes/path';

const JobOpportunityCandidates = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [candidates, setCandidates] = React.useState([]);
    const [jobOpp, setJobOpp] = React.useState(state.jobOpp);
    const [tipoOrden, setTipoOrden] = React.useState('ascendente');
    const [campoOrdenamiento, setCampoOrdenamiento] = React.useState('');

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


    //cabecera para la tabla
    const JSONheader = ["Nombres", "Apellidos", "Puesto", "Area", "Porcentaje de coincidencia", "Correo", "Estado", "Activo"]
    const JSONresponse = [
        {
            "id": 1,
            "user__first_name": "Diego",
            "user__last_name": "Castro",
            "position__name": "Analista",
            "area__name": "Contabilidad",
            "percentaje_conicidence": 90,
            "user__email": "demoemployee1@demoemployee1.com",
            "user__is_active": true
        },
        {
            "id": 2,
            "user__first_name": "Luis",
            "user__last_name": "Polo",
            "position__name": "Jefe",
            "area__name": "TI",
            "percentaje_conicidence": 90,
            "user__email": "demoemployee2@demoemployee2.com",
            "user__is_active": true
        },
        {
            "id": 3,
            "user__first_name": "Andres",
            "user__last_name": "Vargas",
            "position__name": "Asistente",
            "area__name": "Contabilidad",
            "percentaje_conicidence": 90,
            "user__email": "demoemployee3@demoemployee3.com",
            "user__is_active": true
        },
        {
            "id": 4,
            "user__first_name": "Romelu",
            "user__last_name": "Lukaku",
            "position__name": "Analista",
            "area__name": "TI",
            "percentaje_conicidence": 90,
            "user__email": "demoemployee3@demoemployee4.com",
            "user__is_active": true
        },
        {
            "id": 5,
            "user__first_name": "Miguel",
            "user__last_name": "Zapata",
            "position__name": "Asistente",
            "area__name": "Contabilidad",
            "percentaje_conicidence": 90,
            "user__email": "demoemployee3@demoemployee5.com",
            "user__is_active": true
        }

    ]

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
                <p className="text-muted">Necesidades de capacitación del empleado</p>
                {JSONresponse && JSONresponse.length === 0 ? <p>No se encontraron resultados.</p> :
                    <Table striped bordered className='tableGapsEmployees'>
                        <thead>
                            <tr>
                                <th onClick={() => handleOrdenarPorCampo('user__first_name')}>
                                    Nombres
                                    {campoOrdenamiento === 'user__first_name' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('user__last_name')}>
                                    Apellidos
                                    {campoOrdenamiento === 'user__last_name' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('position__name')}>
                                    Puesto
                                    {campoOrdenamiento === 'position__name' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('area__name')}>
                                    Área
                                    {campoOrdenamiento === 'area__name' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('percentaje_conicidence')}>
                                    Porc. de coincidencia
                                    {campoOrdenamiento === 'percentaje_conicidence' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('user__email')}>
                                    Email
                                    {campoOrdenamiento === 'user__email' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('user__is_active')}>
                                    Estado
                                    {campoOrdenamiento === 'user__is_active' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th>
                                    Acciones
                                    {campoOrdenamiento === 'description' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSONresponse && JSONresponse.map((cand, index) => (
                                <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                                    <td>{cand.user__first_name}</td>
                                    <td>{cand.user__last_name}</td>
                                    <td>{cand.position__name}</td>
                                    <td>{cand.area__name}</td>
                                    <td>{cand.percentaje_conicidence + '%'}</td>
                                    <td>{cand.user__email}</td>
                                    <td>{cand.user__is_active === true ? 'Activo' : 'Inactivo'}</td>
                                    <td className="text-center">
                                        <img src={detailTableIcon} title='Notificar' onClick={() => handleStats(cand)} style={{cursor: "pointer"}}></img>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                <button className='btn btn-outline-primary col-1 ms-3 btn-sm' onClick={() => navigate(-1)}>Regresar</button>
            </div>
        </>
    )
}

export default JobOpportunityCandidates