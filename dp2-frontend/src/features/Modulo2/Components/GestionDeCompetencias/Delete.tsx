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
      <div className="form-group">
        <label htmlFor="id">Codigo:</label>
        <input
          type="text"
          className="form-control"
          id="id"
          value={id}
        />
      </div>
      <button type="submit" className="btn btn-danger">
        Borrar
      </button>
    </form>
  );
};

export default BorrarCompetencia;