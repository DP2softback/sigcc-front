import axiosInt from '@config/axios';
import Sidebar from '@features/Modulo1/components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GeoFill, JournalBookmarkFill, InfoCircleFill, PeopleFill, DoorClosedFill, Calendar2EventFill, Calendar, Calendar2Event, People, ArrowLeftCircle, ArrowLeftCircleFill } from 'react-bootstrap-icons'

const datos = {
    id: 1,
    name: "Seguridad de Información",
    photoURL: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    description: "Lorem ipsum",
    startDate: "06/05/2023",
    endDate: "06/05/2023",
    numEmployees: 10,
    type: "Presencial",
    capacity: 20,
    location: "Av. Universitaria 1305 - San Miguel"
}

const TrainingDetails = () => {
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>(datos);

    const loadTrainingDetails = () =>
    {
        /*
        axiosInt.get(`curso/training/${trainingID}`)
            .then(function (response)
            {
                setTraining(response.data)
            })
            .catch(function (error)
            {
                console.log(error);
            });
        */
    }

    useEffect(() =>
    {
        loadTrainingDetails();
    }, []);

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/capacitacion'>
                <div className='container row mt-3'>
                    <div className='col-1 text-end'>
                        <Link to={`/modulo1/capacitacion`} className="float-right"><ArrowLeftCircleFill style={{height: "32px", width: "32px", color: "black"}}/></Link>
                    </div>
                    <div className='col'>
                        <div className='col'>
                            <h1>{training.name}</h1>
                            <p><small className='opacity-50'>{training.description}.</small></p>
                        </div>
                        <div className='row'>
                            <div className='col text-end'>
                                <img src={training.photoURL} style={{borderRadius: "10rem", width: "10rem", height: "10rem"}}></img>
                            </div>
                            <div className='col'>
                                <p><Calendar/><b style={{paddingLeft: "0.5rem"}}>Fecha de creación:</b> {training.startDate}</p>
                                <p><Calendar2Event/><b style={{paddingLeft: "0.5rem"}}>Fecha del evento:</b> {training.startDate}</p>
                                <p><People/><b style={{paddingLeft: "0.5rem"}}>Cant. Empleados:</b> {training.numEmployees}</p>
                            </div>
                        </div>
                        <div className="row">
                            <h4 className='mt-3 mb-3'>Detalles importantes</h4>
                            <div className='row'>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            <JournalBookmarkFill/><b style={{paddingLeft: "0.5rem"}}>Temas de la capacitación</b>
                                        </div>
                                        <div className="card-body">
                                            {/*DEFINIR COMO SERA ACA*/}
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            <InfoCircleFill/><b style={{paddingLeft: "0.5rem"}}>Información de la capacitación</b>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text"><Calendar2EventFill/><b style={{paddingLeft: "0.5rem"}}>Fecha del evento:</b> {training.startDate}</p>
                                            <p className="card-text"><DoorClosedFill/><b style={{paddingLeft: "0.5rem"}}>Tipo:</b> {training.type}</p>
                                            <p className="card-text"><GeoFill/><b style={{paddingLeft: "0.5rem"}}>Ubicación:</b> {training.location}</p>
                                            <p className="card-text"><PeopleFill/><b style={{paddingLeft: "0.5rem"}}>Aforo máximo:</b> {training.capacity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                        {/*TRES ESCENARIOS:
                           1. DETALLE CUANDO SE CREA ASINCRONO 
                            1.1. OPCION PARA SUBIR EL VIDEO O VIDEOS
                            1.2. EMPLEADOS ASIGNADOS
                           2. DETALLE CUANDO SE CREA SINCRONO O PRESENCIAL
                            2.1. DETALLE CON EMPLEADOS                            
                        */}
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default TrainingDetails