import React, { useState } from 'react';
import {Competencia,tipoCompetencia} from './Tipos'
import './Update.css';

type Props = {
  actualizarCompetencia: (competenciaActualizada: Competencia) => void;
  competencia: Competencia | null;
  tipoCompetencias: tipoCompetencia[];
};

const ActualizarCompetencia: React.FC<Props> = ({ actualizarCompetencia, competencia, tipoCompetencias  }) => {
  const [competenciaActualizada, setCompetenciaActualizada] = useState(competencia);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setCompetenciaActualizada((prevCompetencia) => ({
      ...prevCompetencia,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = () => {
    if (competenciaActualizada) {
      actualizarCompetencia(competenciaActualizada);
    }
  };
  
  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipoId = parseInt(e.target.value);
    const selectedTipoCompetencia = tipoCompetencias.find((tipo) => tipo.id === selectedTipoId);
    setCompetenciaActualizada((prevCompetencia) => ({
      ...prevCompetencia,
      type: selectedTipoCompetencia?.id || 0,
    }));
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-fluid'>
      <div className="form-group">
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          className="form-control"
          id="codigo"
          name="code"
          value={competenciaActualizada?.code || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="name"
          value={competenciaActualizada?.name || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          className="form-control"
          id="descripcion"
          name="description"
          value={competenciaActualizada?.description || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="activo">Activo:</label>
        <input
          type="checkbox"
          className="form-check-input"
          id="activo"
          name="active"
          checked={competenciaActualizada?.active || false}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo de Competencia:</label>
        <select
          className="form-control"
          id="tipo"
          name="type"
          value={competenciaActualizada?.type || ''}
          onChange={handleTipoChange}
        >
          <option value="">Seleccionar tipo de competencia</option>
          {tipoCompetencias.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.name}
            </option>
          ))}
        </select>
      </div>
      
        <div className='espacio'>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </form>
  );
};

export default ActualizarCompetencia;