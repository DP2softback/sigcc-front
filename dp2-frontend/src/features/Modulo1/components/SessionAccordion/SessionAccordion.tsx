import React from 'react'

const SessionAccordion = (Props) => {
    return (
        <div className="accordion" id="accordionExample">
            {
                (Props.sessions.map((session, index) => {
                    return(
                        <div className="accordion-item" /*key={session.id}*/ key={index+1}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseSession${index+1}`} aria-expanded="false" aria-controls={`collapseSession${session.id}`}>
                                    {session.name}
                                </button>
                            </h2>
                            <div id={`collapseSession${index+1}`} className="accordion-collapse collapse" data-bs-parent="#accordionSession">
                            <div className="accordion-body">
                                <p>{session.description}</p>
                                <p>Temas de la sesión</p>
                                {
                                    session.topics.map((topic, i) => {
                                        return(
                                            <div className='row' key={i}>
                                                <div className='col-1'>
                                                    <h6><strong>{i+1}.</strong></h6>
                                                </div>
                                                <div className='col-11'>
                                                    {topic}
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