import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItemsE'
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TrainingCardE from '@features/Modulo1/components/Training/TrainingCardE';
import Pagination from '@features/Modulo1/components/Pagination';
import '../../../basic.css';
import './trainingE.css';
import axiosInt from '@config/axios';
import moment from 'moment';

const typeTra = [
    { id: 1, type: "Todos" },
    { id: 2, type: "Presencial" },
    { id: 3, type: "Sincrono" },
    { id: 4, type: "Asincrono" },
]

const typeCreation = [
    { id: 1, type: "Presencial" },
    { id: 2, type: "Virtual Sincrono" },
    { id: 3, type: "Virtual Asincrono" },
]

type TrainingObj = {
    id: number;
    name: string;
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
        "name": "Seguridad de Información 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Capacitación diseñada para proporcionar a los participantes los conocimientos y las habilidades necesarias para proteger la información confidencial y garantizar la seguridad de los sistemas y datos en un entorno digital.",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",
    },
    {
        "id": 2,
        "name": "ABC S 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 3,
        "name": "ABC A 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 4,
        "name": "ABC P 1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
    {
        "id": 5,
        "name": "Seguridad de Información 1.1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",

    },
    {
        "id": 6,
        "name": "ABC S 1.2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 7,
        "name": "ABC A 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 8,
        "name": "ABC P 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
    {
        "id": 9,
        "name": "Seguridad de Información 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",
    },
    {
        "id": 10,
        "name": "ABC S 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 11,
        "name": "ABC A 2",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 12,
        "name": "ABC P 2.1",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "12/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Presencial",
    },
    {
        "id": 13,
        "name": "Seguridad de Información 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "06/05/2023",
        "cantidad_empleados": 10,
        "tipo": "Presencial",
    },
    {
        "id": 14,
        "name": "ABC S 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "10/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Sincrono",
    },
    {
        "id": 15,
        "name": "ABC A 3",
        "url_foto": 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
        "descripcion": "Lorem ipsum",
        "fecha_creacion": "06/05/2023",
        "fecha_primera_sesion": "11/05/2023",
        "cantidad_empleados": 15,
        "tipo": "Asincrono",
    },
    {
        "id": 16,
        "name": "ABC P 3",
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
        ].join('/')
    );
}

function compararFechas(fecha1: string, fecha2: string, fecha3: string, tipo: number): boolean {
    const fecha1Parts = fecha1.split('/');
    const dia1 = parseInt(fecha1Parts[0], 10);
    const mes1 = parseInt(fecha1Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
    const anio1 = parseInt(fecha1Parts[2], 10);

    const fecha2Parts = fecha2.split('/');
    const dia2 = parseInt(fecha2Parts[0], 10);
    const mes2 = parseInt(fecha2Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
    const anio2 = parseInt(fecha2Parts[2], 10);

    const fecha1Comparar = new Date(anio1, mes1, dia1);
    const fecha2Comparar = new Date(anio2, mes2, dia2);

    if (fecha3 != '') {
        const fecha3Parts = fecha3.split('/');
        const dia3 = parseInt(fecha3Parts[0], 10);
        const mes3 = parseInt(fecha3Parts[1], 10) - 1; // Restamos 1 al mes para que coincida con el rango de 0 a 11 en la clase Date
        const anio3 = parseInt(fecha3Parts[2], 10);
        const fecha3Comparar = new Date(anio3, mes3, dia3);

        return fecha1Comparar.getTime() >= fecha2Comparar.getTime() && fecha1Comparar.getTime() <= fecha3Comparar.getTime();
    }


    switch (tipo) {
        case 2:
            return fecha1Comparar.getTime() > fecha2Comparar.getTime();
        case 3:
            return fecha1Comparar.getTime() < fecha2Comparar.getTime();
    }


}


const TrainingE = () => {

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    // const [training, setTraining] = useState<TrainingObj[]>(datos)
    const today = new Date();
    const now = formatDate(new Date());
    var now7 = formatDate(new Date(today.setDate(today.getDate() + 7)));

    const [trainingFilter, setTrainingFilter] = useState<TrainingObj[]>([])
    const [upcomingCourse, setUpcomingCourse] = useState<TrainingObj[]>(trainingFilter.filter((item: any) => compararFechas(item.fecha_creacion, now, now7, 1)))
    const [currentCourse, setCurrentCourse] = useState<TrainingObj[]>(trainingFilter.filter((item: any) => compararFechas(item.fecha_creacion, now7, '', 2)))
    const [finishedCourse, setFinishedCourse] = useState<TrainingObj[]>(trainingFilter.filter((item: any) => compararFechas(item.fecha_creacion, now, '', 3)))

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

    const [optionCourse, setOptionCourse] = useState('Cursos asignados')
    const navigate = useNavigate();


    /* TRAINING DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrTypes = useRef<HTMLSelectElement>(null);
    /* TRAINING DETAIL INPUTS */

    /* TRAINING FILTERS */
    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === '')
            setTrainingFilter(datos);
        else {
            filtered = datos.filter((item: any) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        setTypeTraining(e.target.value)
    }

    const handleOptionCourse = (e: string) => {
        setOptionCourse(e)
    }

    const search = (e: any) => {
        if (typeTraining === "Todos" && (startDate === "0001-01-01" || startDate === "") && (endDate === "9999-12-31" || endDate === ""))
            setTrainingFilter(datos);
        else {
            if (typeTraining === "Todos") {
                filtered = datos.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00'))
                );
                setTrainingFilter(filtered);
            } else {
                filtered = datos.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00')) && item.type === typeTraining
                );
                setTrainingFilter(filtered);
            }
        }
    }

    /* TRAINING FILTERS */

    const createTraining = () => {
        let tipo: string

        if (refTrTypes.current?.value === "Virtual Asincrono") {
            tipo = "A"
        }
        else if (refTrTypes.current?.value === "Virtual Sincrono") {
            tipo = "S"
        }
        else {
            tipo = "P"
        }

        const data = {
            nombre: refTrName.current?.value,
            descripcion: refTrDescription.current?.value,
            tipo: tipo,
        }

        console.log(data)

        /* RUTA HARDCODEADA*/
        //navigate(`/modulo1/cursoempresa/creacion/1`);

        axiosInt.post('dev-modulo-capacitaciones/api/capacitaciones/course_company_course/', data)
            .then(function (response) {
                navigate(`/modulo1/cursoempresa/creacion/${response.data.id}`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const loadTrainings = () => {
        setLoading(true);
        axiosInt.get('dev-modulo-capacitaciones/api/capacitaciones/course_company_course/')
            .then(function (response) {
                console.log(response)
                console.log(moment(response.data.fecha_creacion).format("DD-MM-YYYY"))
                setTrainingFilter(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                setTrainingFilter(datos);
                console.log(error);
            });
    }

    useEffect(() => {
        loadTrainings();
    }, []);

    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/empleado/cursoempresa'>
                <div className='row mt-3'>
                    <div className='col'>
                        <h1 className='screenTitle'>Curso Empresa</h1>
                        <p><small className='subtitle'>Lista de cursos empresa asignados para adquirir habilidades y competencias específicas.</small></p>
                    </div>
                </div>

                {/* FILTERS AND SEARCH BAR */}
                <div className='row' style={{ paddingBottom: "32px" }}>
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


                <div style={{ paddingBottom: "1.25rem" }}>
                    <button style={{ marginRight: "1rem" }} className={`${optionCourse === 'Cursos asignados' ? 'optionActive' : 'optionNoActive'}`} onClick={() => handleOptionCourse('Cursos asignados')}>Cursos asignados</button>
                    <button className={`${optionCourse === 'Cursos libres' ? 'optionActive' : 'optionNoActive'}`} onClick={() => handleOptionCourse('Cursos libres')}>Cursos libres</button>
                </div>


                {optionCourse == 'Cursos asignados' ?
                    <>
                    {loading ?
                        (
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)', paddingTop: "3rem" }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <>
                            {/* SHOW TRAINING DATA */}
                            {trainingFilter != datos ?
                                <div>
                                    <div>
                                        <div>
                                            <h5>
                                                Próximos a iniciar
                                            </h5>
                                        </div>

                                        {upcomingCourse.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        upcomingCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />

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

                                    <div>
                                        <div className='pt-3'>
                                            <h5>
                                                Curso Empresa vigentes
                                            </h5>
                                        </div>

                                        {currentCourse.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        currentCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />

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

                                    <div>
                                        <div className='pt-3'>
                                            <h5>
                                                Curso Empresa finalizados
                                            </h5>
                                        </div>

                                        {finishedCourse.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        finishedCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />
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
                                        <div>
                                            <h5>
                                                Curso Empresa asignados
                                            </h5>
                                        </div>

                                        {trainingFilter.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        filterCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />

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
                                                                        <h5 className='opacity-50 text-center'>No hay cursos asignados para la búsqueda realizada</h5>
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
                                                            <h5 className='opacity-50 text-center'>No hay cursos asignados</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    }
                    </>
                    :
                    <>
                    {loading1 ?
                        (
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)', paddingTop: "3rem" }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <>
                            {/* SHOW TRAINING DATA */}
                            {trainingFilter == datos ?
                                <div>
                                    <div>
                                        <div>
                                            <h5>
                                                Próximos a iniciar
                                            </h5>
                                        </div>

                                        {upcomingCourse.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        upcomingCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />

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

                                    <div>
                                        <div className='pt-3'>
                                            <h5>
                                                Curso Empresa vigentes
                                            </h5>
                                        </div>

                                        {currentCourse.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        currentCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />

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

                                    <div>
                                        <div className='pt-3'>
                                            <h5>
                                                Curso Empresa finalizados
                                            </h5>
                                        </div>

                                        {finishedCourse.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        finishedCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />
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
                                        <div>
                                            <h5>
                                                Curso Empresa de libre disponibilidad
                                            </h5>
                                        </div>

                                        {trainingFilter.length > 0 ?
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                                                    {
                                                        filterCourseShow.map((tr) => {
                                                            return (
                                                                <TrainingCardE key={tr.id}
                                                                    id={tr.id}
                                                                    name={tr.name}
                                                                    photoURL={tr.url_foto === null ? (url_foto_default) : (tr.url_foto)}
                                                                    description={tr.descripcion}
                                                                    creationDate={moment(tr.fecha_creacion).format("DD-MM-YYYY")}
                                                                    eventDate={tr.fecha_primera_sesion === null ? (moment(tr.fecha_creacion).format("DD-MM-YYYY")) : (moment(tr.fecha_primera_sesion).format("DD-MM-YYYY"))}
                                                                    employees={tr.cantidad_empleados}
                                                                />

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
                                                                        <h5 className='opacity-50 text-center'>No hay cursos libres para la búsqueda realizada</h5>
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
                                                            <h5 className='opacity-50 text-center'>No hay cursos libres</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    }
                    </>
                }


            </Sidebar >
        </>
    )
}

export default TrainingE