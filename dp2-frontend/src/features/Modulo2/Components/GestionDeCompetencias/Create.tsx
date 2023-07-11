import React, { useState } from 'react';
import { Competencia, tipoCompetencia } from './Tipos';
import './Create.css';

type Props = {
  agregarCompetencia: (nuevaCompetencia: Competencia) => void;
  tipoCompetencias: tipoCompetencia[];
};

const AgregarCompetencia: React.FC<Props> = ({ agregarCompetencia, tipoCompetencias }) => {
  const [nuevaCompetencia, setNuevaCompetencia] = useState<Competencia>();
  const [name, setName] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNuevaCompetencia((prevCompetencia) => ({
      ...prevCompetencia,
      [name]: value,
    }));
  };
  console.log(tipoCompetencias)

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipoId = parseInt(e.target.value);
    console.log(selectedTipoId)
    const selectedTipoCompetencia = tipoCompetencias.find((tipo) => tipo.id === selectedTipoId);
    setNuevaCompetencia((prevCompetencia) => ({
      ...prevCompetencia,
      type: selectedTipoCompetencia?.id || 2,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    agregarCompetencia(nuevaCompetencia);
    setNuevaCompetencia({
      id: 0,
      code: '',
      name: '',
      description: '',
      type: 0,
      isActive: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='container-fluid'>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="name"
            value={nuevaCompetencia?.name || ''}
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
            value={nuevaCompetencia?.description || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="activo">Activo:</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="activo"
            name="isActive"
            checked={nuevaCompetencia?.isActive || false}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Competencia:</label>
          <select
            className="form-control"
            id="tipo"
            name="type"
            value={tipoCompetencias.find((tipo) => tipo.id === nuevaCompetencia?.type)?.id || 0}
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
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </div>
    </form>
  );
};

export default AgregarCompetencia;
