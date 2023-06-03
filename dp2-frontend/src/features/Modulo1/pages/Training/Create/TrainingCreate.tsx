import Sidebar from '@components/Sidebar'
import sidebarItems from '@utils/sidebarItems'
import { useEffect, useRef, useState } from 'react';
import axiosInt from '@config/axios';
import SessionAccordion from '@features/Modulo1/components/SessionAccordion';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeftCircleFill, Check, PlusCircle, Trash, People, PencilFill } from 'react-bootstrap-icons';
import SupplierCard from '@features/Modulo1/components/SupplierCard/SupplierCard';
import Pagination from '@features/Modulo1/components/Pagination';
import '../../../basic.css';
import '../training.css';
import VideoUpload from '@features/Modulo1/components/VideoUpload';

const data = {
    id: 1,
    nombre: "Ejemplo de Creación",
    url_foto: null,
    descripcion: "Esto es un ejemplo de creación de un curso empresa",
    tipo: "A"
}

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'

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
    curso_empresa_id?: number;
    nombre: string;
    descripcion: string;
    fecha_inicio?: string;
    //fecha_limite?: string;
    ubicacion?: string;
    aforo_maximo?: number;
    url_video?: string;
    temas: TopicObj[];
}

const locationOptions = [
    { id: 1, type: "Auditorio primer piso" },
    { id: 2, type: "Auditorio segundo piso" },
    { id: 3, type: "Auditorio tecer piso" },
    { id: 4, type: "Auditorio cuarto piso" },
    { id: 5, type: "Auditorio quinto piso" },
]

const suppliers2: Supplier[] = [
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

type typeTraI = {
    id: number,
    categoria: string
}

type typeComI = {
    id: number,
    razon_social: string,
    email?: string
}

type typeHabI = {
    id: number,
    habilidad: string
}

type typeSupp = {
    id: string,
    nombres: string,
    apellidos: string,
    email?: string,
    habilidad_x_proveedor_usuario: []
}


const typeTra: typeTraI[] = [
    { id: 1, categoria: "Software" },
    { id: 2, categoria: "Salud" },
    { id: 3, categoria: "Seguridad" },
    { id: 4, categoria: "Software2" },
    { id: 5, categoria: "Salud2" },
    { id: 6, categoria: "Seguridad2" },
    { id: 7, categoria: "Software3" },
    { id: 8, categoria: "Salud3" },
    { id: 9, categoria: "Seguridad3" },
]

const typeCom: typeComI[] = [
    { id: 1, razon_social: "Empresa 1" },
    { id: 2, razon_social: "Empresa 2" },
    { id: 3, razon_social: "Empresa 3" },
    { id: 4, razon_social: "Empresa 4" },
    { id: 5, razon_social: "Empresa 5" },
    { id: 6, razon_social: "Empresa 6" },
]

const typeHa: typeHabI[] = [
    { id: 1, habilidad: "Habilidad 1 asdsadsa" },
    { id: 2, habilidad: "Habilidad 2" },
    { id: 3, habilidad: "Habilidad 3" },
    { id: 4, habilidad: "Habilidad 4" },
    { id: 5, habilidad: "Habilidad 5" },
    { id: 6, habilidad: "Habilidad 6" },
]

let sessionsData: SessionObj[] = []

const TrainingCreate = () => {
    const { trainingID } = useParams();
    /* CAMBIAR CON LA API */
    const [training, setTraining] = useState<any>([]);
    const [nombreT, setNombreT] = useState(training.nombre)
    const [descripcionT, setDescripcionT] = useState(training.descripcion)
    /* CAMBIAR CON LA API */

    const [sessionCreated, setSessionCreated] = useState<any>(false);

    const [nombreAuxT, setNombreAuxT] = useState(training.nombre)
    const [descripcionAuxT, setDescripcionAuxT] = useState(training.descripcion)

    const [classSessions, setClassSessions] = useState<SessionObj[]>([])
    const [addedTopics, setAddedTopics] = useState<TopicObj[]>([])



    const [typeArea, setTypeArea] = useState<typeTraI>({ id: 0, categoria: "" })
    const [typeCompany, setTypeCompany] = useState<typeComI>({ id: 0, razon_social: "" })
    const [typeHability, setTypeHability] = useState<typeHabI>({ id: 0, habilidad: "" })
    const [typeSupplier, setTypeSupplier] = useState<typeSupp>({ id: "0", nombres: "", apellidos: "", habilidad_x_proveedor_usuario: [] })


    var filtered;
    var mostrar = 6;
    var mostrarC = 6;
    const [categories, setCategories] = useState([]);
    const [pageC, setPageC] = useState(1)
    const totalPagesC = Math.ceil(categories.length / mostrarC);
    const [positionC, setPositionC] = useState(0);
    const categoriesShow = categories.slice(positionC, positionC + mostrarC);

    const [companies, setCompanies] = useState([]);
    const [pageCo, setPageCo] = useState(1)
    const totalPagesCo = Math.ceil(companies.length / mostrarC);
    const [positionCo, setPositionCo] = useState(0);
    const companiesShow = companies.slice(positionCo, positionCo + mostrarC);

    const [habilities, setHabilities] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierFilter, setSupplierFilter] = useState<typeSupp[]>(suppliers)

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    // const checkList = ["Desarrollo de Software", "Redes y seguridad", "Prueba 1", "Prueba 2"]
    const [checked, setChecked] = useState([]);
    const [habilitiesS, setHabilitiesS] = useState([]);

    const handleCheck = (item: typeHabI, event) => {

        async function updateArray() {
            var updatedList = [...checked];
            var updatedList2 = [...habilitiesS];
            if (event.target.checked) {
                updatedList = [...checked, item.id];
                updatedList2 = [...habilitiesS, item.habilidad];
            } else {
                updatedList.splice(checked.indexOf(item.id), 1);
                updatedList2.splice(habilitiesS.indexOf(item.habilidad), 1);
            }
            setChecked(updatedList);
            setHabilitiesS(updatedList2);
        }
        updateArray()
    };


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
        if (typeArea == null)
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
    const refTrLocation = useRef<HTMLSelectElement>(null);
    const refTrLocationLink = useRef<HTMLInputElement>(null);
    const refTrTopics = useRef<HTMLInputElement>(null);
    const refTrDateStart = useRef<HTMLInputElement>(null);
    //const refTrDateEnd = useRef<HTMLInputElement>(null);
    const refTrCapacity = useRef<HTMLInputElement>(null);
    const refTrVideo = useRef(null);
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

    const deleteTopic = (index: number) => {
        let newDataTopics = [...addedTopics]

        newDataTopics.splice(index, 1)

        if (newDataTopics.length === 0) {
            newDataTopics = []
        }

        setAddedTopics(newDataTopics)
    }

    const getTopics = (index: number, element: TopicObj) => {
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
            nombre: '',
            descripcion: '',
            temas: []
        }

        let fecha_ini = new Date(refTrDateStart.current?.value).toISOString()
        
        if(training.tipo === "A"){
            //let fecha_lim = new Date(refTrDateEnd.current?.value).toISOString()

            dataSession = {
                curso_empresa_id: parseInt(trainingID),
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                //fecha_inicio: fecha_ini,
                //url_video: refTrVideo.current.getUrl(),
                //fecha_limite: fecha_lim,
                temas: addedTopics
            }
        }
        else {
            if (training.tipo === "P") {
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
            else {
                dataSession = {
                    curso_empresa_id: parseInt(trainingID),
                    nombre: refTrName.current?.value,
                    descripcion: refTrDescription.current?.value,
                    fecha_inicio: fecha_ini,
                    ubicacion: refTrLocationLink.current?.value,
                    aforo_maximo: parseInt(refTrCapacity.current?.value),
                    temas: addedTopics
                }
            }
        }
        
        //setClassSessions([...classSessions, dataSession])
        
        console.log(dataSession)

        /* Clear inputs */

        refTrName.current.value = "";
        refTrDescription.current.value = "";
        setAddedTopics([]);

        if(training.tipo === "A"){
            //refTrDateEnd.current.value = "";
            refTrVideo.current = null;
        }
        else {
            refTrDateStart.current.value = "";
            refTrCapacity.current.value = "";

            if(training.tipo === "P"){
                refTrLocation.current.value = "";
            }
            else {
                refTrLocationLink.current.value = "";
            }            
        }

        axiosInt.post('capacitaciones/sesion_course_company/', dataSession)
            .then(function (response) {
                console.log(response.data)
                setSessionCreated(true)
            })
            .catch(function (error) {
                //console.log(error);
            });
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
    const loadTrainingDetails = () => {
        setLoading(true);
        axiosInt.get(`capacitaciones/course_company_course/${trainingID}`)
            .then(function (response) {
                setTraining(response.data);
                setNombreT(response.data.nombre)
                setDescripcionT(response.data.descripcion)
                setClassSessions(response.data.sesiones)

                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);

                /* BORRAR LUEGO */
                //setTraining(data)
                //setNombreT(data.nombre)
                //setDescripcionT(data.descripcion)
            });
    }
    /* LOAD TRAINING DETAILS */

    useEffect(() => {
        loadTrainingDetails();
    }, []);

    const loadCompanies = (id: number) => {
        setLoading2(true);
        axiosInt.get(`capacitaciones/get_proveedores_empresa/${id}/`)
            .then(function (response) {
                setCompanies(response.data);
                setLoading2(false);
            })
            .catch(function (error) {
                setCompanies(typeCom)
                setLoading2(false);
            });
    }

    const handleCategory = (category: typeTraI) => {
        setTypeArea(category)
        setTypeCompany({ id: 0, razon_social: "" })
        loadCompanies(category.id);
    }

    const loadHabilities = (id: number) => {
        setLoading3(true);
        axiosInt.get(`capacitaciones/get_habilidades_empresa/${id}/`)
            .then(function (response) {
                setHabilities(response.data);
                setLoading3(false);
            })
            .catch(function (error) {
                setHabilities(typeHa)
                setLoading3(false);
            });
    }

    const handleCompany = (company: typeComI) => {
        setTypeCompany(company)
        loadHabilities(company.id);
    }


    const loadCategories = () => {
        setLoading1(true);
        axiosInt.get('capacitaciones/get_categoria/')
            .then(function (response) {
                setCategories(response.data);
                setLoading1(false);
            })
            .catch(function (error) {
                setCategories(typeTra)
                setLoading1(false);
            });
    }

    const handleData = () => {
        setTypeArea({ id: 0, categoria: "" })
        setTypeCompany({ id: 0, razon_social: "" })
        setChecked([])
        setHabilitiesS([])
        setPositionC(0)
        setPositionCo(0)

        loadCategories();
    }

    const handleSuppliers = () => {
        setLoading4(true);
        axiosInt.post('capacitaciones/get_personas_empresa_habilidades/', {
            id_proveedor: typeCompany.id,
            habilidades: checked
        })
            .then(function (response) {
                setSuppliers(response.data);
                setSupplierFilter(response.data)
                setLoading4(false);
            })
            .catch(function (error) {
                setLoading4(false);
            });
    }

    const checkedItems = habilitiesS.length
        ? habilitiesS.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";




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
                                        {
                                            training.url_foto === null ?
                                                (<img src={url_foto_default} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>)
                                                :
                                                (<img src={training.url_foto} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>)
                                        }
                                    </div>
                                    <div>
                                        <h1 className='screenTitle'>{nombreT}</h1>
                                        <p><small className='subtitle'>{descripcionT}.</small></p>
                                        {
                                            training.tipo === "A" ?
                                                (<p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: Virtual Asincrono</small><People style={{ opacity: "50%" }} /></p>)
                                                :
                                                (training.tipo === "P" ?
                                                    (<p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: Presencial</small><People style={{ opacity: "50%" }} /></p>)
                                                    :
                                                    (<p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: Virtual Sincrono</small><People style={{ opacity: "50%" }} /></p>)
                                                )
                                        }
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
                                            <PlusCircle />
                                        </div>
                                    </button>
                                </div>

                                <div>
                                    {classSessions.length > 0 ?
                                        (<SessionAccordion trainingType={training.tipo} sessions={classSessions} />)
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
                                            (<>
                                                {/*
                                                <div className='mb-3'>
                                                    <label className="form-label">Fecha de la sesión</label>
                                                    <input className='form-control' type='date' id='start_date_creation' ref={refTrDateStart} />
                                                </div>
                                                <div className='col'>
                                                    <label className="form-label">Fecha limite</label>
                                                    <input className='form-control' type='date' id='end_date_creation' ref={refTrDateEnd} />
                                                </div>
                                                */}
                                                <div className='mb-3'>
                                                    <label className="form-label">Video de la sesión</label>
                                                    <VideoUpload ref={refTrVideo}/>
                                                </div>
                                            </>)
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
                                                    {
                                                        training.tipo === 'P' ?
                                                        (<>
                                                            <select className="form-select" ref={refTrLocation}>
                                                                <option hidden>Seleccionar</option>
                                                                {locationOptions.map((lo) => {
                                                                    return (
                                                                        <option key={lo.id} value={lo.type}>{lo.type}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </>)
                                                        :
                                                        (<input ref={refTrLocationLink} type="text" className="form-control" />)
                                                    } 
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
                                        <button className="btn btn-primary" data-bs-target="#searchResponsible" data-bs-toggle="modal" onClick={handleData}>Continuar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MODAL SEARCH RESPONSIBLE */}
                        <div className="modal fade" id="searchResponsible" aria-hidden="true" aria-labelledby="searchResponsible" tabIndex={-1}>
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="searchResponsible">Buscar responsables</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                        {loading1 ?
                                            <>
                                                <div className='vertical-align-parent'>
                                                    <div className='vertical-align-child'>
                                                        <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div>
                                                <div className='row' style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "32px" }}>
                                                    <div>
                                                        <h4 style={{ fontSize: "14px", fontWeight: "400" }}>Buscar por categoría</h4>
                                                    </div>
                                                    <div>
                                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridGap: "1rem" }}>
                                                            {categoriesShow.map((t) => {
                                                                return (
                                                                    <button type='button' key={t.id} className='btn' style={{ backgroundColor: t.categoria == typeArea.categoria ? '#3f4b58' : '', color: t.categoria == typeArea.categoria ? '#FFF' : '#000', border: t.categoria == typeArea.categoria ? '' : '0.1rem solid #0d6efd', fontSize: "12px" }} onClick={() => handleCategory(t)}>{t.categoria}</button>
                                                                )
                                                            })}
                                                        </div>

                                                        {categories.length > mostrarC &&
                                                            <div>
                                                                <div>
                                                                    <Pagination
                                                                        page={pageC}
                                                                        totalPages={totalPagesC}
                                                                        handlePagination={setPageC}
                                                                        setPosition={setPositionC}
                                                                        position={positionC}
                                                                        mostrar={mostrarC}
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        }


                                        {typeArea.categoria != "" &&
                                            <>
                                                {loading2 ?
                                                    <>
                                                        <div className='vertical-align-parent'>
                                                            <div className='vertical-align-child'>
                                                                <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <div>
                                                        <div className='row' style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "32px" }}>
                                                            <div>
                                                                <h4 style={{ fontSize: "14px", fontWeight: "400" }}>Buscar por empresa</h4>
                                                            </div>

                                                            <div>
                                                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridGap: "1rem" }}>
                                                                    {companiesShow.map((t) => {
                                                                        return (
                                                                            <button type='button' key={t.id} className='btn' style={{ backgroundColor: t.razon_social == typeCompany.razon_social ? '#3f4b58' : '', color: t.razon_social == typeCompany.razon_social ? '#FFF' : '#000', border: t.razon_social == typeCompany.razon_social ? '' : '0.1rem solid #0d6efd', fontSize: "12px" }} onClick={() => handleCompany(t)}>{t.razon_social}</button>
                                                                        )
                                                                    })}
                                                                </div>

                                                                {companies.length > mostrarC &&
                                                                    <div>
                                                                        <div>
                                                                            <Pagination
                                                                                page={pageCo}
                                                                                totalPages={totalPagesCo}
                                                                                handlePagination={setPageCo}
                                                                                setPosition={setPositionCo}
                                                                                position={positionCo}
                                                                                mostrar={mostrarC}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                    {(typeArea.categoria != "" && typeCompany.razon_social != "") &&
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-bs-target="#searchSkillResponsible" data-bs-toggle="modal">Ver Habilidades</button>
                                        </div>
                                    }


                                </div>
                            </div>
                        </div>

                        {/* MODAL SEARCH SKILLS RESPONSIBLE */}
                        <div className="modal fade" id="searchSkillResponsible" aria-hidden="true" aria-labelledby="searchSkillResponsible" tabIndex={-1}>
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="searchResponsible">Buscar responsables</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                        {loading3 ?
                                            <>
                                                <div className='vertical-align-parent'>
                                                    <div className='vertical-align-child'>
                                                        <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div>
                                                <div className='row' style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "32px" }}>
                                                    <div>
                                                        <h4 style={{ fontSize: "14px", fontWeight: "400" }}>Buscar por habilidades</h4>
                                                    </div>
                                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
                                                        {habilities.map((item) => {
                                                            return (
                                                                <label key={item.id}>
                                                                    <input value={item} type="checkbox" onChange={() => handleCheck(item, event)} style={{ marginRight: "0.5rem", fontSize: "12px" }} />
                                                                    <span >{item.habilidad}</span>
                                                                </label>
                                                            )
                                                        })}
                                                    </div>
                                                    <div style={{ paddingTop: "1rem", fontSize: "10px" }}>
                                                        {`Habilidades seleccionadas: ${checkedItems}`}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                    {(typeArea.categoria != "" && typeCompany.razon_social != "") &&
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" data-bs-target="#assignResponsible" data-bs-toggle="modal" onClick={handleSuppliers}>Buscar</button>
                                        </div>
                                    }


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
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <input className='form-control' type='text' placeholder='Buscar responsables' onChange={handleFilter} style={{ maxWidth: "60%", marginRight: "1rem" }} />
                                                    <h5 style={{ display: "flex", fontSize: "14px", marginBottom: "0rem" }}>Categoría: {typeArea.categoria}</h5>
                                                    <h5 style={{ display: "flex", fontSize: "14px", marginBottom: "0rem" }}>Empresa: {typeCompany.razon_social}</h5>
                                                </div>
                                            </div>

                                            {loading4 ?
                                                <>
                                                    <div className='vertical-align-parent'>
                                                        <div className='vertical-align-child'>
                                                            <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <div >
                                                    {suppliers.length ?
                                                        <>
                                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridGap: "10px" }}>
                                                                {
                                                                    supplierFilter.map((tr) => {
                                                                        var filtered2 = habilities.filter((item: any) => {
                                                                            return tr.habilidad_x_proveedor_usuario.every((ha) => {
                                                                                return ha == item.id
                                                                            })
                                                                        })
                                                                        return (

                                                                            <SupplierCard key={tr.id}
                                                                                id={tr.id}
                                                                                name={tr.nombres + ' ' + tr.apellidos}
                                                                                image='https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'
                                                                                capacities={filtered2}
                                                                                button='Asignar'
                                                                                buttonColor={"rgb(8, 66, 152)"}
                                                                            />

                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                            {supplierFilter.length == 0 &&
                                                                <div style={{ display: "flex", justifyContent: "center" }}>
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
                                            }
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