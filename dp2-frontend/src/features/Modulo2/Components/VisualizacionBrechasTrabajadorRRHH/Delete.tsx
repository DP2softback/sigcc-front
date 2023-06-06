import React, { useState } from 'react';

const DeleteCompetencia = ({ competencia, borrarCompetencia }) => {
  const [id, setId] = useState(competencia.id);
  const [nombre, setNombre] = useState(competencia.nombres);
  const [apellidos, setApellidos] = useState(competencia.apellidos);
  const [puesto, setPuesto] = useState(competencia.puesto);
  const [area, setArea] = useState(competencia.area);
  const [revisarCompetencias, setRevisarCompetencias] = useState(competencia.revisarCompetencias);
  const [telefono, setTelefono] = useState(competencia.telefono);
  const [estado, setEstado] = useState(competencia.estado);

  const handleSubmit = (event) => {
    event.preventDefault();
    borrarCompetencia(id);
    setId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <label className="form-control" id="nombre">
          {nombre}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Apellidos:</label>
        <label className="form-control" id="nombre">
          {apellidos}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="puesto">Puesto de trabajo:</label>
        <label className="form-control" id="puesto">
          {puesto}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="area">Área:</label>
        <label className="form-control" id="area">
          {area}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="revisarCompetencias">Revisar competencias:</label>
        <label className="form-control" id="revisarCompetencias">
          {revisarCompetencias}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <label className="form-control" id="telefono">
          {telefono}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado:</label>
        <label className="form-control" id="estado">
          {estado}
        </label>
      </div>
      <button type="submit" className="btn btn-danger">
        Borrar
      </button>
    </form>
  );
};

export default DeleteCompetencia;
