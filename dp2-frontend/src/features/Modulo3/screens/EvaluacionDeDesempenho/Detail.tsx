import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionDeDesempenho.css';
import BaseForm from './BaseForm';

type DetailProps = {
  employee: any;
  categories: any;
  projects: any;
  form: any;
}

const Detail = ({employee, categories, projects, form} : DetailProps) => {  
  return (
    <BaseForm
      employee={employee}
      categories={categories}
      projects={projects}
      form={form}
      isReadOnly={true}
    />
  );
};

export default Detail;