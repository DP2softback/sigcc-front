import React from "react";
import { Button, Table } from 'react-bootstrap';
import { navigateTo } from '@features/Modulo3/utils/functions.jsx';
import './TableHistoryContinua.css';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { CONTINUOS_EVALUATION_DETAIL } from '@config/paths';

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
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.categoria}</td>
              <td>{row.nivel}</td>
              <td>{row.fechaRegistro}</td>
              <td className="icono">
                <ArrowRightCircleFill
                  className="cursor-pointer"
                  onClick={() => {
                    navigateTo(CONTINUOS_EVALUATION_DETAIL, { id: 1 });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ); 
}