import { useEffect, useState } from 'react';
import './learning-path-details.css';
import learningPathDetails from './learningPathDetails.json';
import { Link, useParams } from 'react-router-dom';
import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar';
import sidebarItems from '@utils/sidebarItems';
import '../../../content/common.css';
import { ArrowLeftCircleFill, People, BarChart } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import Rate from '@features/Modulo1/components/Rate';
import LearningPathAssignment from '../Assignment';


function LearningPathDetails (props: any)
{
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState(null);
    const [lpName, setLPName] = useState<any>("");
    const [lpDescription, setLPDescription] = useState<any>("");
    const [lpPhoto, setLPPhoto] = useState<any>("");
    const [lpParticipants, setLPParticipants] = useState<any>("");
    const [lpRate, setLPRate] = useState<any>("");
    const [courses, setCourses] = useState<any>([]);
    const [employees, setEmployees] = useState<any>([]);

    const navigate = useNavigate();

    const goBack = () =>
    {
        navigate(-1);
    };

    const loadsCourses = () =>
    {
        setLoading(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response)
            {
                setLPName(response.data.nombre);
                setLPDescription(response.data.descripcion);
                setLPPhoto(response.data.url_foto);
                setLPParticipants(response.data.cant_empleados);
                setLPRate(response.data.suma_valoraciones);
                setCourses(response.data.curso_x_learning_path);
                setLoading(false);
            })
            .catch(function (error)
            {
                console.log(error);
                setLoading(false);
            });
    }

    const loadEmployees = () =>
    {
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/employees/`)
            .then(function (response)
            {
                setEmployees(response.data);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        loadsCourses();
        loadEmployees();
    }, []);

    const handleRemoveCard = (id: number) =>
    {
        axiosInt.delete(`capacitaciones/learning_path/${learningPathId}/course/detail/${id}`)
            .then(function (response)
            {
                const updatedCourses = courses.filter((course: any) => course.id !== id);
                setCourses(updatedCourses);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    };

    const handleAssignEmployees = (employees: Array<any>, closeFunction: any) =>
    {
        axiosInt.post('capacitaciones/learning_path/enroll_employess/', {
            "id_lp": learningPathId,
            "empleados": employees
        }).then((res) =>
        {
            console.log(res.data);
            window.location.reload();
        })
        closeFunction.current.click();
    }

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/rutadeaprendizaje'>
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
                                <div className='w-100'>
                                    <div>
                                        <h1><span className='align-middle'>{lpName}</span></h1>
                                    </div>
                                    <div>
                                        <p><small className='opacity-50'>{lpDescription}.</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex mx-auto py-3' style={{ width: '20rem' }}>
                                <img className="rounded-circle border lp-thumb me-3" src={lpPhoto} alt="..." />
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
                            <div className='border-top pt-3 d-flex gap-2 w-100 justify-content-between'>
                                <h4>Cursos seleccionados</h4>
                                <Link to={`/modulo1/curso/agregar/${learningPathId}`} className='btn btn-primary'>Agregar cursos</Link>
                            </div>
                            <div className="row mt-3 flex-nowrap overflow-x-auto">
                                {courses.map((course: any) => (
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={course.course_udemy_detail.id}>
                                        <div className="card h-100">
                                            <img
                                                src={course.course_udemy_detail.image_480x270}
                                                className="card-img-top"
                                                alt="Card"
                                            />
                                            <div className="card-body">
                                                <h6 className="card-title">{course.course_udemy_detail.title}</h6>
                                                <p><small className="opacity-50">{course.course_udemy_detail.headline}</small></p>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveCard(course.id)}
                                                >
                                                    Quitar
                                                </button>
                                            </div>
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
                            <div className="row mt-3 flex-nowrap overflow-x-auto">
                                {employees.map((employee: any) => (
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={employee.id}>
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="card-title">{employee.first_name} {employee.last_name}</h6>
                                                <p><small className="opacity-50">{employee.email}</small></p>
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
                        </>
                }
            </Sidebar>
            <LearningPathAssignment assignFunction={handleAssignEmployees} />
        </>
    );
}

export default LearningPathDetails;
