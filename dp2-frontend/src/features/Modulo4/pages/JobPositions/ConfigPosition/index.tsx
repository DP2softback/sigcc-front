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
import Select from "@components/Select";
import Tags from "@components/Tags";

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
						Nombre del puesto
					</Form.Label>
					<Col>
						<Form.Control type="text" placeholder="Oferta laboral" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Área de trabajo
					</Form.Label>
					<Col>
						<Form.Control type="text" placeholder="Área de trabajo" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
					Modalidad
					</Form.Label>
					<Col>
							<Select removeItemButton>
								<option value="">Seleccionar una modalidad de trabajo</option>
								<option value="1">Remoto</option>
								<option value="2">Hibrido</option>
								<option value="3">Presencial</option>
						</Select>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Tipo de Jornada
					</Form.Label>
					<Col>
						<Select removeItemButton>
								<option value="">Seleccionar un tipo de jornada</option>
								<option value="1">Jornada laboral a tiempo completo</option>
								<option value="2">Jornada laboral a tiempo parcial</option>
								<option value="3">Jornada de trabajo continua</option>
								<option value="4">Jornada laboral parcial por horas</option>
						</Select>
					</Col>
				</Form.Group>
				<h4 style={{marginBottom: '2rem'}}>Requisitos OBLIGATORIOS para la posición</h4>
				<Tags on removeItemButton type="text" placeholder="Ingresar requisito"/>
				<h4 style={{marginBottom: '2rem'}}>Requisitos OPCIONALES para la posición</h4>
				<Tags removeItemButton type="text" placeholder="Ingresar requisito"/>
				<h4 style={{marginBottom: '2rem'}}>Habilidades para la posición</h4>
				<Tags removeItemButton type="text" placeholder="Ingresar requisito"/>
				<Col md={{ offset: 3, span: 6 }} style={{ marginTop: '2rem' }}>
					<Button type="submit" style={{width: '100%'}}>Registrar</Button>
				</Col>
			</main>
		</>
	);
};

export default ConfigPosition;
