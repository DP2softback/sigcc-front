import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './add-course.css';
import axiosInt from '@config/axios';
import Sidebar from '@features/Modulo1/components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItems';

function AddCourse (props: any)
{
    const navigate = useNavigate();
    const { learningPathId } = useParams();
    const [courses, setCourses] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const [loadingDetailsModal, setLoadingDetailsModal] = useState<any>(false);
    const [basicDetailsModal, setBasicDetailsModal] = useState<any>();
    const [detailsModalData, setDetailsModalData] = useState<any>([]);

    const [lpName, setLPName] = useState<any>("");

    let timer: NodeJS.Timeout;

    const loadsCourses = () =>
    {
        axiosInt.get(`curso/learning_path/${learningPathId}/course/`)
            .then(function (response)
            {
                setLPName(response.data.nombre);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        loadsCourses();
    }, []);

    const handleDetailsModalOpen = (course: any) =>
    {
        setLoadingDetailsModal(true);
        setBasicDetailsModal(course);
        axiosInt.post('curso/udemy/detail/', {
            url: course.url,
        })
            .then(function (response)
            {
                setLoadingDetailsModal(false);
                setDetailsModalData(response.data);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    const keyUpEvent = (e: any) =>
    {
        clearTimeout(timer); // reiniciamos el temporizador cada vez que se presiona una tecla
        const query = e.target.value;
        timer = setTimeout(() =>
        {
            search(query);
        }, 700); // esperamos 1 segundo antes de ejecutar la acción
    }

    const search = (query: any) =>
    {
        setLoading(true);
        // Flag 1 oculta cursos que ya están en el LP
        axiosInt.get(`curso/learning_path/${learningPathId}/udemy/${query}/0`)
            .then(function (response)
            {
                setLoading(false);
                setCourses(response.data);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    const addCourse = (course_id: number, index: number) =>
    {
        const data = {
            udemy_id: course_id,
            course_udemy_detail: courses[index],
            duracion: "PT5H30M",
        }

        axiosInt.post(`curso/learning_path/${learningPathId}/course/`, data)
            .then(function (response)
            {
                console.log(response.data);
                navigate(-1);

            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/rutadeaprendizaje'>
                <div className='row'>
                    <div className='col'>
                        <h1>Agregar cursos a "{lpName}"</h1>
                        <p><small className='opacity-50'>Escribe para buscar en miles de cursos de Udemy.</small></p>
                    </div>

                    <div className="row px-0 mx-0">
                        <div className="col">
                            <input className="form-control" type="text" placeholder="Buscar" onKeyUp={(e) => keyUpEvent(e)} />
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 align-items-stretch g-3 py-3 px-0 mx-0">
                        {
                            !loading && courses && courses.map((course: any, i: number) =>
                            {
                                return <Fragment key={i}>
                                    <div className="col">
                                        <div className="card h-100 px-0">
                                            <img src={course.image_480x270} className="card-img-top" alt="" />
                                            <div className="card-body">
                                                <h5 className="card-title">{course.title}</h5>
                                                <p className="card-text">{course.headline}</p>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col">
                                                        {
                                                            course.is_used ? <>
                                                                <button style={{ width: '100%' }} className="btn btn-secondary">Quitar</button>
                                                            </> :
                                                                <>
                                                                    <button style={{ width: '100%' }} className="btn btn-primary" onClick={() => addCourse(course.id, i)}>Añadir</button>
                                                                </>
                                                        }
                                                    </div>
                                                    <div className="col">
                                                        <button style={{ width: '100%' }} type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModalOpen(course)}>Detalle</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Fragment>
                            })
                        }
                        {
                            loading && <>
                                <div className='vertical-align-parent' style={{ height: 'calc(100vh - 8.15rem)' }}>
                                    <div className='vertical-align-child'>
                                        <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Sidebar>

            <div className="modal fade" id="detailsModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                basicDetailsModal && <h1 className="modal-title fs-6" id="exampleModalLabel">{basicDetailsModal.title}</h1>
                            }
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                basicDetailsModal && <>
                                    <div className="card mb-3">
                                        <img src={basicDetailsModal.image_480x270} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">
                                                {basicDetailsModal.headline}
                                            </p>
                                        </div>
                                    </div>
                                    <h5>Instructores</h5>
                                    <div className="list-group mb-3">
                                        {
                                            basicDetailsModal.visible_instructors.map((instructor: any, i: number) =>
                                            {
                                                return <Fragment key={`instructor-${i}`}>
                                                    <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                                        <img src={instructor.image_100x100} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                                            <div>
                                                                <h6 className="mb-0">{instructor.display_name}</h6>
                                                                <p className="mb-0 opacity-75">{instructor.job_title}</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Fragment>
                                            })
                                        }
                                    </div>
                                </>
                            }
                            <h5>Contenido del curso</h5>
                            <div className="card">
                                <div className="card-body">
                                    {
                                        !loadingDetailsModal && detailsModalData.map((chapter: any, i: number) =>
                                        {
                                            return <Fragment key={`chapter-${i}`}>
                                                <h6>{chapter.title}</h6>
                                                {
                                                    chapter.topics.map((topic: any, j: number) =>
                                                    {
                                                        return <Fragment key={`topic-${i}-${j}`}>
                                                            <ul>
                                                                <li><small>{topic}</small></li>
                                                            </ul>
                                                        </Fragment>
                                                    })
                                                }
                                            </Fragment>
                                        })
                                    }
                                    {
                                        loadingDetailsModal && <>
                                            <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                <div className='vertical-align-child'>
                                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                basicDetailsModal && <a target='_blank' type="button" className="btn btn-primary" href={`https://www.udemy.com${basicDetailsModal.url}`}>Ver el curso en Udemy</a>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCourse;
