import React from "react";
import { Button, Table } from 'react-bootstrap';
import './TableHistoryContinua.css';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';

type TableProps = {

    content: any,
   
  }


export default function TableHistoryContinua ({rows}) {

    return (
        <Table striped bordered hover className="TableHistoryContinua">
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Nivel</th>
                    <th>Fecha de registro</th>
                    <th>Detalle</th>
                </tr>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <tr key={index}>
                            <td>{row.categoria}</td>
                            <td>{row.nivel}</td>
                            <td>{row.fechaRegistro}</td>
                            <td className="icono">
                            <ArrowRightCircleFill />
                            </td>
                    </tr>
                ))
            }
                
            </tbody>
        </Table>
    ) 
}