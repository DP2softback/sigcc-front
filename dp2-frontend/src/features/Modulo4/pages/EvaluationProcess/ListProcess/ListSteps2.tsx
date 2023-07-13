import { navigateBack } from "@features/Modulo3/utils/functions";
import React, { useState } from "react";
import { Container, Form, Table, Button, Row, Col } from "react-bootstrap";
import {LOCAL_CONNECTION, SAMPLE_TOKEN}  from '../../../utils/constants';
import axios from 'axios';

interface Applicant {
	firstName: string;
	lastName: string;
	percentage: number;
}

const ApplicantList: React.FC = () => {
	const [applicants, setApplicants] = useState<Applicant[]>([
		{ firstName: "John", lastName: "97%", percentage: 80 },
		{ firstName: "Jane", lastName: "97%", percentage: 95 },
		{ firstName: "Michael", lastName: "97%", percentage: 70 },
		{ firstName: "Emily", lastName: "97%", percentage: 85 },
		{ firstName: "John", lastName: "97%", percentage: 80 },
		{ firstName: "Jane", lastName: "97%", percentage: 95 },
		{ firstName: "Michael", lastName: "97%", percentage: 70 },
		{ firstName: "Emily", lastName: "97%", percentage: 85 },
		{ firstName: "John", lastName: "97%", percentage: 80 },
		{ firstName: "Jane", lastName: "97%", percentage: 95 },
		{ firstName: "Michael", lastName: "97%", percentage: 70 },
		{ firstName: "Emily", lastName: "97%", percentage: 85 },
		{ firstName: "John", lastName: "97%", percentage: 80 },
		{ firstName: "Jane", lastName: "97%", percentage: 95 },
		{ firstName: "Michael", lastName: "97%", percentage: 70 },
		{ firstName: "Emily", lastName: "97%", percentage: 85 }
	]);
	const [nameFilter, setNameFilter] = useState("");
	const [percentageFilter, setPercentageFilter] = useState("");
	var value = localStorage.getItem("screen");
	var id = localStorage.getItem("id");

	// Función para filtrar los postulantes
	const filterApplicants = () => {
		return applicants.filter((applicant) => {
			const fullName =
				`${applicant.firstName} ${applicant.lastName}`.toLowerCase();
			const filteredByName = nameFilter
				? fullName.includes(nameFilter.toLowerCase())
				: true;
			const filteredByPercentage = percentageFilter
				? applicant.percentage.toString() >= percentageFilter
				: true;
			return filteredByName && filteredByPercentage;
		});
	};

	// Función para manejar cambios en el filtro de nombre
	const handleNameFilterChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNameFilter(event.target.value);
	};

	// Función para manejar cambios en el filtro de porcentaje
	const handlePercentageFilterChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPercentageFilter(event.target.value);
	};

	// Función para manejar el clic en el botón de filtrar
	const handleFilterButtonClick = () => {
		const filteredApplicants = filterApplicants();
		// Realizar acciones adicionales con los resultados filtrados si es necesario
	};

	async function realizarPost() {

		const json = {  
			"successful_applicant_ids":[1,2,3],
			"unsuccessful_applicant_ids":[]
		}
		axios.put(`${LOCAL_CONNECTION}/process-stages/`+value, json, {
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		}).then((response) => {
			console.log("FILTRADO COMPLETO")
		})
		.catch((error) => {
			console.log(error);
		});
		
	}

  const handleCloseStageButtonClick = () => {
		realizarPost()
		navigateBack()
  };

	const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		filterApplicants();
	};

	return (
		<Container>
			<h1 className="mt-3" style={{ padding: '5px' }}>Calificación de competencia técnica</h1>
			<Row>
				<Col xs={12} md={9}>
					<Table striped bordered>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Afinidad</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
							{filterApplicants().map((applicant, index) => (
								<tr key={index}>
									<td>{applicant.firstName}</td>
									<td>{applicant.lastName}</td>
									<td>{applicant.percentage}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
				<Col xs={12} md={3}>
					<Form onSubmit={handleFilterSubmit}>
						<Row>
							<Col>
								<Form.Control
									type="text"
									placeholder="Ingles"
									value={percentageFilter}
									onChange={handlePercentageFilterChange}
									className="mt-2 mr-2"
								/>
							</Col>
							<Col>
								<Form.Control
									type="text"
									placeholder="Calificación"
									value={nameFilter}
									onChange={handleNameFilterChange}
									className="mt-2"
								/>
							</Col>
						</Row>
						<div style={{ textAlign: "right" }}>
							<Button
								variant="primary"
								type="submit"
								onClick={handleFilterButtonClick}
								className="mt-2"
								style={{ float: "right" }}>
								Filtrar
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
			<div className="d-flex justify-content-end">
				<Button variant="danger" onClick={handleCloseStageButtonClick}>
					Cerrar Etapa
				</Button>
			</div>
		</Container>
	);
};

export default ApplicantList;
