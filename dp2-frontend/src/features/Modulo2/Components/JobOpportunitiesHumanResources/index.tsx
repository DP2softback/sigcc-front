import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';

const JobOpportunitiesHumanResources = () => {

    const data = [{image: "imagen 1", title: "UX/UI Designer", availability: "Disponible hace 10 días", description: "Profesional que se encarga de diseñar la experiencia de usuario (UX) y la interfaz de usuario (UI) de aplicaciones y sitios web.", labels: ['Creatividad', 'Comunicación', 'Trabajo en equipo']},
                  {image: "imagen 2", title: "Líder técnico de arquitectura", availability: "Disponible hace 13 días", description: "Responsable de dar forma a la arquitectura planteada por el Arquitecto de software, haciendo énfasis en las especificaciones que  no se presentan en detalle.", labels: ['Liderazgo', 'Comunicación', 'Trabajo en equipo']},
                  {image: "imagen 3", title: "Analista de sistemas", availability: "Disponible hace 15 días", description: "Identificar las necesidades de los sistemas TIC de una empresa y de elaborar un proyecto que ofrezca una solución integrada.", labels: ['Análisis de sistemas', 'Innovación', 'Creatividad']}]


                  const JSONresponse = 
                  [
              
                      {
                        "id": 1,
                        "hiring_process": 1,
                        "introduction": "Desarrollador FrontEnd",
                        "offer_introduction": "Puesto laboral a tiempo completo para el área de TI",
                        "responsabilities_introduction": "Se encarga del componente frontend del desarrollo de aplicaciones",
                        "availability": "Disponible hace 15 días",
                        "is_active": true,
                        "photo_url": "https://imagen.com/12345/Foto1.png",
                        "location": "Sede principal",
                        "salary_range": "Entre S/.3000 y S/.4000",
                        "labels": { "label1":"Análisis de sistemas","label2": "Innovación"}
                    },
                 {
                        "id": 2,
                        "hiring_process": 2,
                        "introduction": "UX/UI Designer",
                        "offer_introduction": "Puesto laboral a tiempo completo para el área de TI",
                        "responsabilities_introduction": "Se encarga del diseño de sistemas a nivel de UX/UI",
                        "availability": "Disponible hace 9 días",
                        "is_active": true,
                        "photo_url": "https://imagen.com/12346/Foto2.png",
                        "location": "Sede principal",
                        "salary_range": "Entre S/.3000 y S/.4000",
                        "labels": {}
                    },
                     {
                        "id": 3,
                        "hiring_process": 3,
                        "introduction": "Analista de sistemas",
                        "offer_introduction": "Puesto laboral a tiempo completo para el área de TI",
                        "responsabilities_introduction": "Se encarga del diseño de gestionar los sistemas",
                        "availability": "Disponible hace 10 días",
                        "is_active": true,
                        "photo_url": "https://imagen.com/12346/Foto2.png",
                        "location": "Sede principal",
                        "salary_range": "Entre S/.3000 y S/.4000",
                        "labels": {}
                    }
                
                ]  
    return (
        <div className='container'>
            <div className='row'>
                <h2>Puestos vacantes para ascensos</h2>
                <p className="text-muted">Puestos vacantes que son afines a tus competencias</p>
                <br/>
                <h3>Puestos vacantes</h3>
                {data.map((jobOpt, index) => {
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