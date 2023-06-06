import { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CreateJobOfferContext from "@features/Modulo4/contexts/CreateJobOfffer";
import CustomFormField from "@components/Form/InputForm";
import { CandidateJobSchema, CandidateJobDefaults } from "@features/Modulo4/models/Candidate.schema";
import { useFieldArray } from "react-hook-form";

const JobHistoryForm: React.FC = () => {
	const { currentControl } = useContext(CreateJobOfferContext);

	const { fields, append, remove } = useFieldArray({
		name: "jobs",
		control: currentControl
	});

	return (
		<Row style={{marginTop: '2.5rem'}}>
			<h1>Empleos</h1>
			{fields.map((field, index) => {
				return (
					<Row key={field.id}>
						<Form.Group as={Col} md={6}>
							<Form.Label column>Título del puesto</Form.Label>
							<Col>
                <CustomFormField
                  name={`jobs.${index}.title`}
                  placeholder=""
                  control={currentControl}
                  rules={CandidateJobSchema.shape.title}
                />
							</Col>
						</Form.Group>
						<Form.Group as={Col} md={6}>
							<Form.Label column>Compañía</Form.Label>
							<Col>
                <CustomFormField
                  name={`jobs.${index}.company`}
                  placeholder=""
                  control={currentControl}
                  rules={CandidateJobSchema.shape.company}
                />
							</Col>
						</Form.Group>
						<Form.Group as={Col} md={6}>
							<Form.Label column>Responsabilidades y Logros</Form.Label>
							<Col>
                <CustomFormField
                  name={`jobs.${index}.description`}
                  placeholder=""
                  control={currentControl}
                  rules={CandidateJobSchema.shape.description}
                />
							</Col>
						</Form.Group>
            <Col md={6} style={{ paddingTop: '2.75rem' }}>
              <Button variant="danger" type="button" style={{width: '100%', height: '100%'}} onClick={() => remove(index)}>Eliminar</Button>
            </Col> 
					</Row>
				);
			})}
      <Col md={{offset: 4, span: 4}} style={{ paddingTop: '2.75rem' }}>
			<Button
				type="button"
        variant="secondary"
        style={{width: '100%', height: '100%'}}
				onClick={() =>
					append(CandidateJobDefaults)
				}>
				Agregar experiencia laboral
			</Button>
      </Col>
		</Row>
	);
};

export default JobHistoryForm;
