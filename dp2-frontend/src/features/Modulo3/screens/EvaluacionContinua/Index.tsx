import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_INDEX, CONTINUOS_EVALUATION_HISTORY } from '@config/paths';
import { navigateTo } from '@features/Modulo3/utils/functions.jsx';
import { noDataFound } from '@features/Modulo3/utils/constants';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import Employee from '@features/Modulo3/components/Cards/Employee/Employee';
import employeesJson from '@features/Modulo3/jsons/Employees';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { DAYS_UNIT } from '@features/Modulo3/utils/constants.jsx';
import { getEmployees } from '@features/Modulo3/services/continuousEvaluation';
import { useEffect, useState } from 'react';

const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const Index = () => {
  const [employees, setEmployees] = useState(employeesJson);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    // (async () => {
    //   setEmployees(await getEmployees(2));
    // })();
    setIsLoading(false);
  }, []);

  const filters = (
    <Form>
      <Form.Group controlId="searchEmployees" className="ec-indexFilters">
        <InputGroup>
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
          className="ec-indexFilterElement"
        />
        <Form.Control
          type="date"
          placeholder="Fecha fin"
          className="ec-indexFilterElement"
        />
        <Button variant="primary" className="ec-indexFilterElement">
          Buscar
        </Button>
      </Form.Group>
    </Form>
  );

  const firstTwoEmployees = (
    <div className="ec-indexFirstTwoEmployees col-md-4">
      {employees &&
        employees.slice(0, 2).map((employee) => {
          return (
            <div
              key={employee.id}
              className="mb-32px cursor-pointer"
              onClick={() => {
                navigateTo(CONTINUOS_EVALUATION_HISTORY, { id: employee.id });
              }}>
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

  const restEmployees =
    employees &&
    employees.slice(2).map((employee) => {
      return (
        <div
          key={employee.id}
          className="col-md-4 mb-32px cursor-pointer"
          onClick={() => {
            navigateTo(CONTINUOS_EVALUATION_HISTORY, { id: employee.id });
          }}>
          <Employee
            id={employee.id}
            name={employee.name}
            photoURL={examplePhoto}
            position={employee.position}
            code={employee.id}
            lastEvaluation={employee.lastEvaluation}
            lastEvaluationUnit={employee.lastEvaluationUnit}
            area={employee.area}
            email={employee.email}
          />
        </div>
      );
    });

  const chart = (
    <div className="col-md-8 mb-32px">
      <Linechart
        colorsLine={[
          "rgba(251,227,142,0.7)",
          "rgba(154,137,255,0.7)",
          "rgba(254,208,238,0.7)",
          "rgba(208,232,255,0.7)",
          "rgba(169,244,208,0.7)",
        ]}
        labelsX={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]}
        dataInfoprops={[
          {
            descripcion: "Precisión y exactitud en el trabajo realizado",
            values: [3, 2, 2, 1, 5, 5],
          },
          {
            descripcion: "Cumplimiento de los estándares de calidad",
            values: [1, 3, 2, 2, 3, 5],
          },
          {
            descripcion: "Trabajo completo y bien organizado",
            values: [4, 1, 3, 5, 3, 4],
          },
          {
            descripcion: "Identificación y corrección de errores y problemas",
            values: [2, 5, 1, 2, 3, 4],
          },
          {
            descripcion: "Cumplimiento de los plazos establecidos",
            values: [5, 3, 4, 3, 2, 5],
          },
        ]}></Linechart>
    </div>
  );

  const content =
    employees && employees.length > 0 ? (
      <>
        {firstTwoEmployees}
        {chart}
        {restEmployees}
      </>
    ) : (
      noDataFound
    );

  const body = (
    <Section
      title={"Trabajadores"}
      content={isLoading ? <></> : content}
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