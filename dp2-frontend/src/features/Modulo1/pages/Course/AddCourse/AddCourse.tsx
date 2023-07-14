import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './add-course.css';
import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItems';
import Pagination from '@features/Modulo1/components/Pagination';

declare namespace window {
    export const bootstrap: any; // O cualquier tipo específico que corresponda a tu versión de Bootstrap
}

function AddCourse(props: any) {
    const navigate = useNavigate();
    const { learningPathId } = useParams();
    const [courses, setCourses] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const [loadingInit, setLoadingInit] = useState<any>(false);
    const [loadingDetailsModal, setLoadingDetailsModal] = useState<any>(false);
    const [basicDetailsModal, setBasicDetailsModal] = useState<any>();
    const [detailsModalData, setDetailsModalData] = useState<any>([]);

    const [lpName, setLPName] = useState<any>("");


    let timer: NodeJS.Timeout;

    const loadsCourses = () => {
        setLoadingInit(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response) {
                setLPName(response.data.nombre);
                setLoadingInit(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoadingInit(false);
            });
    }

    useEffect(() => {
        loadsCourses();
    }, []);

    const handleDetailsModalOpen = (course: any) => {
        setLoadingDetailsModal(true);
        setBasicDetailsModal(course);
        axiosInt.post('capacitaciones/udemy/detail/', {
            udemy_id: course.id,
        })
            .then(function (response) {
                setLoadingDetailsModal(false);
                setDetailsModalData(response.data.detail);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const keyUpEvent = (e: any) => {
        clearTimeout(timer); // reiniciamos el temporizador cada vez que se presiona una tecla
        const query = e.target.value;
        timer = setTimeout(() => {
            search(query);
        }, 700); // esperamos 1 segundo antes de ejecutar la acción
    }

    const search = (query: any) => {
        setLoading(true);
        // Flag 1 oculta cursos que ya están en el LP
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/udemy/${query}/0`)
            .then(function (response) {
                setLoading(false);
                setCourses(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [loadingCompetencies, setLoadingCompetencies] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [competencias, setCompetencias] = useState([]);
    const [checked, setChecked] = useState([]);
    const [habilitiesS, setHabilitiesS] = useState([]);
    const [pageHa, setPageHa] = useState(1);
    var mostrarHa = 10;
    const totalPagesHa = Math.ceil(competencias.length / mostrarHa);
    const [positionHa, setPositionHa] = useState(0);
    const filterCompetenciasShow = competencias.slice(positionHa, positionHa + mostrarHa);
    const [courseId, setCourseId] = useState(0);

    const addCourse = (e: any, course_id: number, index: number) => {
        setLoadingCompetencies(true);
        const data = {
            udemy_id: course_id,
            course_udemy_detail: courses[index],
            duracion: "PT5H30M",
            descripcion: courses[index].headline,
            nombre: courses[index].title,
        }

        e.target.disabled = true;
        e.target.getElementsByTagName("span")[0].classList.remove('hidden');
        setOpenModal(true);
        axiosInt.post(`capacitaciones/learning_path/${learningPathId}/course/`, data)
            .then(function (response) {
                console.log(response.data);
                if (response.data.data.es_nuevo) {
                    setCourseId(response.data.data.id_curso);
                    listarCompetencias();
                } else {
                    setOpenModal(false);
                    setLoadingCompetencies(false);
                }
            })
            .catch(function (error) {
                setLoadingCompetencies(false);
                console.log(error);
                e.target.disabled = false;
                e.target.getElementsByTagName("span")[0].classList.add('hidden');
            });
    }

    const listarCompetencias = () => {
        setLoadingCompetencies(true);
        const data = {
            "idCompetencia": 0,
            "palabraClave": "",
            "idTipoCompetencia": 2,	//0: técnico, 1: blanda, 2: todos
            "activo": 2,			//0: inactivo, 1: activo, 2: todos
            "idEmpleado": 0
        }

        axiosInt.post('v1/gaps/competenceSearch', data)
            .then(function (response) {
                console.log(response.data)
                setCompetencias(response.data)
                setLoadingCompetencies(false);
            })
            .catch(function (error) {
                setLoadingCompetencies(false);
            });
    }

    type typeHabI = {
        id: number,
        name: string
    }

    const handleCheck = (item: typeHabI, event) => {

        async function updateArray() {
            var updatedList = [...checked];
            var updatedList2 = [...habilitiesS];
            if (event.target.checked) {
                updatedList = [...checked, item.id];
                updatedList2 = [...habilitiesS, item.name];
            } else {
                updatedList.splice(checked.indexOf(item.id), 1);
                updatedList2.splice(habilitiesS.indexOf(item.name), 1);
            }
            setChecked(updatedList);
            setHabilitiesS(updatedList2);
        }
        updateArray()
        // console.log(checked)
    };

    const checkedItems = habilitiesS.length
        ? habilitiesS.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";


    const asignarCompetencias = () => {
        const dataComp = {
            competencias: checked
        }

        axiosInt.post(`capacitaciones/curso/${courseId}/competencias/`, dataComp)
            .then(function (response) {
                setOpenModal(false);
            })
            .catch(function (error) {
                console.log(error);
                setOpenModal(false);
            });

        navigate(-1);
    };


    return (
        <>
            {/* <Sidebar items={sidebarItems} active='/modulo1/rutadeaprendizaje'> */}
            {
                loadingInit ?
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
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch pt-0 pb-3 px-0 mx-0 g-3">
                                {
                                    !loading && courses && courses.map((course: any, i: number) => {
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
                                                                        <button style={{ width: '100%' }} className="btn btn-danger">Quitar</button>
                                                                    </> :
                                                                        <>
                                                                            <button style={{ width: '100%' }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assignCapModal" onClick={(e) => addCourse(e, course.id, i)}>
                                                                                <span className="spinner-border spinner-border-sm hidden me-3" role="status" aria-hidden="true"></span>
                                                                                Añadir</button>
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
                                        <div className='vertical-align-parent' style={{ height: 'calc(100vh - 15rem)' }}>
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
                    </>
            }
            {/* </Sidebar> */}

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
                                            basicDetailsModal.visible_instructors.map((instructor: any, i: number) => {
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
                                    <ul className='px-3'>
                                        {
                                            !loadingDetailsModal && detailsModalData.map((chapter: any, i: number) => {
                                                return <Fragment key={`chapter-${i}`}>
                                                    <li>{chapter}</li>
                                                </Fragment>
                                            })
                                        }
                                    </ul>
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

            {/* ASSIGN CAP */}
            <div className="modal fade" id="assignCapModal" aria-hidden="true" aria-labelledby="assignCapModal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createTrainingModal">Asignar competencias</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {openModal ?
                                <>
                                    {
                                        loadingCompetencies ?
                                            (
                                                <div className='vertical-align-parent' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <div className='vertical-align-child'>
                                                        <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (


                                                <div className='row' style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", fontSize: "12px" }}>
                                                        {filterCompetenciasShow.map((item) => {
                                                            return (
                                                                <label key={item.id} style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
                                                                    <input value={item} type="checkbox" onChange={() => handleCheck(item, event)} style={{ marginRight: "0.5rem", fontSize: "12px" }} />
                                                                    <span >{item.name}</span>
                                                                </label>
                                                            )
                                                        })}
                                                    </div>
                                                    {competencias.length > mostrarHa &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={pageHa}
                                                                    totalPages={totalPagesHa}
                                                                    handlePagination={setPageHa}
                                                                    setPosition={setPositionHa}
                                                                    position={positionHa}
                                                                    mostrar={mostrarHa}
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className='mt-3' style={{ fontSize: "10px" }}>
                                                        <strong>Competencias seleccionadas:</strong> {`${checkedItems}`}
                                                    </div>
                                                </div>
                                            )
                                    }
                                </>

                                :

                                <div>
                                    <h3>Las competencias ya fueron asignadas</h3>
                                </div>
                            }

                        </div>

                        {openModal &&
                            <div className="modal-footer">
                                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={asignarCompetencias}>Asignar</button>
                            </div>
                        }

                    </div>
                </div>
            </div>



        </>
    );
}

export default AddCourse;
