import Sidebar from '@components/Sidebar';
import axiosInt from '@config/axios';
import TableDataEmployees from '@features/Modulo1/components/TableDataEmployees';
import sidebarItems from '@utils/sidebarItems'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';


const employeesData: any = [
    {
        "learning_path": 1,
        "nombre": "ABC",
        "descripcion": "XYZ",
        "estado": "0",
        "porcentaje_progreso": "0.00",
        "valoracion": 0,
        "comentario_valoracion": null,
        "fecha_asignacion": "2023-07-12T11:27:10.384668-05:00",
        "fecha_limite": "2023-07-12T11:27:07.538000-05:00",
        "fecha_completado": null,
        "empleado": {
            "usuario": {
                "id": 1,
                "first_name": "",
                "last_name": "",
                "email": "angel@angel.angel"
            },
            "position": null
        }
    } 
];

const evalStatus = [
    { id: 1, type: "Todos" },
    { id: 2, type: "Sin iniciar" },
    { id: 3, type: "Sin evaluar" },
    { id: 4, type: "Evaluado" },
]

const headerTable = [
    {
        heading: "#",
        value: "num"
    },
    {
        heading: "Código",
        value: "empleado.id"
    },
    {
        heading: "Nombre(s)",
        value: "empleado.usuario.first_name"
    },
    {
        heading: "Apellido(s)",
        value: "empleado.usuario.last_name"
    },
    {
        heading: "Estado",
        value: "estado"
    },
    {
        heading: "Fecha Completado",
        value: "fecha_completado"
    },
    {
        heading: "Acciones",
        value: "acciones"
    }
];

function EvaluationDetails() {
    const { learningPathId } = useParams()
    const [loading, setLoading] = useState<boolean>(false);

    const [employees, setEmployees] = useState<any[]>(employeesData)
    const [employeesFilter, setEmployeesFilter] = useState<any[]>(employeesData)

    const [lpName, setLPName] = useState<string>("")
    const [lpDescription, setLPDescription] = useState<string>("")
    const [evaluationStatus, setEvaluationStatus] = useState<string>("Todos")

    const loadEvaluationDetails = () => {
        setLoading(true);
        
        axiosInt.get(`capacitaciones/learning_path/empleados/${learningPathId}/`)
            .then(function (response) {
                console.log(response.data)
                setLPName(response.data[0].nombre)
                setLPDescription(response.data[0].descripcion)
                setEmployees(response.data)
                setEmployeesFilter(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
            });
    }
    
    useEffect(() => {
        loadEvaluationDetails()
    }, []);

    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };

    const refEmployee = useRef(null)
    
    const evaluationReview = (employeeID: any) => {
        navigate(`revision/${employeeID}`)
    }

    /* TRAINING FILTERS */
    var filtered: any;

    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === ''){
            setEmployeesFilter(employees);
        }
        else {
            filtered = employees.filter((item: any) =>
                item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setEmployeesFilter(filtered);
        }
    };

    const handleChangeType = (e: any) => {
        switch (e.target.value) {
            case "Todos": setEvaluationStatus(e.target.value); break;
            case "Sin iniciar": setEvaluationStatus("0"); break;
            case "Sin evaluar": setEvaluationStatus("2"); break;
            case "Evaluado": setEvaluationStatus("3"); break;
        }
    }

    const search = (e: any) => {
        if (evaluationStatus === "Todos"){
            setEmployeesFilter(employees);
        } else {
            filtered = employees.filter((item: any) =>(item.estado.toString() === evaluationStatus));
            setEmployeesFilter(filtered);
        }
        
    }
    /* TRAINING FILTERS */
    
    return (
        <>
            {/*<Sidebar items={sidebarItems} active='/modulo1/cursoempresa'>*/}
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
                        <div className='row'>
                            {/* LEARNING PATH DATA */}
                            <div className='mb-3' style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <ArrowLeftCircleFill className="float-right" style={{ height: "32px", width: "32px", color: "black" }} onClick={goBack}/>
                                </div>
    
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div>
                                        <h1 className='screenTitle'>{lpName}</h1>
                                        <h2>Evaluación Integral</h2>
                                        <p><small className='subtitle'>{lpDescription}</small></p>
                                    </div>
                                </div>
                            </div>

                            {/* FILTER AND SEARCH BAR */}
                            <div className='row row-search' style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
                                <div className='col-3'>
                                    <h4>Empleados asignados</h4>
                                </div>
                                <div className='col-5'>
                                    <input className='form-control' type='text' placeholder='Buscar empleado' onChange={handleFilter} />
                                </div>
                                <div className='col-2'>
                                    <select className="form-select" aria-label=".form-select-sm example" onChange={handleChangeType}>
                                        <option hidden>Estado</option>
                                        {evalStatus.map((t) => {
                                            return (
                                                <option key={t.id} value={t.type}>{t.type}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='col text-end'>
                                    <button className='btn btn-primary' type='button' onClick={search}>Buscar</button>
                                </div>
                            </div>

                            <div className='row mt-3' style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
                                <div className='col'>
                                    {
                                        employees.length > 0 ?
                                        (<TableDataEmployees
                                            tableHeaders={headerTable}
                                            tableData={employeesFilter}
                                            action={evaluationReview.bind(refEmployee)}
                                        />)
                                        :
                                        (
                                            <div className='row align-items-stretch g-3 py-3'>
                                                <div className='col'>
                                                    <div className='card'>
                                                        <div className='card-body'>
                                                            <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                                <div className='vertical-align-child'>
                                                                    <h5 className='opacity-50 text-center'>No se cuenta con empleados asignados</h5>
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
                    </>
                    )
                }
            {/*</Sidebar>*/}
        </>
    );
}

export default EvaluationDetails