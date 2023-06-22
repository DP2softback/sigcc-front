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
import ReviewDetails from '../ReviewDetails/ReviewDetails';


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

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [lp, setLp] = useState<any>([])
    const [courses, setCourses] = useState<any[]>([])
    const [courseSelected, setCourseSelected] = useState<any>([])
    const { learningPathId } = useParams();
    const [optionCourse, setOptionCourse] = useState('Avance')
    const [statesLP, setStatesLP] = useState<any[]>([])

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const handleOptionCourse = (e: string) => {
        setOptionCourse(e)
    }


    const handleCourseReporte = (course: any) => {
        setCourseSelected(course)
    }


    const loadCourses = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response) {
                console.log(response.data)
                setLp(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    const loadStates = () => {
        setLoading1(true);
        axiosInt.get(`capacitaciones/learning_path_from_template/${learningPathId}/`)
            .then(function (response) {
                console.log(response.data[1])
                setCourses(response.data[1]);

                axiosInt.get(`capacitaciones/learning_path/empleados_progress/${learningPathId}/`)
                    .then(function (response) {
                        console.log(response.data)
                        setStatesLP(response.data)
                        setLoading1(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                        setLoading1(false);
                    });

            })
            .catch(function (error) {
                console.log(error);
                setLoading1(false);
            });
    }

    const loadStars = () => {
        setLoading2(true);
        // axiosInt.get(`capacitaciones/learning_path_from_template/${learningPathId}/`)
        //     .then(function (response) {
        //         console.log(response.data[1])
        //         setCourses(response.data[1]);
        //         setLoading(false);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         setLoading(false);
        //     });
        setLoading2(false);
    }

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        if (optionCourse == 'Avance')
            loadStates();
        else
            loadStars();
    }, [optionCourse]);


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
                                            lp.url_foto === null ?
                                                (<img src={url_foto_default} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                                :
                                                (<img src={lp.url_foto} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                        }
                                    </div>
                                    <div>
                                        <h1 className='screenTitle'>{lp.nombre}</h1>
                                        <p><small className='subtitle'>{lp.descripcion}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div>
                                <button style={{ marginRight: "1rem" }} className={`${optionCourse === 'Avance' ? 'optionActive' : 'optionNoActive'}`} onClick={() => handleOptionCourse('Avance')}>Avance</button>
                                <button className={`${optionCourse === 'Valoracion' ? 'optionActive' : 'optionNoActive'}`} onClick={() => handleOptionCourse('Valoracion')}>Valoración</button>
                            </div>
                        </div>

                        {optionCourse == 'Avance' ?
                            <>
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
                                            <div style={{ fontWeight: "bold" }}>Cursos</div>
                                            <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                                <div className='align-items-stretch g-3 px-0 mx-0'>
                                                    {
                                                        courses.map((course) => {
                                                            return (
                                                                <div className='col mouseHover' key={course.id} style={{ paddingBottom: "1rem" }} onClick={() => handleCourseReporte(course)}>
                                                                    <div className="card h-100" style={{ display: "flex", flexDirection: "row" }}>
                                                                        <img
                                                                            src={course.tipo_curso == 'U' ? course.course_udemy_detail.image_480x270 == null ? url_foto_default : course.course_udemy_detail.image_480x270 : course.url_foto}
                                                                            className="card-img-top lp-card-img"
                                                                            alt="Card"
                                                                            style={{ width: "50%" }}
                                                                        />
                                                                        <div className="card-body" style={{ display: "flex", alignItems: "center" }}>
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


                                        {courseSelected.length == 0 ?
                                            <div style={{ width: "66%" }}>
                                                <div style={{ fontWeight: "bold", color: "#F8F8F9" }}>LP</div>
                                                <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                                    <div className='align-items-stretch g-3 px-0 mx-0'>
                                                        <div className="card h-100" style={{ display: "flex", padding: "1rem" }}>

                                                            <div style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" }}>
                                                                <div style={{ paddingRight: "1rem" }}>
                                                                    {
                                                                        lp.url_foto === null ?
                                                                            (<img src={url_foto_default} style={{ borderRadius: "100%", width: "3rem", height: "3rem" }}></img>)
                                                                            :
                                                                            (<img src={lp.url_foto} style={{ borderRadius: "100%", width: "3rem", height: "3rem" }}></img>)
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <h1 className='screenTitle' style={{ fontSize: "20px" }}>Avance {lp.nombre}</h1>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                {
                                                                    statesLP.map((employee) => {
                                                                        return (
                                                                            <div className='col' key={employee.id} style={{ paddingBottom: "1rem" }}>
                                                                                <div className="h-100" style={{ display: "flex", flexDirection: "row" }}>
                                                                                    <div className="card-body" style={{ display: "flex", flexDirection: "column" }}>
                                                                                        <h6 style={{ fontSize: "12px" }}>{employee.empleado.usuario.first_name + " " + employee.empleado.usuario.last_name}</h6>
                                                                                        <h6 style={{ fontSize: "12px" }}>{employee.estado}</h6>
                                                                                        <h6 style={{ fontSize: "12px" }}>{employee.porcentaje_progreso}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            :

                                            <div style={{ width: "66%" }}>
                                                <div style={{ fontWeight: "bold", color: "#F8F8F9" }}>CURSO</div>
                                                <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                                    <div className='align-items-stretch g-3 px-0 mx-0'>
                                                        {
                                                            courses.map((course) => {
                                                                return (
                                                                    <div className='col' key={course.id} style={{ paddingBottom: "1rem" }}>
                                                                        <div className="card h-100" style={{ display: "flex" }}>
                                                                            <img
                                                                                src={course.tipo_curso == 'U' ? course.course_udemy_detail.image_480x270 == null ? url_foto_default : course.course_udemy_detail.image_480x270 : course.url_foto}
                                                                                className="card-img-top lp-card-img"
                                                                                alt="Card"
                                                                            />
                                                                            <div className="card-body">
                                                                                <h6 className="card-title">{course.nombre}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        }


                                    </div>
                                }

                            </>

                            :
                            <>
                                <ReviewDetails></ReviewDetails>
                            </>
                        }





                    </>
            }
        </>
    )
}

export default CourseReport