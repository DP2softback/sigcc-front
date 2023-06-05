import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Pagination from '@features/Modulo1/components/Pagination';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import './training.css';
import axiosInt from '@config/axios';
import OfferCard from "@features/Modulo4/components/OfferCard/OfferCard";

const typeTra = [
    {id: 1, type: "Todos"},
    {id: 2, type: "Prueba1"},
    {id: 3, type: "Prueba2"},
    {id: 4, type: "Prueba3"},
]

const typeCreation = [
    {id: 1, type: "Presencial"},
    {id: 3, type: "Virtual Sincrono"},
    {id: 4, type: "Virtual Asincrono"},
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

type JobOfferObj = {
    id: number;
    name: string;
    photoURL: string,
    description: string;
    startDate: string;
    location: string;
    salaryRange: string;
}

const data: JobOfferObj[] = [
    {
                "id": 1,
                "name": "Desarrollador de software",
                "photoURL": "https://www.becas-santander.com/content/dam/becasmicrosites/blog/metodolog%C3%ADas-de-desarrollo-de-software.jpg",
                "description": "Estamos buscando un desarrollador de software altamente motivado y creativo para unirse a nuestro equipo. Debes tener experiencia en lenguajes de programación como Java y Python, así como conocimientos en bases de data y desarrollo web.",
                "startDate": "2023-07-01",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$3000 - $4000"
            },
            {
                "id": 2,
                "name": "Diseñador gráfico",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un diseñador gráfico talentoso y apasionado para unirse a nuestro equipo. Debes tener experiencia en el uso de herramientas de diseño como Adobe Photoshop e Illustrator, así como una sólida comprensión de los principios del diseño.",
                "startDate": "2023-07-15",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$2500 - $3500"
            },
            {
                "id": 3,
                "name": "Analista de datos",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un analista de data con experiencia en el manejo de grandes conjuntos de data. Debes tener habilidades en el uso de herramientas de análisis y visualización de data como SQL, Python y Tableau.",
                "startDate": "2023-08-01",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$3500 - $4500"
            },
            {
                "id": 4,
                "name": "Asistente administrativo",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un asistente administrativo para brindar apoyo en tareas diarias. Debes tener habilidades organizativas, ser proactivo y tener conocimientos en el uso de herramientas de productividad como Microsoft Office.",
                "startDate": "2023-07-10",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$2000 - $2500"
            },
            {
                "id": 5,
                "name": "Ingeniero de sistemas",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un ingeniero de sistemas con experiencia en el diseño y mantenimiento de redes. Debes tener conocimientos en sistemas operativos, servidores y protocolos de red.",
                "startDate": "2023-08-15",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$4000 - $5000"
            },
            {
                "id": 6,
                "name": "Especialista en marketing digital",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un especialista en marketing digital para desarrollar y ejecutar estrategias de marketing en línea. Debes tener experiencia en SEO, publicidad en redes sociales y análisis de data.",
                "startDate": "2023-07-20",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$3000 - $4000"
            },
            {
                "id": 7,
                "name": "Contador público",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un contador público para manejar tareas contables y financieras. Debes tener conocimientos en contabilidad, impuestos y auditoría.",
                "startDate": "2023-08-10",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$3500 - $4500"
            },
            {
                "id": 8,
                "name": "Asistente de recursos humanos",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un asistente de recursos humanos para brindar apoyo en tareas de reclutamiento, selección y administración del personal. Debes tener habilidades de comunicación y conocimientos en leyes laborales.",
                "startDate": "2023-07-05",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$2000 - $2500"
            },
            {
                "id": 9,
                "name": "Ingeniero civil",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "description": "Estamos buscando un ingeniero civil con experiencia en el diseño y supervisión de proyectos de construcción. Debes tener conocimientos en estructuras, materiales y normativas de construcción.",
                "startDate": "2023-08-05",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salaryRange": "$4000 - $5000"
            },
    {
        "id": 10,
        "name": "Traductor freelance",
        "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
        "description": "Estamos buscando un traductor freelance para realizar traducciones en diferentes idiomas. Debes tener habilidades lingüísticas y experiencia en traducción escrita y oral.",
        "startDate": "2023-07-25",
        "location": "Av. Universitaria 1305 - San Miguel",
        "salaryRange": "Tarifa por proyecto"
    }
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

const JobOffer = () => {

    // const [training, setTraining] = useState<TrainingObj[]>(data)

    const [trainingFilter, setTrainingFilter] = useState<JobOfferObj[]>(data)
    const [finishedCourse, setFinishedCourse] = useState<JobOfferObj[]>(data)

    const [startDate, setStarDate] = useState("0001-01-01")
    const [endDate, setEndDate] = useState("9999-12-31")
    const [typeTraining, setTypeTraining] = useState("Todos")
    var filtered;
    var mostrar = 6;

    const [pageF, setPageF] = useState(1)
    const totalPagesF = Math.ceil(finishedCourse.length / mostrar);
    const [positionF, setPositionF] = useState(0);
    const finishedCourseShow = finishedCourse.slice(positionF, positionF + mostrar);

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
            setTrainingFilter(data);
        else {
            filtered = data.filter((item: any) =>
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
            setTrainingFilter(data);
        else {
            if (typeTraining === "Todos") {
                filtered = data.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00'))
                );
                setTrainingFilter(filtered);
            } else {
                filtered = data.filter((item: any) =>
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
        navigate(`/modulo1/cursoempresa/creacion/1`);

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
                        <h1 className='screenTitle'>Ofertas laborales</h1>
                        <p><small className='subtitle'>Portal que presenta las ofertas laborales disponibles de la
                            empresa y permite postular a alguna de ellas</small></p>
                    </div>
                </div>
                <div className='row' style={{paddingBottom: "32px"}}>
                    <div className='col-5'>
                        <input className='form-control' type='text' placeholder='Ingrese palabras clave'
                               onChange={handleFilter}/>
                    </div>
                    <div className='col-2'>
                        <select className="form-select" aria-label=".form-select-sm example"
                                onChange={handleChangeType}>
                            <option hidden>Área de interés</option>
                            {typeTra.map((t) => {
                                return (
                                    <option key={t.id} value={t.type}>{t.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col'>
                        <select className="form-select" aria-label=".form-select-sm example"
                                onChange={handleChangeType}>
                            <option hidden>Jornada laboral</option>
                            {typeTra.map((t) => {
                                return (
                                    <option key={t.id} value={t.type}>{t.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col'>
                        <select className="form-select" aria-label=".form-select-sm example"
                                onChange={handleChangeType}>
                            <option hidden>Experiencia</option>
                            {typeTra.map((t) => {
                                return (
                                    <option key={t.id} value={t.type}>{t.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-1 text-end'>
                        <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                    </div>
                </div>
                <div>


                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                            {
                                finishedCourseShow.map((tr) => {
                                    return (
                                        <OfferCard key={tr.id}
                                                      id={tr.id}
                                                      name={tr.name}
                                                      photoURL={tr.photoURL}
                                                      description={tr.description}
                                                      creationDate={tr.startDate}
                                                      eventDate={tr.salaryRange}
                                        />
                                    )
                                })

                            }

                        </div>

                        {finishedCourse.length > mostrar &&
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
                </div>

                {/* CREATE TRAINING MODAL */}
                <div className="modal fade" id="createTrainingModal" aria-hidden="true"
                     aria-labelledby="createTrainingModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="createTrainingModal">Crear nuevo curso</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input ref={refTrName} type="text" className="form-control"/>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col' style={{flex: '0 0 8rem'}}>
                                        <PictureUpload/>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <textarea ref={refTrDescription} className="form-control"/>
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
                                <button className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={createTraining}>Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default JobOffer