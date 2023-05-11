import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Matrix from '@features/Modulo3/components/Matrix/Matrix';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Create = ({employee, categories, projects}) => {
  const aditionalSectionStyle = { width: "350px" };
  const aditionTitleStyle = { marginBottom: "20px" };
  const aditionContentStyle = { paddingLeft: "12px" };

  const evaluationCategory = (
    <Form.Select>
      <option>Seleccionar</option>
      {categories.map((category) => {
        return <option value={category.id} key={category.id}>{category.name}</option>
      })}
    </Form.Select>
  );

  const asociatedProject = (
    <Form.Select>
      <option>Seleccionar</option>
      {projects.map((project) => {
        return <option value={project.id} key={project.id}>{project.name}</option>
      })}
    </Form.Select>
  );

  const evaluation = (
    <Matrix
      header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
      rows={[
        "Liderazgo",
        "Comunicación",
        "Resolución de problemas",
        "Pensamiento crítico",
        "Trabajo en equipo",
      ]}
    />
  );

  const additionalComments = (
    <InputGroup>
      <Form.Control
        as="textarea"
        aria-label="With textarea"
        placeholder="Ingrese los comentarios o recomendaciones que crea conveniente"
        rows={3}
      />
    </InputGroup>
  );

  const body = (
    <>
      <div className="ec-createDropdowns">
        <div className="ec-createDropdown">
          <Section
            title={"Categoría de evaluación"}
            content={evaluationCategory}
            sectionStyle={aditionalSectionStyle}
            titleStyle={aditionTitleStyle}
            contentStyle={aditionContentStyle}
          />
        </div>
        <div className="ec-createDropdown">
          <Section
            title={"Proyecto asociado"}
            content={asociatedProject}
            sectionStyle={aditionalSectionStyle}
            titleStyle={aditionTitleStyle}
            contentStyle={aditionContentStyle}
          />
        </div>
      </div>
      <Section
        title={"Evaluación"}
        content={evaluation}
        titleStyle={aditionTitleStyle}
      />
      <Section
        title={"Comentarios adicionales"}
        content={additionalComments}
        titleStyle={aditionTitleStyle}
      />
    </>
  );
  
  return (
    <div>
      <Layout
        title={`Evaluación continua - ${employee.FullName}`}
        body={body}
        subtitle='Evaluaciones continuas de trabajadores de los que te encuentras a cargo.'
      />
    </div>
  );
};

export default Create;