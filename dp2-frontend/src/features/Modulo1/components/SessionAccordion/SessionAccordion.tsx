import moment from 'moment'
import { Calendar2Event, GeoFill, JournalBookmarkFill, PeopleFill } from 'react-bootstrap-icons'
import { Props, SessionObj, TopicObj } from './SessionAccordion.types'

const SessionAccordion = (Props: Props) => {
    return (
        <div className="accordion" id="accordionExample">
            {
                (Props.sessions.map((session: SessionObj, index: number) => {
                    return(
                        <div className="accordion" id="SessionAccordion" key={index+1}>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseSession${index+1}`} aria-expanded="false" aria-controls={`collapseSession${index+1}`}>
                                        <div className='col'>
                                            <strong>{session.nombre}</strong>
                                        </div>
                                        {
                                            Props.trainingType !== "A" ?
                                            (<div style={{ flex: '0 0 15rem', paddingRight: "1rem" }} className='col text-end'>
                                                <Calendar2Event /><strong style={{ paddingLeft: "0.5rem" }}>Fecha:</strong> {moment(session.fecha_inicio).format("DD/MM/YYYY")}
                                            </div>)
                                            :
                                            (<></>)
                                        }
                                    </button>
                                </h2>
                                <div id={`collapseSession${index+1}`} className="accordion-collapse collapse" data-bs-parent="#SessionAccordion">
                                <div className="accordion-body">
                                    {
                                        Props.trainingType !== "A" ?
                                        (
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <p>{session.descripcion}</p>
                                                    <p><GeoFill /><b style={{ paddingLeft: "0.5rem" }}>Ubicación:</b> {session.ubicacion}</p>
                                                    <p><PeopleFill /><b style={{ paddingLeft: "0.5rem" }}>Aforo máximo:</b> {session.aforo_maximo}</p>
                                                </div>
                                                <div className='col-6' style={{borderLeftStyle: "groove", paddingLeft: "1rem"}}>
                                                    <p><JournalBookmarkFill /><b style={{ paddingLeft: "0.5rem" }}>Temas de la sesión</b></p>
                                                    {
                                                        session.temas.map((topic: TopicObj, i: number) => {
                                                            return(
                                                                <div className='row' key={i}>
                                                                    <div className='col mb-2'>
                                                                        <strong>{i+1}.</strong> {topic.nombre}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <p>{session.descripcion}</p>
                                                    <p><JournalBookmarkFill /><b style={{ paddingLeft: "0.5rem" }}>Temas de la sesión</b></p>
                                                    {
                                                        session.temas.map((topic: TopicObj, i: number) => {
                                                            return(
                                                                <div className='row' key={i}>
                                                                    <div className='col mb-2'>
                                                                        <strong>{i+1}.</strong> {topic.nombre}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='col-8'>
                                                    {
                                                        Props.trainingType === "A" ?
                                                        (
                                                            <video controls width="100%">
                                                                <source src={session.url_video} type="video/mp4" />
                                                                Lo sentimos, tu navegador no soporta videos embebidos.
                                                            </video>
                                                        )
                                                        :
                                                        (<></>)
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                    </div>
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