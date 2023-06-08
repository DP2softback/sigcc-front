import React, { useState } from 'react';

const UpdateCompetencia = ({ actualizarCompetencia, competencia }) => {
  const [nombres, setNombres] = useState(competencia.nombres);
  const [apellidos, setApellidos] = useState(competencia.apellidos);
  const [puesto, setPuesto] = useState(competencia.puesto);
  const [area, setArea] = useState(competencia.area);
  const [revisarCompetencias, setRevisarCompetencias] = useState(competencia.revisarCompetencias);
  const [telefono, setTelefono] = useState(competencia.telefono);
  const [estado, setEstado] = useState(competencia.estado);

  const handleSubmit = (event) => {
    event.preventDefault();
    const competenciaActualizada = {
      nombres: nombres,
      apellidos: apellidos,
      puesto: puesto,
      area: area,
      revisarCompetencias: revisarCompetencias,
      telefono: telefono,
      estado: estado,
    };
    actualizarCompetencia(competenciaActualizada);
    setNombres('');
    setApellidos('');
    setPuesto('');
    setArea('');
    setRevisarCompetencias('');
    setTelefono('');
    setEstado('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombres">Nombres:</label>
        <input
          type="text"
          className="form-control"
          id="nombres"
          value={nombres}
          onChange={(event) => setNombres(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellidos">Apellidos:</label>
        <input
          type="text"
          className="form-control"
          id="apellidos"
          value={apellidos}
          onChange={(event) => setApellidos(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="puesto">Puesto de trabajo:</label>
        <input
          type="text"
          className="form-control"
          id="puesto"
          value={puesto}
          onChange={(event) => setPuesto(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="area">Área:</label>
        <input
          type="text"
          className="form-control"
          id="area"
          value={area}
          onChange={(event) => setArea(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="revisarCompetencias">Revisar competencias:</label>
        <input
          type="text"
          className="form-control"
          id="revisarCompetencias"
          value={revisarCompetencias}
          onChange={(event) => setRevisarCompetencias(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          className="form-control"
          id="telefono"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado:</label>
        <input
          type="text"
          className="form-control"
          id="estado"
          value={estado}
          onChange={(event) => setEstado(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Actualizar
      </button>
    </form>
  );
};

export default UpdateCompetencia;
