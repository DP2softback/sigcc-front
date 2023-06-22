import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Pagination from '@features/Modulo1/components/Pagination';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import './job-offer.css';
import axiosInt from '@config/axios';
import OfferCard from "@features/Modulo4/components/OfferCard/OfferCard";

const typeTra = [
    {id: 1, type: "Todos"},
    {id: 2, type: "Prueba1"},
    {id: 3, type: "Prueba2"},
    {id: 4, type: "Prueba3"},
]

const typeCreation = [
    {id: 1, type: "Presencial"},
    {id: 3, type: "Virtual Sincrono"},
    {id: 4, type: "Virtual Asincrono"},
]

type JobOfferObj = {
    id: number;
    position_name: string;
    photoURL: string,
    offer_introduction: string;
    modified_date: string;
    location: string;
    salary_range: string;
}



const data: JobOfferObj[] = [
    {
                "id": 1,
                "position_name": "Desarrollador de software",
                "photoURL": "https://www.becas-santander.com/content/dam/becasmicrosites/blog/metodolog%C3%ADas-de-desarrollo-de-software.jpg",
                "offer_introduction": "Estamos buscando un desarrollador de software altamente motivado y creativo para unirse a nuestro equipo. Debes tener experiencia en lenguajes de programación como Java y Python, así como conocimientos en bases de data y desarrollo web.",
                "modified_date": "2023-07-01",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salary_range": "$3000 - $4000"
            },
            {
                "id": 2,
                "position_name": "Diseñador gráfico",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "offer_introduction": "Estamos buscando un diseñador gráfico talentoso y apasionado para unirse a nuestro equipo. Debes tener experiencia en el uso de herramientas de diseño como Adobe Photoshop e Illustrator, así como una sólida comprensión de los principios del diseño.",
                "modified_date": "2023-07-15",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salary_range": "$2500 - $3500"
            },
            {
                "id": 3,
                "position_name": "Analista de datos",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "offer_introduction": "Estamos buscando un analista de data con experiencia en el manejo de grandes conjuntos de data. Debes tener habilidades en el uso de herramientas de análisis y visualización de data como SQL, Python y Tableau.",
                "modified_date": "2023-08-01",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salary_range": "$3500 - $4500"
            },
            {
                "id": 4,
                "position_name": "Asistente administrativo",
                "photoURL": "https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
                "offer_introduction": "Estamos buscando un asistente administrativo para brindar apoyo en tareas diarias. Debes tener habilidades organizativas, ser proactivo y tener conocimientos en el uso de herramientas de productividad como Microsoft Office.",
                "modified_date": "2023-07-10",
                "location": "Av. Universitaria 1305 - San Miguel",
                "salary_range": "$2000 - $2500"
            }
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

const JobOffer = () => {
    const [trainingFilter, setTrainingFilter] = useState<JobOfferObj[]>(data)
    const [finishedCourse, setFinishedCourse] = useState<JobOfferObj[]>(data)

    const [startDate, setStarDate] = useState("0001-01-01")
    const [endDate, setEndDate] = useState("9999-12-31")
    const [typeTraining, setTypeTraining] = useState("Todos")
    var filtered;
    var mostrar = 6;

    const [pageF, setPageF] = useState(1)
    const totalPagesF = Math.ceil(finishedCourse.length / mostrar);
    const [positionF, setPositionF] = useState(0);
    const finishedCourseShow = finishedCourse.slice(positionF, positionF + mostrar);

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
            setTrainingFilter(data);
        else {
            filtered = data.filter((item: any) =>
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

    const search = (e: any) => {
        if (typeTraining === "Todos" && (startDate === "0001-01-01" || startDate === "") && (endDate === "9999-12-31" || endDate === ""))
            setTrainingFilter(data);
        else {
            if (typeTraining === "Todos") {
                filtered = data.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00'))
                );
                setTrainingFilter(filtered);
            } else {
                filtered = data.filter((item: any) =>
                    item.endDate >= formatDate(new Date(startDate + ' 00:00:00')) && item.endDate <= formatDate(new Date(endDate + ' 00:00:00')) && item.type === typeTraining
                );
                setTrainingFilter(filtered);
            }
        }
    }

    const loadOffers = () =>
    {
        axiosInt.get(`v1/job-offers`)
            .then(function (response)
            {
                //setData(response.data)
                console.log(response)
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }

    useEffect(() => {
        loadOffers()
    }, []);

    return (
        <>
                <div className='row mt-3'>
                    <div className='col'>
                        <h1 className='screenTitle'>Ofertas laborales</h1>
                        <p><small className='subtitle'>Portal que presenta las ofertas laborales disponibles de la
                            empresa y permite postular a alguna de ellas</small></p>
                    </div>
                </div>
                <div className='row mt-3' style={{paddingBottom: "32px"}}>
                    <div className='col-11'>
                        <input className='form-control' type='text' placeholder='Ingrese palabras clave'
                               onChange={handleFilter}/>
                    </div>
                    <div className='col-1 text-end'>
                        <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                    </div>
                </div>
                <div>


                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div className='row row-cols-1 row-cols-md-4 align-items-stretch g-3 px-0 mx-0 cards'>
                            {
                                data.map((tr) => {
                                    return (
                                        <OfferCard key={tr.id}
                                                      id={tr.id}
                                                      name={tr.position_name}
                                                      photoURL={tr.photoURL}
                                                      description={tr.offer_introduction}
                                                      creationDate={tr.modified_date}
                                                      eventDate={tr.salary_range}
                                        />
                                    )
                                })

                            }

                        </div>

                        
                    </div>
                </div>
        </>
    )
}

export default JobOffer