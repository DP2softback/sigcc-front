import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

interface Process {
  id: number;
  name: string;
  status: string;
}

const testData: Process[] = [
  { id: 1, name: 'Proceso de selección 1', status: 'Completado' },
  { id: 2, name: 'Proceso de selección 2', status: 'En progreso' },
  { id: 3, name: 'Proceso de selección 3', status: 'Completado' },
  { id: 4, name: 'Proceso de selección 4', status: 'Pendiente' },
  { id: 5, name: 'Proceso de selección 5', status: 'En progreso' },
];

const TableComponent: React.FC = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredData = testData.filter((process) =>
    process.name.toLowerCase().includes(filter.toLowerCase())
  );

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
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((process) => (
            <tr key={process.id}>
              <td>{process.id}</td>
              <td>{process.name}</td>
              <td>{process.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
