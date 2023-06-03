import PageContainer from "@components/PageContainer";
import EnhancedHeaderTitle from "@components/EnhancedHeaderTitle";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import '@assets/scss/style.scss';
import Layout from "@layout/default/index";

const ConfigPosition = () => {
	return (
		<Layout title="Grupo 4 App" content="container">
		<PageContainer title="Create Job Position">
			<EnhancedHeaderTitle pageTitle="Crear posición">
				Configuración para la creación de una posición o
				puesto laboral
			</EnhancedHeaderTitle>
			<main>
				{/* <Form> */}
				<Form.Group as={Row} className="my-4">
					<Form.Label required column sm={3}>Nombre de la oferta</Form.Label>
					<Col>
						<Form.Control
							type="text"
							placeholder="Oferta laboral"
						/>
					</Col>
					<Col sm={3}>
						<Button className="w-100">Buscar</Button>
					</Col>
				</Form.Group>
				{/* <Row>
					<Form.Label column="lg" lg={2}>
						Large Text
					</Form.Label>
					<Col>
						<Form.Control
							size="lg"
							type="text"
							placeholder="Large text"
						/>
					</Col>
				</Row> */}
				{/* <FormGroup className="d-flex align-items-center">
						<FormLabel
							style={{ whiteSpace: "nowrap" }}
							className="pe-4"
						>
							Area de trabajo
						</FormLabel>
						<FormSelect>
							<option value="null" hidden>
								Display but don't show in list
							</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</FormSelect>
					</FormGroup> */}
				{/* </Form> */}
			</main>
		</PageContainer>
		</Layout>
	);
};

export default ConfigPosition;
