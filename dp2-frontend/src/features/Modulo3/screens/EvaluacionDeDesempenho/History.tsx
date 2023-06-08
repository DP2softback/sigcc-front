import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionDeDesempenho.css';
import { PERFORMANCE_EVALUATION_INDEX, PERFORMANCE_EVALUATION_CREATE } from '@features/Modulo3/routes/path';
import { navigateTo, formatDashboardJson, navigateBack } from '@features/Modulo3/utils/functions';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableHistoryContinua from '@features/Modulo3/components/Tables/TableHistoryContinua';
import { getEvaluationsHistory, getEmployeeEvaluationDashboard } from '@features/Modulo3/services/performanceEvaluation';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';

const History = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = parseInt(urlParams.get('id'));
  const [evaluations, setEvaluations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const responseEvaluation = await getEvaluationsHistory(employeeId);
      if(responseEvaluation) setEvaluations(responseEvaluation);

      const responseDashboard = await getEmployeeEvaluationDashboard(employeeId);
      if(responseDashboard) setDashboard(formatDashboardJson(responseDashboard));
      
      setIsLoading(false);
    })();
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
      <div className='container-mt-32px'>
      {dashboard && (
        <Linechart
          title={'Evaluaciones de desempeño'}
          labelsX={dashboard.months}
          dataInfoprops={dashboard.data}/>
      )}
      </div>

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
        <NoDataFound />
      )}
      <div className='text-end mb-4'>
        <Button
          variant='outline-primary me-2'
          onClick={() => {
            navigateBack();
          }}
        >
          Volver
        </Button>
        <Button
          onClick={() => {
            navigateTo(PERFORMANCE_EVALUATION_CREATE, { id: employeeId });
          }}
        >
          Agregar nueva evaluación
        </Button>
      </div>
    </>
  );

  const body = (
    <Section title={'Evaluaciones'} content={isLoading ? <LoadingScreen/> : content} filters={filters}/>
  );

  return (
    <div>
      <Layout
        title={'Evaluación de desempeño - Angela Quispe Ramírez'}
        body={body}
        route={PERFORMANCE_EVALUATION_INDEX}
        subtitle='Evaluaciones continuas de Angela Quispe Ramírez.'
      />
    </div>
  );
};

export default History;