import React from 'react'
import { Button } from 'react-bootstrap';
import './JobOpportunityCard.css'
import { useNavigate } from 'react-router-dom';
import { EMPLOYEES_JOB_CANDIDATES, EMPLOYEES_JOB_OPPORTUNITIES, GAPS_ANALYSIS_MODULE } from '@features/Modulo2/routes/path';

const JobOpportunityCard = (props) => {
    const {jobOpportunity, numBot, hhrr} = props;
    const navigate = useNavigate();

    return (
        <div className='container card-job-opp'>
            <div className='row'>
                <div className='col-4 d-flex align-items-center justify-content-center'>
                    {jobOpportunity.image}
                </div>
                <div className='col-6'>
                    <div className='row title-job-opp'>
                        {jobOpportunity.title}
                    </div>
                    <div className='row availability-job-opp'>
                        {jobOpportunity.availability}
                    </div>
                </div>
            </div>
            <hr/>
            <div className='row mx-0 mb-4'>
                {jobOpportunity.description}
            </div>
            <div className='row row-cols-auto mb-4'>
                {jobOpportunity.labels.map((lbl) => {
                    return (
                        <div className='col lbl-job-opp d-flex align-items-center'>
                            {lbl}
                        </div>
                    )
                })}
            </div>


            
            <div className='row row-cols-auto d-flex justify-content-between'>
                <div className='col'>
                    {numBot === 3 && <Button className='btn btn-sm btn-job-opp' onClick={() => {hhrr === undefined ? console.log("A") : navigate(`/${GAPS_ANALYSIS_MODULE}/${EMPLOYEES_JOB_OPPORTUNITIES}/${EMPLOYEES_JOB_CANDIDATES}`);}}>Detalle del puesto</Button>}
                </div>
                <div className='col'>
                    {numBot === 3 && <Button className='btn btn-sm btn-job-opp btn-acept'>Aceptar postulación</Button>}
                    <Button className='btn btn-sm btn-job-opp' onClick={() => {hhrr !== undefined ? navigate(`/${GAPS_ANALYSIS_MODULE}/${EMPLOYEES_JOB_OPPORTUNITIES}/${EMPLOYEES_JOB_CANDIDATES}`) : console.log("A")}}>{hhrr ? 'Ver posibles candidatos' : 'Declinar postulación'}</Button>
                </div>
            </div>
                        
        </div>
  )
}

export default JobOpportunityCard