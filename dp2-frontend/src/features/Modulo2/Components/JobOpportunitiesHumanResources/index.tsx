import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';
import axiosEmployeeGaps from '@features/Modulo2/services/EmployeeGapsServices';

const JobOpportunitiesHumanResources = () => {

    const [jobOpportunities, setJobOpportunities] = React.useState([]);

    React.useEffect(() => {
        axiosEmployeeGaps
        .post("/")
        .then(function(response){
            setJobOpportunities(response);
        })
        .catch(function(error){
            console.log(error);
        })
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <h2>Puestos vacantes para ascensos</h2>
                <p className="text-muted">Puestos vacantes que son afines a tus competencias</p>
                <br/>
                <h3>Puestos vacantes</h3>
                {jobOpportunities.map((jobOpt, index) => {
                    return (
                        <div className='col-4'>
                            <JobOpportunityCard jobOpportunity={jobOpt} numBot={1} hhrr/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default JobOpportunitiesHumanResources;