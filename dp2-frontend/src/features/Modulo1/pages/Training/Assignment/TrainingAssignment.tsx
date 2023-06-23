import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar'
import sidebarItems from '@utils/sidebarItems'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GeoFill, JournalBookmarkFill, InfoCircleFill, PeopleFill, DoorClosedFill, Calendar2EventFill, Calendar, Calendar2Event, People, ArrowLeftCircle, ArrowLeftCircleFill, ArrowRightCircle } from 'react-bootstrap-icons'
import EmployeeCard2 from '@features/Modulo1/components/EmployeeCard2/EmployeeCard2';
import Pagination from '@features/Modulo1/components/Pagination';
import '../../../basic.css';
import '../training.css';
import moment from 'moment-timezone';


type Employee = {
    id: string;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    }
    area: string;
    position: string;
    image: string;
}

const typeTra = [
    { id: 1, type: "Todos" },
    { id: 2, type: "Área de Base de datos" },
    { id: 3, type: "Área de Desarrollo Web" },
    { id: 4, type: "Área de Desarrollo App" },
]

let url_foto_default = 'https://fagorelectrodomestico.com.vn/template/images/default-post-image.jpg'
const pathname = window.location.pathname;
const partesRuta = pathname.split("/");
const valor = partesRuta[partesRuta.length - 1];

// const datos = {
//     id: 1,
//     name: "Seguridad de Información",
//     photoURL: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
//     description: "Lorem ipsum",
//     startDate: "06/05/2023",
//     endDate: "06/05/2023",
//     numEmployees: 10,
//     type: "Presencial",
//     capacity: 20,
//     location: "Av. Universitaria 1305 - San Miguel"
// }

// const employees: Employee[] = [
//     {
//         id: "1",
//         name: "John Doe Johnson",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Manager",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "2",
//         name: "Jane Smith Jackson",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Developer",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "3",
//         name: "Bob Johnson Doe",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Designer",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "4",
//         name: "Sarah Lee Lee",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Tester",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "5",
//         name: "Tom Jackson Smith",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Analyst",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "6",
//         name: "Rodrigo Alonso Ortega Bocanegra",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Analyst",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "7",
//         name: "John Doe Johnson 2",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Manager",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "8",
//         name: "Jane Smith Jackson 2",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Developer",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "9",
//         name: "Bob Johnson Doe 2",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Designer",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "10",
//         name: "Sarah Lee Lee 2",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Tester",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "11",
//         name: "Tom Jackson Smith 2",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Analyst",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     },
//     {
//         id: "12",
//         name: "Rodrigo Ortega Bocanegra 2",
//         code: "123456789",
//         area: "Área de Base de datos",
//         position: "Analyst",
//         image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
//     }

// ];

type EmployeeId = number[]

const TrainingAssignment = () => {
    const trainingID = valor;
    const navigate = useNavigate();
    const [training, setTraining] = useState<any>();

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([])
    const [employeeFilter, setEmployeeFilter] = useState<Employee[]>([])
    const [addedEmployeesId, setAddedEmployeesId] = useState<EmployeeId[]>([])

    const [addedEmployees, setAddedEmployees] = useState<Employee[]>([])
    const [addedEmployee, setAddedEmployee] = useState<Employee>()
    const [typeArea, setTypeArea] = useState("Todos")

    const botonEmployee = "Agregar";
    var filtered;
    var mostrar = 6;

    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(employeeFilter.length / mostrar);
    const [position, setPosition] = useState(0);
    const employeesShow = employeeFilter.slice(position, position + mostrar);

    const refTrDateStart = useRef<HTMLInputElement>(null);

    const handleRemove = (idAEliminar: number) => {
        const newArray = addedEmployees.filter((item) => item[0].id !== idAEliminar);
        setAddedEmployees(newArray)
    }

    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === '') {
            if (addedEmployees.length) {
                filtered = employees.filter((item: any) => {
                    return addedEmployees.every((added) => {
                        return added[0].id != item.id
                    })
                });
                setEmployeeFilter(filtered);
            }
            else setEmployeeFilter(employees);
        } else {
            if (addedEmployees.length) {
                filtered = employees.filter((item: any) => {
                    return addedEmployees.every((added) => {
                        return added[0].id != item.id
                    }) && (item.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
                });
            } else {
                filtered = employees.filter((item: any) =>
                    (item.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }
            setEmployeeFilter(filtered);
        }
    };

    const handleChangeType = (e: any) => {
        setTypeArea(e.target.value)
    }

    const search = (e: any) => {
        if (typeArea === "Todos")
            setEmployeeFilter(employees);
        else {
            filtered = employees.filter((item: any) =>
                item.area === typeArea
            );
            setEmployeeFilter(filtered);
        }
    }

    const assignEmployees = () => {       
        let fecha_limite
        
        if (training.tipo == "A")
            fecha_limite = moment.tz(refTrDateStart.current?.value, 'America/Lima').format('YYYY-MM-DDTHH:mm:ssZ');
        else    
            fecha_limite = moment.tz(training.fecha_ultima_sesion, 'America/Lima').format('YYYY-MM-DDTHH:mm:ssZ');
            console.log(fecha_limite)
            axiosInt.post(`capacitaciones/curso_empresa_empleados/`, {
            "id_curso": trainingID,
            "empleados": addedEmployeesId,
            "porcentaje_asistencia_aprobacion": 70,
            "fecha_limite": fecha_limite
        })
            .then(function (response) {
                setEmployees(response.data)
                navigate(-1);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }


    const loadTrainingDetails = () => {
        setLoading(true);
        var curso;
        axiosInt.get(`capacitaciones/course_company_course/${trainingID}`)
            .then(function (response2) {
                curso = response2.data;
                setTraining(response2.data)
                console.log(response2.data)


                axiosInt.get(`capacitaciones/list_all_employees_general/`)
                    .then(function (response) {
                        var filtered2 = response.data.filter((item: any) => {
                            return curso.curso_empresa_x_empleado.every((added) => {
                                return added != item.id;
                            })
                        })
                        setEmployees(filtered2)
                        setEmployeeFilter(filtered2)
                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        async function UpdateFilter() {
            var filtered2 = employees.filter((item: any) => {
                return addedEmployees.every((added) => {
                    return added[0].id != item.id
                })
            }
            );
            setEmployeeFilter(filtered2);
        }
        UpdateFilter()
    }, [addedEmployees]);

    useEffect(() => {
        async function AddEmployee() {
            var aux = addedEmployees;
            aux.push(addedEmployee)
            setAddedEmployees(aux)

            // let idEmployee: []
            // idEmployee = [addedEmployee[0].id]

            setAddedEmployeesId([...addedEmployeesId, addedEmployee[0].id])
        }
        async function UpdateFilter() {
            var filtered2 = employees.filter((item: any) => {
                return addedEmployees.every((added) => {
                    return added[0].id != item.id
                })
            }
            );
            setEmployeeFilter(filtered2);
        }

        if (addedEmployee != undefined) {
            AddEmployee()
            UpdateFilter()
        }
    }, [addedEmployee]);

    useEffect(() => {
        loadTrainingDetails();
    }, []);



    return (
        <>
            {/* <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'> */}
                {
                    loading ?
                        (
                            <div className='vertical-align-parent' style={{ height: 'calc(100vh - 4rem)', display: "flex", alignItems: "center", justifyContent: "center"  }}>
                                <div className='vertical-align-child'>
                                    <div className="spinner-border" role="status" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <>
                            <div className='row'>

                                <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                    <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                        <Link to={`/modulo1/cursoempresa/detalle/${trainingID}`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                                    </div>

                                    <div className='col'>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h1 className='screenTitle'>Empleados</h1>

                                            {training != undefined &&
                                                <>
                                                    {training.tipo == 'A' ?
                                                        // <button className='btn btn-primary' style={{ marginTop: "15px", marginBottom: "15px" }} onClick={assignEmployees}></button>
                                                        <button className='btn btn-primary' style={{ marginTop: "15px", marginBottom: "15px" }} data-bs-target='#setDeadlineModal' data-bs-toggle='modal'>Fecha límite</button>
                                                        :
                                                        <button className='btn btn-primary' style={{ marginTop: "15px", marginBottom: "15px" }} onClick={assignEmployees}>Asignar empleados</button>
                                                    }
                                                </>
                                            }

                                        </div>

                                        <p><small className='subtitle'>Lista de empleados disponibles para asignar a la Capacitación</small></p>
                                    </div>
                                </div>


                                <div className='col' style={{ marginLeft: "60px" }}>
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

                                    <div className='row'>

                                        <div style={{ display: "flex" }}>
                                            {employeeFilter.length ?
                                                <div>
                                                    <div className="employees-list cards">
                                                        {employeesShow.map((employee) => (
                                                            <EmployeeCard2 key={employee.id}
                                                                id={employee.id}
                                                                name={employee.user.first_name + ' ' + employee.user.last_name}
                                                                photoURL={url_foto_default}
                                                                area={employee.area}
                                                                puesto={employee.position}
                                                                codigo={employee.user.email}
                                                                boton1={botonEmployee}
                                                                boton1Color={"#084298"}
                                                                option={setAddedEmployee}
                                                            />
                                                        ))}
                                                    </div>

                                                    {employeeFilter.length > mostrar &&
                                                        <div>
                                                            <div>
                                                                <Pagination
                                                                    page={page}
                                                                    totalPages={totalPages}
                                                                    handlePagination={setPage}
                                                                    setPosition={setPosition}
                                                                    position={position}
                                                                    mostrar={mostrar}
                                                                />
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                                :
                                                <div>
                                                    <h5 style={{ paddingTop: "20px", paddingLeft: "20rem" }}>Sin empleados para asignar</h5>
                                                </div>
                                            }

                                            <div style={{ paddingLeft: "1rem", position: employeeFilter.length == 0 ? 'relative' : 'static', right: employeeFilter.length == 0 ? '-20rem' : '', }}>
                                                {addedEmployees.length ?
                                                    <>
                                                        <div style={{ backgroundColor: "#D8E0E8", width: "17.3rem", borderRadius: "4px", overflow: "hidden", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>

                                                            <h4 style={{ display: "flex", justifyContent: "center", marginTop: "0.25rem" }}>Empleados asignados</h4>

                                                            <div>
                                                                {addedEmployees.map((employee) => (
                                                                    <div key={employee[0].id} style={{ display: "flex", alignItems: "center", paddingLeft: "0.5rem", paddingRight: " 0.5rem", paddingBottom: "0.5rem", justifyContent: "space-between" }}>
                                                                        <h4 style={{ fontSize: "13px", paddingTop: "0.35rem" }}>{employee[0].name}</h4>
                                                                        <button style={{ backgroundColor: '#B02A37', color: 'white', border: "none", fontSize: "12px" }} onClick={() => handleRemove(employee[0].id)}>Quitar</button>
                                                                    </div>
                                                                ))

                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <></>
                                                }
                                            </div>

                                        </div>

                                    </div>
                                </div>





                            </div>

                            {/* SET DEADLINE MODAL */}
                            <div className="modal fade" id="setDeadlineModal" aria-hidden="true" aria-labelledby="setDeadlineModal" tabIndex={-1}>
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="createSessionModal">Definir fecha límite</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <div className='row mb-3'>
                                                <div className='col'>
                                                    <label className="form-label">Fecha máxima para culminar el curso</label>
                                                    <input className='form-control' type='date' id='start_date_creation' ref={refTrDateStart} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className='btn btn-primary' data-bs-dismiss="modal" style={{ marginTop: "15px", marginBottom: "15px" }} onClick={assignEmployees}>Asignar empleados</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                }



            {/* </Sidebar> */}
        </>
    )
}

export default TrainingAssignment