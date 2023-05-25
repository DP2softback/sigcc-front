import axiosInt from '@config/axios';
import Sidebar from '@components/Sidebar'
import sidebarItems from '@features/Modulo1/utils/sidebarItems'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GeoFill, JournalBookmarkFill, InfoCircleFill, PeopleFill, DoorClosedFill, Calendar2EventFill, Calendar, Calendar2Event, People, ArrowLeftCircle, ArrowLeftCircleFill, ArrowRightCircle } from 'react-bootstrap-icons'
import EmployeeCard from '@features/Modulo1/components/EmployeeCard/EmployeeCard';
import '../../../basic.css';
import '../training.css';

type Employee = {
    id: string;
    name: string;
    code: string;
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

const datos = {
    id: 1,
    name: "Seguridad de Información",
    photoURL: 'https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg',
    description: "Lorem ipsum",
    startDate: "06/05/2023",
    endDate: "06/05/2023",
    numEmployees: 10,
    type: "Presencial",
    capacity: 20,
    location: "Av. Universitaria 1305 - San Miguel"
}

const employees: Employee[] = [
    {
        id: "1",
        name: "John Doe",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Manager",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "2",
        name: "Jane Smith",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Developer",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "3",
        name: "Bob Johnson",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Designer",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "4",
        name: "Sarah Lee",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Tester",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    },
    {
        id: "5",
        name: "Tom Jackson",
        code: "123456789",
        area: "Área de Base de datos",
        position: "Analyst",
        image: "https://mipropiojefe.com/wp-content/uploads/2021/08/se_va_mejor_colaborador.jpg",
    }
];


const TrainingAssignment = () => {
    const { trainingID } = useParams();
    const [training, setTraining] = useState<any>(datos);
    const [employeeFilter, setemployeeFilter] = useState<Employee[]>(employees)
    const [addedEmployees, setAddedEmployees] = useState<Employee[]>([])
    const [addedEmployee, setAddedEmployee] = useState<Employee>()
    const [typeArea, setTypeArea] = useState("Todos")

    const botonEmployee = "Agregar";
    var filtered;


    const handleFilter = (e: any) => {
        const searchTerm = e.target.value;
        if (searchTerm === ''){        
            if(addedEmployees.length){
                filtered = employees.filter((item: any) => {                
                    return addedEmployees.every((added) => {                      
                        return added[0].id != item.id
                    })
                });
                setemployeeFilter(filtered);
            }
            else setemployeeFilter(employees);
        }else {
            if(addedEmployees.length){
                filtered = employeeFilter.filter((item: any) => {                
                    return addedEmployees.every((added) => {                      
                        return added[0].id != item.id
                    }) && item.name.toLowerCase().includes(searchTerm.toLowerCase())
                });
            }else{
                filtered = employeeFilter.filter((item: any) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }            
            setemployeeFilter(filtered);
        }
    };

    const handleChangeType = (e: any) => {
        setTypeArea(e.target.value)
    }

    const search = (e: any) => {
        if (typeArea === "Todos")
            setemployeeFilter(employees);
        else {
            filtered = employees.filter((item: any) =>
                item.area === typeArea
            );
            setemployeeFilter(filtered);
        }
    }


    const loadTrainingDetails = () => {
        /*
        axiosInt.get(`curso/training/${trainingID}`)
            .then(function (response)
            {
                setTraining(response.data)
            })
            .catch(function (error)
            {
                console.log(error);
            });
        */
    }


 
    useEffect(() => {        
        async function AddEmployee(){
            var aux = addedEmployees;
            aux.push(addedEmployee)
            setAddedEmployees(aux)
        }
        async function UpdateFilter(){            
              var filtered2 = employeeFilter.filter((item: any) => {                
                return addedEmployees.every((added) => {                      
                    return added[0].id != item.id
                })
            }               
            );
            setemployeeFilter(filtered2);
        }

        if(addedEmployee != undefined){            
            AddEmployee()          
            UpdateFilter()
        }
    }, [addedEmployee]);

    useEffect(() => {
        loadTrainingDetails();
    }, []);



    return (
        <>
            <Sidebar items={sidebarItems} active='/modulo1/capacitacion'>
                <div className='container row mt-3'>

                    <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                        <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                            <Link to={`/modulo1/capacitacion/detalle/${training.id}`} className="float-right"><ArrowLeftCircleFill style={{ height: "32px", width: "32px", color: "black" }} /></Link>
                        </div>

                        <div className='col'>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h1 className='screenTitle'>Empleados</h1>
                                <button className='btn btn-primary' style={{ marginTop: "15px", marginBottom: "15px" }}>Asignar empleados</button>
                            </div>

                            <p><small className='subtitle'>Lista de empleados disponibles para asignar a la Capacitación</small></p>
                        </div>
                    </div>


                    <div className='col' style={{ marginLeft: "60px" }}>
                        <div className='row' style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "10px" }}>
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

                            {employeeFilter.length ?
                                <div>
                                    <div className="employees-list cards">
                                        {employeeFilter.map((employee) => (
                                            <EmployeeCard key={employee.id}
                                                id={employee.id}
                                                name={employee.name}
                                                photoURL={employee.image}
                                                area={employee.area}
                                                puesto={employee.position}
                                                codigo={employee.code}
                                                boton1={botonEmployee}
                                                boton1Color={"#084298"}
                                                option={setAddedEmployee}
                                            />
                                        ))}
                                    </div>
                                </div>
                                :
                                <div>
                                    <h5 style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>Sin empleados para asignar</h5>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default TrainingAssignment