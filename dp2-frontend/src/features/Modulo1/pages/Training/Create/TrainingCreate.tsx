import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import { useEffect, useRef, useState } from 'react';
import axiosInt from '@config/axios';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeftCircleFill, Check, PlusCircle, Trash, People, PencilFill } from 'react-bootstrap-icons';
import SupplierCard from '@features/Modulo1/components/SupplierCard/SupplierCard';
import '../../../basic.css';
import '../training.css';

const data = {
    id: 1,
    nombre: "Ejemplo de Creación",
    url_foto: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    descripcion: "Esto es un ejemplo de creación de un curso empresa",
    tipo: "A"
}

type Supplier = {
    id: string;
    name: string;
    image: string;
    capacities: any[];
    category: string;
}

type TopicObj = {
    id?: number;
    nombre: string;
}

type SessionObj = {
    curso_empresa_id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_limite?: string;
    ubicacion?: string;
    aforo_maximo?: number;
    url_video?: string;
    temas: TopicObj[];
}

const suppliers: Supplier[] = [
    {
        id: "1",
        name: "John Doe Johnson",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
        capacities: [{ text: "Front" }, { text: "React" }],
        category: "Software"
    },
    {
        id: "2",
        name: "Jane Smith Jackson",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
        capacities: [{ text: "Back" }, { text: "Python" }],
        category: "Salud"
    },
    {
        id: "3",
        name: "Bob Johnson Doe",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
        capacities: [{ text: "ML" }, { text: "Udemy" }],
        category: "Seguridad"
    }
];

const typeTra = [
    { id: 1, type: "Todos" },
    { id: 2, type: "Software" },
    { id: 3, type: "Salud" },
    { id: 4, type: "Seguridad" },
]

let sessionsData: SessionObj[] = []

const TrainingCreate = () => {
    const [loading, setLoading] = useState(false);
    const { trainingID } = useParams();
    /* CAMBIAR CON LA API */ 
    const [training, setTraining] = useState<any>(data);
    const [nombreT, setNombreT] = useState(training.nombre)
    const [descripcionT, setDescripcionT] = useState(training.descripcion)
    /* CAMBIAR CON LA API */ 
    
    const [nombreAuxT, setNombreAuxT] = useState(training.nombre)
    const [descripcionAuxT, setDescripcionAuxT] = useState(training.descripcion)

    const [classSessions, setClassSessions] = useState<SessionObj[]>(sessionsData)
    const [addedTopics, setAddedTopics] = useState<TopicObj[]>([])

    const [supplierFilter, setSupplierFilter] = useState<Supplier[]>(suppliers)
    const [typeArea, setTypeArea] = useState("Todos")
    var filtered;

    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === '') {
            setSupplierFilter(suppliers)
        } else {
            filtered = suppliers.filter((item: any) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSupplierFilter(filtered);
        }
    };

    const handleChangeType = (e: any) => {
        setTypeArea(e.target.value)
    }

    const search = (e: any) => {
        if (typeArea === "Todos")
            setSupplierFilter(suppliers);
        else {
            filtered = suppliers.filter((item: any) =>
                item.category === typeArea
            );
            setSupplierFilter(filtered);
        }
    }

    /* TRAINING SESSION DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrLocation = useRef<HTMLInputElement>(null);
    const refTrTopics = useRef<HTMLInputElement>(null);
    const refTrDateStart = useRef<HTMLInputElement>(null);
    const refTrDateEnd = useRef<HTMLInputElement>(null);
    const refTrCapacity = useRef<HTMLInputElement>(null);
    /* TRAINING SESSION DETAIL INPUTS */

    /* MANAGEMENT TOPICS */
    const addTopic = (e: React.FormEvent) => {
        e.preventDefault();
        let topicSession: TopicObj = {
            nombre: '',
        }

        if (refTrTopics.current?.value !== "") {
            topicSession = {
                nombre: refTrTopics.current?.value
            }
            setAddedTopics([...addedTopics, topicSession])
            console.log(addedTopics)
            refTrTopics.current.value = ""
        }
    }

    const deleteTopic = (index) => {
        console.log(index)

        let newDataTopics = [...addedTopics]

        newDataTopics.splice(index, 1)

        console.log(newDataTopics)
        console.log(newDataTopics.length)

        if (newDataTopics.length === 0) {
            newDataTopics = []
        }

        setAddedTopics(newDataTopics)
    }

    const getTopics = (index, element) => {
        return (
            <div className='row'>
                <div className='col-1'>
                    <h6><b>{index + 1}.</b></h6>
                </div>
                <div className='col-10'>
                    <p>{element.nombre}</p>
                </div>
                <div className='col-1'>
                    <Trash onClick={() => deleteTopic(index)} />
                </div>
            </div>
        )
    }
    /* MANAGEMENT TOPICS */

    /* CREATE NEW SESSION */
    const createSession = () => {
        let dataSession: SessionObj = {
            curso_empresa_id: 0,
            nombre: '',
            descripcion: '',
            fecha_inicio: '',
            temas: []
        }

        let fecha_ini = new Date(refTrDateStart.current?.value).toISOString()
        
        if(training.tipo === "A"){
            let fecha_lim = new Date(refTrDateEnd.current?.value).toISOString()

            dataSession = {
                curso_empresa_id: parseInt(trainingID),
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                fecha_inicio: fecha_ini,
                fecha_limite: fecha_lim,
                temas: addedTopics
            }
        }
        else{
            dataSession = {
                curso_empresa_id: parseInt(trainingID),
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                fecha_inicio: fecha_ini,
                ubicacion: refTrLocation.current?.value,
                aforo_maximo: parseInt(refTrCapacity.current?.value),
                temas: addedTopics
            }
        }
        
        setClassSessions([...classSessions, dataSession])
        
        console.log(dataSession)

        /* Clear inputs */
        
        refTrName.current.value = "";
        refTrDescription.current.value = "";
        refTrDateStart.current.value = "";
        setAddedTopics([]);

        if(training.tipo === "A"){
            refTrDateEnd.current.value = "";
        }
        else{
            refTrLocation.current.value = "";
            refTrCapacity.current.value = "";
        }

        /*
        axiosInt.post('dev-modulo-capacitaciones/api/capacitaciones/sesion_course_company/ ', dataSession)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
        */
    }
    /* CREATE NEW SESSION */

    const verificaciones = () => {
        if (nombreT === "") {
            console.log("Falta ingresar el nombre");
            return false;
        }
        if (nombreT.trim().length == 0) {
            console.log("No se deben llenar los campos con espacios en blanco");
            return false;
        }
        if (descripcionT === "") {
            console.log("Falta ingresar el código");
            return false;
        }
        if (descripcionT.trim().length == 0) {
            console.log("No se deben llenar los campos con espacios en blanco");
            return false;
        }
        return true;
    }

    const editTraining = () => {
        if (verificaciones()) {
            setNombreT(nombreAuxT)
            setDescripcionT(descripcionAuxT)
            console.log("GUARDADO")
        }
    }

    /* LOAD TRAINING DETAILS */
    const loadTrainingDetails = () =>
    {
        setLoading(true);
        axiosInt.get(`dev-modulo-capacitaciones/api/capacitaciones/course_company_course/${trainingID}`)
            .then(function (response)
            {
                console.log(response.data)
/*
                setTraining(response.data);
                setNombreT(response.data.nombre)
                setDescripcionT(response.data.descripcion)
*/
                setLoading(false);
            })
            .catch(function (error)
            {
                console.log(error);
                setLoading(false);
            });
    }
    /* LOAD TRAINING DETAILS */
    
    useEffect(() =>
    {
        loadTrainingDetails();
    }, []);


    return (
        <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>
            {
                loading ?
                (
                    <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)' }}>
                        <div className='vertical-align-child'>
                            <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                )
                :
                (<>
                    <div className='container row mt-3'>
                        {/* TRAINING DATA */}
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                            <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                <Link to={`/modulo1/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                            </div>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ paddingRight: "2rem" }}>
                                    <img src={training.url_foto} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>
                                </div>
                                <div>
                                    <h1 className='screenTitle'>{nombreT}</h1>
                                    <p><small className='subtitle'>{descripcionT}.</small></p>
                                    <p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: {training.tipo}</small><People style={{ opacity: "50%" }} /></p>
                                </div>
                            </div>

                            <div style={{ marginLeft: "20px", position: "relative", top: "-2.2rem" }}>
                                <PencilFill color='cornflowerblue' className='editar' data-bs-target='#editTrainingModal' data-bs-toggle='modal' />
                            </div>
                        </div>

                        {/* SESSION */}
                        <div className='row mt-3' style={{ marginLeft: "54px" }}>
                            <div className='col'>
                                <h4 className='mt-3 subarea'>Sesiones</h4>
                            </div>
                            <div style={{ flex: '0 0 15rem' }} className='col text-end'>
                                {/* Button trigger modal */}
                                <button type='button' className='btn btn-primary' data-bs-target='#createSessionModal' data-bs-toggle='modal'>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span className='me-3'>Nueva sesión</span>
                                        <PlusCircle/>
                                    </div>
                                </button>
                            </div>

                            <div>
                                {classSessions.length > 0 ?
                                    (<SessionAccordion trainingType={training.tipo} sessions={classSessions}/>)
                                    :
                                    (
                                        <div className='row align-items-stretch g-3 py-3'>
                                            <div className='col'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                            <div className='vertical-align-child'>
                                                                <h5 className='opacity-50 text-center'>Crea una sesión para comenzar</h5>
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
                    </div>
                    {/* CREATE SESSION MODAL */}
                    <div className="modal fade" id="createSessionModal" aria-hidden="true" aria-labelledby="createSessionModal" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="createSessionModal">Crear nueva sesión</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input ref={refTrName} type="text" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <textarea ref={refTrDescription} className="form-control" />
                                    </div>

                                    {
                                        training.tipo === "A" ?
                                        (<div className='row mb-3'>
                                            <div className='col'>
                                                <label className="form-label">Fecha de inicio</label>
                                                <input className='form-control' type='date' id='start_date_creation' ref={refTrDateStart} />
                                            </div>
                                            <div className='col'>
                                                <label className="form-label">Fecha limite</label>
                                                <input className='form-control' type='date' id='end_date_creation' ref={refTrDateEnd} />
                                            </div>
                                        </div>)
                                        :
                                        (<>
                                            <div className='row mb-3'>
                                                <div className='col'>
                                                    <label className="form-label">Fecha de la sesión</label>
                                                    <input className='form-control' type='date' id='start_date_creation' ref={refTrDateStart} />
                                                </div>
                                                <div className='col'>
                                                    <label className="form-label">Aforo máximo</label>
                                                    <input type="number" className="form-control" ref={refTrCapacity} min={'0'} />
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <label className="form-label">Ubicación</label>
                                                    <input ref={refTrLocation} type="text" className="form-control" />
                                            </div>
                                        </>)
                                    }
                                
                                    <div className='row mb-3'>
                                        <label className="form-label">Temas de la sesión</label>
                                        <div className='col-10'>
                                            <input ref={refTrTopics} type="text" className="form-control" />
                                        </div>
                                        <div className='col text-end'>
                                            <button type='submit' className='btn btn-primary' onClick={addTopic}><Check /></button>
                                        </div>
                                    </div>

                                    {
                                        addedTopics.length > 0 ?
                                            (addedTopics.map((element, i) => {
                                                return (
                                                    <div key={i}>
                                                        {getTopics(i, element)}
                                                    </div>
                                                )
                                            }))
                                            :
                                            (<></>)
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-bs-target="#assignResponsible" data-bs-toggle="modal">Continuar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MODAL ASSING RESPONSIBLE */}
                    <div className="modal fade" id="assignResponsible" aria-hidden="true" aria-labelledby="assignResponsible" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="assignResponsible">Asignar responsable</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body" style={{ paddingLeft: "4rem" }}>

                                    <div>
                                        <div className='row' style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "32px" }}>
                                            <div className='col-5'>
                                                <input className='form-control' type='text' placeholder='Buscar responsables' onChange={handleFilter} />
                                            </div>
                                            <div className='col-2'>
                                                <select className="form-select" aria-label=".form-select-sm example" onChange={handleChangeType}>
                                                    <option hidden>Categoría</option>
                                                    {typeTra.map((t) => {
                                                        return (
                                                            <option key={t.id} value={t.type}>{t.type}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className='col-1 text-end'>
                                                <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                                            </div>
                                        </div>

                                        <div >
                                            {suppliers.length ?
                                                <>
                                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridGap: "10px" }}>
                                                        {
                                                            supplierFilter.map((tr) => {
                                                                return (
                                                                    <SupplierCard key={tr.id}
                                                                        id={tr.id}
                                                                        name={tr.name}
                                                                        image={tr.image}
                                                                        capacities={tr.capacities}
                                                                        button='Asignar'
                                                                        buttonColor={"rgb(8, 66, 152)"}
                                                                    />

                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    {supplierFilter.length == 0 &&
                                                        <div style={{display: "flex", justifyContent: "center"}}>
                                                            No hay resultados de responsables para la búsqueda
                                                        </div>
                                                    }
                                                </>
                                                :
                                                <div>
                                                    No hay responsables disponibles
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={createSession}>Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EDIT TRAINING MODAL */}
                    <div className="modal fade" id="editTrainingModal" aria-hidden="true" aria-labelledby="editTrainingModal" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="createTrainingModal">Editar curso</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input value={nombreAuxT} type="text" className="form-control" onChange={e => setNombreAuxT(e.target.value)} />
                                    </div>
                                    <div className='row mb-3'>
                                        {/* <div className='col' style={{ flex: '0 0 8rem' }}>
                                                <PictureUpload />
                                            </div> */}
                                        <div className='col'>
                                            <div className="mb-3">
                                                <label className="form-label">Descripción</label>
                                                <textarea value={descripcionAuxT} className="form-control" onChange={e => setDescripcionAuxT(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={editTraining}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }
        </Sidebar >
    )
}

export default TrainingCreate