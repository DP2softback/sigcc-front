import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Process {
  id: number;
  name: string;
  position: string;
  area: string;
  currentStage: number;
}

const testData: Process[] = [
  { id: 1, name: 'Entrevista inicial con candidato A', position: 'Desarrollador Frontend', area: 'Tecnología', currentStage: 3 },
  { id: 2, name: 'Evaluación técnica del candidato B', position: 'Desarrollador Backend', area: 'Tecnología', currentStage: 2 },
  { id: 3, name: 'Evaluación de habilidades blandas del candidato C', position: 'Gerente de Proyectos', area: 'Gestión', currentStage: 4 },
  { id: 4, name: 'Entrevista final con el candidato D', position: 'Diseñador UX/UI', area: 'Diseño', currentStage: 1 },
  { id: 5, name: 'Revisión de referencias del candidato E', position: 'Especialista en Marketing Digital', area: 'Marketing', currentStage: 2 },
];

const TableComponent: React.FC = () => {
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredData = testData.filter((process) =>
    process.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRowClick = (process: Process) => {
    // Aquí puedes establecer la ruta a la que deseas redirigir
    localStorage.setItem("step",process.currentStage.toString())
    navigate(`/selection-offers-and-positions/selection-process/step/`);
    
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="filterForm">
          <Form.Control
            type="text"
            placeholder="Filtrar por nombre de proceso"
            value={filter}
            onChange={handleFilterChange}
          />
        </Form.Group>
      </Form>
      <Table striped bordered className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Área</th>
            <th>Etapa Actual</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((process) => (
            <tr key={process.id} onClick={() => handleRowClick(process)}>
              <td>{process.id}</td>
              <td>{process.name}</td>
              <td>{process.position}</td>
              <td>{process.area}</td>
              <td>{process.currentStage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
