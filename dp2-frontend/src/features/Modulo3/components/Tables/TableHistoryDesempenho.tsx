import './TableHistory.css';
import {  Table } from 'react-bootstrap';
import { formatDate, formatNumberWithTwoDecimals, navigateTo } from '@features/Modulo3/utils/functions';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { PERFORMANCE_EVALUATION_DETAIL } from '@features/Modulo3/routes/path';

export default function TableHistoryDesempenho({ rows, employee = null, isReadOnly = false }) {
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
    <Table striped className='TableHistory'>
      <thead className={`bg-white${isReadOnly ? 'ReadOnly' : ''}`}>
        <tr>
          <th className='align-middle'>Fecha de registro</th>
          <th className='text-center align-middle'>Calificación</th>
          <th className='text-center align-middle'>Detalle</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
          return (
            <tr key={row.EvaluationId} className={rowStyle}>
              <td>{formatDate(row.evaluationDate)}</td>
              <td className='text-center'>{formatNumberWithTwoDecimals(row.finalScore)}</td>
              <td className='text-center'>
                <ArrowRightCircleFill
                  className='cursor-pointer'
                  onClick={() => {
                    navigateTo(PERFORMANCE_EVALUATION_DETAIL, {
                      id: employee.id,
                      name: employee.name,
                      evaluationId: row.EvaluationId
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
