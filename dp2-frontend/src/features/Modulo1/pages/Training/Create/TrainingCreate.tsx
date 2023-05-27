import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import { useEffect, useRef, useState } from 'react';
import axiosInt from '@config/axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeftCircleFill, Check, PlusCircle, Trash } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';

const data = {
    id: 1,
    name: "Seguridad de Información",
    photoURL: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    description: "Lorem ipsum",
    type: "Asincrono"
}

type SessionObj = {
    id?: number;
    name: string;
    description: string;
    startDate: string;
    limitDate: string;
    numEmployees?: number;
    location: string;
    urlVideo: string;
    topics: string[];
}

let sessionsData: SessionObj[] = []

/*
const sessionsData: SessionObj[] = [
    {
        "id": 1,
        "name": "Sesión de introducción",
        "description": "Introduccion a este nuevo curso de empresa",
        "startDate": "06/05/2023",
        "limitDate": "20/05/2023",
        "numEmployees": 0,
        "location": null,
        "urlVideo": null,
        "topics": [
            {
                "id": 1,
                "name": "Tema de la sesión 1"
            },
            {
                "id": 2,
                "name": "Tema de la sesión 2"
            },
            {
                "id": 3,
                "name": "Tema de la sesión 3"
            }
        ]
    },
    {
        "id": 2,
        "name": "Sesión 1",
        "description": "Descripción de la sesión 1",
        "startDate": "07/05/2023",
        "limitDate": "20/05/2023",
        "numEmployees": 0,
        "location": null,
        "urlVideo": null,
        "topics": [
            {
                "id": 1,
                "name": "Tema de la sesión 1"
            },
            {
                "id": 2,
                "name": "Tema de la sesión 2"
            },
            {
                "id": 3,
                "name": "Tema de la sesión 3"
            }
        ]
    },
    {
        "id": 3,
        "name": "Sesión 2",
        "description": "Descripción de la sesión 2",
        "startDate": "08/05/2023",
        "limitDate": "20/05/2023",
        "numEmployees": 0,
        "location": null,
        "urlVideo": null,
        "topics": [
            {
                "id": 1,
                "name": "Tema de la sesión 1"
            },
            {
                "id": 2,
                "name": "Tema de la sesión 2"
            },
            {
                "id": 3,
                "name": "Tema de la sesión 3"
            }
        ]
    }
]
*/

const TrainingCreate = () => {
    const location = useLocation();
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>(location.state.data);
    const [classSessions, setClassSessions] = useState<SessionObj[]>(sessionsData)
    const [addedTopics, setAddedTopics] = useState<string[]>([])

    /* TRAINING SESSION DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrLocation = useRef<HTMLInputElement>(null);
    const refTrTopics = useRef<HTMLInputElement>(null);
    const refTrDateStart = useRef<HTMLInputElement>(null);
    const refTrDateEnd = useRef<HTMLInputElement>(null);
    /* TRAINING SESSION DETAIL INPUTS */

    const addTopic = (e: React.FormEvent) => {
        e.preventDefault();
        if(refTrTopics.current?.value !== ""){
            setAddedTopics([...addedTopics, refTrTopics.current?.value])
            console.log(addedTopics)
            refTrTopics.current.value = ""
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
        let dataSession: SessionObj = {
            name: refTrName.current?.value,
            description: refTrDescription.current?.value,
            startDate: refTrDateStart.current?.value,
            limitDate: refTrDateEnd.current?.value,
            location: refTrLocation.current?.value,
            urlVideo: null,
            topics: addedTopics
            //responsable:
        }

        setClassSessions([...classSessions, dataSession])
        
        console.log(classSessions)

        /* Clear inputs */
        
        refTrName.current.value = "";
        refTrDescription.current.value = "";
        refTrDateStart.current.value = "";
        setAddedTopics([]);

        if(training.type === "Virtual Asincrono"){
            refTrDateEnd.current.value = "";
        }
        else{
            refTrLocation.current.value = "";
        }

        /*
        axiosInt.post('RUTA API', dataSession)
            .then(function (response)
            {
                //navigate(`/modulo1/cursoempresa/detalle/${response.data.id}`);
            })
            .catch(function (error)
            {
                console.log(error);
            });
        */
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

            <div className='row mt-3' style={{ marginLeft: "40px" }}>
                <div className='col'>
                    <h4>Sesiones</h4>
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

                <div className='mt-3'>
                    {classSessions.length > 0 ?
                        (<SessionAccordion sessions={classSessions}/>)
                        :
                        (<>
                            <h6 style={{ display: "flex", justifyContent: "center" }}>
                                Crea una sesión para comenzar
                            </h6>
                        </>)
                    }
                </div>
                    

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
                            training.type === "Virtual Asincrono" ?
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
                                    <input className='form-control' type='date' id='start_date_creation' ref={refTrDateStart} />
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label">Ubicación</label>
                                        <input ref={refTrLocation} type="text" className="form-control" />
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
                        ACA IRAN LOS CARDS DE EMPLEADOS
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