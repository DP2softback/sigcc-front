import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItemsE'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { People, ArrowLeftCircle, ArrowLeftCircleFill, ArrowRightCircle } from 'react-bootstrap-icons'
import EmployeeCard from '@features/Modulo1/components/EmployeeCard/EmployeeCard';
import '../../../../basic.css';
import '../trainingE.css';
import SessionAccordionEmployee from '@features/Modulo1/components/SessionAccordion/SessionAccordionEmployee';

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

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
    nombre: "Seguridad de Información",
    url_foto: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
    fecha_creacion: "06/05/2023",
    fecha_primera_sesion: "06/05/2023",
    cantidad_empleados: 10,
    tipo: "A",
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
            fecha_inicio: "2023-05-10T00:00:00-05:00",
            url_video: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
            ubicacion: "Auditorio tercer piso",
            aforo_maximo: 20
        },
        {
            id: 1,
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
                }
            ],
            nombre: "Sesión 2",
            descripcion: "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
            fecha_inicio: "2023-05-10T00:00:00-05:00",
            url_video: null,
            ubicacion: "Auditorio tercer piso",
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
    const [training, setTraining] = useState<any>([]);
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
        console.log(trainingID)
        axiosInt.get(`capacitaciones/course_company_course/${trainingID}`)
            .then(function (response)
            {
                console.log(response.data)
                setTraining(response.data);
                setClassSessions(response.data.sesiones)
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
            <Sidebar items={sidebarItems} active='/modulo1/empleado/cursoempresa'>
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
                        <div className='container row mt-3' style={{backgroundColor: "#F3F4F6"}}>
                            {/* TRAINING DATA */}
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <Link to={`/modulo1/empleado/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
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
                                    <h4 className='mt-4 mb-3 subarea'>Sesiones</h4>
                                    {classSessions.length > 0 ?
                                        (<SessionAccordionEmployee trainingType={training.tipo} sessions={training.sesiones} mode={"detailEmp"}/>)
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
                        </div>
                    </>
                    )
                }
            </Sidebar>
        </>
    )
}

export default TrainingDetails