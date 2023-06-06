import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {Competencia,tipoCompetencia} from './Tipos'

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
    <div>
      <p>¿Estás seguro de que deseas borrar la competencia "{competencia?.name}"?</p>
      <Button variant="danger" onClick={handleBorrarCompetencia}>
        Borrar
      </Button>
    </div>
  );
};

export default BorrarCompetencia;