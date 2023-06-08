import { useState } from 'react';
import { Table} from 'react-bootstrap';
import { Props } from './TableAttendance.types'
import axiosInt from '@config/axios';
import { useNavigate, useParams } from 'react-router-dom';

const TableAttendance = (Props: Props) => {
    const [checked, setChecked] = useState([]);

    const handleCheck = (employeeID: number, event: any) => {
      async function updateArray() {
        var updatedList = [...checked];

        if (event.target.checked) {
          updatedList = [...checked, employeeID];
        } else {
          updatedList.splice(checked.indexOf(employeeID), 1);
        }

        setChecked(updatedList);
      }
      updateArray()
    };

    const confirmAttendance = () => {
      console.log(checked)

      axiosInt.post('')
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
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
                      else if (headerItems.value === "asistencia"){
                        return(
                            Props.enable === "1" ?
                            (
                                <td key={indexH} style={{display: "flex", justifyContent: "center"}}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" onChange={() => handleCheck(obj['id'], event)} />
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

      {/* MODAL */}
      <div className="modal fade" id="confirmAttendance" aria-hidden="true" aria-labelledby="confirmAttendance" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="confirmAttendance">¿Desea guardar el de registro de asistencia?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-dismiss="modal" onClick={() => confirmAttendance()}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
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