import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './addCourse.css';
import '../../../basic.css';
import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar';
import sidebarItems from '@features/Modulo1/utils/sidebarItems';
import moment from 'moment';
import TrainingCard from '@features/Modulo1/components/Training/TrainingCard';
import Pagination from '@features/Modulo1/components/Pagination';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';


function AddCourseCE(props: any) {
    const navigate = useNavigate();
    const { learningPathId } = useParams();
    const [courses, setCourses] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const [loadingInit, setLoadingInit] = useState<any>(false);
    const [loadingDetailsModal, setLoadingDetailsModal] = useState<any>(false);
    const [loadingAdd, setLoadingAdd] = useState<any>(false);
    const [basicDetailsModal, setBasicDetailsModal] = useState<any>();
    const [detailsModalData, setDetailsModalData] = useState<any>([]);

    const [lpName, setLPName] = useState<any>("");

    let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'
    var filtered;
    var mostrar = 9;

    const [classSessions, setClassSessions] = useState<SessionObj[]>([])
    const [trainingFilter, setTrainingFilter] = useState<TrainingObj[]>([])
    const [training, setTraining] = useState<TrainingObj[]>([])
    const [trainingD, setTrainingD] = useState<any>([])
    const [startDate, setStarDate] = useState("0001-01-01")
    const [endDate, setEndDate] = useState("9999-12-31")
    const [typeTraining, setTypeTraining] = useState("Todos")
    const [respuesta, setRespuesta] = useState<any>([])

    const [pageFi, setPageFi] = useState(1)
    const totalPagesFi = Math.ceil(trainingFilter.length / mostrar);
    const [positionFi, setPositionFi] = useState(0);
    const filterCourseShow = trainingFilter.slice(positionFi, positionFi + mostrar);



    const now = formatDate(new Date());

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

    const loadTrainings = () => {
        setLoading(true);
        axiosInt.get('capacitaciones/course_company_course/')
            .then(function (response) {
                console.log(response.data)
                setTraining(response.data.filter((item: any) => compararFechas(item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now) || item.tipo == 'A'))
                setTrainingFilter(response.data.filter((item: any) => compararFechas(item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now) || item.tipo == 'A'))
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadsCourses();
        loadTrainings();
    }, []);

    const handleDetailsModalOpen = (course: any) => {
        setLoadingDetailsModal(true);
        setBasicDetailsModal(course);
        axiosInt.get(`capacitaciones/course_company_course/${course}`)
            .then(function (response) {
                console.log(response.data)
                setTrainingD(response.data);
                setClassSessions(response.data.sesiones)
                setLoadingDetailsModal(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }


    const CourseSearch = (e: any, course_id: number, index: number) => {
        setLoadingAdd(true);
        axiosInt.get(`capacitaciones/learning_path/${learningPathId}/course/`)
            .then(function (response) {
                console.log(response.data)
                setRespuesta(response.data)
                setCourses(response.data.curso_x_learning_path);
                setLoadingAdd(false);
            })
            .catch(function (error) {
                console.log(error);
            }); 
            
        addCourse(e, course_id, index)    
    }

    const addCourse = (e: any, course_id: number, index: number) => {
        const data = {
            nro_orden: courses.length + 1,
            cant_intentos_max: respuesta.cant_intentos_cursos_max,
            porcentaje_asistencia_aprobacion: "100",
            curso_id: course_id,
            learning_path_id: learningPathId
        }

        e.target.disabled = true;
        e.target.getElementsByTagName("span")[0].classList.remove('hidden');

        console.log(courses.length + 1)
        console.log(respuesta.cant_intentos_cursos_max)
        console.log(course_id)
        console.log(learningPathId)

        axiosInt.post(`capacitaciones/course_company_assgine_lp/${learningPathId}`, data)
            .then(function (response) {
                console.log(response.data);
                navigate(-1);
            })
            .catch(function (error) {
                console.log(error);
                e.target.disabled = false;
                e.target.getElementsByTagName("span")[0].classList.add('hidden');
            });
    }


    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date: Date) {
        return (
            [
                padTo2Digits(date.getDate()),
                padTo2Digits(date.getMonth() + 1),
                date.getFullYear()
            ].join('-')
        );
    }

    function compararFechas(fecha1: string, fecha2: string): boolean {

        const fecha1Parts = fecha1.split('-');
        const dia1 = parseInt(fecha1Parts[0], 10);
        const mes1 = parseInt(fecha1Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
        const anio1 = parseInt(fecha1Parts[2], 10);

        const fecha2Parts = fecha2.split('-');
        const dia2 = parseInt(fecha2Parts[0], 10);
        const mes2 = parseInt(fecha2Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
        const anio2 = parseInt(fecha2Parts[2], 10);

        const fecha1Comparar = new Date(anio1, mes1, dia1);
        const fecha2Comparar = new Date(anio2, mes2, dia2);

        return fecha1Comparar.getTime() > fecha2Comparar.getTime();
    }

    const typeTra = [
        { id: 1, type: "Todos" },
        { id: 2, type: "Presencial" },
        { id: 3, type: "Virtual Sincrono" },
        { id: 4, type: "Virtual Asincrono" },
    ]

    const typeCreation = [
        { id: 1, type: "Presencial" },
        { id: 2, type: "Virtual Sincrono" },
        { id: 3, type: "Virtual Asincrono" },
    ]

    type TrainingObj = {
        id: number;
        nombre: string;
        url_foto: string,
        descripcion: string;
        fecha_creacion: string;
        fecha_primera_sesion: string;
        cantidad_empleados: number;
        tipo: string;
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



    /* TRAINING FILTERS */
    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === '')
            setTrainingFilter(training);
        else {
            filtered = training.filter((item: any) =>
                item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setTrainingFilter(filtered);
        }
    };

    const handleChangeStartDate = (e: any) => {
        setStarDate(e.target.value)
    }

    const handleChangeEndDate = (e: any) => {
        setEndDate(e.target.value)
    }

    const handleChangeType = (e: any) => {
        switch (e.target.value) {
            case "Todos": setTypeTraining(e.target.value); break;
            case "Presencial": setTypeTraining("P"); break;
            case "Virtual Sincrono": setTypeTraining("S"); break;
            case "Virtual Asincrono": setTypeTraining("A");
        }
    }

    const search = (e: any) => {
        if (typeTraining === "Todos" && (startDate === "0001-01-01" || startDate === "") && (endDate === "9999-12-31" || endDate === ""))
            setTrainingFilter(training);
        else {
            if (typeTraining === "Todos") {
                filtered = training.filter((item: any) =>
                    (item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY"))) >= formatDate(new Date(startDate + ' 00:00:00')) && (item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY"))) <= formatDate(new Date(endDate + ' 00:00:00'))
                );
                setTrainingFilter(filtered);
            } else {
                filtered = training.filter((item: any) =>
                    (item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY"))) >= formatDate(new Date(startDate + ' 00:00:00')) && (item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY"))) <= formatDate(new Date(endDate + ' 00:00:00')) && item.tipo == typeTraining
                );
                setTrainingFilter(filtered);
            }
        }
    }

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
                    </>
                    :
                    <>
                        <div className='row'>
                            <div className='col'>
                                <h1>Agregar cursos a "{lpName}"</h1>
                                <p><small className='subtitle'>Lista de cursos empresa creados para que los empleados pueden asistir para adquirir habilidades y competencias específicas.</small></p>
                            </div>

                            {/* FILTERS AND SEARCH BAR */}
                            <div className='row row-search'>
                                <div className='col-5'>
                                    <input className='form-control' type='text' placeholder='Buscar curso' onChange={handleFilter} />
                                </div>
                                <div className='col'>
                                    <select className="form-select" aria-label=".form-select-sm example" onChange={handleChangeType}>
                                        <option hidden>Tipo</option>
                                        {typeTra.map((t) => {
                                            return (
                                                <option key={t.id} value={t.type}>{t.type}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='col'>
                                    <input className='form-control' type='date' id='start_date' onChange={handleChangeStartDate} />
                                </div>
                                <div className='col'>
                                    <input className='form-control' type='date' id='end_date' onChange={handleChangeEndDate} />
                                </div>
                                <div className='col text-end'>
                                    <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                                </div>
                            </div>

                            {loading ?
                                <>
                                    <div className='vertical-align-parent' style={{ height: 'calc(100vh - 15rem)' }}>
                                        <div className='vertical-align-child'>
                                            <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <div>
                                    <div>
                                        <div className='pt-3 pb-3'>
                                            <h5>
                                                Cursos vigentes
                                            </h5>
                                        </div>

                                        {trainingFilter.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch pt-0 pb-3 px-0 mx-0 g-3">
                                                    {
                                                        filterCourseShow.map((tr, i) => {
                                                            return (
                                                                <Fragment key={tr.id}>
                                                                    <div className="col">
                                                                        <div className="card h-100 px-0">
                                                                            <img src={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)} className="card-img-top" alt="" />
                                                                            <div className="card-body">
                                                                                <h5 className="card-title">{tr.nombre}</h5>
                                                                                <p className="card-text">{tr.descripcion}</p>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div className="row">
                                                                                    <div className="col">
                                                                                        <button style={{ width: '100%' }} className="btn btn-primary" onClick={(e) => CourseSearch(e, tr.id, i)}>
                                                                                            <span className="spinner-border spinner-border-sm hidden me-3" role="status" aria-hidden="true"></span>
                                                                                            Añadir</button>
                                                                                    </div>
                                                                                    <div className="col">
                                                                                        <button style={{ width: '100%' }} type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={() => handleDetailsModalOpen(tr.id)}>Detalle</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>

                                                {trainingFilter.length > mostrar &&
                                                    <div>
                                                        <div>
                                                            <Pagination
                                                                page={pageFi}
                                                                totalPages={totalPagesFi}
                                                                handlePagination={setPageFi}
                                                                setPosition={setPositionFi}
                                                                position={positionFi}
                                                                mostrar={mostrar}
                                                            />
                                                        </div>
                                                    </div>
                                                }


                                            </div>
                                            :
                                            (
                                                <div className='row align-items-stretch g-3 py-3'>
                                                    <div className='col'>
                                                        <div className='card'>
                                                            <div className='card-body'>
                                                                <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                                    <div className='vertical-align-child'>
                                                                        <h5 className='opacity-50 text-center'>No hay cursos creados para la búsqueda realizada</h5>
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

                            }
                        </div>
                    </>
            }
            {/* </Sidebar> */}

            <div className="modal fade" id="detailsModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        {loadingDetailsModal ?
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
                                <div className="modal-header">
                                    <h1 className="modal-title fs-6" id="exampleModalLabel">{trainingD.nombre}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <>
                                        <div className="card mb-3" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                            <img style={{maxWidth: "50%"}} src={trainingD.url_foto === null ? (url_foto_default) : (trainingD.url_foto)} className="card-img-top" alt="..." />
                                            <p style={{marginRight: "1rem"}} className="card-text">{trainingD.descripcion}</p>
                                        </div>
                                    </>
                                    <h5>Contenido del curso</h5>
                                    <div className="card">
                                        <div className="card-body">
                                            <SessionAccordion trainingType={trainingD.tipo} sessions={classSessions} mode={"detailEmp"} />
                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default AddCourseCE;
