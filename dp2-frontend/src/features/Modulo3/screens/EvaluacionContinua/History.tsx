import { useEffect, useState } from 'react';
import './EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_CREATE, CONTINUOS_EVALUATION_INDEX } from '@features/Modulo3/routes/path';
import { formatDashboardJson, navigateTo } from '@features/Modulo3/utils/functions';
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

  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  });
  const [evaluations, setEvaluations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show,setShow] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const responseEvaluation = await getEvaluationsHistory(employee.id);
      if(responseEvaluation) setEvaluations(responseEvaluation);

      const responseDashboard = await getEmployeeEvaluationDashboard(employee.id);
      if(responseDashboard) setDashboard(formatDashboardJson(responseDashboard));
      
      setIsLoading(false);
    })();
  }, []);

  const filters = (
		<Form.Group controlId="searchEmployees" className="d-flex justify-content-end">
			<Form.Control
				type="date"
				placeholder="Fecha inicio"
				className="me-2 w-auto"
			/>
			<Form.Control
				type="date"
				placeholder="Fecha fin"
				className="me-2 w-auto"
			/>
			<Button variant="primary">Buscar</Button>
		</Form.Group>
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
      <TableHistoryContinua rows ={evaluations} employee={employee}/>
    </div>
  );

  const content = (
		<>
			{evaluations && evaluations.length > 0 ? (
				<div className="row mt-32">
					{table}
					{chart}
				</div>
			) : (
				<NoDataFound />
			)}
			<div className="text-end">
				<Button
					variant="outline-primary me-2"
					onClick={() => {
						navigateTo(CONTINUOS_EVALUATION_INDEX);
					}}>
					Volver
				</Button>
				<Button
					onClick={() => {
						setShow(true);
					}}>
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
			<ModalChooseTemplate
				show={show}
				setShow={setShow}
				tipo={CONTINUOS_EVALUATION_TYPE}
				employeeId={employee.id}
				employeeName={employee.name}
        navigate={CONTINUOS_EVALUATION_CREATE}/>
			<Layout
				title={`Evaluación continua - ${employee.name}`}
				body={body}
				route={CONTINUOS_EVALUATION_INDEX}
				subtitle={`Evaluaciones continuas de ${employee.name}.`}
			/>
		</div>
	);
};

export default History;