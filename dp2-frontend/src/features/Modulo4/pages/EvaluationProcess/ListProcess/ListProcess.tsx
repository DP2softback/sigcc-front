import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {LOCAL_CONNECTION, SAMPLE_TOKEN}  from '../../../utils/constants';
import axios from 'axios';

interface Process {
  id: number;
  start_date: string;
  end_date: string;
  order: number;
  name: string;
  description: string;
  creation_date: string;
  modified_date: string;
  is_active: boolean;
  position_similarity: string | null;
  hiring_process: number;
  areaxpositiondetail: Area;
  current_process_stage: Stage;
  available_positions_quantity: string
}

interface Area {
  area_name: string;
}

interface Stage {
  name: string;
  stage_type: string;
}

const TableComponent: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [processes, setProcesses] = useState<Process[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await axios.get(`${LOCAL_CONNECTION}/hiring-processes`,{
      headers: {
        Authorization: `Token ${SAMPLE_TOKEN}`
      }});
      const data = response.data;
      setProcesses(data);
    } catch (error) {
      console.error('Error fetching processes:', error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredData = processes.filter((process) =>
    process.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRowClick = (process: Process) => {
    localStorage.setItem('step', process.current_process_stage.stage_type);
    var value = process.current_process_stage.stage_type;
    navigate(`/selection-offers-and-positions/selection-process/step`+value+`/`);
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
              <td>{process.name}</td>
              <td>{process.areaxpositiondetail.area_name}</td>
              <td>{process.current_process_stage.name}</td>
              <td>{process.available_positions_quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
