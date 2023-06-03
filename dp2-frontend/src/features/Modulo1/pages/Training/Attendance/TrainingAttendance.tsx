import Sidebar from '@components/Sidebar'
import axiosInt from '@config/axios';
import TableAttendance from '@features/Modulo1/components/TableAttendance';
import Employee from '@features/Modulo3/components/Cards/Employee/Employee';
import sidebarItems from '@utils/sidebarItems'
import { useEffect, useState } from 'react';
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

type EmployeeObj = {
    id: number;
    nombre: string;
    codigo: string;
    area: string;
    asistencia: string;
}

const employeesData: EmployeeObj[] = [
    {
        id: 1,
        nombre: "John Doe",
        codigo: "123456789",
        area: "Área de Base de datos",
        asistencia: null
    },
    {
        id: 2,
        nombre: "Jane Smith",
        codigo: "123456789",
        area: "Área de Base de datos",
        asistencia: null
    },
    {
        id: 3,
        nombre: "Bob Johnson",
        codigo: "123456789",
        area: "Área de Base de datos",
        asistencia: null
    },
    {
        id: 4,
        nombre: "Sarah Lee",
        codigo: "123456789",
        area: "Área de Base de datos",
        asistencia: null
    },
    {
        id: 5,
        nombre: "Tom Jackson",
        codigo: "123456789",
        area: "Área de Base de datos",
        asistencia: null
    }
];

const headerTable = [
    {
        heading: "#",
        value: "id"
    },
    {
        heading: "Código",
        value: "codigo"
    },
    {
        heading: "Nombre",
        value: "nombre"
    },
    {
        heading: "Asistencia",
        value: "asistencia"
    }
];

const TrainingAttendance = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const enable = queryParameters.get("ena")
    console.log(enable)

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<EmployeeObj[]>(employeesData)
    const [sessionName, setSessionName] = useState<string>("Sesión 1")
    const [sessionDate, setSessionDate] = useState<string>("01/06/2023")
    
    const loadAttendanceDetails = () => {
        setLoading(true);

        axiosInt.get(``)
            .then(function (response)
            {
                //setEmployees(response.data);
                //setSessionName()
                //setSessionDate()
                setLoading(false);
            })
            .catch(function (error)
            {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        loadAttendanceDetails();
    }, []);

    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };
    
    return (
        <>
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
                            {/* SESSION DATA */}
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                                <div className='text-end' style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
                                    <ArrowLeftCircleFill className="float-right" style={{ height: "32px", width: "32px", color: "black" }} onClick={goBack}/>
                                </div>
    
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div>
                                        <h1 className='screenTitle'>{sessionName}</h1>
                                        <p><small className='subtitle'>Fecha: {sessionDate}</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className='col' style={{ marginLeft: "60px" }}>
                                <TableAttendance 
                                    tableHeaders={headerTable}
                                    tableData={employeesData}
                                    pageNumber={0} 
                                    pageSize={20}
                                    enable={enable}
                                />
                            </div>
                        </div>
                    </>
                    )
                }
            </Sidebar>
        </>
    )
}

export default TrainingAttendance