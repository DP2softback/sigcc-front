import React, { useState } from 'react';

const BorrarCompetencia = ({ competencia, borrarCompetencia }) => {
  const [id, setId] = useState(competencia.codigo);

  const handleSubmit = (event) => {
    event.preventDefault();
    borrarCompetencia(id);
    setId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-group">
        <label htmlFor="id">Codigo:</label>
        <label
          className="form-control"
          id="id"
        >id: {id}</label>
      </label>
      <button type="submit" className="btn btn-danger">
        Borrar
      </button>
    </form>
  );
};

export default BorrarCompetencia;