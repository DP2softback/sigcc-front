import PageContainer from "@components/PageContainer";
import EnhancedHeaderTitle from "@components/EnhancedHeaderTitle";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Layout from "@layout/default/index";
import {
	testSchema,
	testType,
	emailDefaults
} from "@features/Modulo4/models/Candidate.schema";
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

	console.log(emailDefaults);

	const onSubmit = (data: any) => {
		// Handle form submission\
		console.log(data);
	};

	return (
		<Layout title="Grupo 4 App" content="container">
			<PageContainer title="Create Job Position">
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
							<Button className="w-100">Buscar</Button>
						</Col>
					</Form.Group>
					<Form noValidate onSubmit={handleSubmit(onSubmit)}>
						<Form.Group as={Col}>
								<Form.Label column>Correo electronico</Form.Label>
							<Col>
								<CustomFormField
									name="email"
									placeholder=""
									control={control}
									rules={testSchema.shape.email}
								/>
							</Col>
						</Form.Group>
						<Button type="submit">Guardar</Button>
					</Form>
				</main>
			</PageContainer>
		</Layout>
	);
};

export default ConfigPosition;
