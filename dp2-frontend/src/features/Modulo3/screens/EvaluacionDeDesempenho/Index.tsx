import './EvaluacionDeDesempenho.css';
import { PERFORMANCE_EVALUATION_INDEX, PERFORMANCE_EVALUATION_HISTORY } from '@features/Modulo3/routes/path';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import Employee from '@features/Modulo3/components/Cards/Employee/Employee';
import { useEffect, useState } from 'react';
import { getEmployees, getEmployeesEvaluationDashboard } from '@features/Modulo3/services/performanceEvaluation';
import { DAYS_UNIT, USER_ID } from '@features/Modulo3/utils/constants';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import { navigateTo, formatDashboardJson, formatEmployeeCode, obtenerFechaActual, obtenerFechaHaceUnAnio } from '@features/Modulo3/utils/functions';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';

const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const Index = () => {
  const [employees, setEmployees] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [filters, setFilters] = useState({
    bossId: USER_ID,
    employeeName: '',
    fecha_inicio: obtenerFechaHaceUnAnio(),
    fecha_fin: obtenerFechaActual()
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const [response, responseDashboard] = await Promise.all([
          getEmployees(filters),
          getEmployeesEvaluationDashboard(filters)
        ]);

        if (response) setEmployees(response);
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
		<Form.Group className="d-flex justify-content-end">
			<InputGroup className="w-auto me-2">
				<InputGroup.Text id="ec-indexSearch">
					<Search />
				</InputGroup.Text>
				<Form.Control
					placeholder="Buscar trabajador"
					aria-describedby="ec-indexSearch"
          name='employeeName'
          value={filters.employeeName || ''}
          onChange={onFiltersChange}
				/>
			</InputGroup>
			<Form.Control
				type="date"
				placeholder="Fecha inicio"
				className="me-2 w-auto"
        name='fecha_inicio'
        value={filters.fecha_inicio || ''}
        onChange={onFiltersChange}
			/>
			<Form.Control
				type="date"
				placeholder="Fecha fin"
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

  const firstTwoEmployees = (
    <div className="ec-indexFirstTwoEmployees col-md-4">
      {employees &&
        employees.slice(0, 1).map((employee) => {
          return (
            <div
              key={employee.id}
              className="mb-32px cursor-pointer"
              onClick={() => {
                navigateTo(PERFORMANCE_EVALUATION_HISTORY, { 
									id: employee.id,
									name: employee.name
								});
              }}>
              <Employee
                id={employee.id}
                name={employee.name}
                photoURL={examplePhoto}
                position={employee.position.name}
                code={formatEmployeeCode(employee.id)}
                lastEvaluation={employee.time_since_last_evaluation ? employee.time_since_last_evaluation : 'No realizada'}
                lastEvaluationUnit={employee.time_since_last_evaluation ? DAYS_UNIT : ''}
                area={employee.area.name}
                email={employee.email}
              />
            </div>
          );
        })}
    </div>
  );

  const restEmployees = (
    employees &&
    employees.slice(1).map((employee) => {
      return (
        <div
          key={employee.id}
          className="col-md-4 mb-32px cursor-pointer"
          onClick={() => {
            navigateTo(PERFORMANCE_EVALUATION_HISTORY, { 
              id: employee.id,
              name: employee.name
            });
          }}>
          <Employee
            id={employee.id}
            name={employee.name}
            photoURL={examplePhoto}
            position={employee.position.name}
            code={formatEmployeeCode(employee.id)}
            lastEvaluation={employee.time_since_last_evaluation != null ? employee.time_since_last_evaluation : 'No realizada'}
            lastEvaluationUnit={employee.time_since_last_evaluation != null ? DAYS_UNIT : ''}
            area={employee.area.name}
            email={employee.email}
          />
        </div>
      );
  }));

  const chart = (
    <div className="col-md-8 mb-32px">
      {dashboard && (
        <Linechart
          title={'Evaluaciones de desempeño'}
          labelsX={dashboard.months}
          dataInfoprops={dashboard.data}/>
      )}
    </div>
  );

  const content = (
    employees && employees.length > 0 ? (
      <div className='row mt-32'>
        {firstTwoEmployees}
        {chart}
        {restEmployees}
      </div>
    ) : (
      <NoDataFound/>
    )
  );

  const body = (
    <Section title={'Trabajadores'} content={isLoading ? <LoadingScreen/> : content} filters={filtersComponent}/>
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
      <Layout
        title={'Evaluación de desempeño'}
        body={body}
        route={PERFORMANCE_EVALUATION_INDEX}
        subtitle='Evaluaciones de desempeño de trabajadores de los que te encuentras a cargo.'
      />
    </div>
  );
};

export default Index;