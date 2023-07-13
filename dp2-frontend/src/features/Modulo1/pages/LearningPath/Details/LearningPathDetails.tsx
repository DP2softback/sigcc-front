import { Fragment, useEffect, useState } from 'react';
import './learning-path-details.css';
import { Link, useParams } from 'react-router-dom';
import axiosInt from '@config/axios';
import '../../../content/common.css';
import { ArrowLeftCircleFill, People, BarChart } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import Rate from '@features/Modulo1/components/Rate';
import LearningPathAssignment from '../Assignment';
import QuizGenerator from '../QuizGenerator/QuizGenerator';
import LearningPathComprehensiveEvaluation from '../ComprehensiveEvaluation';


function LearningPathDetails(props: any) {
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState(null);
    const [lpName, setLPName] = useState<any>("");
    const [lpDescription, setLPDescription] = useState<any>("");
    const [lpPhoto, setLPPhoto] = useState<any>("");
    const [lpParticipants, setLPParticipants] = useState<any>("");
    const [lpRate, setLPRate] = useState<any>("");
    const [courses, setCourses] = useState<any>([]);
    const [coursesQuizStatuses, setCoursesQuizStatuses] = useState<any>([]);
    const [employees, setEmployees] = useState<any>([]);
    const [evaluation, setEvaluation] = useState<any>([]);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'


    const loadsCourses = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response) {
                setLPName(response.data.nombre);
                setLPDescription(response.data.descripcion);
                setLPPhoto(response.data.url_foto);
                setLPParticipants(response.data.cant_empleados);
                setLPRate(response.data.suma_valoraciones);

                axiosInt.get(`capacitaciones/learning_path_from_template/${learningPathId}/`)
                    .then(function (response) {
                        setCourses(response.data.cursos);
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

    const loadEmployees = () => {
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/employees/`)
            .then(function (response) {
                setEmployees(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        loadsCourses();
        loadEmployees();
    }, []);

    useEffect(() => {
        if (coursesQuizStatuses.length)
            return;
        const coursesQuizStat = courses.map(object => parseInt(object.estado));
        courses.map((item: any, index: any) => {
            if (parseInt(item.estado) === 0) {
                let quizStatusinterval;
                const handleGetStatus = (event) => {
                    axiosInt.get(`capacitaciones/udemy_course/check_status/${item.id}/`)
                        .then((response) => {
                            if (parseInt(response.data.estado) === 1) {
                                setCoursesQuizStatuses(prevState => {
                                    return prevState.map((element, i) => {
                                        if (i === index) {
                                            return parseInt(response.data.estado);
                                        }
                                        return element;
                                    });
                                });
                                clearInterval(quizStatusinterval);
                            }
                        })
                };

                window.addEventListener('get-status', handleGetStatus);
                quizStatusinterval = setInterval(() => {
                    window.dispatchEvent(new Event('get-status'));
                }, 5000);

                return () => {
                    window.removeEventListener('get-status', handleGetStatus);
                    clearInterval(quizStatusinterval);
                };
            }
        })
        setCoursesQuizStatuses(coursesQuizStat);
    }, [courses]);

    const handleRemoveCard = (e: any, id: number) => {
        e.target.disabled = true;
        e.target.getElementsByTagName("span")[0].classList.remove('hidden');
        axiosInt.delete(`capacitaciones/learning_path/${learningPathId}/course/detail/${id}`)
            .then(function (response) {
                e.target.disabled = false;
                e.target.getElementsByTagName("span")[0].classList.add('hidden');
                const updatedCourses = courses.filter((course: any) => course.id !== id);
                setCourses(updatedCourses);
            })
            .catch(function (error) {
                e.target.disabled = false;
                e.target.getElementsByTagName("span")[0].classList.add('hidden');
                console.log(error);
            });
    };

    const handleAssignEmployees = (employees: Array<any>, closeFunction: any) => {
        axiosInt.post('capacitaciones/learning_path/enroll_employess/', {
            "id_lp": learningPathId,
            "empleados": employees
        }).then((res) => {
            window.location.reload();
        })
        closeFunction.current.click();
    }

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
                    </> :
                    <>
                        <div className='d-flex border-bottom'>
                            <h1><ArrowLeftCircleFill onClick={goBack} className='me-3' /></h1>
                            <div className='row w-100'>
                                <div className='col-xs-12 col-md-4 col-xl-6'>
                                    <div>
                                        <h1><span className='align-middle'>{lpName}</span></h1>
                                    </div>
                                    <div>
                                        <p><small className='opacity-50'>{lpDescription}.</small></p>
                                    </div>
                                </div>
                                <div className='col-xs-12 col-md-4 col-xl-4'>
                                    <div className='d-flex mb-3'>
                                        <img className="rounded-circle lp-thumb me-3" src={lpPhoto} alt="..." />
                                        <div className='w-100 align-self-center'>
                                            <div className='d-flex'>
                                                <People className='align-self-center me-3' />
                                                <div className='w-100 d-flex justify-content-between'>
                                                    <span>Inscritos: </span>
                                                    <small className='fw-bold'>{lpParticipants}</small>
                                                </div>
                                            </div>
                                            <div className='d-flex'>
                                                <BarChart className='align-self-center me-3' />
                                                <div className='w-100 d-flex justify-content-between'>
                                                    <span className='align-self-center'>Valoración: </span>
                                                    <Rate className='lp-detail-rate' disabled={true} rate={lpRate} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xs-12 col-md-4 col-xl-2'>
                                    <div className='d-grid gap-2 mx-auto mb-3'>
                                        <Link to={`evaluacionintegral`} className='btn btn-sm btn-primary'>Ver evaluaciones</Link>
                                        <Link to={`reporte`} className='btn btn-sm btn-primary'>Ver reportes</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-3 d-flex g-2 w-100 justify-content-between'>
                            <h4>Cursos seleccionados</h4>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Agregar cursos
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link to={`/modulo1/curso/agregar/${learningPathId}`} className="dropdown-item">Curso de Udemy</Link></li>
                                    <li><Link to={`/modulo1/curso/agregar/ce/${learningPathId}`} className="dropdown-item">Curso de empresa asíncrono</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 align-items-stretch g-3 py-3">
                            {
                                courses.map((course: any, index: number) => (
                                    <div className='col' key={course.id}>
                                        <div className="card h-100">
                                            <img
                                                src={course.tipo_curso == 'U' ? course.course_udemy_detail.image_480x270 == null ? url_foto_default : course.course_udemy_detail.image_480x270 : course.url_foto}
                                                className="card-img-top lp-card-img"
                                                alt="Card"
                                            />
                                            <div className="card-body">
                                                <h6 className="card-title">{course.nombre}</h6>
                                                <p className='mb-0'><small className="opacity-50">{course.descripcion}</small></p>
                                            </div>
                                            {course.tipo_curso == 'U' ?
                                                <div className="card-footer pb-3 lpd-footer">
                                                    {
                                                        coursesQuizStatuses[index] == 0 ?
                                                            <>
                                                                <div className="d-flex justify-content-center">
                                                                    <div className="spinner-border spinner-border-sm me-1" role="status">
                                                                        <span className="visually-hidden">Cargando...</span>
                                                                    </div>
                                                                    <div>
                                                                        <p style={{ marginTop: '-0.25rem' }}>
                                                                            <small>Generando evaluación</small>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </> :
                                                            <>
                                                                <button type="button" className="btn btn-primary w-100 mb-3" data-bs-toggle="modal" data-bs-target={`#quizGeneratorModal${course.id}`}>Validar cuestionario</button>
                                                                <QuizGenerator title={course.nombre} quizId={course.id} course={false} />
                                                            </>
                                                    }
                                                    <button className="btn btn-danger w-100" onClick={(e) => handleRemoveCard(e, course.id)}>
                                                        <span className="spinner-border spinner-border-sm hidden me-3" role="status" aria-hidden="true"></span>
                                                        Eliminar curso
                                                    </button>
                                                </div>
                                                :
                                                <div className="card-footer pb-3 lpd-footer">
                                                    <button className="btn btn-danger w-100" onClick={(e) => handleRemoveCard(e, course.id)}>
                                                        <span className="spinner-border spinner-border-sm hidden me-3" role="status" aria-hidden="true"></span>
                                                        Eliminar curso
                                                    </button>
                                                </div>
                                            }


                                        </div>
                                    </div>
                                ))}
                            {
                                courses.length === 0 && <>
                                    <div className='col'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                    <div className='vertical-align-child'>
                                                        <h5 className='opacity-50 text-center'>Agrega un curso para empezar</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className='border-top pt-3 d-flex gap-2 w-100 justify-content-between'>
                            <h4>Empleados asignados</h4>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assignmentModal">Asignar empleados</button>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 align-items-stretch g-3 pt-3">
                            {employees.map((employee: any) => (
                                <div className="col" key={employee.id}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="card-title">{employee.first_name} {employee.last_name}</h6>
                                            <p className='mb-0'><small className="opacity-50">{employee.email}</small></p>
                                            {/* <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveCard(employee.id)}
                                                >
                                                    Quitar
                                                </button> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                employees.length === 0 && <>
                                    <div className='col'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                    <div className='vertical-align-child'>
                                                        <h5 className='opacity-50 text-center'>Agrega empleados para empezar</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className='pt-3'>
                            <h4>Acciones</h4>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comprehensiveEvaluationModal">Configurar evaluación integral</button>
                        </div>
                    </>
            }
            {/* </Sidebar> */}


            <LearningPathAssignment assignFunction={handleAssignEmployees} />
            {
                coursesQuizStatuses.includes(0) ?
                    <>
                        <div style={{ marginTop: "4rem" }} className="toast show align-items-center text-bg-primary position-fixed top-0 end-0 border-0" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <div className="toast-body">
                                    Se está generando la evaluación para el curso en segundo plano.
                                </div>
                                <button type="button" className="btn-close btn-close-white me-3 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    </> :
                    <></>
            }

            <LearningPathComprehensiveEvaluation learningPathId={learningPathId} data={evaluation} />
        </>
    );
}

export default LearningPathDetails;
