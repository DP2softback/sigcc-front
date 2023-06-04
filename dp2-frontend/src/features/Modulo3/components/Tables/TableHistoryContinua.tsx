import {  Table } from 'react-bootstrap';
import { formatDate, navigateTo } from '@features/Modulo3/utils/functions';
import './TableHistoryContinua.css';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { CONTINUOS_EVALUATION_DETAIL } from '@config/paths';

export default function TableHistoryContinua({ rows, isReadOnly = false }) {
  function getBackgroundColor(categoryIndex: number) {
    return isReadOnly
      ? categoryIndex % 2 == 0
        ? 'bg-blueReadOnly'
        : 'bg-whiteReadOnly'
      : categoryIndex % 2 == 0
      ? 'bg-blue'
      : 'bg-white';
  }

  return (
    <Table striped className='TableHistoryContinua'>
      <thead className={`bg-white${isReadOnly ? 'ReadOnly' : ''}`}>
        <tr>
          <th>Categoría</th>
          <th className='text-center'>Calificación</th>
          <th className='text-center'>Fecha de registro</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
          return (
            <tr key={row.EvaluationId} className={rowStyle}>
              <td>{row.CategoryName}</td>
              <td className='text-center'>{row.score}</td>
              <td className='text-center'>{formatDate(row.evaluationDate)}</td>
              <td className='text-center'>
                <ArrowRightCircleFill
                  className='cursor-pointer'
                  onClick={() => {
                    navigateTo(CONTINUOS_EVALUATION_DETAIL, {
                      id: row.EvaluationId,
                    });
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
