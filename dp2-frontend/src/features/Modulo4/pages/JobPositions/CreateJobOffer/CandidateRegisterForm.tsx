import { useState, useEffect, useContext } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
	CandidateInfoSchema,
	CandidateForm,
	CandidateDefaults
} from "@features/Modulo4/models/Candidate.schema";
import ContactForm from "./ContactForm";
import CreateJobOfferContext from "@features/Modulo4/contexts/CreateJobOfffer";
import JobHistoryForm from "./JobHistoryForm";

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

const CandidateRegisterForm: React.FC = () => {
	const { currentControl, setCurrentControl } = useContext(
		CreateJobOfferContext
	);
	const navigate = useNavigate();

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
		navigate("/selection-offers-and-positions/job-offers/list");
	};

	useEffect(() => {
		setCurrentControl(control);
	}, [control]);

	const [selectedFormaciones, setSelectedFormaciones] = useState<Formacion[]>(
		[{
			id: 1,
			name: "Carrera Universitaria"
		}]
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
