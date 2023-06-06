import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_CREATE, CONTINUOS_EVALUATION_INDEX } from '@config/paths';
import { navigateTo, formatDashboardJson, navigateBack } from '@features/Modulo3/utils/functions';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableHistoryContinua from '@features/Modulo3/components/Tables/TableHistoryContinua';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import { getEvaluationsHistory, getEmployeeEvaluationDashboard } from '@features/Modulo3/services/continuousEvaluation';
import ModalChooseTemplate from '@features/Modulo3/components/Modals/ModalChooseTemplate';
import { CONTINUOS_EVALUATION_TYPE } from '@features/Modulo3/utils/constants';

const History = () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  const employeeId = parseInt(urlParams.get('id'));
  const employeeName = urlParams.get('name');

  const [evaluations, setEvaluations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show,setShow]=useState(false);
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
		<div className="col-md-6 mb-32px">
			<div className="container-mt-32px">
				{dashboard && (
					<Linechart
						title={"Evaluaciones continuas"}
						labelsX={dashboard.months}
						dataInfoprops={dashboard.data}
					/>
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
        <div className='row mt-32'>
          {table}
          {chart}
        </div>
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
            //navigateTo(CONTINUOS_EVALUATION_CREATE, { id: employeeId, name: employeeName });
            setShow(true);
          }}
        >
          Agregar nueva evaluación
        </Button>
      </div>
    </>
  );

  const body = (
    <Section
      title={"Evaluaciones"}
      content={isLoading ? <LoadingScreen/> : content}
      filters={filters}
    />
  );

  return (
    <div>
      <ModalChooseTemplate show={show} setShow={setShow} tipo={CONTINUOS_EVALUATION_TYPE} employeeId={employeeId} employeeName={employeeName}></ModalChooseTemplate>
      <Layout
        title={`Evaluación continua - ${employeeName}`}
        body={body}
        route={CONTINUOS_EVALUATION_INDEX}
        subtitle={`Evaluaciones continuas de ${employeeName}.`}
      />
    </div>
  );
};

export default History;