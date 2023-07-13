import { useState } from "react";
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

type Formacion = {
	id: number;
	name: string;
};

type Competencia = {
	id: number;
	name: string;
};

type Capacidad = {
	id: number;
	name: string;
};

type CarreraUniversitaria = {
	id: number;
	name: string;
};

type CarreraTecnica = {
	id: number;
	name: string;
};

type FrontEnd = {
	id: number;
	name: string;
};

type BackEnd = {
	id: number;
	name: string;
};

type BasesDeDatos = {
	id: number;
	name: string;
};

const Formaciones: Formacion[] = [
	{
		id: 1,
		name: "Carrera Universitaria"
	},
	{
		id: 2,
		name: "Carrera Tecnica"
	}
];

const CarrerasUniv: CarreraUniversitaria[] = [
	{
		id: 1,
		name: "Ingenieria Informatca"
	},
	{
		id: 2,
		name: "Ingenieria Industrial"
	},
	{
		id: 3,
		name: "Ciencias de la computacion"
	},
	{
		id: 4,
		name: "Contabilidad"
	},
	{
		id: 5,
		name: "Economia"
	},
	{
		id: 5,
		name: "Ingenieria de Sistemas"
	}
];

const CarrerasTec: CarreraTecnica[] = [
	{
		id: 1,
		name: "Computacion e informatica"
	},
	{
		id: 2,
		name: "Desarrollo web"
	},
	{
		id: 3,
		name: "Comunicacion audiovisual"
	}
];

const Capacidades: Capacidad[] = [
	{
		id: 1,
		name: "Lenguajes/Frameworks Frontend"
	},
	{
		id: 2,
		name: "Lenguajes/Frameworks Backend"
	},
	{
		id: 3,
		name: "Bases de datos"
	}
];

const Frontend: FrontEnd[] = [
	{
		id: 1,
		name: "Javascript"
	},
	{
		id: 2,
		name: "Typescript"
	},
	{
		id: 3,
		name: "HTML"
	},
	{
		id: 4,
		name: "CSS"
	},
	{
		id: 5,
		name: "JQuery"
	},
	{
		id: 6,
		name: "React"
	},
	{
		id: 7,
		name: "Angular"
	}
];

const Backend: BackEnd[] = [
	{
		id: 1,
		name: "Java"
	},
	{
		id: 2,
		name: "C#"
	},
	{
		id: 3,
		name: "C++"
	},
	{
		id: 4,
		name: "Spring Boot"
	},
	{
		id: 5,
		name: ".NET Framework"
	},
	{
		id: 6,
		name: "Node JS"
	},
	{
		id: 7,
		name: "Django Framework"
	}
];

const BasesDatos: BasesDeDatos[] = [
	{
		id: 1,
		name: "MariaDB"
	},
	{
		id: 2,
		name: "MySQL"
	},
	{
		id: 3,
		name: "Oracle DB"
	},
	{
		id: 4,
		name: "MS SQL Server"
	}
];

const Competencias: Competencia[] = [
	{
		id: 1,
		name: "Liderazgo"
	},
	{
		id: 2,
		name: "Comunicacion asertiva"
	},
	{
		id: 3,
		name: "Responsabilidad"
	},
	{
		id: 4,
		name: "Proactividad"
	},
	{
		id: 5,
		name: "Creatividad"
	}
];

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

	const [selectedFormaciones, setSelectedFormaciones] = useState<Formacion[]>(
		[]
	);
	const [selectedCarreras, setSelectedCarreras] = useState<
		CarreraUniversitaria[]
	>([]);
	const [selectedCarrerasTec, setSelectedCarrerasTec] = useState<
		CarreraTecnica[]
	>([]);

	const [selectedCapacidades, setSelectedCapacidades] = useState<Formacion[]>(
		[]
	);
	const [selectedFrontend, setSelectedFrontend] = useState<FrontEnd[]>([]);
	const [selectedBackend, setSelectedBackend] = useState<BackEnd[]>([]);
	const [selectedDatabases, setSelectedDatabases] = useState<BasesDeDatos[]>(
		[]
	);

	const handleSelectFormaciones = (ids: number[]) => {
		setSelectedFormaciones((prev) => {
			let newFormaciones: Formacion[] = [];
			newFormaciones = Formaciones.filter((f) => ids.includes(f.id));
			return newFormaciones;
		});
	};

	const handleSelectCarreras = (ids: number[]) => {
		setSelectedCarreras((prev) => {
			let newCarreras: CarreraUniversitaria[] = [];
			newCarreras = CarrerasUniv.filter((f) => ids.includes(f.id));
			return newCarreras;
		});
	};

	const handleSelectCarrerasTec = (ids: number[]) => {
		setSelectedCarrerasTec((prev) => {
			let newCarrerasTec: CarreraTecnica[] = [];
			newCarrerasTec = CarrerasTec.filter((f) => ids.includes(f.id));
			return newCarrerasTec;
		});
	};

	const handleSelectCapacidades = (ids: number[]) => {
		setSelectedCapacidades((prev) => {
			let newCapacidades: Capacidad[] = [];
			newCapacidades = Capacidades.filter((f) => ids.includes(f.id));
			return newCapacidades;
		});
	};

	const handleSelectFrontend = (ids: number[]) => {
		setSelectedFrontend((prev) => {
			let newCarreras: FrontEnd[] = [];
			newCarreras = Frontend.filter((f) => ids.includes(f.id));
			return newCarreras;
		});
	};

	const handleSelectBackend = (ids: number[]) => {
		setSelectedBackend((prev) => {
			let newCarrerasTec: BackEnd[] = [];
			newCarrerasTec = Backend.filter((f) => ids.includes(f.id));
			return newCarrerasTec;
		});
	};

	const handleSelectDataBases = (ids: number[]) => {
		setSelectedDatabases((prev) => {
			let newCarrerasTec: BasesDeDatos[] = [];
			newCarrerasTec = BasesDatos.filter((f) => ids.includes(f.id));
			return newCarrerasTec;
		});
	};

	const handleSelectCompetencias = (ids: number[]) => {

	}
	const handleClick = () => {
		setTimeout(() => {
			navigate("/selection-offers-and-positions/job-offers/list")
		}, 1500)
	}

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
						<Select removeItemButton onChange={(e) => console.log(e)}>
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

				<h3 style={{ marginBottom: "2rem" }}>
					Formación Académica para la posición
				</h3>
				<MultiSelect
					options={Formaciones}
					label="name"
					value="id"
					placeholder="Seleccionar Formaciones"
					handleSelect={handleSelectFormaciones}
				/>

				{selectedFormaciones.includes(Formaciones[0]) && (
					<Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
						<Row>
							<Form.Label required column sm={3}>
								Seleccione Carreas Universitarias
							</Form.Label>
							<Col>
								<MultiSelect
									options={CarrerasUniv}
									label="name"
									value="id"
									placeholder="Seleccionar"
									handleSelect={handleSelectCarreras}
								/>
							</Col>
						</Row>
						{selectedCarreras.map((c, index) => {
							return (
								<Row
									key={index}
									style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
									<Form.Label required column sm={3}>
										{c.name}
									</Form.Label>
									<Col>
										<Select removeItemButton>
											<option value="">Seleccionar un grado</option>
											<option value="1">Secundaria completa</option>
											<option value="2">Egresado</option>
											<option value="3">Bachiller</option>
											<option value="4">Titulo</option>
										</Select>
									</Col>
								</Row>
							);
						})}
					</Row>
				)}

				{selectedFormaciones.includes(Formaciones[1]) && (
					<Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
						<Row>
							<Form.Label required column sm={3}>
								Seleccione Carreas Tecnicas
							</Form.Label>
							<Col>
								<MultiSelect
									options={CarrerasTec}
									label="name"
									value="id"
									placeholder="Seleccionar"
									handleSelect={handleSelectCarrerasTec}
								/>
							</Col>
						</Row>
						{selectedCarrerasTec.map((c, index) => {
							return (
								<Row
									key={index}
									style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
									<Form.Label required column sm={3}>
										{c.name}
									</Form.Label>
									<Col>
										<Select removeItemButton>
											<option value="">Seleccionar un grado</option>
											<option value="1">Secundaria completa</option>
											<option value="2">Egresado</option>
										</Select>
									</Col>
								</Row>
							);
						})}
					</Row>
				)}

				<h3 style={{ marginBottom: "2rem" }}>Capacidades para la posición</h3>
				<MultiSelect
					options={Capacidades}
					label="name"
					value="id"
					placeholder="Seleccionar Capacidades"
					handleSelect={handleSelectCapacidades}
				/>

				{selectedCapacidades.includes(Capacidades[0]) && (
					<Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
						<Row>
							<Form.Label required column sm={3}>
								Seleccione Lenguajes/Frameworks FrontEnd
							</Form.Label>
							<Col>
								<MultiSelect
									options={Frontend}
									label="name"
									value="id"
									placeholder="Seleccionar"
									handleSelect={handleSelectFrontend}
								/>
							</Col>
						</Row>
						{selectedFrontend.map((c, index) => {
							return (
								<Row
									key={index}
									style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
									<Form.Label required column sm={3}>
										{c.name}
									</Form.Label>
									<Col>
										<Select removeItemButton>
											<option value="">Seleccionar un nivel</option>
											<option value="1">Basico</option>
											<option value="2">Intermedio</option>
											<option value="3">Avanzado</option>
										</Select>
									</Col>
								</Row>
							);
						})}
					</Row>
				)}

				{selectedCapacidades.includes(Capacidades[1]) && (
					<Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
						<Row>
							<Form.Label required column sm={3}>
								Seleccione Lenguajes/Frameworks BackEnd
							</Form.Label>
							<Col>
								<MultiSelect
									options={Backend}
									label="name"
									value="id"
									placeholder="Seleccionar"
									handleSelect={handleSelectBackend}
								/>
							</Col>
						</Row>
						{selectedBackend.map((c, index) => {
							return (
								<Row
									key={index}
									style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
									<Form.Label required column sm={3}>
										{c.name}
									</Form.Label>
									<Col>
										<Select removeItemButton>
											<option value="">Seleccionar un nivel</option>
											<option value="1">Basico</option>
											<option value="2">Intermedio</option>
											<option value="3">Avanzado</option>
										</Select>
									</Col>
								</Row>
							);
						})}
					</Row>
				)}

{selectedCapacidades.includes(Capacidades[2]) && (
					<Row style={{ marginTop: "1rem", marginBottom: "1rem" }}>
						<Row>
							<Form.Label required column sm={3}>
								Seleccione Bases de datos
							</Form.Label>
							<Col>
								<MultiSelect
									options={BasesDatos}
									label="name"
									value="id"
									placeholder="Seleccionar"
									handleSelect={handleSelectDataBases}
								/>
							</Col>
						</Row>
						{selectedDatabases.map((c, index) => {
							return (
								<Row
									key={index}
									style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
									<Form.Label required column sm={3}>
										{c.name}
									</Form.Label>
									<Col>
										<Select removeItemButton>
											<option value="">Seleccionar un nivel</option>
											<option value="1">Basico</option>
											<option value="2">Intermedio</option>
											<option value="3">Avanzado</option>
										</Select>
									</Col>
								</Row>
							);
						})}
					</Row>
				)}

<h3 style={{ marginBottom: "2rem" }}>
					Competencias para la posición
				</h3>
				<MultiSelect
					options={Competencias}
					label="name"
					value="id"
					placeholder="Seleccionar Competencias"
					handleSelect={handleSelectCompetencias}
				/>

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
