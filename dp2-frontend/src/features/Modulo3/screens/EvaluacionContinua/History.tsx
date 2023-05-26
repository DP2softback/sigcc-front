import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_HISTORY } from '@config/paths';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'
import PieChart from '@features/Modulo3/components/Charts/Piechart/PieChart';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableHistoryContinua from '@features/Modulo3/components/Tables/TableHistoryContinua';
import registros from '@features/Modulo3/jsons/HistoryContinua';

const History = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get('id');

  const filters = (
    <Form>
      <Form.Group controlId='searchEmployees' className='ec-indexFilters'>
        <InputGroup>
          <InputGroup.Text id='ec-indexSearch'>
            <Search/>
          </InputGroup.Text>
          <Form.Control placeholder='Buscar nivel' aria-describedby='ec-indexSearch'/>
        </InputGroup>
        <Form.Control type='date' placeholder='Fecha inicio' className='ec-indexFilterElement'/>
        <Form.Control type='date' placeholder='Fecha fin' className='ec-indexFilterElement'/>
        <Button variant='primary' className='ec-indexFilterElement'>Buscar</Button>
      </Form.Group>
    </Form>
  );

  const chart = (
    <div className='col-md-6 mb-32px'>
      <PieChart
        title={"Evaluaciones continuas"}
        labels={["Red", "Blue", "Yellow"]}
        datasets={[
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ]}
      />
    </div>
  );

  const table =(
    <div className='col-md-6'>
      <TableHistoryContinua rows ={registros}></TableHistoryContinua>
    </div>
  );
  const content = (
    <>
    {table}
    {chart}
    <div className="text-end mt-32 mb-4">
      <Button >
        Agregar nueva evaluación
      </Button>
    </div>
    </>
  )

  const body = (
    <Section title={'Evaluaciones'} content={content} filters={filters}/>
  )

  return (
    <div>
      <Layout
        title={'Evaluación continua - Angela Quispe Ramírez'}
        body={body}
        route={CONTINUOS_EVALUATION_HISTORY}
        subtitle='Evaluaciones continuas de Angela Quispe Ramírez.'
      />
    </div>
  );
};

export default History;