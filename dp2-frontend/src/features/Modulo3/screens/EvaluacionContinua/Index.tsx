import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import { Search } from 'react-bootstrap-icons'
import { Form, InputGroup, Button } from 'react-bootstrap';
import Employee from '@features/Modulo3/components/Cards/Employee/Employee';
import employees from '@features/Modulo3/jsons/Employees';

const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const Index = () => {
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

  const content = (
    <>
    {employees.map((employee) => {
      return (
        <div key={employee.id} className='col-md-4'>
          <Employee
            id={employee.id}
            name={employee.name}
            photoURL={examplePhoto}
            position={employee.position}
            lastEvaluation={employee.lastEvaluation}
            lastEvaluationUnit={employee.lastEvaluationUnit}
            area={employee.area}
            email={employee.email}
          />
        </div>
      );
    })}
    </>
  );

  const body = (
    <Section title={'Trabajadores'} content={content} filters={filters}/>
  );

  return (
    <div>
      <Layout
        title={'Evaluación continua'}
        body={body}
        subtitle='Evaluaciones continuas de trabajadores de los que te encuentras a cargo.'
      />
    </div>
  );
};

export default Index;