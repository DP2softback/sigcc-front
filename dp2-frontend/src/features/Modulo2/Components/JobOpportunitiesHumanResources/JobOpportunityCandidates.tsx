import React from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

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
            "percentaje_conicidence": "90",
            "user__email": "demoemployee3@demoemployee5.com",
            "user__is_active": true
        }

    ]

    return (
        <div className='container'>
            <div className='row'>
                <h2>Posibles candidatos afines a UX/UI Designer</h2>
                <p className="text-muted">Necesidades de capacitación del empleado</p>
                {candidates && candidates.length === 0 ? <p>No se encontraron resultados.</p> :
                    <Table striped bordered className='tableGapsEmployees'>
                        <thead>
                            <tr>
                                <th onClick={() => handleOrdenarPorCampo('training_type')}>
                                    Tipo de capacitación
                                    {campoOrdenamiento === 'training_type' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('competence')}>
                                    Competencia
                                    {campoOrdenamiento === 'competence' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('competence__type__name')}>
                                    Descripción
                                    {campoOrdenamiento === 'competence__type__name' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('levelCurrent')}>
                                    Tipo de competencia
                                    {campoOrdenamiento === 'levelCurrent' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('levelRequired')}>
                                    Nivel actual
                                    {campoOrdenamiento === 'levelRequired' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                                <th onClick={() => handleOrdenarPorCampo('description')}>
                                    Nivel requerido
                                    {campoOrdenamiento === 'description' && (
                                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates && candidates.map((cand, index) => (
                                <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                                    <td>{cand.training_type}</td>
                                    <td>{cand.competence}</td>
                                    <td>{cand.competence__type__name}</td>
                                    <td>{returnLevel(cand.levelCurrent)}</td>
                                    <td>{returnLevel(cand.levelRequired)}</td>
                                    <td>{cand.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
                <button className='btn btn-outline-primary col-1 ms-3 btn-sm' onClick={() => navigate(-1)}>Regresar</button>
            </div>
        </div>
    )
}

export default JobOpportunityCandidates