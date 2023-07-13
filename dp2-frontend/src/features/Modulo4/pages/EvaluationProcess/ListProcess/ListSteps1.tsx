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
}

interface App{
	user: User
}
interface User {
	first_name: string;
  last_name: string;
}
interface Training{
	id: number
}

const ApplicantList: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [percentageFilter, setPercentageFilter] = useState("");
	const [training, setTraining] = useState();
	const [loading, setLoading] = useState(true);

  // Función para filtrar los postulantes
  

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
		console.log("Hola")
		console.log("afinidad:",percentageFilter)
		const json = {
			"hiring_process":1,    
			"affinity":parseInt(percentageFilter)
		}
		axios.post(`${LOCAL_CONNECTION}/filter-second-step`, json, {
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		}).then((response) => {
			const data = response.data;
			console.log(data)
			setApplicants(data);
		})
		.catch((error) => {
			console.log(error);
		});
	
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  const handleCloseStageButtonClick = () => {
    navigateBack();
  };

	const fetchData = async () => {
		const json = {
			"hiring_process":1,
			"mandatory":[11],
			"affinity":60
		}
		
			const response = await axios.post(`${LOCAL_CONNECTION}/dummy-first-step`, json, {
				headers: {
					Authorization: `Token ${SAMPLE_TOKEN}`
				}
			}).then((response) => {
        const data = response.data;
			  setApplicants(data);
				axios.get(`${LOCAL_CONNECTION}/training`,{
					headers: {
						Authorization: `Token ${SAMPLE_TOKEN}`
					}}).then((response)=> {
						setTraining(response.data);
						console.log(response.data)
						setLoading(false);
					})
      })
      .catch((error) => {
        console.log(error);
      });
	
}

  useEffect(() => {
    fetchData();
  }, []);

	const handleSelectCompetencias = (ids: number[]) => {

	}

  return (
    <Container>
      {!loading && 
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
                  <td>{applicant.applicant.user.first_name + " " +  applicant.applicant.user.last_name }</td>
                  <td>{applicant.affinity + " " + applicant.pass}</td>
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
							label="name"
							value="id"
							placeholder="Seleccionar Competencias"
							handleSelect={handleSelectCompetencias}
						/>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleFilterButtonClick}
                className="mt-2"
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
