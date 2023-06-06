import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar'
import sidebarItems from '@utils/sidebarItems'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { People, ArrowLeftCircle, ArrowLeftCircleFill, ArrowRightCircle } from 'react-bootstrap-icons'
import EmployeeCard from '@features/Modulo1/components/EmployeeCard/EmployeeCard';
import '../../../basic.css';
import '../training.css';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';
import Pagination from '@features/Modulo1/components/Pagination';

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

const datos = {
    id: 1,
    nombre: "Seguridad de Información 1",
    url_foto: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
    cantidad_empleados: 10,
    tipo: "P",
    sesiones: [
        {
            id: 1,
            temas: [
                {
                    id: 1,
                    nombre: "Tema Sesión 1"
                },
                {
                    id: 2,
                    nombre: "Tema 2 Sesión 1"
                }
            ],
            nombre: "Sesión 1",
            descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
            fecha_inicio: "2023-05-31T00:00:00-05:00",
            url_video: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
            ubicacion: "Auditorio tercer piso",
            aforo_maximo: 20,
            responsables: [

            ]
        },
        {
            id: 2,
            temas: [
                {
                    id: 1,
                    nombre: "Tema Sesión 2"
                },
                {
                    id: 2,
                    nombre: "Tema 2 Sesión 2"
                },
                {
                    id: 3,
                    nombre: "Tema Sesión 2"
                },
                {
                    id: 4,
                    nombre: "Tema 2 Sesión 2"
                },
            ],
            nombre: "Sesión 2",
            descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
            fecha_inicio: "2023-06-01T00:00:00-05:00",
            url_video: null,
            ubicacion: "Auditorio tercer piso",
            aforo_maximo: 20,
            responsables: [

            ]

        },
        {
            id: 3,
            temas: [
                {
                    id: 1,
                    nombre: "Tema Sesión 3"
                },
                {
                    id: 2,
                    nombre: "Tema 2 Sesión 3"
                }
            ],
            nombre: "Sesión 3",
            descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
            fecha_inicio: "2023-06-02T00:00:00-05:00",
            url_video: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
            ubicacion: "Auditorio tercer piso",
            aforo_maximo: 20,
            responsables: [

            ]
        },
    ]
}

const employeesData: Employee[] = [
    {
        id: "1",
        nombre: "John Doe",
        empleado: "123456789",
        area: "Área de Base de datos",
        posicion: "Manager",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "2",
        nombre: "Jane Smith",
        empleado: "123456789",
        area: "Área de Base de datos",
        posicion: "Developer",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "3",
        nombre: "Bob Johnson",
        empleado: "123456789",
        area: "Área de Base de datos",
        posicion: "Designer",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "4",
        nombre: "Sarah Lee",
        empleado: "123456789",
        area: "Área de Base de datos",
        posicion: "Tester",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "5",
        nombre: "Tom Jackson",
        empleado: "123456789",
        area: "Área de Base de datos",
        posicion: "Analyst",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    }
];

type Employee = {
    id: string;
    nombre: string;
    empleado: string;
    area?: string;
    posicion?: string;
    image: string;
}

type TopicObj = {
    id?: number;
    nombre: string;
}

type SupplierObj = {
    id: number
    nombres?: string;
    apellidos?: string;
}

type SessionObj = {
    id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    ubicacion?: string;
    aforo_maximo?: number;
    url_video?: string;
    temas: TopicObj[];
    responsables: SupplierObj[];
}

const TrainingDetails = () => {
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [classSessions, setClassSessions] = useState<SessionObj[]>([])
    const [position, setPosition] = useState(0);
    const [prueba, setPrueba] = useState(0);
    const [employees, setEmployees] = useState<Employee[]>([])
    const botonEmployee = "Quitar";

    var mostrar = 6;
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(employees.length / mostrar);
    const employeesToShow = employees.slice(position, position + mostrar);


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
        axiosInt.get(`capacitaciones/course_company_course/${trainingID}`)
            .then(function (response) {
                setTraining(response.data);
                setClassSessions(response.data.sesiones)
                console.log(response.data)
                axiosInt.get(`capacitaciones/course_company_course_list_empployees/${trainingID}`)
                    .then(function (response) {
                        setEmployees(response.data);
                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setLoading(false);
                    });
            })
            .catch(function (error) {
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
                {
                    loading ?
                        (
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (<>
                            <div className='container row mt-3' style={{ backgroundColor: "#F3F4F6" }}>
                                {/* TRAINING DATA */}
                                <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                    <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                        <Link to={`/modulo1/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ paddingRight: "2rem" }}>
                                            {
                                                training.url_foto === null ?
                                                    (<img src={url_foto_default} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>)
                                                    :
                                                    (<img src={training.url_foto} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>)
                                            }
                                        </div>
                                        <div>
                                            <h1 className='screenTitle'>{training.nombre}</h1>
                                            <p><small className='subtitle'>{training.descripcion}.</small></p>
                                            {
                                                training.tipo === "A" ?
                                                    (<p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: Virtual Asincrono</small><People style={{ opacity: "50%" }} /></p>)
                                                    :
                                                    (training.tipo === "P" ?
                                                        (<p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: Presencial</small><People style={{ opacity: "50%" }} /></p>)
                                                        :
                                                        (<p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: Virtual Sincrono</small><People style={{ opacity: "50%" }} /></p>)
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='col' style={{ marginLeft: "60px" }}>
                                    <div className="row mb-3 ">
                                        <h4 className='mt-3 mb-3 subarea'>Sesiones</h4>
                                        {classSessions.length > 0 ?
                                            (<SessionAccordion trainingType={training.tipo} sessions={classSessions} mode={"detail"} />)
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

                                    {/* EMPLOYEES SECTION */}
                                    <div className='row'>
                                        <div className='mt-4 mb-3' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <h4 className='subarea'>Empleados asignados</h4>
                                            <Link to={`/modulo1/cursoempresa/asignacion/${training.id}`}>
                                                <button className='btn btn-primary' style={{ marginRight: "23px" }}>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
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
                                                    <div className="employees-list cards">
                                                        {employeesToShow.map((employee, index) => (
                                                            <EmployeeCard key={index}
                                                                id={index}
                                                                name={employee.nombre}
                                                                photoURL={employee.image === (undefined) ? (url_foto_default) : (employee.image)}
                                                                area={employee.area === (undefined) ? ("-") : (employee.area)}
                                                                puesto={employee.posicion === (undefined) ? ("-") : (employee.posicion)}
                                                                codigo={employee.empleado}
                                                                boton1={'NO'}
                                                                boton1Texto={botonEmployee}
                                                                boton1Color={''}
                                                                option={setPrueba}
                                                            />
                                                        ))}
                                                    </div>

                                                    {employees.length > mostrar &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={page}
                                                                    totalPages={totalPages}
                                                                    handlePagination={setPage}
                                                                    setPosition={setPosition}
                                                                    position={position}
                                                                    mostrar={mostrar}
                                                                />
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                            :
                                            (
                                                <div className='row align-items-stretch g-3 py-3'>
                                                    <div className='col'>
                                                        <div className='card'>
                                                            <div className='card-body'>
                                                                <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                                    <div className='vertical-align-child'>
                                                                        <h5 className='opacity-50 text-center'>Sin empleados asignados</h5>
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
                            </div>
                        </>
                        )
                }
            </Sidebar>
        </>
    )
}

export default TrainingDetails