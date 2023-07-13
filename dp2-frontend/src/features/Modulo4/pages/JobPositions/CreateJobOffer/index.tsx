import PageContainer from "@components/PageContainer";
import { useState, useEffect } from "react";
import axios from "axios";
import EnhancedHeaderTitle from "@components/EnhancedHeaderTitle";
import CandidateRegisterForm from "./CandidateRegisterForm";
import { CreateJobOfferProvider } from "@features/Modulo4/contexts/CreateJobOfffer";
import { getStorageItem } from "@config/localStorage";
import MultiSelect from "@features/Modulo4/components/MultiSelect";
import SelectSingle from "@features/Modulo4/components/Select";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

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

const CreateJobOffer = () => {

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
	const [experience, setExperience] = useState<string>("");

	const navigate = useNavigate();

	const [selectedFormaciones, setSelectedFormaciones] = useState<number[]>(
		[]
	);

	const [selectedCapacidades, setSelectedCapacidades] = useState<number[]>(
		[]
	);

	const [selectedCompetencias, setSelectedCompetencias] = useState<number[]>(
		[]
	);

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
		axios.post('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/register-applicants-info',{
			"applicant": getStorageItem("applicant", false) || 1,
			"competencies": selectedCompetencias.concat(selectedCapacidades),    
			"training": selectedFormaciones,
			"experience": experience
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

	return (
		<>
			<EnhancedHeaderTitle pageTitle="Registro en oferta laboral">
				A continuacion, completa los siguientes datos
			</EnhancedHeaderTitle>

			<main>
			<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>
						Experiencia laboral
					</Form.Label>
					<Col>
						<Form.Control
							type="text"
							as="textarea"
							placeholder="Experiencia"
							rows={8}
							value={experience}
							onChange={(e) => setExperience(e.target.value)}
						/>
					</Col>
				</Form.Group>
			<h3 style={{ marginBottom: "2rem" }}>
					Formación Académica
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

<Col md={{ offset: 3, span: 6 }} style={{ marginTop: "2rem" }}>
					<Button style={{ width: "100%" }} onClick={handleClick}>
						Registrar
					</Button>
				</Col>
			</main>
		</>
	);
};

export default CreateJobOffer;
