import EnhancedHeaderTitle from "@components/EnhancedHeaderTitle";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {
	testSchema,
	testType,
	emailDefaults
} from "@features/Modulo4/models/Candidate.schema";
import DataTable from "react-data-table-component";
import CustomFormField from "@components/Form/InputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ConfigPosition = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<testType>({
		resolver: zodResolver(testSchema),
		defaultValues: emailDefaults
	});

	const onSubmit = (data: any) => {
		// Handle form submission\
		console.log(data);
	};

	return (
		<>
			<EnhancedHeaderTitle pageTitle="Crear posición">
				Configuración para la creación de una posición o puesto laboral
			</EnhancedHeaderTitle>
			<main>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Nombre de la oferta
					</Form.Label>
					<Col>
						<Form.Control type="text" placeholder="Oferta laboral" />
					</Col>
					<Col sm={3}>
						<Button className="w-100" style={{ marginTop: "1rem" }}>
							Buscar
						</Button>
					</Col>
				</Form.Group>
			</main>
		</>
	);
};

export default ConfigPosition;
