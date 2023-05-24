import React, { useState } from 'react';

const AgregarCompetencia = ({ agregarCompetencia }) => {
  const [codigo, setCodigo] = useState('');
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('');

  const handleGuardar = () => {
    const nuevaCompetencia = {
      codigo,
      tipo,
      nombre,
      estado
    };
    agregarCompetencia(nuevaCompetencia);
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="codigo">Código</label>
        <input
          type="text"
          id="codigo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Seleccionar tipo</option>
          <option value="Técnico">Técnico</option>
          <option value="Conocimiento">Conocimiento</option>
          <option value="Habilidades blandas">Habilidades blandas</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="estado">Estado</label>
        <div>
          <input
            type="radio"
            id="activo"
            name="estado"
            value="Activo"
            checked={estado === 'Activo'}
            onChange={() => setEstado('Activo')}
          />
          <label htmlFor="activo">Activo</label>
        </div>
        <div>
          <input
            type="radio"
            id="inactivo"
            name="estado"
            value="Inactivo"
            checked={estado === 'Inactivo'}
            onChange={() => setEstado('Inactivo')}
          />
          <label htmlFor="inactivo">Inactivo</label>
        </div>
      </div>
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

export default AgregarCompetencia;
