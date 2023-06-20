import {  Button, Table } from 'react-bootstrap';
import { formatDate, formatNumberWithTwoDecimals, navigateTo } from '@features/Modulo3/utils/functions';
import './TableHistory.css';
import { CATEGORIES_DETAIL } from '@features/Modulo3/routes/path';

export default function TableCategories({ rows, isReadOnly = false }) {
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
    <Table striped className='TableCategorie'>
      <thead className={`bg-white${isReadOnly ? 'ReadOnly' : ''}`}>
        <tr>
          <th className='categorie_name'>Nombre</th>
          <th>Tipo de evaluación</th>
          <th className='text-end label'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
          return (
            <tr key={row.id} className={rowStyle}>
              <td className='categorie_name'>{row.name}</td>
              <td>{row['evaluationType'].name}</td>
              <td className='text-center'>                
                <div className='acciones'>
                <Button variant="outline-danger" className='accion'>
                  Eliminar
                </Button>
                <Button variant="outline-primary" className='accion'>
                  Editar
                </Button>
                <Button variant="outline-secondary" className='accion' onClick={() => {
                    navigateTo(CATEGORIES_DETAIL, {
                      id: row.id,
                      name: row.name,
                    });
                }}>
                  Ver detalle
                </Button>
                </div>

              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}