import React from "react";
import { Button, Table } from 'react-bootstrap';
import { formatDate, navigateTo } from '@features/Modulo3/utils/functions';
import './TableHistoryContinua.css';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { CONTINUOS_EVALUATION_DETAIL } from '@config/paths';

type TableProps = {

    content: any,
   
  }


export default function TableHistoryContinua ({rows}) {

    return (
      <Table striped bordered className="TableHistoryContinua">
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
            <tr key={row.EvaluationId}>
              <td>{row.CategoryName}</td>
              <td>{row.score}</td>
              <td>{formatDate(row.evaluationDate)}</td>
              <td className="icono">
                <ArrowRightCircleFill
                  className="cursor-pointer"
                  onClick={() => {
                    navigateTo(CONTINUOS_EVALUATION_DETAIL, { id: row.EvaluationId });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ); 
}