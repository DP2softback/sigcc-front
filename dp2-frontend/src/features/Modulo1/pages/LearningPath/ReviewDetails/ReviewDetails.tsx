import axiosInt from '@config/axios';
import Rate from '@features/Modulo1/components/Rate';
import '../../../content/common.css';
import './review-details.css'
import { useEffect, useState } from 'react'
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

type DetailObj = {
    nombre?: string
    descripcion?: string
    suma_valoraciones: number
    cant_valoraciones: number
    cant_empleados: number
    url_foto?: string
}

type ReviewObj = {
    valoracion: number
    comentario_valoracion: string
}

function ReviewDetails() {
    const { learningPathId } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingCourseReviews, setLoadingCourseReviews] = useState(false);
    const [lpDetails, setLPDetails] = useState<DetailObj>({nombre: "", descripcion: "", suma_valoraciones: 0, cant_valoraciones: 0, cant_empleados: 0, url_foto: null})
    const [reviewLPDetails, setRewievLPDetails] = useState<ReviewObj[]>([])
    const [courseDetails, setCourseDetails] = useState<DetailObj>({nombre: "", descripcion: "", suma_valoraciones: 0, cant_valoraciones: 0, cant_empleados: 0, url_foto: null})
    const [reviewCourseDetails, setReviewCourseDetails] = useState<ReviewObj[]>([])
    const [courses, setCourses] = useState([])
    const [courseSelected, setCourseSelected] = useState<number>(null)

    const loadReviewsLP = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/valorar_learning_path/${learningPathId}/`)
            .then(function (response) {
                console.log(response.data)
                setLPDetails(response.data.datos_learning_path)
                setRewievLPDetails(response.data.valoraciones)

                axiosInt.get(`capacitaciones/learning_path_from_template/${learningPathId}/`)
                    .then(function (response) {
                        console.log(response.data.cursos)
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

    useEffect(() => {
        loadReviewsLP();
        setCourseSelected(null);
    }, []);

    const selectCourse = (courseIndex: number) => {
        //setLoadingCourseReviews(true)
        setCourseSelected(courseIndex)
        /*
        axiosInt.get(``)
            .then(function (response) {
                setCourseDetails(response.data.datos_curso)
                setReviewCourseDetails(response.data.valoraciones)
                setLoadingCourseReviews(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoadingCourseReviews(false);
            });
        */
    };
    
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
                    {/*
                        <div className='row'>
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <ArrowLeftCircleFill className='mouseHover' onClick={goBack} style={{ height: "32px", width: "32px", color: "black" }} />
                                </div>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ paddingRight: "2rem" }}>
                                        {
                                            lpDetails.url_foto === null ?
                                                (<img src={url_foto_default} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                                :
                                                (<img src={lpDetails.url_foto} style={{ borderRadius: "100%", width: "6rem", height: "6rem" }}></img>)
                                        }
                                    </div>
                                    <div>
                                        <h1 className='screenTitle'>{lpDetails.nombre}</h1>
                                        <p><small className='subtitle'>{lpDetails.descripcion}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        */}
                        
                        <div className='row' style={{ paddingTop: "2rem", display: "flex" }}>
                            <div style={{ width: "34%" }}>
                                <div style={{ fontWeight: "bold" }}>Cursos</div>
                                <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                    <div className='align-items-stretch g-3 px-0 mx-0'>
                                        {
                                            courses.map((course, indexC) => {
                                                return (
                                                    <div className='col mouseHover' key={course.id} style={{ paddingBottom: "1rem"}}>
                                                        <div className="card h-100" style={{display: "flex", flexDirection: "row"}} onClick={() => selectCourse(indexC)}>
                                                            <img
                                                                src={course.tipo_curso == 'U' ? course.course_udemy_detail.image_480x270 == null ? url_foto_default : course.course_udemy_detail.image_480x270 : course.url_foto}
                                                                className="card-img-top lp-card-img"
                                                                alt="Card"
                                                                style={{width: "50%"}}
                                                            />
                                                            <div className="card-body" style={{display: "flex", alignItems: "center", backgroundColor: courseSelected === indexC ? "rgb(0 123 255 / 20%)" : ""}}>
                                                                <h6 style={{fontSize: "12px"}}>{course.nombre}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            {courseSelected !== null ?
                                (
                                    <div style={{ width: "66%" , borderLeftStyle: "groove"}}>
                                        <div style={{ fontWeight: "bold" }}>Valorizaciones del curso</div>
                                        <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                            <div className='align-items-stretch g-3 px-0 mx-0'>
                                                <div className='col' style={{ paddingBottom: "1rem" }}>
                                                    <div className="card h-100" style={{ display: "flex", flexDirection: "row" }}>
                                                        <div className="card-body card-body-gi">
                                                            <div className='col-4 general-info-brs'>
                                                                <h6>Empleados asignados</h6>
                                                                {/*<h5>{courseDetails.cant_empleados}</h5>*/}
                                                                <h5>{lpDetails.cant_empleados}</h5>
                                                            </div>
                                                            <div className='col-4 general-info-brs'>
                                                                <h6>Valorizaciones realizadas</h6>
                                                                {/*<h5>{courseDetails.cant_valoraciones}</h5>*/}
                                                                <h5>{lpDetails.cant_valoraciones}</h5>
                                                            </div>
                                                            <div className='col-4 general-info'>
                                                                <h6>Valoración promedio</h6>
                                                                {/*<h5>{courseDetails.cant_valoraciones}</h5>*/}
                                                                <h5>{lpDetails.cant_empleados === 0 ? ("-") : (lpDetails.suma_valoraciones/lpDetails.cant_empleados)}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    reviewCourseDetails.length > 0 ?
                                                    (
                                                        reviewCourseDetails.map((reviewCourse, indexRC) => {
                                                            return (
                                                                <div className='col' key={indexRC} style={{ paddingBottom: "1rem"}}>
                                                                    <div className="card h-100" style={{display: "flex", flexDirection: "row"}}>
                                                                        <div className="card-body">
                                                                            <div className="d-flex justify-content-between align-items-baseline">
                                                                                <h6>Valoración:</h6>
                                                                                <Rate rate={reviewCourse.valoracion}/>
                                                                            </div>
                                                                            <h6>Comentario: {reviewCourse.comentario_valoracion}</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <div className='col'>
                                                            <div className='card'>
                                                                <div className='card-body'>
                                                                    <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                                        <div className='vertical-align-child'>
                                                                            <h5 className='opacity-50 text-center'>Todavía no cuenta con valorizaciones</h5>
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
                                )
                                :
                                (
                                    <div style={{ width: "66%" , borderLeftStyle: "groove"}}>
                                        <div style={{ fontWeight: "bold" }}>Valorizaciones de la ruta de aprendizaje</div>
                                        <div style={{ display: "flex", flexDirection: "column", paddingTop: "0.75rem" }}>
                                            <div className='align-items-stretch g-3 px-0 mx-0'>
                                                <div className='col' style={{ paddingBottom: "1rem" }}>
                                                    <div className="card h-100" style={{ display: "flex", flexDirection: "row" }}>
                                                        <div className="card-body card-body-gi">
                                                            <div className='col-4 general-info-brs'>
                                                                <h6>Empleados asignados</h6>
                                                                <h5>{lpDetails.cant_empleados}</h5>
                                                            </div>
                                                            <div className='col-4 general-info-brs'>
                                                                <h6>Valorizaciones realizadas</h6>
                                                                <h5>{lpDetails.cant_valoraciones}</h5>
                                                            </div>
                                                            <div className='col-4 general-info'>
                                                                <h6>Valoración promedio</h6>
                                                                <h5>{lpDetails.cant_empleados === 0 ? ("-") : (lpDetails.suma_valoraciones/lpDetails.cant_empleados)}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    reviewLPDetails.length > 0 ?
                                                    (
                                                        reviewLPDetails.map((reviewLP, indexRLP) => {
                                                            return (
                                                                <div className='col' key={indexRLP} style={{ paddingBottom: "1rem"}}>
                                                                    <div className="card h-100" style={{display: "flex", flexDirection: "row"}}>
                                                                        <div className="card-body">
                                                                            <div className="d-flex justify-content-between align-items-baseline">
                                                                                <h6 style={{fontSize: "12px"}}>Valoración:</h6>
                                                                                <Rate rate={reviewLP.valoracion}/>
                                                                            </div>
                                                                            <h6 style={{fontSize: "12px"}}>Comentario: {reviewLP.comentario_valoracion}</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <div className='col'>
                                                            <div className='card'>
                                                                <div className='card-body'>
                                                                    <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                                        <div className='vertical-align-child'>
                                                                            <h5 className='opacity-50 text-center'>Todavía no cuenta con valorizaciones</h5>
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
                                )
                            }


                        </div>

                    </>
            }
        </>
    );
}

export default ReviewDetails