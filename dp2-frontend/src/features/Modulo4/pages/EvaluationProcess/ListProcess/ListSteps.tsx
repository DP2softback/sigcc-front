import { navigateBack } from '@features/Modulo3/utils/functions';
import React, { useState } from 'react';
import { Container, Form, Table, Button, Row, Col } from 'react-bootstrap';

interface Applicant {
  firstName: string;
  lastName: string;
  percentage: number;
}

const ApplicantList: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    { firstName: 'John', lastName: 'Doe', percentage: 80 },
    { firstName: 'Jane', lastName: 'Smith', percentage: 95 },
    { firstName: 'Michael', lastName: 'Johnson', percentage: 70 },
    { firstName: 'Emily', lastName: 'Davis', percentage: 85 },
  ]);
  const [nameFilter, setNameFilter] = useState('');
  const [percentageFilter, setPercentageFilter] = useState('');

  // Función para filtrar los postulantes
  const filterApplicants = () => {
    return applicants.filter((applicant) => {
      const fullName = `${applicant.firstName} ${applicant.lastName}`.toLowerCase();
      const filteredByName = nameFilter ? fullName.includes(nameFilter.toLowerCase()) : true;
      const filteredByPercentage = percentageFilter ? applicant.percentage.toString() >= percentageFilter : true;
      return filteredByName && filteredByPercentage;
    });
  };

  // Función para manejar cambios en el filtro de nombre
  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  // Función para manejar cambios en el filtro de porcentaje
  const handlePercentageFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPercentageFilter(event.target.value);
  };

  // Función para manejar el clic en el botón de filtrar
  const handleFilterButtonClick = () => {
    const filteredApplicants = filterApplicants();
    // Realizar acciones adicionales con los resultados filtrados si es necesario
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterApplicants();
  };

  const handleCloseStageButtonClick = () => {
    navigateBack()
  };

  return (
    <Container>
      <h1 className='mt-3'>Lista de Postulantes</h1>
      <Form onSubmit={handleFilterSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Control type="text" placeholder="Nombre" value={nameFilter} onChange={handleNameFilterChange} />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Porcentaje" value={percentageFilter} onChange={handlePercentageFilterChange} />
          </Col>
        </Row>
      </Form>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {filterApplicants().map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.firstName}</td>
              <td>{applicant.lastName}</td>
              <td>{applicant.percentage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button variant="danger" onClick={handleCloseStageButtonClick}>
          Cerrar Etapa
        </Button>
      </div>
    </Container>
  );
};

export default ApplicantList;
