import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionDeDesempenho.css';
import { PERFORMANCE_EVALUATION_INDEX } from '@config/paths';
import { noDataFound } from '@features/Modulo3/utils/constants';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import Employee from '@features/Modulo3/components/Cards/Employee/Employee';
import PieChart from '@features/Modulo3/components/Charts/Piechart/PieChart';
import { useEffect, useState } from 'react';
import { getEmployees } from '@features/Modulo3/services/continuousEvaluation';
import { loadingScreen, DAYS_UNIT } from '@features/Modulo3/utils/constants.jsx';
import employeesJson from '@features/Modulo3/jsons/Employees';

const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const Index = () => {
  const [employees, setEmployees] = useState(employeesJson);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    // (async () => {
    //   setEmployees(await getEmployees(1));
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
          <Form.Control placeholder='Buscar trabajador o puesto' aria-describedby='ec-indexSearch'/>
        </InputGroup>
        <Form.Control type='date' placeholder='Fecha inicio' className='ec-indexFilterElement'/>
        <Form.Control type='date' placeholder='Fecha fin' className='ec-indexFilterElement'/>
        <Button variant='primary' className='ec-indexFilterElement'>Buscar</Button>
      </Form.Group>
    </Form>
  );

  const firstTwoEmployees = (
    <div className='ec-indexFirstTwoEmployees col-md-4 cursor-pointer'>
      {employees && employees.slice(0, 2).map((employee) => {
        return (
          <div key={employee.id} className='mb-32px'>
            <Employee
              id={employee.id}
              name={employee.name}
              photoURL={examplePhoto}
              position={employee.position.name}
              code={employee.id}
              lastEvaluation={employee.time_since_last_evaluation}
              lastEvaluationUnit={DAYS_UNIT}
              area={employee.area.name}
              email={employee.email}
            />
          </div>
        );
      })}
    </div>
  );

  const restEmployees = employees && employees.slice(2).map((employee) => {
    return (
      <div key={employee.id} className='col-md-4 mb-32px cursor-pointer'>
        <Employee
          id={employee.id}
          name={employee.name}
          photoURL={examplePhoto}
          position={employee.position.name}
          code={employee.id}
          lastEvaluation={employee.time_since_last_evaluation}
          lastEvaluationUnit={DAYS_UNIT}
          area={employee.area.name}
          email={employee.email}
        />
      </div>
    );
  });

  const chart = (
    <div className='col-md-8 mb-32px'>
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

  const content = employees &&
    employees.length > 0 ? (
      <>
        {firstTwoEmployees}
        {chart}
        {restEmployees}
      </>
    ) : (
      noDataFound
    );

  const body = (
    <Section title={'Trabajadores'} content={isLoading ? loadingScreen : content} filters={filters}/>
  );

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