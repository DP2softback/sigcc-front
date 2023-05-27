import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionDeDesempenho.css';
import { PERFORMANCE_EVALUATION_INDEX, PERFORMANCE_EVALUATION_CREATE } from '@config/paths';
import { navigateTo } from '@features/Modulo3/utils/functions.jsx';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'
import { loadingScreen, noDataFound } from '@features/Modulo3/utils/constants';
import PieChart from '@features/Modulo3/components/Charts/Piechart/PieChart';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableHistoryContinua from '@features/Modulo3/components/Tables/TableHistoryContinua';
import { newReg } from '@features/Modulo3/jsons/HistoryContinua';
import { getEmployees } from '@features/Modulo3/services/continuousEvaluation';

const History = () => {
  const [evaluations, setEvaluations] = useState(newReg);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    // (async () => {
    //   setEvaluations(await getEmployees(1));
    // })();
    setIsLoading(false);
  }, []);

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
      <TableHistoryContinua rows ={evaluations}></TableHistoryContinua>
    </div>
  );

  const content = (
    <>
      {evaluations && evaluations.length > 0 ? (
        <>
          {table}
          {chart}
        </>
      ) : (
        noDataFound
      )}
      <div
        className="text-end mt-32 mb-4"
        onClick={() => {
          navigateTo(PERFORMANCE_EVALUATION_CREATE, { id: 1 });
        }}>
        <Button>Agregar nueva evaluación</Button>
      </div>
    </>
  );

  const body = (
    <Section title={'Evaluaciones'} content={isLoading ? loadingScreen : content} filters={filters}/>
  );

  return (
    <div>
      <Layout
        title={'Evaluación continua - Angela Quispe Ramírez'}
        body={body}
        route={PERFORMANCE_EVALUATION_INDEX}
        subtitle='Evaluaciones continuas de Angela Quispe Ramírez.'
      />
    </div>
  );
};

export default History;