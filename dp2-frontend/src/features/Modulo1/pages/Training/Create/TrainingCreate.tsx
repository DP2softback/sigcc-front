import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import { useRef, useState } from 'react';
import axiosInt from '@config/axios';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftCircleFill, Check, PlusCircle, Trash, People, PencilFill } from 'react-bootstrap-icons';
import PictureUpload from '@features/Modulo1/components/PictureUpload';
import SupplierCard from '@features/Modulo1/components/SupplierCard/SupplierCard';
import { Card } from 'react-bootstrap';
import '../../../basic.css';
import '../training.css';

const data = {
    id: 1,
    name: "Ejemplo de Creación",
    photoURL: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    description: "Esto es un ejemplo de creación de un curso empresa",
    type: "Presencial"
}

type Supplier = {
    id: string;
    name: string;
    image: string;
    capacities: any[];
}

type SessionObj = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    limitDate: string;
    numEmployees: number;
    capacity: number;
    location: string;
    urlVideo: string;
}



const suppliers: Supplier[] = [
    {
        id: "1",
        name: "John Doe Johnson",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
        capacities: [{ text: "Front" }, { text: "React" }]
    },
    {
        id: "2",
        name: "Jane Smith Jackson",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
        capacities: [{ text: "Back" }, { text: "Python" }]
    },
    {
        id: "3",
        name: "Bob Johnson Doe",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
        capacities: [{ text: "ML" }, { text: "Udemy" }]
    }
];

const typeTra = [
    { id: 1, type: "Todos" },
    { id: 2, type: "Software" },
    { id: 3, type: "Salud" },
    { id: 4, type: "Seguridad" },
]

const typeCreation = [
    { id: 1, type: "Presencial" },
    { id: 3, type: "Virtual Sincrono" },
    { id: 4, type: "Virtual Asincrono" },
]

const sessionsData: SessionObj[] = [

]

const TrainingCreate = () => {
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>(data);
    const [nombreT, setNombreT] = useState(data.name)
    const [descripcionT, setDescripcionT] = useState(data.description)

    const [nombreAuxT, setNombreAuxT] = useState(data.name)
    const [descripcionAuxT, setDescripcionAuxT] = useState(data.description)

    const [classSessions, setClassSessions] = useState<SessionObj[]>(sessionsData)
    const [addedTopics, setAddedTopics] = useState<String[]>([])

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
                item.area === typeArea
            );
            setSupplierFilter(filtered);
        }
    }


    /* TRAINING SESSION DETAIL INPUTS */
    const refTrName = useRef<HTMLInputElement>(null);
    const refTrDescription = useRef<HTMLTextAreaElement>(null);
    const refTrLocation = useRef<HTMLInputElement>(null);
    const refTrTopics = useRef<HTMLInputElement>(null);
    const refTrDateSession = useRef<HTMLInputElement>(null);
    const refTrDateStart = useRef<HTMLInputElement>(null);
    const refTrDateEnd = useRef<HTMLInputElement>(null);
    const refTrCapacity = useRef<HTMLInputElement>(null);
    /* TRAINING SESSION DETAIL INPUTS */

    const addTopic = (e: React.FormEvent) => {
        e.preventDefault();
        if (refTrTopics.current?.value !== "") {
            setAddedTopics([...addedTopics, refTrTopics.current?.value])
            console.log(addedTopics)
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
                    <p>{element}</p>
                </div>
                <div className='col-1'>
                    <Trash onClick={() => deleteTopic(index)} />
                </div>
            </div>
        )
    }

    const createSession = () => {
        let dataSession = {}

        if (training.type === "Asincrono") {
            dataSession = {
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                fecha: refTrDateStart.current?.value,
                fechaLimite: refTrDateEnd.current?.value,
                //urlVideoGrabacion:
                temas: addedTopics
                //responsable:
            }
        }
        else {
            dataSession = {
                nombre: refTrName.current?.value,
                descripcion: refTrDescription.current?.value,
                fecha: refTrDateSession.current?.value,
                ubicacion: refTrLocation.current?.value,
                capacidad: refTrCapacity.current?.value,
                temas: addedTopics
                //responsable: 
            }
        }

        console.log(dataSession)

        axiosInt.post('RUTA API', dataSession)
            .then(function (response) {
                //navigate(`/modulo1/cursoempresa/detalle/${response.data.id}`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


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


    return (
        <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>
            <div className='container row mt-3'>

                <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                    <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                        <Link to={`/modulo1/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ paddingRight: "2rem" }}>
                            <img src={training.photoURL} style={{ borderRadius: "10rem", width: "10rem", height: "10rem" }}></img>
                        </div>
                        <div>
                            <h1 className='screenTitle'>{nombreT}</h1>
                            <p><small className='subtitle'>{descripcionT}.</small></p>
                            <p style={{ display: "flex", alignItems: "center" }}><small style={{ paddingRight: "0.5rem" }} className='subtitle' >Modalidad: {training.type}</small><People style={{ opacity: "50%" }} /></p>
                        </div>
                    </div>

                    <div style={{ marginLeft: "20px", position: "relative", top: "-2.2rem" }}>
                        <PencilFill color='cornflowerblue' className='editar' data-bs-target='#editTrainingModal' data-bs-toggle='modal' />
                    </div>

                </div>



                {/* <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                    <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                        <Link to={`/modulo1/cursoempresa`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                    </div>

                    <div className='col'>
                        <h1 className='screenTitle'>{training.name}</h1>
                        <p><small className='subtitle'>{training.description}.</small></p>
                        <p><small className='subtitle'>Modalidad: {training.type}.</small></p>
                    </div>
                </div> */}



                <div className='row mt-3'>
                    <div className='col' style={{ marginLeft: "54px" }}>
                        <h4 className='mb-3 mt-3 subarea'>Sesiones</h4>
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

                    {classSessions.length > 0 ?
                        (<>

                        </>)
                        :
                        (<>
                            <h6 style={{ display: "flex", justifyContent: "center" }}>
                                Crea una sesión para comenzar
                            </h6>
                        </>)
                    }

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
                                training.type === "Asincrono" ?
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
                                        <div className='mb-3'>
                                            <label className="form-label">Fecha de la sesión</label>
                                            <input className='form-control' type='date' id='start_date_creation' ref={refTrDateSession} />
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col'>
                                                <label className="form-label">Ubicación</label>
                                                <input ref={refTrLocation} type="text" className="form-control" />
                                            </div>
                                            <div className='col'>
                                                <label className="form-label">Aforo máximo</label>
                                                <input type="number" className="form-control" ref={refTrCapacity} min={'0'} />
                                            </div>
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
                                        <input className='form-control' type='text' placeholder='Buscar empleados' onChange={handleFilter} />
                                    </div>
                                    <div className='col-2'>
                                        <select className="form-select" aria-label=".form-select-sm example" onChange={handleChangeType}>
                                            <option hidden>Área</option>
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

        </Sidebar >
    )
}

export default TrainingCreate