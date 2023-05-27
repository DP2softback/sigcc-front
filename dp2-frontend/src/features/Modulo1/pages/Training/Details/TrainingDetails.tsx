import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GeoFill, JournalBookmarkFill, InfoCircleFill, PeopleFill, DoorClosedFill, Calendar2EventFill, Calendar, Calendar2Event, People, ArrowLeftCircle, ArrowLeftCircleFill, ArrowRightCircle } from 'react-bootstrap-icons'
import EmployeeCard from '@features/Modulo1/components/EmployeeCard/EmployeeCard';
import '../../../basic.css';
import '../training.css';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';

type Employee = {
    id: string;
    name: string;
    code: string;
    area: string;
    position: string;
    image: string;
}

const datos = {
    id: 1,
    nombre: "Seguridad de Información 1",
    url_foto: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
    fecha_creacion: "06/05/2023",
    fecha_primera_sesion: "06/05/2023",
    cantidad_empleados: 10,
    tipo: "Presencial",
    sesiones: [
        {
            id: 1,
            temas: [
                {
                    id: 1,
                    nombre: "Tema Sesion 1"
                },
                {
                    id: 2,
                    nombre: "Tema 2 Sesion 1"
                }
            ],
            nombre: "Sesion 1",
            descripcion: "asdasd",
            fecha_inicio: "2023-05-10T00:00:00-05:00",
            fecha_limite: "2023-09-10T00:00:00-05:00",
            url_video: null,
            ubicacion: null,
            aforo_maximo: 20
        }
    ]
}

const employees: Employee[] = [
    {
        id: "1",
        name: "John Doe",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Manager",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "2",
        name: "Jane Smith",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Developer",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "3",
        name: "Bob Johnson",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Designer",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "4",
        name: "Sarah Lee",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Tester",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "5",
        name: "Tom Jackson",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Analyst",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    }
];

type TopicObj = {
    id?: number;
    nombre: string;
}

type SessionObj = {
    curso_empresa_id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_limite?: string;
    ubicacion?: string;
    aforo_maximo?: number;
    url_video?: string;
    temas: TopicObj[];
}

type TrainingObj = {
    id: number;
    nombre: string;
    url_foto: string,
    descripcion: string;
    fecha_creacion: string;
    fecha_primera_sesion: string;
    numEmployees: number;
    tipo: string;
    sesiones: SessionObj[];
}

let sessionsData: SessionObj[] = []

const TrainingDetails = () => {
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>(datos);
    const [loading, setLoading] = useState(false);
    const [classSessions, setClassSessions] = useState<SessionObj[]>([])

    const [position, setPosition] = useState(0);
    const [prueba, setPrueba] = useState(0);
    const employeesToShow = employees.slice(position, position + 3);
    const botonEmployee = "Quitar";

    const handlePrevious = () => {
        if (position > 0) {
            setPosition(position - 3);
        }
    };

    const handleNext = () => {
        if (position < employees.length - 3) {
            setPosition(position + 3);
        }
    };

    const loadTrainingDetails = () => {
        setLoading(true);
        axiosInt.get(`dev-modulo-capacitaciones/api/capacitaciones/course_company_course/${trainingID}`)
            .then(function (response)
            {
                //setTraining(response.data);
                setLoading(false);
            })
            .catch(function (error)
            {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        loadTrainingDetails();
    }, []);

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>
                <div className='container row mt-3'>

                    <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                        <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                            <Link to={`/modulo1/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                        </div>

                        <div className='col'>
                            <h1 className='screenTitle'>{training.nombre}</h1>
                            <p><small className='subtitle'>{training.descripcion}.</small></p>
                        </div>
                    </div>


                    <div className='col' style={{ marginLeft: "60px" }}>
                        <div className='row row-center'>
                            <div className='col text-end'>
                                <img src={training.url_foto} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>
                            </div>
                            <div className='col'>
                                <p><Calendar /><b style={{ paddingLeft: "0.5rem" }}>Fecha de creación:</b> {training.fecha_creacion}</p>
                                <p><People /><b style={{ paddingLeft: "0.5rem" }}>Cant. Empleados:</b> {training.cantidad_empleados}</p>
                                <p className="card-text"><DoorClosedFill /><b style={{ paddingLeft: "0.5rem" }}>Modalidad:</b> {training.tipo}</p>
                            </div>
                        </div>
                        <div className="row">
                            <h4 className='mt-3 mb-3 subarea'>Sesiones</h4>
                            
                            <div>
                                {classSessions.length > 0 ?
                                    (<SessionAccordion sessions={classSessions}/>)
                                    :
                                    (
                                        <div className='row align-items-stretch g-3 py-3'>
                                            <div className='col'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                            <div className='vertical-align-child'>
                                                                <h5 className='opacity-50 text-center'>No cuenta con sesiones creadas</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='mt-3 mb-3' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h4 className='subarea'>Empleados asignados</h4>
                                <Link to={`/modulo1/cursoempresa/asignacion/${training.id}`}>
                                    <button className='btn btn-primary' style={{ marginRight: "23px" }}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <span className='me-3'>Asignar empleados</span>                                        
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                            {employees.length ?
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div>
                                        <ArrowLeftCircle onClick={handlePrevious} className={`${position === 0 ? 'controlsD' : 'controls'}`} />
                                    </div>

                                    <div className="employees-list cards">
                                        {employeesToShow.map((employee) => (
                                            <EmployeeCard key={employee.id}
                                                id={employee.id}
                                                name={employee.name}
                                                photoURL={employee.image}
                                                area={employee.area}
                                                puesto={employee.position}
                                                codigo={employee.code}
                                                boton1={botonEmployee}
                                                boton1Color={"#B02A37"}
                                                option={setPrueba}
                                            />
                                        ))}
                                        {(employeesToShow.length != 3) &&
                                            <>
                                                {employeesToShow.length === 2 ?
                                                    <div key={1} style={{ width: "380px", height: "297.07px" }}>
                                                    </div>
                                                    :
                                                    <>
                                                        <div key={1} style={{ width: "380px", height: "297.07px" }}>
                                                        </div>
                                                        <div key={2} style={{ width: "380px", height: "297.07px" }}>
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>

                                    <div>
                                        <div>
                                            <ArrowRightCircle onClick={handleNext} className={`${position >= employees.length - 3 ? 'controlsD' : 'controls'}`} />
                                        </div>
                                    </div>

                                </div>

                                :
                                <div>
                                    <h5 style={{ display: "flex", justifyContent: "center" }}>Sin empleados asignados</h5>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default TrainingDetails