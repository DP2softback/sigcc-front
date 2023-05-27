import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TrainingCard from '@features/Modulo1/components/Training/TrainingCard';
import Pagination from '@features/Modulo1/components/Pagination';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import '../../basic.css';
import './training.css';
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

// type TrainingObj = {
//     id: number;
//     name: string;
//     description: string;
//     startDate: string;
//     endDate: string;
//     numEmployees: number;
//     type: string;
// }

type TrainingObj = {
    id: number;
    name: string;
    photoURL: string,
    description: string;
    startDate: string;
    endDate: string;
    numEmployees: number;
    type: string;
    capacity: number;
    location: string;
}

const datos: TrainingObj[] = [
    {
        "id": 1,
        "name": "Seguridad de Información 1",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "06/05/2023",
        "numEmployees": 10,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 2,
        "name": "ABC S 1",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "10/05/2023",
        "numEmployees": 15,
        "type": "Sincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 3,
        "name": "ABC A 1",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "11/05/2023",
        "numEmployees": 15,
        "type": "Asincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 4,
        "name": "ABC P 1",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "12/05/2023",
        "numEmployees": 15,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 5,
        "name": "Seguridad de Información 1.1",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "06/05/2023",
        "numEmployees": 10,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 6,
        "name": "ABC S 1.2",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "10/05/2023",
        "numEmployees": 15,
        "type": "Sincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 7,
        "name": "ABC A 2",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "11/05/2023",
        "numEmployees": 15,
        "type": "Asincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 8,
        "name": "ABC P 2",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "12/05/2023",
        "numEmployees": 15,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 9,
        "name": "Seguridad de Información 2",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "06/05/2023",
        "numEmployees": 10,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 10,
        "name": "ABC S 2",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "10/05/2023",
        "numEmployees": 15,
        "type": "Sincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 11,
        "name": "ABC A 2",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "11/05/2023",
        "numEmployees": 15,
        "type": "Asincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 12,
        "name": "ABC P 2.1",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "12/05/2023",
        "numEmployees": 15,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 13,
        "name": "Seguridad de Información 3",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "06/05/2023",
        "numEmployees": 10,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 14,
        "name": "ABC S 3",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "10/05/2023",
        "numEmployees": 15,
        "type": "Sincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 15,
        "name": "ABC A 3",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "11/05/2023",
        "numEmployees": 15,
        "type": "Asincrono",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
    {
        "id": 16,
        "name": "ABC P 3",
        "photoURL": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "description": "Lorem ipsum",
        "startDate": "06/05/2023",
        "endDate": "12/05/2023",
        "numEmployees": 15,
        "type": "Presencial",
        "capacity": 20,
        "location": "Av. Universitaria 1305 - San Miguel"
    },
]

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
    return (
        [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear()
        ].join('/')
    );
}


const Training = () => {

    // const [training, setTraining] = useState<TrainingObj[]>(datos)
    const today = new Date();
    const now = formatDate(new Date())
    const now7 = formatDate(new Date(today.setDate(today.getDate() + 7)));

    const [trainingFilter, setTrainingFilter] = useState<TrainingObj[]>(datos)
    const [upcomingCourse, setUpcomingCourse] = useState<TrainingObj[]>(datos.filter((item: any) => item.endDate >= now && item.endDate <= now7))
    const [currentCourse, setCurrentCourse] = useState<TrainingObj[]>(datos.filter((item: any) => item.endDate > now7))
    const [finishedCourse, setFinishedCourse] = useState<TrainingObj[]>(datos.filter((item: any) => item.endDate < now))

    const [startDate, setStarDate] = useState("0001-01-01")
    const [endDate, setEndDate] = useState("9999-12-31")
    const [typeTraining, setTypeTraining] = useState("Todos")
    var filtered;
    var mostrar = 6;
    var mostrarF = 9;

    const [pageF, setPageF] = useState(1)
    const totalPagesF = Math.ceil(finishedCourse.length / mostrar);
    const [positionF, setPositionF] = useState(0);
    const finishedCourseShow = finishedCourse.slice(positionF, positionF + mostrar);

    const [pageC, setPageC] = useState(1)
    const totalPagesC = Math.ceil(currentCourse.length / mostrar);
    const [positionC, setPositionC] = useState(0);
    const currentCourseShow = currentCourse.slice(positionC, positionC + mostrar);

    const [pageU, setPageU] = useState(1)
    const totalPagesU = Math.ceil(upcomingCourse.length / mostrar);
    const [positionU, setPositionU] = useState(0);
    const upcomingCourseShow = upcomingCourse.slice(positionU, positionU + mostrar);

    const [pageFi, setPageFi] = useState(1)
    const totalPagesFi = Math.ceil(trainingFilter.length / mostrarF);
    const [positionFi, setPositionFi] = useState(0);
    const filterCourseShow = trainingFilter.slice(positionFi, positionFi + mostrarF);

    const navigate = useNavigate();

    /* TRAINING DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrTypes = useRef<HTMLSelectElement>(null);
    /* TRAINING DETAIL INPUTS */

    /* TRAINING FILTERS */
    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === '')
            setTrainingFilter(datos);
        else {
            filtered = datos.filter((item: any) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setTrainingFilter(filtered);
        }
    };

    const handleChangeStartDate = (e: any) => {
        setStarDate(e.target.value)
    }

    const handleChangeEndDate = (e: any) => {
        setEndDate(e.target.value)
    }

    const handleChangeType = (e: any) => {
        setTypeTraining(e.target.value)
    }

    const search = (e: any) => {
        if (typeTraining === "Todos" && (startDate === "0001-01-01" || startDate === "") && (endDate === "9999-12-31" || endDate === ""))
            setTrainingFilter(datos);
        else {
            if (typeTraining === "Todos") {
                filtered = datos.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00'))
                );
                setTrainingFilter(filtered);
            } else {
                filtered = datos.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00')) && item.type === typeTraining
                );
                setTrainingFilter(filtered);
            }
        }
    }

    /* TRAINING FILTERS */

    const createTraining = () => {
        const data = {
            name: refTrName.current?.value,
            description: refTrDescription.current?.value,
            type: refTrTypes.current?.value,
        }

        console.log(data)

        /* RUTA HARDCODEADA*/
        navigate(`/modulo1/cursoempresa/creacion/1`,
                {
                    state: {data}
                });

        axiosInt.post('RUTA API', data)
            .then(function (response) {
                //navigate(`/modulo1/cursoempresa/creacion/${response.data.id}`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const loadTrainings = () => {
        axiosInt.get('RUTA API')
            .then(function (response) {
                //setTrainingFilter(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        //loadTrainings();       
    }, []);

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>
                <div className='row mt-3'>
                    <div className='col'>
                        <h1 className='screenTitle'>Curso Empresa</h1>
                        <p><small className='subtitle'>Lista de cursos empresa creados que los empleados pueden asistir para adquirir habilidades y competencias específicas.</small></p>
                    </div>
                    <div style={{ flex: '0 0 15rem' }} className='col text-end'>
                        {/* Button trigger modal */}
                        <button type='button' className='btn' style={{ backgroundColor: "rgb(8, 66, 152)", color: "white" }} data-bs-target='#createTrainingModal' data-bs-toggle='modal'>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span className='me-3'>Crear curso</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='row' style={{ paddingBottom: "32px" }}>
                    <div className='col-5'>
                        <input className='form-control' type='text' placeholder='Buscar curso' onChange={handleFilter} />
                    </div>
                    <div className='col-2'>
                        <select className="form-select" aria-label=".form-select-sm example" onChange={handleChangeType}>
                            <option hidden>Tipo</option>
                            {typeTra.map((t) => {
                                return (
                                    <option key={t.id} value={t.type}>{t.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col'>
                        <input className='form-control' type='date' id='start_date' onChange={handleChangeStartDate} />
                    </div>
                    <div className='col'>
                        <input className='form-control' type='date' id='end_date' onChange={handleChangeEndDate} />
                    </div>
                    <div className='col-1 text-end'>
                        <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                    </div>
                </div>

                {trainingFilter == datos ?
                    <div>
                        <div>
                            <div>
                                <h5>
                                    Próximos a iniciar
                                </h5>
                            </div>

                            {upcomingCourse.length > 0 ?
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                        {
                                            upcomingCourseShow.map((tr) => {
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

                                    {upcomingCourse.length >= mostrar &&
                                        <div>
                                            <div>
                                                <Pagination
                                                    page={pageU}
                                                    totalPages={totalPagesU}
                                                    handlePagination={setPageU}
                                                    setPosition={setPositionU}
                                                    position={positionU}
                                                    mostrar={mostrar}
                                                />
                                            </div>
                                        </div>
                                    }

                                </div>
                                :
                                <div>
                                    <h6 style={{ display: "flex", justifyContent: "center" }}>
                                        No hay proximos cursos
                                    </h6>
                                </div>
                            }
                        </div>


                        <div>
                            <div className='pt-5'>
                                <h5>
                                    Curso Empresa vigentes
                                </h5>
                            </div>

                            {currentCourse.length > 0 ?
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                        {
                                            currentCourseShow.map((tr) => {
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

                                    {currentCourse.length >= mostrar &&
                                        <div>
                                            <div>
                                                <Pagination
                                                    page={pageC}
                                                    totalPages={totalPagesC}
                                                    handlePagination={setPageC}
                                                    setPosition={setPositionC}
                                                    position={positionC}
                                                    mostrar={mostrar}
                                                />
                                            </div>
                                        </div>
                                    }

                                </div>
                                :
                                <div>
                                    <h6 style={{ display: "flex", justifyContent: "center" }}>
                                        No hay más cursos vigentes
                                    </h6>
                                </div>
                            }






                        </div>



                        <div>
                            <div className='pt-5'>
                                <h5>
                                    Curso Empresa finalizados
                                </h5>
                            </div>

                            {finishedCourse.length > 0 ?
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                        {
                                            finishedCourseShow.map((tr) => {
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

                                    {finishedCourse.length >= mostrar &&
                                        <div>
                                            <div>
                                                <Pagination
                                                    page={pageF}
                                                    totalPages={totalPagesF}
                                                    handlePagination={setPageF}
                                                    setPosition={setPositionF}
                                                    position={positionF}
                                                    mostrar={mostrar}
                                                />
                                            </div>
                                        </div>
                                    }

                                </div>
                                :
                                <div>
                                    <h6 style={{ display: "flex", justifyContent: "center" }}>
                                        No hay más cursos finalizados
                                    </h6>
                                </div>
                            }


                        </div>

                    </div>

                    :

                    <div>

                        <div>
                            <div>
                                <h5>
                                    Curso Empresa creadas
                                </h5>
                            </div>

                            {trainingFilter.length > 0 ?
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                        {
                                            filterCourseShow.map((tr) => {
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

                                    {trainingFilter.length >= mostrarF &&
                                        <div>
                                            <div>
                                                <Pagination
                                                    page={pageFi}
                                                    totalPages={totalPagesFi}
                                                    handlePagination={setPageFi}
                                                    setPosition={setPositionFi}
                                                    position={positionFi}
                                                    mostrar={mostrarF}
                                                />
                                            </div>
                                        </div>
                                    }


                                </div>
                                :
                                <div>
                                    <h6 style={{ display: "flex", justifyContent: "center" }}>
                                        No hay cursos creados para la búsqueda realizada
                                    </h6>
                                </div>
                            }

                        </div>


                    </div>

                }


                {
                    datos.length === 0 && <>
                        <div className='row align-items-stretch g-3 py-3'>
                            <div className='col'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                            <div className='vertical-align-child'>
                                                <h5 className='opacity-50 text-center'>Crea un curso para empezar</h5>
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
                                <h1 className="modal-title fs-5" id="createTrainingModal">Crear nuevo curso</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input ref={refTrName} type="text" className="form-control" />
                                </div>
                                <div className='row mb-3'>
                                    <div className='col' style={{ flex: '0 0 8rem' }}>
                                        <PictureUpload />
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <textarea ref={refTrDescription} className="form-control" />
                                        </div>
                                        <div>
                                            <label className="form-label">Tipo</label>
                                            <select className="form-select" ref={refTrTypes}>
                                                <option hidden>Seleccionar</option>
                                                {typeCreation.map((t) => {
                                                    return (
                                                        <option key={t.id} value={t.type}>{t.type}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={createTraining}>Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar >
        </>
    )
}

export default Training