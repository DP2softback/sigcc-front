import moment from 'moment'
import { Calendar2Event, Clipboard2Check, GeoFill, JournalBookmarkFill, PeopleFill, PersonBadge, CalendarCheck } from 'react-bootstrap-icons'
import { Props, SessionObj, SupplierObj, TopicObj } from './SessionAccordion.types'
import { Link } from 'react-router-dom'
import './SessionAccordion.css'

let dateNow = moment(new Date()).format("DD/MM/YYYY")

const compareDates = (dateNow: string, dateSession: string, sessionID: number) => {
    const dateSessionParts = dateSession.split('/');
    const daySes = parseInt(dateSessionParts[0], 10);
    const monthSes = parseInt(dateSessionParts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
    const yearSes = parseInt(dateSessionParts[2], 10);

    const dateNowParts = dateNow.split('/');
    const dayNow = parseInt(dateNowParts[0], 10);
    const monthNow = parseInt(dateNowParts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
    const yearNow = parseInt(dateNowParts[2], 10);

    const dateSessionCompare = new Date(yearSes, monthSes, daySes);
    const dateNowCompare = new Date(yearNow, monthNow, dayNow);

    if (dateSessionCompare.getTime() > dateNowCompare.getTime()) {
        return (
            <button type='button' className='btn btn-danger' disabled={true}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className='me-3'>Finalizar sesión</span>
                    <CalendarCheck />
                </div>
            </button>
        )
    } else {
        return (
            <button type='button' className='btn btn-danger' data-bs-target='#confirmModal' data-bs-toggle='modal'>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className='me-3'>Finalizar sesión</span>
                    <CalendarCheck />
                </div>
            </button>
        )
    }
}

const SessionAccordion = (Props: Props) => {
    return (
        <>
            <div className="accordion" id="accordionExample">
                {
                    (Props.sessions.map((session: SessionObj, index: number) => {
                        return (
                            <div className="accordion" id="SessionAccordion" key={index + 1}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseSession${index + 1}`} aria-expanded="false" aria-controls={`collapseSession${index + 1}`}>
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
                                    <div id={`collapseSession${index + 1}`} className="accordion-collapse collapse" data-bs-parent="#SessionAccordion">
                                        <div className="accordion-body">
                                            {
                                                Props.trainingType !== "A" ?
                                                    (
                                                        <div className='row'>
                                                            <div className='col-6'>
                                                                <p style={{ textAlign: "justify" }}>{session.descripcion}</p>
                                                                <p><GeoFill /><b style={{ paddingLeft: "0.5rem" }}>Ubicación:</b> {session.ubicacion}</p>
                                                                <p><PeopleFill /><b style={{ paddingLeft: "0.5rem" }}>Aforo máximo:</b> {session.aforo_maximo}</p>
                                                                <p><PersonBadge /><b style={{ paddingLeft: "0.5rem" }}>Responsables de la sesión:</b></p>
                                                                {
                                                                    session.responsables.map((supplier: SupplierObj, i: number) => {
                                                                        return (
                                                                            <div className='row' key={i}>
                                                                                <div className='col mb-2'>
                                                                                    <strong>{i + 1}.</strong> {supplier.nombres + " " + supplier.apellidos}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='col-6' style={{ borderLeftStyle: "groove", paddingLeft: "1rem" }}>
                                                                <div className='row mb-3'>
                                                                    <div className='col'>
                                                                        <p><JournalBookmarkFill /><b style={{ paddingLeft: "0.5rem" }}>Temas de la sesión</b></p>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    session.temas.map((topic: TopicObj, i: number) => {
                                                                        return (
                                                                            <div className='row' key={i}>
                                                                                <div className='col mb-2'>
                                                                                    <strong>{i + 1}.</strong> {topic.nombre}
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
                                                            <div className='col-5'>
                                                                <p style={{ textAlign: "justify" }}>{session.descripcion}</p>
                                                                <p><JournalBookmarkFill /><b style={{ paddingLeft: "0.5rem" }}>Temas de la sesión</b></p>
                                                                {
                                                                    session.temas.map((topic: TopicObj, i: number) => {
                                                                        return (
                                                                            <div className='row' key={i}>
                                                                                <div className='col mb-2'>
                                                                                    <strong>{i + 1}.</strong> {topic.nombre}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <p><PersonBadge /><b style={{ paddingLeft: "0.5rem" }}>Responsables de la sesión:</b></p>
                                                                {
                                                                    session.responsables.map((supplier: SupplierObj, i: number) => {
                                                                        return (
                                                                            <div className='row' key={i}>
                                                                                <div className='col mb-2'>
                                                                                    <strong>{i + 1}.</strong> {supplier.nombres + " " + supplier.apellidos}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className='col-7'>
                                                                <video controls width="100%">
                                                                    <source src={session.url_video} type="video/mp4" />
                                                                    Lo sentimos, tu navegador no soporta videos embebidos.
                                                                </video>
                                                            </div>
                                                        </div>
                                                    )
                                            }

                                            {Props.trainingType == "A" &&
                                                <div className="accordion-footer">
                                                    <div style={{ flex: '0 0 15rem' }} className='col text-end'>
                                                        <button type='button' className='btn btn-danger' data-bs-target='#confirmModal' data-bs-toggle='modal'>
                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                <span className='me-3'>Finalizar sesión</span>
                                                                <CalendarCheck />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>



                                </div>
                            </div>
                        )
                    }))
                }
            </div>

            {/* CONFIRM MODAL */}
            <div className="modal fade" id="confirmModal" aria-hidden="true" aria-labelledby="confirmModal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createTrainingModal">Confirmación</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label className="form-label confirm">¿Desea marcar como finalizada esta sesión?</label>
                            </div>
                        </div>
                        <div className="modal-footer confirm-footer">
                            <button className="btn btn-primary" data-bs-dismiss="modal">Si</button>
                            <button className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default SessionAccordion