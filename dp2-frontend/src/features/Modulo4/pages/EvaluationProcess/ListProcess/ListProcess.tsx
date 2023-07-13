import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Process {
  id: number;
  position: string;
  area: string;
  currentStage: number;
  vacancies: number;
}

const testData: Process[] = [
  { id: 1, position: 'Desarrollador Frontend', area: 'Tecnología', currentStage: 3, vacancies: 2 },
  { id: 2, position: 'Desarrollador Backend', area: 'Tecnología', currentStage: 2, vacancies: 1 },
  { id: 3, position: 'Gerente de Proyectos', area: 'Gestión', currentStage: 4, vacancies: 3 },
  { id: 4, position: 'Diseñador UX/UI', area: 'Diseño', currentStage: 1, vacancies: 1 },
  { id: 5, position: 'Especialista en Marketing Digital', area: 'Marketing', currentStage: 2, vacancies: 2 },
];

const TableComponent: React.FC = () => {
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredData = testData.filter((process) =>
    process.position.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRowClick = (process: Process) => {
    localStorage.setItem('step', process.currentStage.toString());
    navigate(`/selection-offers-and-positions/selection-process/step`+process.currentStage.toString()+`/`);
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
      <Table striped bordered className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Posición</th>
            <th>Área</th>
            <th>Etapa Actual</th>
            <th>Cantidad de Vacantes</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((process) => (
            <tr key={process.id} onClick={() => handleRowClick(process)}>
              <td>{process.id}</td>
              <td>{process.position}</td>
              <td>{process.area}</td>
              <td>{process.currentStage}</td>
              <td>{process.vacancies}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
