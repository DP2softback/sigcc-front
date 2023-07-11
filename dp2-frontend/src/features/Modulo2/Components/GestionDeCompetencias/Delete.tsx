import React from 'react';
import { Button } from 'react-bootstrap';
import {Competencia} from './Tipos'

type Props = {
  borrarCompetencia: (id: number) => void;
  competencia: Competencia | null;
};

const BorrarCompetencia: React.FC<Props> = ({ borrarCompetencia, competencia }) => {
  const handleBorrarCompetencia = () => {
    if (competencia) {
      borrarCompetencia(competencia.id);
    }
  };

  return (
    <div className='container-fluid'>
      <p>¿Estás seguro de que deseas borrar la competencia "{competencia?.name}"?</p>
      <div className='espacio'>
        <Button variant="danger" onClick={handleBorrarCompetencia}>
          Borrar
        </Button>
      </div>
    </div>
  );
};

export default BorrarCompetencia;