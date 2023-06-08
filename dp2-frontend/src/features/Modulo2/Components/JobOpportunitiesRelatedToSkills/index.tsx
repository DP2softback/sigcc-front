import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';

const JobOpportunitiesRelatedToSkills = () => {

    const data = [{image: "imagen 1", title: "UX/UI Designer", availability: "Disponible hace 10 días", description: "Profesional que se encarga de diseñar la experiencia de usuario (UX) y la interfaz de usuario (UI) de aplicaciones y sitios web.", labels: ['Creatividad', 'Comunicación', 'Trabajo en equipo']},
                  {image: "imagen 2", title: "Líder técnico de arquitectura", availability: "Disponible hace 13 días", description: "Responsable de dar forma a la arquitectura planteada por el Arquitecto de software, haciendo énfasis en las especificaciones que  no se presentan en detalle.", labels: ['Liderazgo', 'Comunicación', 'Trabajo en equipo']},
                  {image: "imagen 3", title: "Analista de sistemas", availability: "Disponible hace 15 días", description: "Identificar las necesidades de los sistemas TIC de una empresa y de elaborar un proyecto que ofrezca una solución integrada.", labels: ['Análisis de sistemas', 'Innovación', 'Creatividad']}]

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