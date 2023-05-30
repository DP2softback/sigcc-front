import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button, Table, Modal  } from 'react-bootstrap';
import { Download,Upload,ArrowRightCircleFill,Pencil,Trash } from 'react-bootstrap-icons';
import { set } from 'zod';
import { useHref } from 'react-router-dom';
const GestionCompetencia = () => {
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState('Ángela Quispe Ramírez');
    const [cargoEmpleado, setCargoEmpleado] = useState('Supervisor - Ärea de TI');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    // Datos de ejemplo para la tabla
    const tablaHardcode = [
        { codigo: 'TEC000001', nombre: 'Liderazgo Técnico', tipo: 'Técnico', nivelActual: 'Bajo', nivelReq: 'Medio', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000002', nombre: 'Comunicación Efectiva', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelReq: 'Medio', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000003', nombre: 'Resolución de Problemas', tipo: 'Conocimiento', nivelActual: 'Alto', nivelReq: 'Alto', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000004', nombre: 'Trabajo en Equipo', tipo: 'Técnico', nivelActual: 'Medio', nivelReq: 'Alto', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000005', nombre: 'Creatividad e Innovación', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelReq: 'Bajo', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000006', nombre: 'Gestión del Tiempo', tipo: 'Conocimiento', nivelActual: 'Medio', nivelReq: 'Alto', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000007', nombre: 'Pensamiento Analítico', tipo: 'Técnico', nivelActual: 'Bajo', nivelReq: 'Medio', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000008', nombre: 'Negociación', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelReq: 'Alto', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000009', nombre: 'Planificación Estratégica', tipo: 'Conocimiento', nivelActual: 'Alto', nivelReq: 'Alto', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000010', nombre: 'Comunicación Interpersonal', tipo: 'Técnico', nivelActual: 'Bajo', nivelReq: 'Medio', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000011', nombre: 'Liderazgo de Equipos', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelReq: 'Alto', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000012', nombre: 'Resiliencia', tipo: 'Conocimiento', nivelActual: 'Alto', nivelReq: 'Medio', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000013', nombre: 'Adaptabilidad', tipo: 'Técnico', nivelActual: 'Medio', nivelReq: 'Bajo', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
        { codigo: 'TEC000014', nombre: 'Comunicación Escrita', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelReq: 'Bajo', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000015', nombre: 'Habilidades de Presentación', tipo: 'Conocimiento', nivelActual: 'Alto', nivelReq: 'Alto', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000016', nombre: 'Resolución de Conflictos', tipo: 'Técnico', nivelActual: 'Medio', nivelReq: 'Medio', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000017', nombre: 'Pensamiento Crítico', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelReq: 'Bajo', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000018', nombre: 'Empatía', tipo: 'Conocimiento', nivelActual: 'Medio', nivelReq: 'Medio', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000019', nombre: 'Toma de Decisiones', tipo: 'Técnico', nivelActual: 'Alto', nivelReq: 'Alto', brecha: 'No', observacion: 'Nivel requerido es alcanzado' },
        { codigo: 'TEC000020', nombre: 'Trabajo Bajo Presión', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelReq: 'Alto', brecha: 'Sí', observacion: 'Necesidad de curso de capacitación' },
      ];
      
    const [competenciasData, setCompetenciasData] = useState(tablaHardcode);
    const handleOrdenarPorCampo = (campo) => {
        // Si se hace clic en el mismo campo, cambia el tipo de orden
        if (campo === campoOrdenamiento) {
          setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
          setCampoOrdenamiento(campo);
          setTipoOrden('ascendente');
        }
      };
    // Obtiene los datos ordenados
      const datosFiltradosYOrdenados = competenciasData.sort((a, b) => {
        if (a[campoOrdenamiento] < b[campoOrdenamiento]) {
          return tipoOrden === 'ascendente' ? -1 : 1;
        }
        if (a[campoOrdenamiento] > b[campoOrdenamiento]) {
          return tipoOrden === 'ascendente' ? 1 : -1;
        }
        return 0;
      });
  
    const renderTablaCompetencias = () => {
        return (
            <Table striped bordered>
            <thead>
                <tr>
                    <th onClick={() => handleOrdenarPorCampo('codigo')}>
                    Código
                    {campoOrdenamiento === 'codigo' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('nombre')}>
                    Nombre
                    {campoOrdenamiento === 'nombre' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('tipo')}>
                    Tipo de competencia
                    {campoOrdenamiento === 'tipo' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('nivelActual')}>
                    Nivel actual
                    {campoOrdenamiento === 'nivelActual' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('nivelReq')}>
                    Nivel requerido
                    {campoOrdenamiento === 'nivelReq' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('brecha')}>
                    ¿Existe brecha?
                    {campoOrdenamiento === 'brecha' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('observacion')}>
                    Observación
                    {campoOrdenamiento === 'observacion' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                </tr>
            </thead>
            <tbody>
              {datosFiltradosYOrdenados.map((competencia, index) => (
                <tr key={index}>
                <td>{competencia.codigo}</td>
                <td>{competencia.nombre}</td>
                <td>{competencia.tipo}</td>
                <td>{competencia.nivelActual}</td>
                <td>{competencia.nivelReq}</td>
                <td>{competencia.brecha}</td>
                <td>{competencia.observacion}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      };
  return (
    <div className="pantalla">
      <div className='titles'>
      <h2>Competencias de empleado del área de TI</h2>
      <p className="text-muted">Competencias por empleado.</p>
      </div>
    <div className='container-fluid'>
    <img alt='Foto de perfil del empleado' src=''></img>
    <div>{nombreEmpleado}</div>
    <div>{cargoEmpleado}</div>
    </div>
      <div className='container-fluid'>
         {renderTablaCompetencias()}
      </div>
      <div className="col-sm-3 botones">
              <Button variant="outline-secondary" className="me-2" onClick={()=>{}}>
                Regresar
              </Button>
            </div>
    </div>
  );
};

export default GestionCompetencia;
