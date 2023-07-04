import React, { useState } from 'react';

const Info = ({competencia, tipo }) => {
  const [nombres, setNombres] = useState(competencia.name);
  const [apellidos, setApellidos] = useState(competencia.description);
  const [puesto, setPuesto] = useState(competencia.type);
  const [area, setArea] = useState(competencia.isActive);
  const handleSubmit = (event) => {
    event.preventDefault();
    const competenciaActualizada = {
      nombres: nombres,
      apellidos: apellidos,
      puesto: puesto,
      area: area,
    };
    setNombres('');
    setApellidos('');
    setPuesto('');
    setArea('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombres">Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombres"
          value={nombres}
          readOnly  
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellidos">Descripcion:</label>
        <input
          type="text"
          className="form-control"
          id="apellidos"
          value={apellidos}
          readOnly  
        />
      </div>
      <div className="form-group">
        <label htmlFor="puesto">Tipo Competencias:</label>
        <input
          type="text"
          className="form-control"
          id="puesto"
          value={tipo}
          readOnly  
        />
      </div>
      <div className="form-group">
        <label htmlFor="area">Activo:</label>
        <input
          type="text"
          className="form-control"
          id="area"
          value={area}
          readOnly  
        />
      </div>
    </form>
  );
};

export default Info;
