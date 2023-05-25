import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import { useRef, useState } from 'react';
import axiosInt from '@config/axios';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftCircleFill, Check, PlusCircle, Trash } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';

const data = {
    id: 1,
    name: "Seguridad de Información",
    photoURL: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    description: "Lorem ipsum",
    type: "Asincrono"
}

type SessionObj = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    limitDate: string;
    numEmployees: number;
    capacity: number;
    location: string;
    urlVideo: string;
}

const sessionsData: SessionObj[] = [

]

const TrainingCreate = () => {
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>(data);
    const [classSessions, setClassSessions] = useState<SessionObj[]>(sessionsData)
    const [addedTopics, setAddedTopics] = useState<String[]>([])

    /* TRAINING SESSION DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrLocation = useRef<HTMLInputElement>(null);
    const refTrTopics = useRef<HTMLInputElement>(null);
    const refTrDateSession = useRef<HTMLInputElement>(null);
    const refTrDateStart = useRef<HTMLInputElement>(null);
    const refTrDateEnd = useRef<HTMLInputElement>(null);
    const refTrCapacity = useRef<HTMLInputElement>(null);
    /* TRAINING SESSION DETAIL INPUTS */

    const addTopic = (e: React.FormEvent) => {
        e.preventDefault();
        if(refTrTopics.current?.value !== ""){
            setAddedTopics([...addedTopics, refTrTopics.current?.value])
            console.log(addedTopics)
        }
    }

    const deleteTopic = (index) => {
        console.log(index)
        
        let newDataTopics = [...addedTopics]

        newDataTopics.splice(index, 1)

        console.log(newDataTopics)
        console.log(newDataTopics.length)
        
        if(newDataTopics.length === 0){
            newDataTopics = []
        }

        setAddedTopics(newDataTopics)
    }

    const getTopics = (index, element) => {
        return(
            <div className='row'>
                <div className='col-1'>
                    <h6><b>{index+1}.</b></h6>
                </div>
                <div className='col-10'>
                    <p>{element}</p>
                </div>
                <div className='col-1'>
                    <Trash onClick={() => deleteTopic(index)} />
                </div>
            </div>
        )
    }

    const createSession = () => {
        let dataSession = {}

        if(training.type === "Asincrono"){
            dataSession = {
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                fecha: refTrDateStart.current?.value,
                fechaLimite: refTrDateEnd.current?.value,
                //urlVideoGrabacion:
                temas: addedTopics
                //responsable:
            }
        }
        else{
            dataSession = {
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                fecha: refTrDateSession.current?.value,
                ubicacion: refTrLocation.current?.value,
                capacidad: refTrCapacity.current?.value,
                temas: addedTopics
                //responsable: 
            }
        }

        console.log(dataSession)

        axiosInt.post('RUTA API', dataSession)
            .then(function (response)
            {
                //navigate(`/modulo1/cursoempresa/detalle/${response.data.id}`);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    return (
    <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>
        <div className='container row mt-3'>
            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                    <Link to={`/modulo1/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                </div>

                <div className='col'>
                    <h1 className='screenTitle'>{training.name}</h1>
                    <p><small className='subtitle'>{training.description}.</small></p>
                    <p><small className='subtitle'>Modalidad: {training.type}.</small></p>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col' style={{ marginLeft: "54px" }}>
                    <h4 className='mb-3'>Sesiones</h4>
                </div>
                <div style={{ flex: '0 0 15rem' }} className='col text-end'>
                    {/* Button trigger modal */}
                    <button type='button' className='btn btn-primary' data-bs-target='#createSessionModal' data-bs-toggle='modal'>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span className='me-3'>Nueva sesión</span>
                            <PlusCircle/>
                        </div>
                    </button>
                </div>

                {classSessions.length > 0 ?
                (<>
                
                </>)
                :
                (<>
                    <h6 style={{ display: "flex", justifyContent: "center" }}>
                        Crea una sesión para comenzar
                    </h6>
                </>)
                }

            </div>

        </div>
        {/* CREATE SESSION MODAL */}
        <div className="modal fade" id="createSessionModal" aria-hidden="true" aria-labelledby="createSessionModal" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="createSessionModal">Crear nueva sesión</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input ref={refTrName} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea ref={refTrDescription} className="form-control" />
                        </div>
                        
                        {
                            training.type === "Asincrono" ?
                            (<div className='row mb-3'>
                                <div className='col'>
                                    <label className="form-label">Fecha de inicio</label>
                                    <input className='form-control' type='date' id='start_date_creation' ref={refTrDateStart} />
                                </div>
                                <div className='col'>
                                    <label className="form-label">Fecha limite</label>
                                    <input className='form-control' type='date' id='end_date_creation' ref={refTrDateEnd} />
                                </div>
                            </div>)
                            :
                            (<>
                                <div className='mb-3'>
                                    <label className="form-label">Fecha de la sesión</label>
                                    <input className='form-control' type='date' id='start_date_creation' ref={refTrDateSession} />
                                </div>
                                <div className='row mb-3'>
                                    <div className='col'>
                                        <label className="form-label">Ubicación</label>
                                        <input ref={refTrLocation} type="text" className="form-control" />
                                    </div>
                                    <div className='col'>
                                        <label className="form-label">Aforo máximo</label>
                                        <input type="number" className="form-control" ref={refTrCapacity} min={'0'} />
                                    </div>
                                </div>
                            </>)
                        }
                        
                        <div className='row mb-3'>
                            <label className="form-label">Temas de la sesión</label>
                            <div className='col-10'>
                                <input ref={refTrTopics} type="text" className="form-control" />
                            </div>
                            <div className='col text-end'>
                                <button type='submit' className='btn btn-primary' onClick={addTopic}><Check/></button>
                            </div>
                        </div>

                        {
                            addedTopics.length > 0 ?
                            (addedTopics.map((element, i) => {
                                return(
                                    <div key={i}>
                                        {getTopics(i, element)}
                                    </div>
                                )
                            }))
                            :
                            (<></>)
                        }
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-target="#assignResponsible" data-bs-toggle="modal">Continuar</button>
                    </div>
                </div>
            </div>
        </div>

        {/* MODAL ASSING RESPONSIBLE */}
        <div className="modal fade" id="assignResponsible" aria-hidden="true" aria-labelledby="assignResponsible" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="assignResponsible">Asignar responsable</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ACA IRIAN LOS CARDS ? :D
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-dismiss="modal" onClick={createSession}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    </Sidebar >
    )
}

export default TrainingCreate