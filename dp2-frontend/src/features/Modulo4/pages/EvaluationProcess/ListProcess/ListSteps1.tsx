import { navigateBack } from "@features/Modulo3/utils/functions";
import React, { useState, useEffect } from "react";
import { Container, Form, Table, Button, Row, Col } from "react-bootstrap";
import {LOCAL_CONNECTION, SAMPLE_TOKEN}  from '../../../utils/constants';
import axios from 'axios';
import MultiSelect from "@features/Modulo4/components/MultiSelect";


interface Applicant {
  
  affinity: string;
	pass: string;
	score: string;
	applicant: App;
	firstName: string
	lastName: string
	percentage: string
}

interface App{
	user: User
	id: string
}
interface User {
	first_name: string;
  last_name: string;
}
interface Training{
	id: number
}



const ApplicantList: React.FC = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [percentageFilter, setPercentageFilter] = useState("");
	
	const [loading, setLoading] = useState(true);
	const [selectedCompetencias, setSelectedCompetencias] = useState<number[]>(
		[]
	);
	var value = localStorage.getItem("screen");
	var id = localStorage.getItem("id");

  // Función para filtrar los postulantes
  const [applicants, setApplicants] =  useState([{ firstName: "David", lastName: "Smith", percentage: 0, pass: "", score: 0.8 },
	{ firstName: "Emma", lastName: "Johnson", percentage: 0, pass: "", score: 0.95 },
	{ firstName: "Daniel", lastName: "Williams", percentage: 0, pass: "", score: 0.7 },
	{ firstName: "Olivia", lastName: "Brown", percentage: 0, pass: "", score: 0.85 },
	{ firstName: "Matthew", lastName: "Jones", percentage: 0, pass: "", score: 0.8 },
	{ firstName: "Sophia", lastName: "Davis", percentage: 0, pass: "", score: 0.95 },
	{ firstName: "Andrew", lastName: "Miller", percentage: 0, pass: "", score: 0.7 },
	{ firstName: "Isabella", lastName: "Wilson", percentage: 0, pass: "", score: 0.85 },
	{ firstName: "William", lastName: "Taylor", percentage: 0, pass: "", score: 0.8 },
	{ firstName: "Ava", lastName: "Anderson", percentage: 0, pass: "", score: 0.95 },
	{ firstName: "James", lastName: "Clark", percentage: 0, pass: "", score: 0.7 },
	{ firstName: "Mia", lastName: "Thomas", percentage: 0, pass: "", score: 0.85 },
	{ firstName: "Benjamin", lastName: "Robinson", percentage: 0, pass: "", score: 0.8 },
	{ firstName: "Charlotte", lastName: "Lee", percentage: 0, pass: "", score: 0.95 },
	{ firstName: "David", lastName: "Harris", percentage: 0, pass: "", score: 0.7 },
	{ firstName: "Emily", lastName: "Walker", percentage: 0, pass: "", score: 0.85 }])

	const training = [
		{
			"id": 1,
			"training_literal": "AWS Certified Solutions Architect - Associate"
		},
		{
			"id": 2,
			"training_literal": "AWS Certified Developer - Associate"
		},
		{
			"id": 3,
			"training_literal": "AWS Certified Cloud Practitioner"
		}
	]

  // Función para manejar cambios en el filtro de nombre
  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  // Función para manejar cambios en el filtro de porcentaje
  const handlePercentageFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPercentageFilter(event.target.value);
  };

  // Función para manejar el clic en el botón de filtrar
  const handleFilterButtonClick = () => {
		
			setApplicants([{ firstName: "David", lastName: "Smith", percentage: 80, pass: "PASÓ", score: 0.8 },
			{ firstName: "Emma", lastName: "Johnson", percentage: 95, pass: "PASÓ", score: 0.95 },
			{ firstName: "Daniel", lastName: "Williams", percentage: 70, pass: "NO PASÓ", score: 0.7 },
			{ firstName: "Olivia", lastName: "Brown", percentage: 85, pass: "PASÓ", score: 0.85 },
			{ firstName: "Matthew", lastName: "Jones", percentage: 80, pass: "PASÓ", score: 0.8 },
			{ firstName: "Sophia", lastName: "Davis", percentage: 95, pass: "PASÓ", score: 0.95 },
			{ firstName: "Andrew", lastName: "Miller", percentage: 70, pass: "NO PASÓ", score: 0.7 },
			{ firstName: "Isabella", lastName: "Wilson", percentage: 85, pass: "PASÓ", score: 0.85 },
			{ firstName: "William", lastName: "Taylor", percentage: 80, pass: "PASÓ", score: 0.8 },
			{ firstName: "Ava", lastName: "Anderson", percentage: 95, pass: "PASÓ", score: 0.95 },
			{ firstName: "James", lastName: "Clark", percentage: 70, pass: "NO PASÓ", score: 0.7 },
			{ firstName: "Mia", lastName: "Thomas", percentage: 85, pass: "PASÓ", score: 0.85 },
			{ firstName: "Benjamin", lastName: "Robinson", percentage: 80, pass: "PASÓ", score: 0.8 },
			{ firstName: "Charlotte", lastName: "Lee", percentage: 95, pass: "PASÓ", score: 0.95 },
			{ firstName: "David", lastName: "Harris", percentage: 70, pass: "NO PASÓ", score: 0.7 },
			{ firstName: "Emily", lastName: "Walker", percentage: 85, pass: "PASÓ", score: 0.85 }]);
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };
	async function filtrarIDs() {
		
	}
	
	// Función para realizar el POST con Axios
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

	const fetchData = async () => {
		
	
}

  useEffect(() => {
    fetchData();
  }, []);

	const handleSelectCompetencias = (ids: number[]) => {
		setSelectedCompetencias(ids);
	}

  return (
    <Container>
      { true && 
			<>
			<h1 className="mt-3">Filtrado automático</h1>
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
              {applicants.map((applicant, index) => (
                <tr key={index}>
                  <td>{applicant.firstName + " " +  applicant.lastName }</td>
                  <td>{applicant.percentage + " " + applicant.pass}</td>
                  <td>{applicant.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs={12} md={3}>
          <Form onSubmit={handleFilterSubmit}>
            <Form.Control
              type="text"
              placeholder="Nivel de afinidad con la posición"
              value={percentageFilter}
              onChange={handlePercentageFilterChange}
              className="mt-2"
            />
							
            <MultiSelect
							options={training}
							label="training_literal"
							value="id"
							placeholder="Training"
							handleSelect={handleSelectCompetencias}
						/>
					
            <div style={{ textAlign: "right" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleFilterButtonClick}
                style={{ float: "right" }}
              >
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
			</>
			}
    </Container>
  );
};

export default ApplicantList;
