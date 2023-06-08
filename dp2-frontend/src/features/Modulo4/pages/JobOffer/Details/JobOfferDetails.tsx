import axiosInt from "@config/axios";
import Sidebar from "@components/Sidebar";
import sidebarItems from "@features/Modulo1/utils/sidebarItems";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
	GeoFill,
	JournalBookmarkFill,
	InfoCircleFill,
	PeopleFill,
	DoorClosedFill,
	Calendar2EventFill,
	Calendar,
	Calendar2Event,
	People,
	ArrowLeftCircle,
	ArrowLeftCircleFill,
	ArrowRightCircle
} from "react-bootstrap-icons";
import EmployeeCard from "@features/Modulo1/components/EmployeeCard/EmployeeCard";
import "../basic.css";
import "../job-offer.css";
import PostulationModal from "./PostulationModal";

type JobDetail = {
	id: number;
	position_name: string;
	photoURL: string;
	offer_introduction: string;
	modified_date: string;
	location: string;
	salary_range: string;
	job_description: string;
	benefits: string;
	responsibilities: string;
	requirements: string;
	summary: string;
};

const datos: JobDetail[] = [
	{
		id: 1,
		position_name: "Desarrollador de software",
		photoURL:
			"https://www.becas-santander.com/content/dam/becasmicrosites/blog/metodolog%C3%ADas-de-desarrollo-de-software.jpg",
		offer_introduction:
			"Estamos buscando un desarrollador de software altamente motivado y creativo para unirse a nuestro equipo. Debes tener experiencia en lenguajes de programación como Java y Python, así como conocimientos en bases de datos y desarrollo web.",
		modified_date: "2023-07-01",
		location: "Av. Universitaria 1305 - San Miguel",
		salary_range: "$3000 - $4000",
		job_description:
			"Como desarrollador de software, serás responsable de escribir, modificar, probar y mantener el código de software para aplicaciones y sistemas. Colaborarás con otros miembros del equipo para diseñar soluciones técnicas y resolver problemas. Además, participarás en el desarrollo de nuevas funcionalidades y mejorarás la eficiencia de los sistemas existentes.",
		benefits:
			"Ofrecemos un ambiente de trabajo colaborativo y desafiante, oportunidades de aprendizaje y crecimiento profesional, horario flexible y un paquete de beneficios competitivo que incluye seguro de salud, bonos por desempeño y vacaciones pagadas.",
		responsibilities:
			"1. Escribir y mantener el código de software utilizando lenguajes de programación como Java y Python.\n2. Participar en el diseño y desarrollo de nuevas funcionalidades.\n3. Colaborar con el equipo para resolver problemas técnicos y mejorar la eficiencia de los sistemas existentes.\n4. Realizar pruebas de software y depuración para garantizar la calidad y la funcionalidad adecuada.\n5. Documentar el código y los procesos técnicos.",
		requirements:
			"1. Experiencia demostrable en el desarrollo de software utilizando lenguajes como Java y Python.\n2. Conocimientos sólidos en bases de datos y desarrollo web.\n3. Capacidad para trabajar en equipo y comunicarse de manera efectiva.\n4. Habilidades analíticas y capacidad para resolver problemas técnicos.\n5. Creatividad y capacidad para proponer soluciones innovadoras.\n6. Titulación universitaria en ciencias de la computación, ingeniería de software o campo relacionado.",
		summary:
			"Buscamos un desarrollador de software altamente motivado y creativo con experiencia en Java, Python, bases de datos y desarrollo web. Ofrecemos un ambiente de trabajo desafiante, oportunidades de crecimiento profesional y un paquete de beneficios competitivo."
	},
	{
		id: 2,
		position_name: "Diseñador gráfico",
		photoURL:
			"https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
		offer_introduction:
			"Estamos buscando un diseñador gráfico talentoso y apasionado para unirse a nuestro equipo. Debes tener experiencia en el uso de herramientas de diseño como Adobe Photoshop e Illustrator, así como una sólida comprensión de los principios del diseño.",
		modified_date: "2023-07-15",
		location: "Av. Universitaria 1305 - San Miguel",
		salary_range: "$2500 - $3500",
		job_description:
			"Como diseñador gráfico, serás responsable de crear y diseñar elementos visuales atractivos y efectivos para diversos proyectos. Trabajarás en estrecha colaboración con el equipo de marketing y otros departamentos para desarrollar diseños que transmitan mensajes claros y cumplan con los objetivos establecidos.",
		benefits:
			"Ofrecemos un entorno de trabajo estimulante y creativo, oportunidades para expresar tu talento artístico, flexibilidad horaria y un paquete de beneficios competitivo que incluye seguro de salud y vacaciones pagadas.",
		responsibilities:
			"1. Crear diseños gráficos, ilustraciones y otros elementos visuales utilizando herramientas como Adobe Photoshop e Illustrator.\n2. Colaborar con el equipo de marketing y otros departamentos para desarrollar diseños que cumplan con los objetivos del proyecto.\n3. Mantenerte actualizado(a) sobre las últimas tendencias y mejores prácticas en diseño gráfico.\n4. Asegurarte de que los diseños cumplan con los estándares de calidad y las pautas de la marca.\n5. Participar en reuniones de revisión y proporcionar retroalimentación constructiva.",
		requirements:
			"1. Experiencia demostrable en diseño gráfico y el uso de herramientas como Adobe Photoshop e Illustrator.\n2. Conocimiento sólido de los principios del diseño, como la composición, el color y la tipografía.\n3. Habilidad para trabajar en equipo y comunicarse de manera efectiva.\n4. Creatividad y capacidad para proponer ideas innovadoras.\n5. Titulación universitaria en diseño gráfico, artes visuales o campo relacionado.",
		summary:
			"Buscamos un diseñador gráfico talentoso y apasionado con experiencia en el uso de herramientas como Adobe Photoshop e Illustrator. Ofrecemos un entorno de trabajo creativo, flexibilidad horaria y un paquete de beneficios competitivo."
	},
	{
		id: 3,
		position_name: "Analista de datos",
		photoURL:
			"https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
		offer_introduction:
			"Estamos buscando un analista de datos con experiencia en el manejo de grandes conjuntos de datos. Debes tener habilidades en el uso de herramientas de análisis y visualización de datos como SQL, Python y Tableau.",
		modified_date: "2023-08-01",
		location: "Av. Universitaria 1305 - San Miguel",
		salary_range: "$3500 - $4500",
		job_description:
			"Como analista de datos, serás responsable de recopilar, analizar y visualizar grandes conjuntos de datos para proporcionar información valiosa a la empresa. Utilizarás herramientas de análisis y visualización de datos como SQL, Python y Tableau para extraer conocimientos y ayudar en la toma de decisiones.",
		benefits:
			"Ofrecemos un ambiente de trabajo dinámico y desafiante, oportunidades para desarrollar tus habilidades analíticas, flexibilidad horaria y un paquete de beneficios competitivo que incluye seguro de salud y bonos por desempeño.",
		responsibilities:
			"1. Recopilar y analizar grandes conjuntos de datos utilizando herramientas como SQL, Python y Tableau.\n2. Identificar patrones y tendencias en los datos para proporcionar información valiosa.\n3. Crear informes y visualizaciones claras y concisas para comunicar los resultados del análisis.\n4. Colaborar con otros equipos para comprender y abordar los desafíos analíticos.\n5. Mantenerte actualizado(a) sobre las mejores prácticas en análisis de datos y herramientas relacionadas.",
		requirements:
			"1. Experiencia demostrable en análisis de datos y el uso de herramientas como SQL, Python y Tableau.\n2. Conocimiento sólido de estadísticas y métodos de análisis de datos.\n3. Habilidad para comunicar de manera efectiva los resultados del análisis.\n4. Capacidad para trabajar en equipo y colaborar con otros departamentos.\n5. Titulación universitaria en estadística, ciencias de la computación o campo relacionado.",
		summary:
			"Buscamos un analista de datos con experiencia en el manejo de grandes conjuntos de datos y habilidades en herramientas como SQL, Python y Tableau. Ofrecemos un ambiente desafiante, oportunidades de desarrollo y un paquete de beneficios competitivo."
	},
	{
		id: 4,
		position_name: "Asistente administrativo",
		photoURL:
			"https://cdn-blog.hegel.edu.pe/blog/wp-content/uploads/2021/01/seguridad-y-salud-en-el-trabajo.jpg",
		offer_introduction:
			"Estamos buscando un asistente administrativo para brindar apoyo en tareas diarias. Debes tener habilidades organizativas, ser proactivo y tener conocimientos en el uso de herramientas de productividad como Microsoft Office.",
		modified_date: "2023-07-10",
		location: "Av. Universitaria 1305 - San Miguel",
		salary_range: "$2000 - $2500",
		job_description:
			"Como asistente administrativo, serás responsable de brindar apoyo en diversas tareas administrativas y de oficina. Te encargarás de la organización de documentos, la gestión de agenda, la coordinación de reuniones y otras actividades administrativas.",
		benefits:
			"Ofrecemos un ambiente de trabajo dinámico y colaborativo, oportunidades para desarrollar tus habilidades administrativas, horario flexible y un paquete de beneficios competitivo que incluye seguro de salud y bonos por desempeño.",
		responsibilities:
			"1. Organizar y gestionar documentos y archivos administrativos.\n2. Asistir en la coordinación de reuniones y eventos.\n3. Gestionar la agenda y los horarios del equipo.\n4. Realizar tareas administrativas como procesamiento de correos, preparación de informes y mantenimiento de registros.\n5. Colaborar con otros departamentos para garantizar la eficiencia y el flujo de trabajo adecuado.",
		requirements:
			"1. Habilidades organizativas y capacidad para priorizar tareas.\n2. Conocimiento en el uso de herramientas de productividad como Microsoft Office.\n3. Habilidad para trabajar en equipo y comunicarse de manera efectiva.\n4. Atención al detalle y capacidad para realizar tareas con precisión.\n5. Experiencia previa en roles administrativos es valorada.",
		summary:
			"Buscamos un asistente administrativo proactivo y organizado con conocimientos en herramientas de productividad como Microsoft Office. Ofrecemos un ambiente de trabajo dinámico, oportunidades de desarrollo y un paquete de beneficios competitivo."
	}
];

const JobOfferDetails = () => {
	const { trainingID } = useParams();
	const [training, setTraining] = useState<any>(datos);
	const [position, setPosition] = useState(0);
	const [prueba, setPrueba] = useState(0);
    const id = parseInt(localStorage.getItem("idOffer")) - 1;
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

	const handlePrevious = () => {
		if (position > 0) {
			setPosition(position - 3);
		}
	};

	const loadTrainingDetails = () => {};
    
    const handleSubmit = () => {
        setShowModal(false)
        navigate("/selection-offers-and-positions/job-offers/list");
    }



	useEffect(() => {
		loadTrainingDetails();
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					paddingLeft: "10px"
				}}>
				<div
					className="text-end"
					style={{ paddingRight: "1.5rem", flex: "0 0 auto" }}>
					<Link
						to={`/selection-offers-and-positions/job-offers/list`}
						className="float-right">
						<ArrowLeftCircleFill
							style={{ height: "32px", width: "32px", color: "black" }}
						/>
					</Link>
				</div>

				<div className="col">
					<h1 className="screenTitle">{"Detalle de la oferta laboral"}</h1>
					<p>
						<small className="subtitle">
							Descripción de la oferta, requisitos para el puesto y beneficios
							otorgados para el contratado.
						</small>
					</p>
				</div>
			</div>
			<div>
				<div className="row mt-3">
					<div className="col-12">
						<div className="card px-2">
							<div className="row">
								<div className="col-9">
									<h1>{datos[id].position_name}</h1>
									<div>Área de desarrollo de software</div>
								</div>
								<div className="col-3 text-end">
									<button type="button" className="btn btn-primary mt-2" onClick={()=>setShowModal(true)}>
										Postular
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-6">
						<div className="row-7 mt-2">
							<div className="card">
								<h3 className="px-1">Descripcion del puesto</h3>
								<div className="px-3">{datos[id].job_description}</div>
							</div>
						</div>
						<div className="row-7 mt-2">
							<div className="card">
								<h3 className="px-1">Responsabilidades</h3>
								<div className="px-3">
									{datos[id].responsibilities
										.split("\n")
										.map((element, index) => (
											<div key={index}>{element}</div>
										))}
								</div>
							</div>
						</div>
						<div className="row-7 mt-2">
							<div className="card">
								<h3 className="px-1">Requisitos</h3>
								<div className="px-3">
									{datos[0].requirements.split("\n").map((element, index) => (
										<div key={index}>{element}</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="row-5 mt-2">
							<div className="card">
								<h3 className="px-1">Beneficios</h3>
								<div className="px-3">{datos[id].benefits}</div>
							</div>
						</div>
						<div className="row-5 mt-2">
							<div className="card">
								<h3 className="px-1">Resumen</h3>
								<div className="px-3">{datos[id].summary}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
            <PostulationModal
       
        funcionPrincipal={() => handleSubmit()}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
		</>
	);
};

export default JobOfferDetails;
