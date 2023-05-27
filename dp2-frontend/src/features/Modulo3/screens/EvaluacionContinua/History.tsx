import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_CREATE, CONTINUOS_EVALUATION_INDEX } from '@config/paths';
import { navigateTo } from '@features/Modulo3/utils/functions.jsx';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableHistoryContinua from '@features/Modulo3/components/Tables/TableHistoryContinua';
import { newReg } from '@features/Modulo3/jsons/HistoryContinua';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { loadingScreen, noDataFound } from '@features/Modulo3/utils/constants';
import { getEvaluationsHistory } from '@features/Modulo3/services/continuousEvaluation';

const History = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get('id');
  const [evaluations, setEvaluations] = useState(newReg);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    // (async () => {
    //   setEvaluations(await getEvaluationsHistory(employeeId));
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
    <div className='col-md-7 mb-32px'>
      {/* <PieChart
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
      /> */}
      <div className='container-mt-32px'>
      <Linechart
        colorsLine={[ 'rgba(251,227,142,0.7)', 'rgba(154,137,255,0.7)','rgba(254,208,238,0.7)','rgba(208,232,255,0.7)','rgba(169,244,208,0.7)']}
        labelsX={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']}
        dataInfoprops={[{descripcion : 'Precisión y exactitud en el trabajo realizado', values: [3, 2, 2, 1, 5, 5] },
        {descripcion : 'Cumplimiento de los estándares de calidad', values: [1, 3, 2, 2, 3, 5] }, 
        {descripcion : 'Trabajo completo y bien organizado', values: [4, 1, 3, 5, 3, 4] }, 
        {descripcion : 'Identificación y corrección de errores y problemas', values: [2, 5, 1, 2, 3, 4] }, 
        {descripcion : 'Cumplimiento de los plazos establecidos', values: [5, 3, 4, 3, 2, 5] }
        ]}
      ></Linechart>
      </div>

    </div>
  );

  const table =(
    <div className='col-md-5'>
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
        className="text-end mb-4"
        onClick={() => {
          navigateTo(CONTINUOS_EVALUATION_CREATE, { id: employeeId });
        }}>
        <Button>Agregar nueva evaluación</Button>
      </div>
    </>
  );

  const body = (
    <Section
      title={"Evaluaciones"}
      content={isLoading ? loadingScreen : content}
      filters={filters}
    />
  );

  return (
    <div>
      <Layout
        title={'Evaluación continua - Angela Quispe Ramírez'}
        body={body}
        route={CONTINUOS_EVALUATION_INDEX}
        subtitle='Evaluaciones continuas de Angela Quispe Ramírez.'
      />
    </div>
  );
};

export default History;