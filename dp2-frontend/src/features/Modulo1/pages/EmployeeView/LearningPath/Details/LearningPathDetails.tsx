import { useEffect, useRef, useState, Fragment } from 'react';
import './learning-path-details.css';
import learningPathDetails from './learningPathDetails.json';
import { Link, useParams } from 'react-router-dom';
import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItemsE'
import '../../../../content/common.css';
import { ArrowLeftCircleFill, People, BarChart, CodeSlash } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { JournalCheck, JournalBookmarkFill } from 'react-bootstrap-icons'
import Rate from '@features/Modulo1/components/Rate';
import Layout from "@layout/default/index";
import { flatten } from 'lodash';
import QuizFill from '@features/Modulo1/pages/LearningPath/QuizFill/QuizFill';
import RateValue from '@features/Modulo1/components/Rate/RateValue';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion/SessionAccordionEmployee';


function LearningPathDetails(props: any) {
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [lpName, setLPName] = useState<any>("");
    const [lpDescription, setLPDescription] = useState<any>("");
    const [lpPhoto, setLPPhoto] = useState<any>("");
    const [lpParticipants, setLPParticipants] = useState<any>("");
    const [lpRate, setLPRate] = useState<any>("");
    const [courses, setCourses] = useState<any>([]);
    const [activo, setActivo] = useState(1);
    const [quizID, setQuizId] = useState(0);
    const [question, setQuestion] = useState([])
    const [courseID, setCourseID] = useState<number>(0);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

    const handleChange = (id: number, courseID: number) => {
        setActivo(id);
        setCourseID(courseID)
        console.log(courseID)
    }

    const loadsCourses = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/learning_path/detalle_empleado_modified/1/${learningPathId}/`)
            .then(function (response) {
                console.log(response.data)
                setLPName(response.data[0].nombre);
                setLPDescription(response.data[0].descripcion);
                setLPPhoto(response.data[0].url_foto);
                setCourses(response.data[0].cursos);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const handleQuiz = (id: number) => {
        setLoading1(true)
        axiosInt.get(`capacitaciones/udemy_course/questionary/${id}/`)
            .then((response) => {
                console.log(response)
                setQuestion(response.data.evaluacion)
                setLoading1(false)
            })
            .catch(function (error) {
                setLoading1(false);
            });
    }

    const handleState = (id: number) => {
        axiosInt.post(`capacitaciones/course_lp_employee_advance/${id}/${learningPathId}/1/`)
            .then((response) => {
                console.log(response)
                window.location.reload()
            })
            .catch(function (error) {

            });
    }

    const handleFinishCourse = (id: number) => {
        const dataFinish = {
            employee_id: 1,
            curso_id: id,
            learning_path_id: learningPathId,
            valoracion: 1,
            apreciacion: "probando 1"
        }

        axiosInt.put(`capacitaciones/course_complete/`, dataFinish)
            .then((response) => {
                console.log(response)
                window.location.reload()
            })
            .catch(function (error) {

            });
    }


    useEffect(() => {
        loadsCourses();
    }, []);

    const goToIntegralEval = () => {
        navigate('evaluacionintegral')
    }

    const refCourseComment = useRef<HTMLTextAreaElement>(null);
    const refCourseRate = useRef(null);

    
    const saveRate = () => {
        console.log(refCourseRate.current.state.rateValue)
        //setLoading(true)

        const data = {
            curso: 11,
            empleado: 1,    //CAMBIAR
            valoracion: refCourseRate.current?.state.rateValue,
            comentario: refCourseComment.current?.value
        }
 
        axiosInt.post('capacitaciones/valorar_curso/', data)
            .then(function (response) {
                console.log(response.data)
                //setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                //setLoading(false)
            })
    }

    return (
        <>
            {/* <Layout title="Grupo 1 App" content="container"> */}
            {/* <Sidebar items={sidebarItems} active='/modulo1/empleado/rutadeaprendizaje'> */}
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
                        <div className='row'>
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <Link to={`/modulo1/empleado/rutadeaprendizaje`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                                </div>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ paddingRight: "2rem" }}>
                                        {
                                            lpPhoto === null ?
                                                (<img src={url_foto_default} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                                :
                                                (<img src={lpPhoto} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                        }
                                    </div>
                                    <div>
                                        <h1 className='screenTitle'>{lpName}</h1>
                                        <p><small className='subtitle'>{lpDescription}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {courses.length > 0 ?
                            <>
                                <div className='row'>
                                    <div className='pt-5 pb-2' style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {courses.map((course: any, index: number) => (
                                                <div key={course.id}>
                                                    <div style={{ display: "flex", alignItems: "center" }} onClick={() => handleChange(index + 1, course.id)}>
                                                        <div className={`circulo ${index + 1 == activo ? courses[activo - 1].tipo_curso == 'U' ?
                                                            courses[activo - 1].datos_extras[0].estado == 4 ? 'completado' : 'activo' : index + 1 == activo ? 'activo' : '' : index + 1 == activo ? 'activo' : ''}`}>{index + 1}</div>

                                                        {(index + 1) !== courses.length && <div className="linea" style={{ paddingLeft: "2rem" }}></div>}
                                                    </div>
                                                    <div>Curso {index + 1}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className='row' style={{ display: "flex", justifyContent: "center" }}>
                                    <div className='pt-4 pb-2' style={{ display: "flex", justifyContent: "center", width: "40%" }}>

                                        <Fragment>
                                            <div className="col">
                                                <div className="card h-100 px-0">
                                                    <img src={courses[activo - 1].tipo_curso == 'U' ? courses[activo - 1].datos_udemy.image_480x270 : courses[activo - 1].foto_curso_empresa == null ? url_foto_default : courses[activo - 1].foto_curso_empresa} className="card-img-top" alt="" />
                                                    <div className="card-body">
                                                        <h5 style={{ height: "4rem" }} className="card-title">{courses[activo - 1].descripcion}</h5>
                                                        <p style={{ height: "5.5rem" }} className="card-text">{courses[activo - 1].nombre}</p>
                                                        {courses[activo - 1].tipo_curso == 'U' && <p className="card-text"><small className="text-body-secondary">Duración: {courses[activo - 1].duracion}</small></p>}
                                                    </div>
                                                    <div className="card-body">
                                                        {(courses[activo - 1].tipo_curso == 'U') ?
                                                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                                {courses[activo - 1].datos_extras[0].estado == 0 &&
                                                                    <a target='_blank' onClick={() => handleState(courses[activo - 1].id)} type="button" className="btn btn-primary" href={`https://www.udemy.com${courses[activo - 1].datos_udemy.url}`}>Iniciar el curso</a>
                                                                }

                                                                {courses[activo - 1].datos_extras[0].estado == 1 &&
                                                                    <>
                                                                        <a target='_blank' type="button" className="btn btn-primary" href={`https://www.udemy.com${courses[activo - 1].datos_udemy.url}`}>Continuar</a>
                                                                        <div className='text-end'>
                                                                            <button type='button' className='btn btn-danger' data-bs-target='#confirmModalCourse' data-bs-toggle='modal'>
                                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                                    <span className='me-3'>Finalizar curso</span>
                                                                                    <JournalCheck />
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                }

                                                                {courses[activo - 1].datos_extras[0].estado == 2 &&
                                                                    <>
                                                                        <button className='btn btn-primary' data-bs-target='#quizModal' data-bs-toggle='modal' onClick={() => handleQuiz(courses[activo - 1].curso.id)}>Rendir Evaluación</button>
                                                                    </>
                                                                }

                                                                {courses[activo - 1].datos_extras[0].estado > 2 &&
                                                                    <>
                                                                        <a target='_blank' type="button" className="btn btn-primary" href={`https://www.udemy.com${courses[activo - 1].datos_udemy.url}`}>Ver curso</a>
                                                                    </>
                                                                }

                                                            </div>

                                                            :
                                                            <SessionAccordion trainingType={courses[activo - 1].tipo} sessions={courses[activo - 1].sesiones} mode={"detailEmp"} />
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                        </Fragment>



                                        {/* <div className="card mb-3" style={{ width: "45rem" }}>
                                            <div className="row g-0" style={{ height: "100%" }}>
                                                <div className="col-md-4">
                                                    <img src={courses[activo - 1].tipo_curso == 'U' ? courses[activo - 1].datos_udemy.image_480x270 : url_foto_default} className="img-fluid rounded-start" style={{ height: "100%" }}></img>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 style={{ height: "4rem" }} className="card-title">{courses[activo - 1].descripcion}</h5>
                                                        <p style={{ height: "5.5rem" }} className="card-text">{courses[activo - 1].nombre}</p>
                                                        {courses[activo - 1].tipo_curso == 'U' && <p className="card-text"><small className="text-body-secondary">Duración: {courses[activo - 1].duracion}</small></p>}
                                                    </div>

                                                    {(courses[activo - 1].tipo_curso == 'U') &&
                                                        <div className="card-body" style={{ display: "flex", justifyContent: "space-between" }}>

                                                            {courses[activo - 1].datos_extras[0].estado == 0 &&
                                                                <a target='_blank' type="button" className="btn btn-primary" href={`https://www.udemy.com${courses[activo - 1].datos_udemy.url}`}>Iniciar el curso</a>
                                                            }

                                                            {courses[activo - 1].datos_extras[0].estado == 1 &&
                                                                <>
                                                                    <a target='_blank' type="button" className="btn btn-primary" href={`https://www.udemy.com${courses[activo - 1].datos_udemy.url}`}>Continuar</a>
                                                                </>
                                                            }

                                                            {courses[activo - 1].datos_extras[0].estado == 2 &&
                                                                <>
                                                                    <button className='btn btn-primary' data-bs-target='#quizModal' data-bs-toggle='modal' onClick={() => handleQuiz(courses[activo - 1].curso.id)}>Rendir Evaluación</button>
                                                                </>
                                                            }

                                                            {courses[activo - 1].datos_extras[0].estado > 2 &&
                                                                <>
                                                                    <a target='_blank' type="button" className="btn btn-primary" href={`https://www.udemy.com${courses[activo - 1].datos_udemy.url}`}>Ver curso</a>
                                                                </>
                                                            }

                                                        </div>
                                                    }


                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>


                                {/* {(courses[activo - 1].tipo_curso == 'U' && courses[activo - 1].datos_extras.estado == 2) &&
                                    <div className='text-end'>
                                        <button type='button' className='btn btn-danger' data-bs-target='#confirmModalCourse' data-bs-toggle='modal'>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span className='me-3'>Finalizar curso</span>
                                                <JournalCheck />
                                            </div>
                                        </button>
                                    </div>
                                } */}

                                {/* <div className='row' style={{ paddingTop: "1rem" }}>
                                    <div className="accordion-footer">
                                        {courses.length == activo ?
                                            <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-around" }}>
                                                <div className='text-end'>
                                                    <button type='button' className='btn btn-danger' data-bs-target='#confirmModalCourse' data-bs-toggle='modal'>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <span className='me-3'>Finalizar curso</span>
                                                            <JournalCheck />
                                                        </div>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button type='button' className='btn' data-bs-target='#confirmModalLP' data-bs-toggle='modal' style={{ backgroundColor: "#198754", border: "none", color: "white" }}>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <span className='me-3'>Finalizar Ruta</span>
                                                            <JournalBookmarkFill />
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <div className='text-end'>
                                                <button type='button' className='btn btn-danger' data-bs-target='#confirmModalCourse' data-bs-toggle='modal'>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <span className='me-3'>Finalizar curso</span>
                                                        <JournalCheck />
                                                    </div>
                                                </button>
                                            </div>
                                        }


                                    </div>
                                </div> */}

                                {/* CONFIRM MODAL COURSE */}
                                <div className="modal fade" id="confirmModalCourse" aria-hidden="true" aria-labelledby="confirmModalCourse" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="createTrainingModal">Confirmación</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div>
                                                    <label className="form-label confirm">¿Desea marcar como finalizado el curso?</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer confirm-footer">
                                                <button onClick={() => handleFinishCourse(courses[activo - 1].id)} className="btn btn-primary" data-bs-dismiss="modal">Si</button>
                                                <button className="btn btn-danger" data-bs-dismiss="modal">No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CONFIRM MODAL LP */}
                                <div className="modal fade" id="confirmModalLP" aria-hidden="true" aria-labelledby="confirmModalLP" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="createTrainingModal">Confirmación</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div>
                                                    <label className="form-label confirm">¿Desea marcar como finalizado la Ruta de Aprendizaje?</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer confirm-footer">
                                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => goToIntegralEval()}>Si</button>
                                                <button className="btn btn-danger" data-bs-dismiss="modal">No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Quiz */}
                                <div className="modal fade" id="quizModal" aria-hidden="true" aria-labelledby="quizModal" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content">
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

                                                <QuizFill questions={question} />


                                            }

                                        </div>
                                    </div>
                                </div>
                                
                                {/* MODAL RATE LP */}
                                <div className="modal fade" id="rateCourse" aria-hidden="true" aria-labelledby="rateCourse" tabIndex={-1}>
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="rateCourse">Calificación del curso</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <label className="form-label">Valoración</label>
                                                <RateValue ref={refCourseRate} />
                                            </div>
                                            <div>
                                                <label className="form-label">Comentarios</label>
                                                <textarea ref={refCourseComment} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate('/modulo1/empleado/rutadeaprendizaje')}>Omitir</button>
                                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => saveRate()}>Enviar</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                            </>
                            :
                            <>
                            </>
                        }

                    </>
            }
            {/* </Sidebar> */}
            {/* </Layout> */}
        </>
    );
}

export default LearningPathDetails;
