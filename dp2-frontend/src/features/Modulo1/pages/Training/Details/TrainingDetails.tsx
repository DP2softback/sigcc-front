import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar'
import sidebarItems from '@utils/sidebarItems'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { People, ArrowLeftCircleFill, BarChart } from 'react-bootstrap-icons'
import EmployeeCard from '@features/Modulo1/components/EmployeeCard/EmployeeCard';
import '../../../basic.css';
import '../training.css';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';
import Pagination from '@features/Modulo1/components/Pagination';
import Layout from "@layout/default/index";
import Rate from '@features/Modulo1/components/Rate';
import QuizGenerator from '../../LearningPath/QuizGenerator';
import '../../../content/common.css';
import '../../LearningPath/Details/learning-path-details.css'

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

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

type CompentencieObj = {
    id: number,
    name: string
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
    const [evaluation, setEvaluation] = useState<any>([]);

    const [competencies, setCompetencies] = useState<CompentencieObj[]>([])

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

                axiosInt.get(`capacitaciones/curso/${trainingID}/competencias/`)
                    .then(function (response) {
                        console.log(response.data)
                        setCompetencies(response.data)

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

    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };

    return (
        <>
            {/* <Layout title="Grupo 1 App" content="container"> */}
                {/* <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'> */}
                {
                    loading ?
                        (
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)', display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (<>
                            <div className='row'>                                
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
                                            <p style={{ display: "flex", alignItems: "center" }}>
                                                <People style={{ opacity: "50%" }} />
                                                <small style={{ paddingLeft: "0.5rem" }} className='subtitle'>
                                                    Modalidad: 
                                                {
                                                    training.tipo === "A" ?
                                                        (" Virtual Asincrono")
                                                        :
                                                        (training.tipo === "P" ?
                                                            (" Presencial")
                                                            :
                                                            (" Virtual Sincrono")
                                                        )
                                                }
                                                </small>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='col-xs-12 col-md-4 col-xl-2' style={{ paddingLeft: "2rem" }}>
                                        <div className='d-grid gap-2 mx-auto mb-3'>
                                            <Link to={`evaluacion`} className='btn btn-primary'>Ver evaluaciones</Link>
                                            <Link to={`valoraciones`} className='btn btn-primary'>Ver valoraciones</Link>
                                        </div>
                                    </div>
                                </div>
                                {/*
                                <div className='pt-3'>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#quizGeneratorModal${trainingID}`}>Validar cuestionario</button>
                                    <QuizGenerator title={training.nombre} quizId={parseInt(trainingID)} course={true}/>
                                </div>
                                */}
                            </div>

                            <div className='row'>
                                <div className='col' style={{ marginLeft: "60px" }}>
                                    <div className="row">
                                        <h4 className='mt-3 mb-3 subarea'>Sesiones</h4>
                                        {classSessions.length > 0 ?
                                            (<SessionAccordion trainingType={training.tipo} sessions={classSessions} mode={"detail"} />)
                                            :
                                            (
                                                <div className='row align-items-stretch'>
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
                            
                            <div className='row'>
                                <div className='col' style={{ marginLeft: "60px" }}>
                                    <div className='mt-3 mb-3' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <h4>Competencias</h4>
                                    </div>
                                    <div className='card'>
                                        <div className='card-body'>
                                        {competencies.length ?
                                            (
                                                competencies.map((comp, index) => {
                                                    return(
                                                        <div className='row' key={comp.id}>
                                                            <p><b>{index + 1}. </b>{comp.name}</p>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <p>No se asignaron competencias</p>
                                            )
                                        }
                                       </div>
                                    </div> 
                                </div>
                            </div>

                            {/* EMPLOYEES SECTION */}
                            <div className='row'>
                                <div className='col' style={{ marginLeft: "60px" }}>
                                    <div className='mt-3 mb-3' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                                        <div>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0'>
                                                    {employeesToShow.map((employee, index) => (
                                                        <div className='col-md-4'>
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
                                                        </div>
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
                        </>

                        )
                }
            {/* </Layout > */}
        </>
    )
}

export default TrainingDetails