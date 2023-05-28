import React, { useState } from 'react';
import './Create.css';

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
    <div className= "container-fluid">
      <div className="row first">

        <div className="col code">
          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div className="col">
          <div className='row'>
            <label htmlFor="tipo">Tipo:</label>
          </div>
          <select
            className='selectTipo'
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
      </div>
      <div className="row second">
        <div className='col'>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='col'>
          <label htmlFor="estado">Estado:</label>
            <div className='row'>
            <div className='col'>
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
            <div className='col'>
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
        </div>
      </div>
     

      <button className="btn btn-primary save" onClick={handleGuardar}>Guardar</button>

    </div>
  );
};

export default AgregarCompetencia;
