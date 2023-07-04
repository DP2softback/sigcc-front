import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import detailTableIcon from '../../assets/icons/detail-table.svg';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';

const JobOpportunityStats = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoading, setIsLoading] = React.useState(false);
    const [candidates, setCandidates] = React.useState([]);

    const [tipoOrden, setTipoOrden] = React.useState('ascendente');
    const [campoOrdenamiento, setCampoOrdenamiento] = React.useState('');

    React.useEffect(() => {
        console.log(state.candidate);
    }, [])

    return (
        <>
            <div className='row'>
                <h2>Detalle del candidato</h2>
                <p className="text-muted">Evaluaciones continuas y adecuación de candidatos al puesto de trabajo</p>
                <br />
                {isLoading ? <LoadingScreen /> :
                <>
                    <div className='row'>
                        <h5 className='col-3'>Evaluación continua</h5>

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