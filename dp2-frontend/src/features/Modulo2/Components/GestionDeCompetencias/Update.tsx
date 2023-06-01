import { useState } from 'react';
import { Form } from 'react-bootstrap';
type Competencia = {
  id: number;
  abreviatura: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};
type Props = {
  competencia: Competencia;
  actualizarCompetencia: Function;
};
const ActualizarCompetencia = ({ actualizarCompetencia, competencia }) => {
  const [abreviatura, setAbreviatura] = useState(competencia.abreviatura);
  const [nombre, setNombre] = useState(competencia.nombre);
  const [descripcion, setDescripcion] = useState(competencia.descripcion);
  const [activo, setActivo] = useState(competencia.activo);

  const handleSubmit = (event) => {
    event.preventDefault();
    competencia = { id: competencia.id, nombre: nombre, abreviatura: abreviatura, descripcion:descripcion, activo: activo }
    console.log(competencia);
    actualizarCompetencia(competencia);
    setNombre('');
    setDescripcion('');
  };

  return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAbreviatura">
            <Form.Label>Abreviatura</Form.Label>
            <Form.Control type="text" value={abreviatura} onChange={(event) => setAbreviatura(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formActivo">
            <Form.Check type="checkbox" label="Activo" checked={activo} onChange={(event) => setActivo(event.target.checked)} />
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </Form>
  );
};

export default ActualizarCompetencia;