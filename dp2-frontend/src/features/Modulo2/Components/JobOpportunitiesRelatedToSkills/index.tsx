import React from 'react'
import JobOpportunityCard from '../JobOpportunityCard/JobOpportunityCard';

const JobOpportunitiesRelatedToSkills = () => {

    const data = [{ image: "imagen 1", title: "UX/UI Designer", availability: "Disponible hace 10 días", description: "Profesional que se encarga de diseñar la experiencia de usuario (UX) y la interfaz de usuario (UI) de aplicaciones y sitios web.", labels: ['Creatividad', 'Comunicación', 'Trabajo en equipo'] },
    { image: "imagen 2", title: "Líder técnico de arquitectura", availability: "Disponible hace 13 días", description: "Responsable de dar forma a la arquitectura planteada por el Arquitecto de software, haciendo énfasis en las especificaciones que  no se presentan en detalle.", labels: ['Liderazgo', 'Comunicación', 'Trabajo en equipo'] },
    { image: "imagen 3", title: "Analista de sistemas", availability: "Disponible hace 15 días", description: "Identificar las necesidades de los sistemas TIC de una empresa y de elaborar un proyecto que ofrezca una solución integrada.", labels: ['Análisis de sistemas', 'Innovación', 'Creatividad'] }]

    const JSONresponse =
        [
            {
                "id": 1,
                "hiring_process": 2,
                "introduction": "UX/UI Designer",
                "offer_introduction": "Puesto laboral a tiempo completo para el área de TI",
                "responsabilities_introduction": "Profesional que se encarga de diseñar la experiencia de usuario (UX) y la interfaz de usuario (UI) de aplicaciones y sitios web.",
                "availability": "Disponible hace 9 días",
                "is_active": true,
                "photo_url": "https://imagen.com/12346/Foto2.png",
                "location": "Sede principal",
                "salary_range": "Entre S/.3000 y S/.4000",
                "labels": ["Creatividad", "Comunicación", "Trabajo en equipo"],
                "responsibilities":
                    "1. Recopilar y analizar grandes conjuntos de datos utilizando herramientas como SQL, Python y Tableau.\n2. Identificar patrones y tendencias en los datos para proporcionar información valiosa.\n3. Crear informes y visualizaciones claras y concisas para comunicar los resultados del análisis.\n4. Colaborar con otros equipos para comprender y abordar los desafíos analíticos.\n5. Mantenerte actualizado(a) sobre las mejores prácticas en análisis de datos y herramientas relacionadas.",
                "requirements":
                    "1. Experiencia demostrable en análisis de datos y el uso de herramientas como SQL, Python y Tableau.\n2. Conocimiento sólido de estadísticas y métodos de análisis de datos.\n3. Habilidad para comunicar de manera efectiva los resultados del análisis.\n4. Capacidad para trabajar en equipo y colaborar con otros departamentos.\n5. Titulación universitaria en estadística, ciencias de la computación o campo relacionado.",
                "summary":
                    "Buscamos un analista de datos con experiencia en el manejo de grandes conjuntos de datos y habilidades en herramientas como SQL, Python y Tableau. Ofrecemos un ambiente desafiante, oportunidades de desarrollo y un paquete de beneficios competitivo.",
                "benefits":
                    "1. Planilla desde el primer día de trabajo.\n2. Beneficios de Ley\n 3.Aprendizaje continuo\n 4.Capacitación constante"
            },
            {
                "id": 2,
                "hiring_process": 1,
                "introduction": "Líder técnico de arquitectura",
                "offer_introduction": "Puesto laboral a tiempo completo para el área de TI",
                "responsabilities_introduction": "Responsable de dar forma a la arquitectura planteada por el Arquitecto de software, haciendo énfasis en las especificaciones que  no se presentan en detalle.",
                "availability": "Disponible hace 13 días",
                "is_active": true,
                "photo_url": "https://imagen.com/12345/Foto1.png",
                "location": "Sede principal",
                "salary_range": "Entre S/.3000 y S/.4000",
                "labels": ["Liderazgo","Comunicación","Trabajo en equipo"],
                "responsibilities":
                    "1. Escribir y mantener el código de software utilizando lenguajes de programación como Java y Python.\n2. Participar en el diseño y desarrollo de nuevas funcionalidades.\n3. Colaborar con el equipo para resolver problemas técnicos y mejorar la eficiencia de los sistemas existentes.\n4. Realizar pruebas de software y depuración para garantizar la calidad y la funcionalidad adecuada.\n5. Documentar el código y los procesos técnicos.",
                "requirements":
                    "1. Experiencia demostrable en el desarrollo de software utilizando lenguajes como Java y Python.\n2. Conocimientos sólidos en bases de datos y desarrollo web.\n3. Capacidad para trabajar en equipo y comunicarse de manera efectiva.\n4. Habilidades analíticas y capacidad para resolver problemas técnicos.\n5. Creatividad y capacidad para proponer soluciones innovadoras.\n6. Titulación universitaria en ciencias de la computación, ingeniería de software o campo relacionado.",
                "summary":
                    "Buscamos un desarrollador de software altamente motivado y creativo con experiencia en Java, Python, bases de datos y desarrollo web. Ofrecemos un ambiente de trabajo desafiante, oportunidades de crecimiento profesional y un paquete de beneficios competitivo.",
                "benefits":
                    "1. Planilla desde el primer día de trabajo.\n2. Beneficios de Ley\n 3.Aprendizaje continuo\n 4.Capacitación constante"
            },
            
            {
                "id": 3,
                "hiring_process": 3,
                "introduction": "Analista de sistemas",
                "offer_introduction": "Puesto laboral a tiempo completo para el área de TI",
                "responsabilities_introduction": "Identificar las necesidades de los sistemas TIC de una empresa y de elaborar un proyecto que ofrezca una solución integrada.",
                "availability": "Disponible hace 15 días",
                "is_active": true,
                "photo_url": "https://imagen.com/12346/Foto2.png",
                "location": "Sede principal",
                "salary_range": "Entre S/.3000 y S/.4000",
                "labels": ["Creatividad","Innovación"],
                "responsibilities":
                    "1. Crear diseños gráficos, ilustraciones y otros elementos visuales utilizando herramientas como Adobe Photoshop e Illustrator.\n2. Colaborar con el equipo de marketing y otros departamentos para desarrollar diseños que cumplan con los objetivos del proyecto.\n3. Mantenerte actualizado(a) sobre las últimas tendencias y mejores prácticas en diseño gráfico.\n4. Asegurarte de que los diseños cumplan con los estándares de calidad y las pautas de la marca.\n5. Participar en reuniones de revisión y proporcionar retroalimentación constructiva.",
                "requirements":
                    "1. Experiencia demostrable en diseño gráfico y el uso de herramientas como Adobe Photoshop e Illustrator.\n2. Conocimiento sólido de los principios del diseño, como la composición, el color y la tipografía.\n3. Habilidad para trabajar en equipo y comunicarse de manera efectiva.\n4. Creatividad y capacidad para proponer ideas innovadoras.\n5. Titulación universitaria en diseño gráfico, artes visuales o campo relacionado.",
                "summary":
                    "Buscamos un diseñador gráfico talentoso y apasionado con experiencia en el uso de herramientas como Adobe Photoshop e Illustrator. Ofrecemos un entorno de trabajo creativo, flexibilidad horaria y un paquete de beneficios competitivo.",
                "benefits":
                    "1. Planilla desde el primer día de trabajo.\n2. Beneficios de Ley\n 3.Aprendizaje continuo\n 4.Capacitación constante"
            }

        ]

    /*
    PAR EL API
    Body:
  {
          "area": 0,
          "posicion": 0,
          "activo": 2
  }
  */
    return (
        <>
            <div className='row'>
                <h2>Oportunidades laborales afines a competencias</h2>
                <p className="text-muted">Puestos vacantes que son afines a tus competencias</p>
                <br />
                <h3>Puestos disponibles</h3>
                {JSONresponse && JSONresponse.map((jobOpt, index) => {
                    return (
                        <div className='col-4'>
                            <JobOpportunityCard jobOpportunity={jobOpt} numBot={3} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default JobOpportunitiesRelatedToSkills;