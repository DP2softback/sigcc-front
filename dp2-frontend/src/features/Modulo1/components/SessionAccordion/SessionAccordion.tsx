import { Calendar2EventFill, GeoFill, JournalBookmarkFill, PeopleFill } from 'react-bootstrap-icons'

const SessionAccordion = (Props) => {
    return (
        <div className="accordion" id="accordionExample">
            {
                (Props.sessions.map((session, index) => {
                    return(
                        <div className="accordion-item" key={index+1}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseSession${index+1}`} aria-expanded="false" aria-controls={`collapseSession${session.id}`}>
                                    {session.nombre}
                                </button>
                            </h2>
                            <div id={`collapseSession${index+1}`} className="accordion-collapse collapse" data-bs-parent="#accordionSession">
                            <div className="accordion-body">
                                <p >{session.descripcion}</p>
                                {
                                    Props.trainingType === "A" ?
                                    (
                                        <>
                                            <p><Calendar2EventFill /><b style={{ paddingLeft: "0.5rem" }}>Fecha de inicio:</b> {session.fecha_inicio}</p>
                                            <p><Calendar2EventFill /><b style={{ paddingLeft: "0.5rem" }}>Fecha limite:</b> {session.fecha_limite}</p>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <p><Calendar2EventFill /><b style={{ paddingLeft: "0.5rem" }}>Fecha del evento:</b> {session.fecha_inicio}</p>
                                            <p><GeoFill /><b style={{ paddingLeft: "0.5rem" }}>Ubicación:</b> {session.ubicacion}</p>
                                            <p><PeopleFill /><b style={{ paddingLeft: "0.5rem" }}>Aforo máximo:</b> {session.aforo_maximo}</p>
                                        </>
                                    )
                                }

                                <p><JournalBookmarkFill /><b style={{ paddingLeft: "0.5rem" }}>Temas de la sesión</b></p>
                                {
                                    session.temas.map((topic, i) => {
                                        return(
                                            <div className='row' key={i}>
                                                <div className='col-1'>
                                                    <h6><strong>{i+1}.</strong></h6>
                                                </div>
                                                <div className='col-11'>
                                                    {topic.nombre}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    )
                }))
            }                
        </div>
    )
}

export default SessionAccordion