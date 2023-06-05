import { useState } from 'react';
import { Spinner, Table} from 'react-bootstrap';
import { Props, TBodyEmployee } from './TableAttendance.types'
import { useNavigate } from 'react-router-dom';
import axiosInt from '@config/axios';

const TableAttendance = (Props: Props) => {
    const [employees, setEmployees] = useState<TBodyEmployee[]>(Props.tableData);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheck = (id: number, event: any) => {
        async function updateArray() {
            var updatedList = [...employees];
            let employeeChecked = employees.at(id)

            if (event.target.checked) {
                employeeChecked.estado_asistencia = true
            } else {
                employeeChecked.estado_asistencia = false
            }

            setEmployees(updatedList);
        }
        updateArray()
    };

    const confirmAttendance = () => {
        setLoading(true)

        employees.map((obj) => {
            if(obj.estado_asistencia === null){
                obj.estado_asistencia = false
            }
        })

        const dataPOST = {
            curso_empresa_id: Props.trainingID,
            sesion_id: Props.sessionID,
            empleados_asistencia: employees
        }

        const dataUPD = {
            asistencias: employees
        }

        console.log(dataPOST)
        
        Props.mode === "post" ? 
        (
            axiosInt.post(`capacitaciones/attendance_session/${Props.sessionID}`, dataPOST)
            .then(function (response) {
                console.log(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            })
        ) 
        : 
        (
            axiosInt.put(`capacitaciones/attendance_session/${Props.sessionID}`, dataUPD)
            .then(function (response) {
                console.log(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            })
        )        
    }

    const navigate = useNavigate();

    const goBack = () =>{
        navigate(-1);
    };

    return (
    <>
        <div className='container'>
            <div className='row'>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {Props.tableHeaders.map((headerItems, indexH) => (
                    <th key={indexH} >{headerItems.heading}</th>
                    ))}
                </tr>
                </thead>
    
                <tbody>
                {Object.values(Props.tableData).map((obj, indexR) => (
                    <tr key={indexR}>
                        {Props.tableHeaders.map((headerItems, indexH) => {
    
                        if(headerItems.value.includes('.')){
                            const itemSplit = headerItems.value.split('.')
                            return <td key={indexH}>{obj[itemSplit[0]][itemSplit[1]]}</td>
                        }
                        else if(headerItems.value === "id"){
                            return <td key={indexH}>{indexR+1}</td>
                        }
                        else if (headerItems.value === "estado_asistencia"){
                            return(
                                Props.enable === "1" ?
                                (
                                    <td key={indexH} style={{display: "flex", justifyContent: "center"}}>
                                        <div className="form-check">
                                            {
                                                obj[`${headerItems.value}`] === null ?
                                                (<input className="form-check-input" type="checkbox" value="" onChange={() => handleCheck(indexR, event)} />)
                                                :
                                                (<input className="form-check-input" type="checkbox" value="" onChange={() => handleCheck(indexR, event)} checked={employees.at(indexR).estado_asistencia}/>)
                                            }   
                                        </div>
                                    </td>
                                )
                                :
                                (
                                    obj[`${headerItems.value}`] === null ?
                                    (<td key={indexH}>No registrado</td>)
                                    :
                                    (<td key={indexH}>{obj[`${headerItems.value}`]}</td>)
                                )
                            )
                        }
                        return <td key={indexH}>{obj[`${headerItems.value}`]}</td>
                        })}
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
            {
                Props.enable === "1" ?
                (<>
                    <div className="row justify-content-md-end">
                        <div className="col-md-auto">
                            <button type='button' className='btn btn-outline-primary' data-bs-target='#cancelAttendance' data-bs-toggle='modal'>Cancelar</button>
                        </div>
                        <div className="col-md-auto">
                            <button type='button' className='btn btn-primary' data-bs-target='#confirmAttendance' data-bs-toggle='modal'>Guardar</button>
                        </div>
                    </div>
                </>)
                :
                (<></>)
            }
            
        </div>

        {/* MODAL SAVE */}
        <div className="modal fade" id="confirmAttendance" aria-hidden="true" aria-labelledby="confirmAttendance" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="confirmAttendance">¿Desea guardar el de registro de asistencia?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => confirmAttendance()} disabled={loading}>Confirmar <Spinner hidden={!loading} style={{ marginLeft: '0.7rem' }} as="span" animation="border" size="sm"/></button>
                </div>
            </div>
            </div>
        </div>

        {/* MODAL CANCEL */}
        <div className="modal fade" id="cancelAttendance" aria-hidden="true" aria-labelledby="cancelAttendance" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="cancelAttendance">¿Desea cancelar el registro de la asistencia? <br/> Los datos que no han sido guardados se borrarán</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" data-bs-dismiss="modal" onClick={goBack}>Confirmar</button>
                </div>
            </div>
            </div>
        </div>
    </>
    );
}

export default TableAttendance