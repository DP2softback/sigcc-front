import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';

const JobOpportunitiesRelatedToSkills = () => {

    const data = [{image: "imagen 1", title: "UX/UI Designer", availability: "Disponible hace 10 días", description: "Lorem ipsum", labels: ['Creatividad', 'Comunicación', 'Trabajo en equipo']},
                  {image: "imagen 2", title: "Líder técnico de arquitectura", availability: "Disponible hace 13 días", description: "Lorem ipsum", labels: ['Liderazgo', 'Comunicación', 'Trabajo en equipo']},
                  {image: "imagen 3", title: "Analista de sistemas", availability: "Disponible hace 15 días", description: "Lorem ipsum", labels: ['Análisis de sistemas', 'Innovación', 'Creatividad']}]

    return (
        <div className='container'>
            <div className='row'>
                <h2>Oportunidades laborales afines a competencias</h2>
                <p className="text-muted">Puestos vacantes que son afines a tus competencias</p>
                <br/>
                <h3>Puestos disponibles</h3>
                {data.map((jobOpt, index) => {
                    return (
                        <div className='col-4'>
                            <JobOpportunityCard jobOpportunity={jobOpt} numBot={3}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default JobOpportunitiesRelatedToSkills;