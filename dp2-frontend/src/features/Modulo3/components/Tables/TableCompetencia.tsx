import {  Button, Table } from 'react-bootstrap';
import { formatDate, formatNumberWithTwoDecimals, navigateTo } from '@features/Modulo3/utils/functions';
import './TableHistory.css';
import { CATEGORIES_DETAIL } from '@features/Modulo3/routes/path';

export default function TableCompetencia({ rows, isReadOnly = false,setShow,setIdSubCat }) {
  function getBackgroundColor(categoryIndex: number) {
    return isReadOnly
      ? categoryIndex % 2 == 0
        ? 'bg-blueReadOnly'
        : 'bg-whiteReadOnly'
      : categoryIndex % 2 == 0
      ? 'bg-blue'
      : 'bg-white';
  }
  const handleEliminar = (idSubCategory)=>{
    setIdSubCat(idSubCategory)
    setShow(true);
    
  }

  return (
    <Table striped className='TableCategorie'>
      <thead className={`bg-white${isReadOnly ? 'ReadOnly' : ''}`}>
        <tr>
          <th className='categorie_name'>Nombre</th>
          <th>Competencia</th>
          <th className='text-end competencia'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowStyle = `matrixRow ${getBackgroundColor(index)}`;
          return (
            row.isActive === true?
            <tr key={row.idSubcategory} className={rowStyle}>
              <td className='categorie_name'>{row.nameSubCategory}</td>
              <td>Competencia</td>
              <td className='text-center'>                
                <div className='acciones'>
                <Button variant="outline-danger" className='accion' onClick={()=>handleEliminar(row.idSubcategory)}>
                  Eliminar
                </Button>
                </div>

              </td>
            </tr>:<tr key={row.idSubcategory}></tr>
          );
        })}
      </tbody>
    </Table>
  );
}
