import React, { useState } from 'react';

const ActualizarCompetencia = ({ actualizarCompetencia, competencia }) => {
  const [id, setId] = useState(competencia.codigo);
  const [nombre, setNombre] = useState(competencia.nombre);
  const [descripcion, setDescripcion] = useState(competencia.descripcion);

  const handleSubmit = (event) => {
    event.preventDefault();
    actualizarCompetencia({ codigo: id, nombre: nombre, asignadoAPuesto: competencia.asignadoAPuesto, estado:competencia.estado, tipo: competencia.tipo });
    setId('');
    setNombre('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          className="form-control"
          id="id"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          className="form-control"
          id="descripcion"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Actualizar
      </button>
    </form>
  );
};

export default ActualizarCompetencia;