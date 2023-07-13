import { useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import CreateJobOfferContext from "@features/Modulo4/contexts/CreateJobOfffer";
import CustomFormField from "@components/Form/InputForm";
import { CandidateInfoSchema } from "@features/Modulo4/models/Candidate.schema";
//testing
const ContactForm: React.FC = () => {
	const { currentControl } = useContext(CreateJobOfferContext);

	return (
		<Row style={{marginTop: '1.5rem'}}>
			<h1>Datos de contacto</h1>
			<Row>
				<Form.Group as={Col} md={6}>
					<Form.Label column>Nombres</Form.Label>
					<Col>
						<CustomFormField
							name="contact.names"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.names}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Col} md={6}>
					<Form.Label column>Apellidos</Form.Label>
					<Col>
						<CustomFormField
							name="contact.lastNames"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.lastNames}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Col} md={6}>
					<Form.Label column>Correo</Form.Label>
					<Col>
						<CustomFormField
							name="contact.email"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.email}
						/>
					</Col>
				</Form.Group>
        <Form.Group as={Col} md={6}>
					<Form.Label column>Dirección</Form.Label>
					<Col>
						<CustomFormField
							name="contact.address"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.address}
						/>
					</Col>
				</Form.Group>
        <Form.Group as={Col} md={6}>
					<Form.Label column>País</Form.Label>
					<Col>
						<CustomFormField
							name="contact.country"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.country}
						/>
					</Col>
				</Form.Group>
        <Form.Group as={Col} md={6}>
					<Form.Label column>Provincia</Form.Label>
					<Col>
						<CustomFormField
							name="contact.province"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.province}
						/>
					</Col>
				</Form.Group>
        <Form.Group as={Col} md={6}>
					<Form.Label column>Ciudad</Form.Label>
					<Col>
						<CustomFormField
							name="contact.city"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.city}
						/>
					</Col>
				</Form.Group>
        <Form.Group as={Col} md={6}>
					<Form.Label column>Código Postal</Form.Label>
					<Col>
						<CustomFormField
							name="contact.postalCode"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.postalCode}
						/>
					</Col>
				</Form.Group>
        <Form.Group as={Col} md={6}>
					<Form.Label column>Teléfono</Form.Label>
					<Col>
						<CustomFormField
							name="contact.phone"
							placeholder=""
							control={currentControl}
							rules={CandidateInfoSchema.shape.contact.shape.phone}
						/>
					</Col>
				</Form.Group>
			</Row>
		</Row>
	);
};

export default ContactForm;
