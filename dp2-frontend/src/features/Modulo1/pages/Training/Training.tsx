import Sidebar from '@components/Sidebar'
import sidebarItems from '@utils/sidebarItems'
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TrainingCard from '@features/Modulo1/components/Training/TrainingCard';
import Pagination from '@features/Modulo1/components/Pagination';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import '../../basic.css';
import './training.css';
import axiosInt from '@config/axios';
import moment from 'moment';
import Layout from "@layout/default/index";


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

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

const datos: TrainingObj[] = [
    {
        "id": 1,
        "nombre": "Seguridad de Información 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",
    },
    {
        "id": 2,
        "nombre": "ABC S 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 3,
        "nombre": "ABC A 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 4,
        "nombre": "ABC P 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
    {
        "id": 5,
        "nombre": "Seguridad de Información 1.1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",

    },
    {
        "id": 6,
        "nombre": "ABC S 1.2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 7,
        "nombre": "ABC A 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 8,
        "nombre": "ABC P 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
    {
        "id": 9,
        "nombre": "Seguridad de Información 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",
    },
    {
        "id": 10,
        "nombre": "ABC S 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 11,
        "nombre": "ABC A 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 12,
        "nombre": "ABC P 2.1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
    {
        "id": 13,
        "nombre": "Seguridad de Información 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",
    },
    {
        "id": 14,
        "nombre": "ABC S 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 15,
        "nombre": "ABC A 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 16,
        "nombre": "ABC P 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
]

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

function compararFechas(fecha1: string, fecha2: string, fecha3: string, tipo: number): boolean {

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

    if (fecha3 != '' && tipo == 1) {
        const fecha3Parts = fecha3.split('-');
        const dia3 = parseInt(fecha3Parts[0], 10);
        const mes3 = parseInt(fecha3Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
        const anio3 = parseInt(fecha3Parts[2], 10);
        const fecha3Comparar = new Date(anio3, mes3, dia3);

        return fecha1Comparar.getTime() >= fecha2Comparar.getTime() && fecha1Comparar.getTime() <= fecha3Comparar.getTime();
    }

    if (fecha3 != '' && tipo == 2) {
        const fecha3Parts = fecha3.split('-');
        const dia3 = parseInt(fecha3Parts[0], 10);
        const mes3 = parseInt(fecha3Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
        const anio3 = parseInt(fecha3Parts[2], 10);
        const fecha3Comparar = new Date(anio3, mes3, dia3);

        return (fecha1Comparar.getTime() <= fecha2Comparar.getTime() && fecha2Comparar.getTime() <= fecha3Comparar.getTime());
    }

    return fecha1Comparar.getTime() < fecha2Comparar.getTime();
}


const Training = () => {

    const [loading, setLoading] = useState(false);

    const today = new Date();
    const now = formatDate(new Date());
    var now7 = formatDate(new Date(today.setDate(today.getDate() + 7)));

    const [trainingFilter, setTrainingFilter] = useState<TrainingObj[]>([])
    const [training, setTraining] = useState<TrainingObj[]>([])
    const [upcomingCourse, setUpcomingCourse] = useState<TrainingObj[]>([])
    const [currentCourse, setCurrentCourse] = useState<TrainingObj[]>([])
    const [finishedCourse, setFinishedCourse] = useState<TrainingObj[]>([])

    const [startDate, setStarDate] = useState("0001-01-01")
    const [endDate, setEndDate] = useState("9999-12-31")
    const [typeTraining, setTypeTraining] = useState("Todos")
    var filtered;
    var mostrar = 6;
    var mostrarF = 6;

    const [pageF, setPageF] = useState(1)
    const totalPagesF = Math.ceil(finishedCourse.length / mostrar);
    const [positionF, setPositionF] = useState(0);
    const finishedCourseShow = finishedCourse.slice(positionF, positionF + mostrar);

    const [pageC, setPageC] = useState(1)
    const totalPagesC = Math.ceil(currentCourse.length / mostrar);
    const [positionC, setPositionC] = useState(0);
    const currentCourseShow = currentCourse.slice(positionC, positionC + mostrar);

    const [pageU, setPageU] = useState(1)
    const totalPagesU = Math.ceil(upcomingCourse.length / mostrar);
    const [positionU, setPositionU] = useState(0);
    const upcomingCourseShow = upcomingCourse.slice(positionU, positionU + mostrar);

    const [pageFi, setPageFi] = useState(1)
    const totalPagesFi = Math.ceil(trainingFilter.length / mostrarF);
    const [positionFi, setPositionFi] = useState(0);
    const filterCourseShow = trainingFilter.slice(positionFi, positionFi + mostrarF);

    const navigate = useNavigate();

    /* TRAINING DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrTypes = useRef<HTMLSelectElement>(null);
    const refTrFree = useRef<any>(null);
    const refTrPhoto = useRef(null);
    /* TRAINING DETAIL INPUTS */

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

    /* TRAINING FILTERS */

    const switchRefTr = () => {
        refTrFree.current = !refTrFree.current
    }

    const createTraining = () => {
        let tipo: string

        refTrTypes.current?.value === "Virtual Asincrono" ?
            (tipo = "A") : refTrTypes.current?.value === "Virtual Sincrono" ?
                (tipo = "S") : (tipo = "P")

        const data = {
            nombre: refTrName.current?.value,
            descripcion: refTrDescription.current?.value,
            tipo: tipo,
            es_libre: !refTrFree.current,
            url_foto: refTrPhoto.current.getUrl(),
        }

        console.log(data)

        /* RUTA HARDCODEADA*/
        //navigate(`/modulo1/cursoempresa/creacion/1`);

        axiosInt.post('capacitaciones/course_company_course/', data)
            .then(function (response) {
                navigate(`/modulo1/cursoempresa/creacion/${response.data.id}`);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const loadTrainings = () => {
        setLoading(true);
        axiosInt.get('capacitaciones/course_company_course/')
            .then(function (response) {
                console.log(response.data)
                setTraining(response.data)
                setTrainingFilter(response.data);
                setUpcomingCourse(response.data.filter((item: any) => compararFechas(item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now, now7, 1)))
                setCurrentCourse(response.data.filter((item: any) => compararFechas(item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now, item.fecha_ultima_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_ultima_sesion).format("DD-MM-YYYY")), 2)))
                setLoading(false);
                setFinishedCourse(response.data.filter((item: any) => compararFechas(item.fecha_ultima_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now, '', 3)))
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadTrainings();
    }, []);

    return (
        <>
            <Layout title="Grupo 1 App" content="container">
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
                                <div className='col'>
                                    <h1 className='screenTitle'>Curso Empresa</h1>
                                    <p><small className='subtitle'>Lista de cursos empresa creados que los empleados pueden asistir para adquirir habilidades y competencias específicas.</small></p>
                                </div>
                                <div style={{ flex: '0 0 15rem' }} className='col text-end'>
                                    {/* Button trigger modal */}
                                    <button type='button' className='btn' style={{ backgroundColor: "rgb(8, 66, 152)", color: "white" }} data-bs-target='#createTrainingModal' data-bs-toggle='modal'>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span className='me-3'>Crear curso</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* FILTERS AND SEARCH BAR */}
                            <div className='row row-search'>
                                <div className='col-5'>
                                    <input className='form-control' type='text' placeholder='Buscar curso' onChange={handleFilter} />
                                </div>
                                <div className='col-2'>
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
                                <div className='col-1 text-end'>
                                    <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                                </div>
                            </div>


                            {/* SHOW TRAINING DATA */}
                            <div className='row'>
                                {trainingFilter == training ?
                                    <div>
                                        <div>
                                            <div className='pb-3'>
                                                <h5>
                                                    Cursos vigentes
                                                </h5>
                                            </div>

                                            {currentCourse.length > 0 ?
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0'>
                                                        {
                                                            currentCourseShow.map((tr) => {
                                                                return (
                                                                    <div className='col-md-4'>
                                                                        <TrainingCard key={tr.id}
                                                                            id={tr.id}
                                                                            name={tr.nombre}
                                                                            photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                            description={tr.descripcion}
                                                                            creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                            eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                            employees={tr.cantidad_empleados}
                                                                        />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    {currentCourse.length > mostrar &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={pageC}
                                                                    totalPages={totalPagesC}
                                                                    handlePagination={setPageC}
                                                                    setPosition={setPositionC}
                                                                    position={positionC}
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
                                                                            <h5 className='opacity-50 text-center'>No hay cursos vigentes</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>


                                        <div className='pt-4'>
                                            <div className='pt-3 pb-3'>
                                                <h5>
                                                    Próximos a iniciar
                                                </h5>
                                            </div>

                                            {upcomingCourse.length > 0 ?
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0'>
                                                        {
                                                            upcomingCourseShow.map((tr) => {
                                                                return (
                                                                    <div className='col-md-4'>
                                                                        <TrainingCard key={tr.id}
                                                                            id={tr.id}
                                                                            name={tr.nombre}
                                                                            photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                            description={tr.descripcion}
                                                                            creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                            eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                            employees={tr.cantidad_empleados}
                                                                        />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    {upcomingCourse.length > mostrar &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={pageU}
                                                                    totalPages={totalPagesU}
                                                                    handlePagination={setPageU}
                                                                    setPosition={setPositionU}
                                                                    position={positionU}
                                                                    mostrar={mostrar}
                                                                />
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                                :
                                                <div className='row align-items-stretch g-3 py-3'>
                                                    <div className='col'>
                                                        <div className='card'>
                                                            <div className='card-body'>
                                                                <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                                    <div className='vertical-align-child'>
                                                                        <h5 className='opacity-50 text-center'>No hay proximos cursos</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>



                                        <div className='pt-4'>
                                            <div className='pt-3 pb-3'>
                                                <h5>
                                                    Cursos finalizados
                                                </h5>
                                            </div>

                                            {finishedCourse.length > 0 ?
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0'>
                                                        {
                                                            finishedCourseShow.map((tr) => {
                                                                return (
                                                                    <div className='col-md-4'>
                                                                        <TrainingCard key={tr.id}
                                                                            id={tr.id}
                                                                            name={tr.nombre}
                                                                            photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                            description={tr.descripcion}
                                                                            creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                            eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                            employees={tr.cantidad_empleados}
                                                                        />
                                                                    </div>
                                                                )
                                                            })

                                                        }

                                                    </div>

                                                    {finishedCourse.length > mostrar &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={pageF}
                                                                    totalPages={totalPagesF}
                                                                    handlePagination={setPageF}
                                                                    setPosition={setPositionF}
                                                                    position={positionF}
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
                                                                            <h5 className='opacity-50 text-center'>No hay cursos finalizados</h5>
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
                                    :
                                    <div>
                                        <div>
                                            <div className='pt-3 pb-3'>
                                                <h5>
                                                    Cursos creados
                                                </h5>
                                            </div>

                                            {trainingFilter.length > 0 ?
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0'>
                                                        {
                                                            filterCourseShow.map((tr) => {
                                                                return (
                                                                    <div className='col-md-4'>
                                                                        <TrainingCard key={tr.id}
                                                                            id={tr.id}
                                                                            name={tr.nombre}
                                                                            photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                            description={tr.descripcion}
                                                                            creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                            eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                            employees={tr.cantidad_empleados}
                                                                        />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    {trainingFilter.length > mostrarF &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={pageFi}
                                                                    totalPages={totalPagesFi}
                                                                    handlePagination={setPageFi}
                                                                    setPosition={setPositionFi}
                                                                    position={positionFi}
                                                                    mostrar={mostrarF}
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

                                {
                                    datos.length === 0 && <>
                                        <div className='row align-items-stretch g-3 py-3'>
                                            <div className='col'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                            <div className='vertical-align-child'>
                                                                <h5 className='opacity-50 text-center'>Crea un curso para empezar</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                            {/* CREATE TRAINING MODAL */}
                            <div className="modal fade" id="createTrainingModal" aria-hidden="true" aria-labelledby="createTrainingModal" tabIndex={-1}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="createTrainingModal">Crear nuevo curso</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className='row mb-3'>
                                                <div className='col' style={{ flex: '0 0 8rem' }}>
                                                    <PictureUpload ref={refTrPhoto} />
                                                </div>
                                                <div className='col'>
                                                    <div className="mb-3">
                                                        <label className="form-label">Nombre</label>
                                                        <input ref={refTrName} type="text" className="form-control" />
                                                    </div>
                                                    <div >
                                                        <label className="form-label">Descripción</label>
                                                        <textarea ref={refTrDescription} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="mb-3">
                                                        <label className="form-label">Modalidad</label>
                                                        <select className="form-select" ref={refTrTypes}>
                                                            <option hidden>Seleccionar</option>
                                                            {typeCreation.map((t) => {
                                                                return (
                                                                    <option key={t.id} value={t.type}>{t.type}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={switchRefTr} ref={refTrFree} />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Libre disponibilidad</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={createTraining}>Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>)
                }

                {/* </Sidebar > */}
            </Layout>
        </>
    )
}

export default Training