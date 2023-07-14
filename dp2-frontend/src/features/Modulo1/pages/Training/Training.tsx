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
    porcentaje_asistencia_aprobacion: number;
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80

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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
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
        "porcentaje_asistencia_aprobacion": 80
    },
]

type typeHabI = {
    id: number,
    name: string
}

const typeHa: typeHabI[] = [
    { id: 1, name: "Programación" },
    { id: 2, name: "Desarrollo de software" },
    { id: 3, name: "Diseño de interfaces de usuario" },
    { id: 4, name: "Gestión de bases de datos" },
    { id: 5, name: "Administración de sistemas" },
    { id: 6, name: "Seguridad informática" },
    { id: 7, name: "Análisis de datos" },
    { id: 8, name: "Arquitectura de software" },
    { id: 9, name: "Networking y administración de redes" },
    { id: 10, name: "Desarrollo web" },
    { id: 11, name: "Virtualización y contenedores" },
    { id: 12, name: "Computación en la nube" },
    { id: 13, name: "Machine Learning" },
    { id: 14, name: "Internet de las cosas" },
    { id: 15, name: "Desarrollo de aplicaciones móviles" },
    { id: 16, name: "Automatización de procesos" },
    { id: 17, name: "Gestión de proyectos de tecnología" },
    { id: 18, name: "Big Data" },
    { id: 19, name: "Ciberseguridad" },
    { id: 20, name: "DevOps" },
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
    var now7 = formatDate(new Date(today.setDate(today.getDate() + 30)));

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
    var mostrarHa = 10;

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

    const [habilities, setHabilities] = useState<any[]>([])
    const [checked, setChecked] = useState([]);
    const [habilitiesS, setHabilitiesS] = useState([]);
    const [pageHa, setPageHa] = useState(1)
    const totalPagesHa = Math.ceil(habilities.length / mostrarHa);
    const [positionHa, setPositionHa] = useState(0);
    const filterHabilitiesShow = habilities.slice(positionHa, positionHa + mostrarHa);

    const navigate = useNavigate();

    /* TRAINING DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrTypes = useRef<HTMLSelectElement>(null);
    const refTrFree = useRef<any>(null);
    const refTrPhoto = useRef(null);
    const refTrAttendance = useRef<HTMLInputElement>(null);
    /* TRAINING DETAIL INPUTS */

    const handleReset = () => {
        setHabilitiesS([])
        setChecked([])
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
        console.log(checked)
    };

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
            porcentaje_asistencia_aprobacion: parseInt(refTrAttendance.current?.value),
        }

        const dataComp = {
            competencias: checked
        }

        axiosInt.post('capacitaciones/course_company_course/', data)
            .then(function (responsePost1) {
                axiosInt.post(`capacitaciones/curso/${responsePost1.data.id}/competencias/`, dataComp)
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                navigate(`/modulo1/cursoempresa/creacion/${responsePost1.data.id}`);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const checkedItems = habilitiesS.length
        ? habilitiesS.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    const loadTrainings = () => {
        setLoading(true);
        axiosInt.get('capacitaciones/course_company_course/')
            .then(function (response) {
                console.log(response.data)
                setTraining(response.data)
                setTrainingFilter(response.data);
                setUpcomingCourse(response.data.filter((item: any) => compararFechas(item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now, now7, 1)))
                setLoading(false);
                setCurrentCourse(response.data.filter((item: any) => compararFechas(item.fecha_primera_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_primera_sesion).format("DD-MM-YYYY")), now, item.fecha_ultima_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_ultima_sesion).format("DD-MM-YYYY")), 2)))
                setFinishedCourse(response.data.filter((item: any) => compararFechas(item.fecha_ultima_sesion === null ? (moment(item.fecha_creacion).format("DD-MM-YYYY")) : (moment(item.fecha_ultima_sesion).format("DD-MM-YYYY")), now, '', 3)))
            })
            .catch(function (error) {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadTrainings();
    }, []);

    const [loadingCompetencies, setLoadingCompetencies] = useState(false);

    const loadCompetencies = () => {
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
                setHabilities(response.data)
                setLoadingCompetencies(false);
            })
            .catch(function (error) {
                setLoadingCompetencies(false);
            });
    }

    return (
        <>
            {/* <Layout title="Grupo 1 App" content="container"> */}
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
                                <p><small className='subtitle'>Lista de cursos empresa creados para que los empleados pueden asistir para adquirir habilidades y competencias específicas.</small></p>
                            </div>
                            <div style={{ flex: '0 0 15rem' }} className='col text-end'>
                                {/* Button trigger modal */}
                                <button type='button' className='btn' style={{ backgroundColor: "rgb(8, 66, 152)", color: "white" }} data-bs-target='#createTrainingModal' data-bs-toggle='modal' onClick={handleReset}>
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
                                                <div>
                                                    <label className="form-label">Descripción</label>
                                                    <textarea ref={refTrDescription} className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
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

                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className='mb-3'>
                                                        <label className="form-label">Porcentaje de asistencia obligatoria</label>
                                                        <input type="number" className="form-control" ref={refTrAttendance} min={0} max={100} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={switchRefTr} ref={refTrFree} />
                                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Libre disponibilidad</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" data-bs-dismiss="modal" data-bs-target='#assignCapModal' data-bs-toggle='modal' onClick={() => loadCompetencies()}>Asignar compentencias</button>
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
                                                        {filterHabilitiesShow.map((item) => {
                                                            return (
                                                                <label key={item.id}  style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
                                                                    <input value={item} type="checkbox" onChange={() => handleCheck(item, event)} style={{ marginRight: "0.5rem", fontSize: "12px" }} />
                                                                    <span >{item.name}</span>
                                                                </label>
                                                            )
                                                        })}  
                                                    </div>
                                                    {habilities.length > mostrarHa &&
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
                                                    <div className='mt-3' style={{fontSize: "10px" }}>
                                                        <strong>Competencias seleccionadas:</strong> {`${checkedItems}`}
                                                    </div>
                                                </div>
                                            )
                                        }
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
            {/* </Layout> */}
        </>
    )
}

export default Training