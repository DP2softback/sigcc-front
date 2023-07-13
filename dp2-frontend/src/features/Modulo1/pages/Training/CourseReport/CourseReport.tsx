import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItemsE'
import { useState, useRef, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TrainingCardE from '@features/Modulo1/components/Training/TrainingCardE';
import Pagination from '@features/Modulo1/components/Pagination';
import '../../../basic.css';
import './CourseReporte.css';
import axiosInt from '@config/axios';
import { ArrowLeftCircleFill, People, BarChart } from 'react-bootstrap-icons'
// import ReviewDetails from '../ReviewDetails/ReviewDetails';


// type TrainingObj = {
//     id: number;
//     fechaAsignacion: string;
//     porcentajeProgreso: string;
//     cursoEmpresa: {
//         id: number,
//         nombre: string,
//         url_foto: string,
//         descripcion: string,
//         fecha_creacion: string,
//         fecha_primera_sesion: string,
//         cantidad_empleados: number,
//         tipo: string,
//     }
// }

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

const CourseReport = () => {

    const { trainingID } = useParams();
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);


    const [training, setTraining] = useState<any>([])
    const [employees, setEmployees] = useState<any[]>([])
    const [employeeSelected, setEmployeeSelected] = useState<any>([])
    const [optionCourse, setOptionCourse] = useState('Avance')
    const [statesLP, setStatesLP] = useState<any[]>([])
    const [statesCourse, setStatesCourse] = useState<any>([])
    const [orderSelected, setOrderSelected] = useState<number>(null)
    const [questions, setQuestions] = useState([])


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const handleCourseReporte = (employee: any, id: any) => {
        setEmployeeSelected(employee);
        setOrderSelected(id);
    }

    const loadTrainingDetails = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/course_company_course/${trainingID}`)
            .then(function (response) {
                setTraining(response.data);
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

    const loadQuiz = () => {
        setLoading2(true);
        axiosInt.get(`capacitaciones/curso/form/${trainingID}/1/`)
            .then((response) => {
                console.log(response)
                setQuestions(response.data.form)
                setLoading2(false)
            })
            .catch(function (error) {
                setLoading2(false);
            });
    }

    useEffect(() => {
        loadTrainingDetails();
    }, []);

    useEffect(() => {
        loadQuiz();
    }, [employeeSelected]);


    return (
        <>
            {
                loading ?
                    <>
                        <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                            <div className='vertical-align-child'>
                                <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='row' style={{ paddingBottom: "2rem" }}>
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <ArrowLeftCircleFill className='mouseHover' onClick={goBack} style={{ height: "32px", width: "32px", color: "black" }} />
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
                        </div>


                        {loading1 ?
                            <>
                                <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                                    <div className='vertical-align-child'>
                                        <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </>

                            :
                            <div className='row' style={{ paddingTop: "1.25rem", display: "flex" }}>

                                <div style={{ width: "34%" }}>
                                    <div style={{ fontWeight: "bold" }}>Empleados</div>
                                    <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                        <div className='align-items-stretch g-3 px-0 mx-0'>
                                            {
                                                employees.map((course, indexC) => {
                                                    return (
                                                        <div className='col mouseHover' key={course.id} style={{ paddingBottom: "1rem" }} onClick={() => handleCourseReporte(course, indexC)}>
                                                            <div className="card h-100" style={{ display: "flex", flexDirection: "row" }}>
                                                                <img
                                                                    src={url_foto_default}
                                                                    className="card-img-top lp-card-img"
                                                                    alt="Card"
                                                                    style={{ width: "50%" }}
                                                                />
                                                                <div className="card-body" style={{ display: "flex", alignItems: "center", backgroundColor: orderSelected === indexC ? "rgb(0 123 255 / 20%)" : "" }}>
                                                                    <h6 style={{ fontSize: "12px" }}>{course.nombre}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                {employeeSelected.length == 0 ?
                                    <div style={{ width: "66%" }}>
                                        <div style={{ fontWeight: "bold", color: "#F8F8F9" }}>LP</div>
                                        <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                            <div className='align-items-stretch g-3 px-0 mx-0'>
                                                <div className="card h-100" style={{ display: "flex", padding: "1rem" }}>

                                                    <div style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" }}>
                                                        <div>
                                                            <h3 className='screenTitle' style={{ fontSize: "20px" }}>Seleccione un empleado</h3>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <div style={{ width: "66%" }}>
                                            <div style={{ fontWeight: "bold", color: "#F8F8F9" }}>LP</div>
                                            <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                                <div className='align-items-stretch g-3 px-0 mx-0'>
                                                    <div className="card h-100" style={{ display: "flex", padding: "1rem" }}>

                                                        {loading2 ?
                                                            <>
                                                                <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                                                                    <div className='vertical-align-child'>
                                                                        <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                {/* <div style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" }}>
                                                                    <div style={{ paddingRight: "1rem" }}>
                                                                        {
                                                                            statesCourse[0].url_foto === null ?
                                                                                (<img src={url_foto_default} style={{ borderRadius: "100%", width: "3rem", height: "3rem" }}></img>)
                                                                                :
                                                                                (<img src={statesCourse[0].url_foto} style={{ borderRadius: "100%", width: "3rem", height: "3rem" }}></img>)
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        <h1 className='screenTitle' style={{ fontSize: "20px" }}>Avance {statesCourse[0].nombre}</h1>
                                                                    </div>
                                                                </div> */}

                                                                <div>
                                                                    {questions.map((question) => (
                                                                        <div key={question.id_pregunta} style={{ marginTop: "1rem" }}>
                                                                            <h4>{question.pregunta}</h4>
                                                                            {question.opciones.map((option) => (
                                                                                <div key={option.id_opcion}>
                                                                                    <div className="form-check">
                                                                                        <input
                                                                                            id={`question${question.id_pregunta}-option${option.id_opcion}}`}
                                                                                            type="radio"
                                                                                            className="form-check-input"
                                                                                            name={question.id_pregunta.toString()}
                                                                                            value={option.id_opcion.toString()}
                                                                                            checked={option.opcion_elegida}                                                                                            
                                                                                        />
                                                                                        <label className="form-check-label" htmlFor={`question${question.id_pregunta}-option${option.id_opcion}}`}>
                                                                                            {option.opcion}
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </>

                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>


                                }


                            </div>
                        }


                    </>
            }
        </>
    )
}

export default CourseReport