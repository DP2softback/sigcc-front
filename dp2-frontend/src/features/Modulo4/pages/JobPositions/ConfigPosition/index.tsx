import { useEffect, useState } from "react";
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
import MultiSelect from "@features/Modulo4/components/MultiSelect";
import SelectSingle from "@features/Modulo4/components/Select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getStorageItem } from "@config/localStorage";

type Area = {
	id: number;
	name: string;
};

type Modalidad = {
	id: number;
	name: string;
};

type Jornada = {
	id: number;
	name: string;
};

const Modalidades: Modalidad[] = [
	{
		id: 0,
		name: "Remoto"
	},
	{
		id: 1,
		name: "Hibrido"
	},
	{
		id: 2,
		name: "Presencial"
	}
];

const Jornadas: Jornada[] = [
	{
		id: 0,
		name: "Tiempo Completo"
	},
	{
		id: 1,
		name: "Tiempo Parcial"
	}
];

type Formacion = {
	id: number;
	training_literal: string;
};

type Competencia = {
	id: number;
	name: string;
};

type Capacidad = {
	id: number;
	name: string;
};

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

	const navigate = useNavigate();

	const onSubmit = (data: any) => {
		// Handle form submission\
		console.log(data);
	};

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [areas, setAreas] = useState<Area[]>([]);
	const [selectedArea, setSelectedArea] = useState<number>(null);
	const [selectedModalidad, setSelectedModalidad] = useState<string>("");
	const [selectedJornada, setSelectedJornada] = useState<string>("");
	const [formaciones, setFormaciones] = useState<Formacion[]>([]);
	const [competencias, setCompetencias] = useState<Competencia[]>([]);
	const [capacidades, setCapacidades] = useState<Capacidad[]>([]);
	const [selectedResponsabilities, setSelectedResponsabilities] = useState<string>("");

	const [selectedFormaciones, setSelectedFormaciones] = useState<number[]>(
		[]
	);

	const [selectedCapacidades, setSelectedCapacidades] = useState<number[]>(
		[]
	);

	const [selectedCompetencias, setSelectedCompetencias] = useState<number[]>(
		[]
	);

	const handleSelectFormaciones = (ids: number[]) => {
		setSelectedFormaciones(ids);
	};

	const handleSelectCapacidades = (ids: number[]) => {
		setSelectedCapacidades(ids);
	};

	const handleSelectCompetencias = (ids: number[]) => {
		setSelectedCompetencias(ids);
	};

	const handleClick = () => {
		axios.post('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/areaxposition',{
			"name": name,
			"description": description,
			"area": selectedArea,
			"job_modality": selectedModalidad,
			"workday_type": selectedJornada,
			"competencies": selectedCompetencias.concat(selectedCapacidades),    
			"training": selectedFormaciones,
			"responsabilities": selectedResponsabilities.split("\n")
	}, {
		headers: {
			Authorization: "Token " + getStorageItem("dp2-access-token", true)
		}
	}).then((res) => {
		setTimeout(() => {
			console.log("registro exitoso", selectedCompetencias.concat(selectedCapacidades))
			navigate("/selection-offers-and-positions/job-offers/list");
		}, 1500);
	}).catch((err) => console.error(err))
	};

	useEffect(() => {
		axios
			.get(
				"https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/areas",
				{
					headers: {
						Authorization: "Token " + getStorageItem("dp2-access-token", true)
					}
				}
			)
			.then((res) => setAreas(res.data));
			axios
			.get(
				"https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/training",
				{
					headers: {
						Authorization: "Token " + getStorageItem("dp2-access-token", true)
					}
				}
			)
			.then((res) => setFormaciones(res.data));
			axios
			.get(
				"https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/subcategory",
				{
					headers: {
						Authorization: "Token " + getStorageItem("dp2-access-token", true)
					}
				}
			)
			.then((res) => {
				setCompetencias(res.data.filter(a => a.type === 1))
				setCapacidades(res.data.filter(a => a.type === 0))
			});
	}, []);

	const handleSelectArea = (id: number) => setSelectedArea(id);

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
						<Form.Control
							type="text"
							placeholder="Nombre"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Descripcion del puesto
					</Form.Label>
					<Col>
						<Form.Control
							type="text"
							as="textarea"
							placeholder="Descripcion"
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Área de trabajo
					</Form.Label>
					<Col>
						{areas.length > 0 && (
							<SelectSingle
								options={areas}
								label="name"
								value="id"
								placeholder="Seleccionar area"
								handleSelectItem={handleSelectArea}
							/>
						)}
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Modalidad
					</Form.Label>
					<Col>
						<SelectSingle
							options={Modalidades}
							label={"name"}
							value={"id"}
							placeholder="Seleccionar modalidad"
							handleSelectItem={(id: number) =>
								setSelectedModalidad(Modalidades[id].name)
							}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Tipo de Jornada
					</Form.Label>
					<Col>
						<SelectSingle
							options={Jornadas}
							label={"name"}
							value={"id"}
							placeholder="Seleccionar jornada"
							handleSelectItem={(id: number) =>
								setSelectedJornada(Jornadas[id].name)
							}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Responsabilidades del puesto
					</Form.Label>
					<Col>
						<Form.Control
							type="text"
							as="textarea"
							placeholder="Responsabilidades"
							rows={4}
							value={selectedResponsabilities}
							onChange={(e) => setSelectedResponsabilities(e.target.value)}
						/>
					</Col>
				</Form.Group>

				<h3 style={{ marginBottom: "2rem" }}>
					Formación Académica para la posición
				</h3>
				{
					formaciones.length > 0 &&
					<MultiSelect
						options={formaciones}
						label="training_literal"
						value="id"
						placeholder="Seleccionar Formaciones"
						handleSelect={handleSelectFormaciones}
					/>
				}

				<h3 style={{ marginBottom: "2rem" }}>Competencias técnicas</h3>
				{
					capacidades.length > 0 && 
					<MultiSelect
						options={capacidades}
						label="name"
						value="id"
						placeholder="Seleccionar Capacidades"
						handleSelect={handleSelectCapacidades}
					/>
				}

				<h3 style={{ marginBottom: "2rem" }}>Competencias personales</h3>
				{
					competencias.length > 0 &&
					<MultiSelect
						options={competencias}
						label="name"
						value="id"
						placeholder="Seleccionar Competencias"
						handleSelect={handleSelectCompetencias}
					/>
				}

				{/* <h4 style={{ marginBottom: "2rem" }}>Competencias para la posición</h4>
				<Tags removeItemButton type="text" placeholder="Ingresar requisito" />
				<h4 style={{ marginBottom: "2rem" }}>Capacidades para la posición</h4>
				<Tags removeItemButton type="text" placeholder="Ingresar requisito" /> */}
				<Col md={{ offset: 3, span: 6 }} style={{ marginTop: "2rem" }}>
					<Button style={{ width: "100%" }} onClick={handleClick}>
						Registrar
					</Button>
				</Col>
			</main>
		</>
	);
};

export default ConfigPosition;
