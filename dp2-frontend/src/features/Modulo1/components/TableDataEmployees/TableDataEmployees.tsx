import React from 'react'
import { Table } from 'react-bootstrap'
import { Props } from './TableDataEmployees.types'
import { ArrowRightCircleFill } from 'react-bootstrap-icons'

function TableDataEmployees(Props: Props) {
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
                                return <td key={indexH}>{obj[itemSplit[0]][itemSplit[1]][itemSplit[2]]}</td>
                            }
                            else if(headerItems.value === "num"){
                                return <td key={indexH}>{indexR+1}</td>
                            }
                            else if(obj[`${headerItems.value}`] === null){
                                return <td key={indexH}>{"-"}</td>
                            }
                            else if(headerItems.value === "acciones"){
                                return <td className='text-center' key={indexH}><ArrowRightCircleFill onClick={() => {obj && Props.action(obj.empleado.usuario.id)}}/></td>
                            }
                            else if(headerItems.value === "estado"){
                                if(obj[`${headerItems.value}`] === "0"){
                                    return <td key={indexH}>{"Sin iniciar"}</td>
                                }
                                else if(obj[`${headerItems.value}`] === "1"){
                                    return <td key={indexH}>{"En progreso"}</td>
                                }
                                else if(obj[`${headerItems.value}`] === "2"){
                                    return <td key={indexH}>{"Sin evaluar"}</td>
                                }
                                else if(obj[`${headerItems.value}`] === "3"){
                                    return <td key={indexH}>{"Evaluado"}</td>
                                }
                                else if(obj[`${headerItems.value}`] === "4"){
                                    return <td key={indexH}>{"Desaprobado"}</td>
                                }
                                
                            }
                            
                            return <td key={indexH}>{obj[`${headerItems.value}`]}</td>
                            })}
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>                
            </div>
        </>
    )
}

export default TableDataEmployees