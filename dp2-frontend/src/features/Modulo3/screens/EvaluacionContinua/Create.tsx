import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import BaseForm from './BaseForm';

type CreateProps = {
  employee: any;
  categories: any;
  projects: any;
}

const Create = ({employee, categories, projects} : CreateProps) => {  
  return (
    <BaseForm 
      employee={employee} 
      categories={categories} 
      projects={projects}
      isReadOnly={false}
    />
  );
};

export default Create;