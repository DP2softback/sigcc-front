import Sidebar from '@components/Sidebar'
import axiosInt from '@config/axios';
import TableAttendance from '@features/Modulo1/components/TableAttendance';
import sidebarItems from '@utils/sidebarItems'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';

type EmployeeObj = {
    empleado: number;
    nombre?: string;
    estado_asistencia: boolean;
}

const employeesData: EmployeeObj[] = [
    {
        empleado: 123,
        nombre: "John Doe",
        estado_asistencia: null
    },
    {
        empleado: 234,
        nombre: "Jane Smith",
        estado_asistencia: null
    },
    {
        empleado: 345,
        nombre: "Bob Johnson",
        estado_asistencia: null
    },
    {
        empleado: 456,
        nombre: "Sarah Lee",
        estado_asistencia: null
    },
    {
        empleado: 567,
        nombre: "Tom Jackson",
        estado_asistencia: null
    }
];

let attendaceMode: string

const headerTable = [
    {
        heading: "#",
        value: "id"
    },
    {
        heading: "Código",
        value: "empleado"
    },
    {
        heading: "Nombre",
        value: "nombre"
    },
    {
        heading: "Asistencia",
        value: "estado_asistencia"
    }
];

const TrainingAttendance = () => {
    const { trainingID, sessionID } = useParams();
    const queryParameters = new URLSearchParams(window.location.search)
    const enable = queryParameters.get("ena")

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<EmployeeObj[]>([])
    const [sessionName, setSessionName] = useState<string>("Sesión 1")
    const [sessionDate, setSessionDate] = useState<string>("03/06/2023")
    
    const loadAttendanceDetails = () => {
        setLoading(true);
        
        axiosInt.get(`capacitaciones/attendance_session/${sessionID}`)
            .then(function (response)
            {
                //console.log(response.data)
                setSessionName(response.data.sesion.nombre_sesion)
                setSessionDate(moment(response.data.sesion.fecha_sesion).format("DD/MM/YYYY"))

                if(response.data.asistencias.length === 0){
                    attendaceMode = "post"

                    axiosInt.get(`capacitaciones/course_company_course_list_empployees/${trainingID}`)
                    .then(function (response)
                    {
                        setEmployees(response.data);
                        setLoading(false);
                    })
                    .catch(function (error)
                    {
                        console.log(error);
                        setLoading(false);
                    });
                }
                else{
                    attendaceMode = "update"

                    setEmployees(response.data.asistencias);
                    setLoading(false)
                }
                
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
            {/* <Sidebar items={sidebarItems} active='/modulo1/cursoempresa'> */}
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
                                {
                                    employees.length > 0 ?
                                    (<TableAttendance 
                                        tableHeaders={headerTable}
                                        tableData={employees}
                                        enable={enable}
                                        trainingID={trainingID}
                                        sessionID={sessionID}
                                        mode={attendaceMode}
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
                    </>
                    )
                }
            {/* </Sidebar> */}
        </>
    )
}

export default TrainingAttendance