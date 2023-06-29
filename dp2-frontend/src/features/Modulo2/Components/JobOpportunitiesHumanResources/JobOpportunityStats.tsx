import React from 'react'
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import detailTableIcon from '../../assets/icons/detail-table.svg'

const JobOpportunityStats = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [candidates, setCandidates] = React.useState([]);

    const [tipoOrden, setTipoOrden] = React.useState('ascendente');
    const [campoOrdenamiento, setCampoOrdenamiento] = React.useState('');


    return (
        <>
            <div className='row'>
                Aqui va la pantalla del grupo 3 y del figma
            </div>
        </>
    )
}

export default JobOpportunityStats