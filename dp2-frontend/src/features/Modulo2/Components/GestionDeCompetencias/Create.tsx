import React, { useState } from 'react';
import './Create.css';
type Competencia = {
  id: number;
  abreviatura: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};
const AgregarCompetencia = ({ agregarCompetencia }) => {
  const [id, setId] = useState('');
  const [abreviatura, setAbreviatura] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(null);

  const handleGuardar = () => {
    const nuevaCompetencia: Competencia = {
      id: parseInt(id),
      abreviatura: abreviatura,
      nombre: nombre,
      descripcion: descripcion,
      activo: activo,
    };
    agregarCompetencia(nuevaCompetencia);
  };

  return (
    <div className= "container-fluid">
      <div className="row first">

        <div className="col code">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="col">
          <div className='row'>
            <label htmlFor="tipo">Abreviatura:</label>
          </div>
          <select
            className='selectTipo'
            id="tipo"
            value={abreviatura}
            onChange={(e) => setAbreviatura(e.target.value)}
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
          <label htmlFor="estado">Activo:</label>
            <div className='row'>
            <div className='col'>
              <input
                type="radio"
                id="activo"
                name="estado"
                value="Activo"
                checked={activo == true}
                onChange={() => setActivo(true)}
              />

              <label htmlFor="activo">Activo</label>
            </div>
            <div className='col'>
              <input
                type="radio"
                id="inactivo"
                name="estado"
                value="Inactivo"
                checked={activo == false}
                onChange={() => setActivo(false)}
              />
              <label htmlFor="inactivo">Inactivo</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row third">
        <div className='col'>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="myTextarea"
            name="descripcion"
            placeholder="Ingrese la descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>      
      </div>
     

      <button className="btn btn-primary save" onClick={handleGuardar}>Guardar</button>

    </div>
  );
};

export default AgregarCompetencia;