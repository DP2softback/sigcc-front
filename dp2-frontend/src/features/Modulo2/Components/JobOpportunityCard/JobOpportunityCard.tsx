import React from 'react'
import { Button } from 'react-bootstrap';
import './JobOpportunityCard.css'
import { useNavigate } from 'react-router-dom';
import { EMPLOYEES_JOB_CANDIDATES, EMPLOYEES_JOB_OPPORTUNITIES, GAPS_ANALYSIS_MODULE, MY_JOB_OPPORTUNITIES, MY_JOB_OPPORTUNITIES_DETAIL } from '@features/Modulo2/routes/path';
import JobOppImage from '../../../../assets/images/image-job-opp.png';

const JobOpportunityCard = (props) => {
    const {jobOpportunity, numBot, hhrr} = props;
    const navigate = useNavigate();

    const navigateToMyJobOppDetail = () => {
        navigate(`/${GAPS_ANALYSIS_MODULE}/${MY_JOB_OPPORTUNITIES}/${MY_JOB_OPPORTUNITIES_DETAIL}`, {
            state: {
                jobOpp: jobOpportunity
            }
        })
    }

    const navigateToCandidates = () => {
        navigate(`/${GAPS_ANALYSIS_MODULE}/${EMPLOYEES_JOB_OPPORTUNITIES}/${EMPLOYEES_JOB_CANDIDATES}`, {
            state: {
                jobOpp: jobOpportunity
            }
        })
    }

    return (
        <div className='container card-job-opp mb-4'>
            <div className='row'>
                <div className='col-3 d-flex align-items-center justify-content-center'>
                    {<img className='image-job-opp' src={JobOppImage}>
                    </img>}
                </div>
                <div className='col-9 d-flex flex-column justify-content-center '>
                    <div className='row title-job-opp'>
                        {jobOpportunity.introduction}
                    </div>
                    <div className='row availability-job-opp'>
                        {jobOpportunity.availability}
                    </div>
                </div>
            </div>
            <hr className='line-card'/>
            <div className='row mx-0 mb-2 desc-job-opp'>
                {jobOpportunity.responsabilities_introduction}
            </div>
            <div className='row row-cols-auto mb-2'>
                {jobOpportunity.labels && jobOpportunity.labels.map((lbl) => {
                    return (
                        <div className='col lbl-job-opp d-flex align-items-center'>
                            {lbl}
                        </div>
                    )
                })}
            </div>

            {numBot === 3 && 
            <div className='mb-2 availability-job-opp'>
                {'Porcentaje de adecuación: ' + (jobOpportunity.id === 1 ? 50 : (jobOpportunity.id===2 ? 70 : 85)) + '%'}
            </div>
            }
            
            <div className='row row-cols-auto d-flex justify-content-between'>
                <div className='col'>
                    {numBot === 3 && <Button className='btn btn-sm btn-job-opp' onClick={() => {hhrr === undefined ? navigateToMyJobOppDetail() :  console.log("A");}}>Detalle del puesto</Button>}
                </div>
                <div className='col'>
                    {numBot === 3 ?
                        <Button className='btn btn-sm btn-job-opp btn-acept'>Aceptar postulación</Button>
                    :
                        <Button className='btn btn-sm btn-job-opp btn-acept' onClick={() => {navigateToCandidates()}}>Ver posibles candidatos</Button>
                    }
                </div>
            </div>
                        
        </div>
  )
}

export default JobOpportunityCard