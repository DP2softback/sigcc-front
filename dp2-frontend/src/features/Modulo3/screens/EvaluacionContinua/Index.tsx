import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_INDEX, CONTINUOS_EVALUATION_HISTORY } from '@features/Modulo3/routes/path';
import { navigateTo, formatDashboardJson, formatNumber } from '@features/Modulo3/utils/functions';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import Employee from '@features/Modulo3/components/Cards/Employee/Employee';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { DAYS_UNIT } from '@features/Modulo3/utils/constants';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { getEmployees, getEmployeesEvaluationDashboard } from '@features/Modulo3/services/continuousEvaluation';
import { useEffect, useState } from 'react';

const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const Index = () => {
  const [employees, setEmployees] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getEmployees(5);
      if(response) setEmployees(response);

      const responseDashboard = await getEmployeesEvaluationDashboard(5);
      if(responseDashboard) setDashboard(formatDashboardJson(responseDashboard));

      setIsLoading(false);
    })();
  }, []);

  const filters = (
		<Form.Group
			controlId="searchEmployees"
			className="d-flex"
		>
			<InputGroup className="flex-grow-1 me-2">
				<InputGroup.Text id="ec-indexSearch">
					<Search />
				</InputGroup.Text>
				<Form.Control
					placeholder="Buscar trabajador o puesto"
					aria-describedby="ec-indexSearch"
				/>
			</InputGroup>
			<Form.Control
				type="date"
				placeholder="Fecha inicio"
				className="me-2"
			/>
			<Form.Control
				type="date"
				placeholder="Fecha fin"
				className="me-2"
			/>
			<Button variant="primary">Buscar</Button>
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
                navigateTo(CONTINUOS_EVALUATION_HISTORY, {
									id: employee.id,
									name: employee.name
								});
              }}>
              <Employee
                id={employee.id}
                name={employee.name}
                photoURL={examplePhoto}
                position={employee.position.name}
                code={formatNumber(employee.id)}
                lastEvaluation={employee.time_since_last_evaluation != null ? employee.time_since_last_evaluation : 'No realizada'}
                lastEvaluationUnit={employee.time_since_last_evaluation != null ? DAYS_UNIT : ''}
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
            navigateTo(CONTINUOS_EVALUATION_HISTORY, {
              id: employee.id,
              name: employee.name
            });
          }}>
          <Employee
            id={employee.id}
            name={employee.name}
            photoURL={examplePhoto}
            position={employee.position.name}
            code={formatNumber(employee.id)}
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
          title={'Evaluaciones continuas'}
          labelsX={dashboard.months}
          dataInfoprops={dashboard.data}/>
      )}
    </div>
  );

  const content =
    employees && employees.length > 0 ? (
      <div className='row mt-32'>
        {firstTwoEmployees}
        {chart}
        {restEmployees}
      </div>
    ) : (
      <NoDataFound/>
    );

  const body = (
    <Section
      title={"Trabajadores"}
      content={isLoading ? <LoadingScreen/> : content}
      filters={filters}
    />
  );

  return (
    <Layout
      title={"Evaluación continua"}
      body={body}
      subtitle="Evaluaciones continuas de trabajadores de los que te encuentras a cargo."
      route={CONTINUOS_EVALUATION_INDEX}
    />
  );
};

export default Index;