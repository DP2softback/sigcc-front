import { useEffect, useContext } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CandidateInfoSchema,
	CandidateForm,
	CandidateDefaults
} from "@features/Modulo4/models/Candidate.schema";
import ContactForm from "./ContactForm";
import CreateJobOfferContext from "@features/Modulo4/contexts/CreateJobOfffer";
import JobHistoryForm from "./JobHistoryForm";

const CandidateRegisterForm: React.FC = () => {
	const { currentControl, setCurrentControl } = useContext(
		CreateJobOfferContext
	);

	const {
		handleSubmit,
		control
	} = useForm<CandidateForm>({
		resolver: zodResolver(CandidateInfoSchema),
		defaultValues: CandidateDefaults
	});

	const onSubmit = (data: CandidateForm): void => {
		console.log("data: ");
		console.log(data);
	};

	useEffect(() => {
		setCurrentControl(control);
	}, [control]);

	return (
		<Form noValidate onSubmit={handleSubmit(onSubmit)}>
			{currentControl && <>
        <ContactForm />
        <JobHistoryForm />
      </>}
			<Col md={{ offset: 3, span: 6 }} style={{ marginTop: '2rem' }}>
        <Button type="submit" style={{width: '100%'}}>Registrar</Button>
      </Col>
		</Form>
	);
};

export default CandidateRegisterForm;
