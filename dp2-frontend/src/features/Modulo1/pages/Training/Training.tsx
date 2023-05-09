import Sidebar from '@features/Modulo1/components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TrainingCard from '@features/Modulo1/components/Training/TrainingCard';
import './training.css';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import axiosInt from '@config/axios';

const typeTra = [
    { id: 1, type: "Todos" },
    { id: 2, type: "Presencial" },
    { id: 3, type: "Sincrono" },
    { id: 4, type: "Asincrono" },
]

const typeCreation = [
    { id: 1, type: "Presencial" },
    { id: 3, type: "Virtual Sincrono" },
    { id: 4, type: "Virtual Asincrono" },
]

type TrainingObj = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    numEmployees: number;
    type: string;
    capacity: number;
    location: string;
    //topics: string; //FALTO CONSIDERAR PERO COMO SE TRAERA O LLEVARA A LA BD?
}

const datos: TrainingObj[] = [
    {
        "id": 1,
        "name": "Seguridad de Información",
        "description": "Lorem ipsum",
        "startDate": "2023-05-11",
        "endDate": "2023-05-11",
        "numEmployees": 10,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 2,
        "name": "ABC",
        "description": "Lorem ipsum",
        "startDate": "2023-05-11",
        "endDate": "2023-05-11",
        "numEmployees": 15,
        "type": "Sincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 3,
        "name": "ABC",
        "description": "Lorem ipsum",
        "startDate": "2023-05-11",
        "endDate": "2023-05-11",
        "numEmployees": 15,
        "type": "Asincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 4,
        "name": "ABC",
        "description": "Lorem ipsum",
        "startDate": "2023-05-11",
        "endDate": "2023-05-11",
        "numEmployees": 15,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
]

const Training = () => {

    const [training, setTraining] = useState<TrainingObj[]>([])
    const [trainingFilter, setTrainingFilter] = useState<TrainingObj[]>(datos)

    const [startDate, setStarDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const navigate = useNavigate();

    /* TRAINING DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrLocation = useRef<HTMLInputElement>(null);
    const refTrTopics = useRef<HTMLTextAreaElement>(null);
    const refTrTypes = useRef<HTMLSelectElement>(null);
    const refTrDate = useRef<HTMLInputElement>(null);
    const refTrCapacity = useRef<HTMLInputElement>(null);
    /* TRAINING DETAIL INPUTS */

    /* TRAINING FILTERS */
    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        const filtered = training.filter((item: any) =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTrainingFilter(filtered);
    };

    const handleChangeStartDate = (e: any) => {
        setStarDate(e.target.value)
    }

    const handleChangeEndDate = (e: any) => {
        setEndDate(e.target.value)
    }

    const handleChangeType = (e: any) => {

    }
    /* TRAINING FILTERS */

    const createTraining = () =>
    {
        const data = {
            nombre: refTrName.current?.value,
            descripcion: refTrDescription.current?.value,
            ubicacion: refTrLocation.current?.value,
            fecha: refTrDate.current?.value,
            tipo: refTrTypes.current?.value,
            capacidad: refTrCapacity.current?.value,
            temas: refTrTopics.current?.value
        }

        console.log(data)

        axiosInt.post('RUTA API', data)
            .then(function (response)
            {
                //navigate(`/modulo1/capacitacion/detalle/${response.data.id}`);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    const loadTrainings = () =>
    {
        axiosInt.get('RUTA API')
            .then(function (response)
            {
                //setTrainingFilter(response.data);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        loadTrainings();
    }, []);

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/capacitacion'>
                <div className='row mt-3'>
                    <div className='col'>
                        <h1>Capacitaciones</h1>
                        <p><small className='opacity-50'>Lista de capacitaciones creadas que los empleados pueden asistir para adquirir habilidades y competencias específicas.</small></p>
                    </div>
                    <div style={{flex: '0 0 15rem'}} className='col text-end'>
                        {/* Button trigger modal */}
                        <button type='button' className='btn btn-primary' data-bs-target='#createTrainingModal' data-bs-toggle='modal'>
                            <span className='me-3'>Crear capacitación</span>
                            <i className="bi bi-0-square"></i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-5'>
                        <input className='form-control' type='text' placeholder='Buscar capacitaciones' onChange={handleFilter}/>
                    </div>  
                    <div className='col-2'>
                        <select className="form-select" aria-label=".form-select-sm example" onChange={handleChangeType}>
                            <option hidden>Tipo</option>
                            {typeTra.map((t) => {
                                return(
                                    <option key={t.id} value={t.type}>{t.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col'>
                        <input className='form-control' type='date' id='start_date' onChange={handleChangeStartDate}/>
                    </div> 
                    <div className='col'>
                        <input className='form-control' type='date' id='end_date' onChange={handleChangeEndDate}/>
                    </div> 
                    <div className='col-1 text-end'>
                        <button className='btn btn-primary' type='button' /*onClick={search}*/>Buscar</button>
                    </div>
                </div>

                {trainingFilter == datos &&
                    <div>
                        <div className='pt-3'>
                            <h5>
                                Próximos a iniciar
                            </h5>
                        </div>

                        {trainingTime.length > 0 ?
                            <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                {
                                    trainingTime.map((tr) => {
                                        return (
                                            <TrainingCard key={tr.id}
                                                id={tr.id}
                                                name={tr.name}
                                                photoURL={tr.photoURL}
                                                description={tr.description}
                                                creationDate={tr.startDate}
                                                eventDate={tr.endDate}
                                                employees={tr.numEmployees}
                                            />

                                        )
                                    })
                                }
                            </div>
                            :
                            <div>
                                <h6>
                                    No hay proximas capacidades
                                </h6>
                            </div>
                        }
                    </div>
                }

                <div>
                    <div className='pt-3'>
                        <h5>
                            Capacitaciones creadas
                        </h5>
                    </div>

                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                        {
                            trainingFilter.map((tr) => {
                                return (
                                    <TrainingCard key={tr.id}
                                        id={tr.id}
                                        name={tr.name}
                                        photoURL={tr.photoURL}
                                        description={tr.description}
                                        creationDate={tr.startDate}
                                        eventDate={tr.endDate}
                                        employees={tr.numEmployees}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                {/* <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 py-3 px-0 mx-0 cards'>
                    {
                        trainingFilter.map((tr) => {
                            return (
                                <Fragment key={tr.id}>
                                    <div className='cols'>
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">{tr.name}</h6>
                                                <p className="card-text opacity-50"><small>{tr.description}</small></p>
                                                <p className="card-text opacity-50"><small>Fecha de inicio: {tr.startDate}</small></p>
                                                <p className="card-text opacity-50"><small>Fecha de fin: {tr.endDate}</small></p>
                                                <p className="card-text opacity-50"><small>Cantidad de empleados: {tr.numEmployees}</small></p>
                                                <div className="d-flex gap-2 w-100 justify-content-between">
                                                    <span></span>
                                                    <Link to={`/capacitacion/detalle/${tr.id}`} className="btn btn-primary float-right">Detalles</Link>
                                                    <button className="btn btn-primary float-right">Detalles</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div> */}

                {
                    trainingFilter.length === 0 && <>
                        <div className='row align-items-stretch g-3 py-3'>
                            <div className='col'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                            <div className='vertical-align-child'>
                                                <h5 className='opacity-50 text-center'>Crea una capacitación para empezar</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                
                {/* CREATE TRAINING MODAL */}
                <div className="modal fade" id="createTrainingModal" aria-hidden="true" aria-labelledby="createTrainingModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="createTrainingModal">Crear nueva capacitación</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row mb-3'>
                                    <div className='col' style={{ flex: '0 0 8rem' }}>
                                        <PictureUpload />
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input ref={refTrName} type="text" className="form-control" />
                                        </div>
                                        <div>
                                            <label className="form-label">Descripción</label>
                                            <textarea ref={refTrDescription} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-3 border-top pt-3 mt-3'>
                                    <div className='col'>
                                        <label className="form-label">Fecha de la capacitación</label>
                                        <input className='form-control' type='date' id='start_date_creation' ref={refTrDate} /*onChange={handleChangeDateTraining}*/ />
                                    </div>
                                    <div className='col'>
                                        <label className="form-label">Tipo</label>
                                        <select className="form-select" aria-label=".form-select-sm example" ref={refTrTypes}>
                                            <option hidden>Seleccionar</option>
                                            {typeCreation.map((t) => {
                                                return(
                                                    <option key={t.id} value={t.type}>{t.type}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
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
                                <div className='row mb-3'>
                                    <div>
                                        <label className="form-label">Temas de la capacitación</label>
                                        <textarea ref={refTrTopics} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={createTraining}>Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default Training