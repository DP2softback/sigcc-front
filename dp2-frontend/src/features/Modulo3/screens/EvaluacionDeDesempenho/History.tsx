import { useEffect, useState } from 'react';
import './EvaluacionDeDesempenho.css';
import { PERFORMANCE_EVALUATION_INDEX, PERFORMANCE_EVALUATION_CREATE } from '@features/Modulo3/routes/path';
import { navigateTo, formatDashboardJson, obtenerFechaHaceUnAnio, obtenerFechaActual } from '@features/Modulo3/utils/functions';
import { Form, Button } from 'react-bootstrap';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { getEvaluationsHistory, getEmployeeEvaluationDashboard } from '@features/Modulo3/services/performanceEvaluation';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import ModalChooseTemplate from '@features/Modulo3/components/Modals/ModalChooseTemplate';
import TableHistoryDesempenho from '@features/Modulo3/components/Tables/TableHistoryDesempenho';
import { PERFORMANCE_EVALUATION_TYPE } from '@features/Modulo3/utils/constants';

const History = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  });
  const [evaluations, setEvaluations] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);
  const [filters, setFilters] = useState({
    employeeId: parseInt(urlParams.get('id')),
    fecha_inicio: obtenerFechaHaceUnAnio(),
    fecha_fin: obtenerFechaActual()
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const [responseEvaluation, responseDashboard] = await Promise.all([
          getEvaluationsHistory(filters),
          getEmployeeEvaluationDashboard(filters)
        ]);

        if (responseEvaluation) setEvaluations(responseEvaluation);
        if (responseDashboard) setDashboard(formatDashboardJson(responseDashboard));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
    setReload(false);
  }, [reload]);

  const filtersComponent = (
		<Form.Group controlId="searchEmployees" className="d-flex justify-content-end">
      <Form.Control
        type="date"
        className="me-2 w-auto"
        name='fecha_inicio'
        value={filters.fecha_inicio || ''}
        onChange={onFiltersChange}
      />
      <Form.Control
        type="date"
        className="me-2 w-auto"
        name='fecha_fin'
        value={filters.fecha_fin || ''}
        onChange={onFiltersChange}
      />
      <Button variant="primary"
        onClick={() => { setReload(true); }}>
        Buscar
      </Button>
		</Form.Group>
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
      <TableHistoryDesempenho rows ={evaluations} employee={employee}/>
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
      <div className='text-end'>
        <Button variant='outline-primary me-2' onClick={() => {navigateTo(PERFORMANCE_EVALUATION_INDEX);}}>
          Volver
        </Button>
        <Button onClick={() => {setShow(true);}}>
          Agregar nueva evaluación
        </Button>
      </div>
    </>
  );

  const body = (
    <Section
      title={"Evaluaciones"}
      content={isLoading ? <LoadingScreen/> : content}
      filters={filtersComponent}
    />
  );

  function onFiltersChange (e) {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
    }));
	}

  return (
		<div>
			<ModalChooseTemplate
				show={show}
				setShow={setShow}
				tipo={PERFORMANCE_EVALUATION_TYPE}
				employeeId={employee.id}
				employeeName={employee.name}
				navigate={PERFORMANCE_EVALUATION_CREATE}
			/>
			<Layout
				title={`Evaluación de desempeño - ${employee.name}`}
				body={body}
				route={PERFORMANCE_EVALUATION_INDEX}
				subtitle={`Evaluaciones de desempeño ${employee.name}.`}
			/>
		</div>
	);
};

export default History;