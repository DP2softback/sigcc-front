import "./EvaluacionDeDesempenho.css";
import { PERFORMANCE_EVALUATION_HISTORY, PERFORMANCE_EVALUATION_INDEX } from "@features/Modulo3/routes/path";
import { Button, Col, Row } from "react-bootstrap";
import { checkIfAllNull, navigateBack, navigateTo } from "@features/Modulo3/utils/functions";
import { saveEvaluation } from "@features/Modulo3/services/performanceEvaluation";
import { API_CREATE_PERFORMANCE_EVALUATION_SUCCESS, EVALUACION_CREADA_CON_EXITO, TEXTAREA_ROWS } from "@features/Modulo3/utils/constants";
import { useState } from "react";
import Layout from "@features/Modulo3/components/Layout/Content/Content";
import Section from "@features/Modulo3/components/Layout/Section/Section";
import Matrix from "@features/Modulo3/components/Matrix/Matrix";
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import Form from "react-bootstrap/Form";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

type BaseFormProps = {
	employee: any;
	categories: any;
	evaluation: any;
	associatedEvaluation?: any;
	isLoading: boolean;
	setEvaluation?: any;
	setIsLoading?: any;
	isReadOnly?: boolean;
};

const BaseForm = ({employee, categories, evaluation, associatedEvaluation, isLoading, setEvaluation, setIsLoading, isReadOnly}: BaseFormProps) => {
	const [showEvaluatedAnswers, setShowEvaluatedAnswers] = useState(false);

	const evaluationMatrix = categories && (
		categories.map((category, index) => {
			const matrixAndComent = (
				<Row>
					<Col>
						<div className="mb-2">
							<Matrix
								header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
								rows={category.subcategories}
								index={index}
								evaluation={evaluation}
								setEvaluation={setEvaluation}
								isReadOnly={isReadOnly}
							/>
						</div>
						<div className="mb-4">
							<Form.Control
								value={category?.subcategories?.[0]?.comment}
								disabled={isReadOnly}
								as="textarea"
								aria-label="With textarea"
								placeholder="Ingrese los comentarios o recomendaciones que crea conveniente"
								rows={TEXTAREA_ROWS}
								onChange={onAdditionalCommentsChange(index)}
							/>
						</div>
					</Col>
				</Row>
			);

			return (
				<div key={category.id}>
					<Section
						title={category.name + (isReadOnly ? "" : "*")}
						titleStyle={{marginBottom: '1em'}}
						sectionStyle={{marginBottom: 0}}
						content={matrixAndComent}
					/>
				</div>
			);
		})
	);

	const evaluatedMatrix = associatedEvaluation && associatedEvaluation.categories && (
		associatedEvaluation.categories.map((category, index) => {
			const matrixAndComent = (
				<Row>
					<Col>
						<div className="mb-2">
							<Matrix
								header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
								rows={category.subcategories}
								index={index}
								evaluation={evaluation}
								setEvaluation={setEvaluation}
								isReadOnly={isReadOnly}
							/>
						</div>
						<div className="mb-4">
							<Form.Control
								value={category?.subcategories?.[0]?.comment}
								disabled={isReadOnly}
								as="textarea"
								aria-label="With textarea"
								placeholder="Ingrese los comentarios o recomendaciones que crea conveniente"
								rows={TEXTAREA_ROWS}
								onChange={onAdditionalCommentsChange(index)}
							/>
						</div>
					</Col>
				</Row>
			);

			return (
				<div key={category.id}>
					<Section
						title={category.name + (isReadOnly ? "" : "*")}
						titleStyle={{marginBottom: '1em'}}
						sectionStyle={{marginBottom: 0}}
						content={matrixAndComent}
					/>
				</div>
			);
		})
	);

	const cancelButton = (
		<Button variant={`outline-primary ${isReadOnly ? '' : 'me-2'}`} 
			onClick={() => navigateBack()}>
			{isReadOnly ? <>Volver</> : <>Cancelar</>}
		</Button>
	);

	const saveButton = !isReadOnly && (
		<Button onClick={() => handleSave()}>
			Guardar evaluación
		</Button>
	);

	const buttons = (
		<div className="text-end">
			{cancelButton}
			{saveButton}
		</div>
	);

	const body = (
		<>
			<Row>
				<Col>{evaluationMatrix}</Col>
				{showEvaluatedAnswers && <Col>{evaluatedMatrix}</Col>}
			</Row>
			<Section content={buttons} sectionStyle={{ marginBottom: 0 }} />
		</>
	);

	function onAdditionalCommentsChange(categoryIndex: number) {
		return (e) => {
			var value = e.target.value;
			setEvaluation(prevEvaluation => {
				const updatedCategories = [...prevEvaluation.categories];
				const selectedCategory = updatedCategories[categoryIndex];
				const updatedSubcategories = selectedCategory.subcategories.map(subcategory => ({
					...subcategory,
					hasComment: true,
					comment: value
				}));
				updatedCategories[categoryIndex] = {
					...selectedCategory,
					subcategories: updatedSubcategories
				};
				return { ...prevEvaluation, categories: updatedCategories };
			});
		};
	}

	const buttonsDetails = (
		<>
			{associatedEvaluation && (
				<Button
					variant="outline-primary"
					className="me-2"
					onClick={() => {
						setShowEvaluatedAnswers(!showEvaluatedAnswers);
					}}>
					<div className="me-1">
						{showEvaluatedAnswers ? <EyeSlashFill size={20}/> : <EyeFill size={20}/>}
					</div>
					Respuestas de trabajador
				</Button>
			)}
			<Button variant="primary">Añadir compromisos</Button>
		</>
	);

	const validateForm = () => {
		const { categories } = evaluation;
		let errors = {
			subcategories: null
		};

		if (categories){
			for(let i = 0; i < categories.length; i++){
				const category = categories[i];
				const subcategories = category.subcategories;
				for(let j = 0; j < subcategories.length; j++){
					const subcategory = subcategories[j];
					if (subcategory.score === null || subcategory.score === undefined || subcategory.score === "" || subcategory.score == 0){
						toast.error(`Debe ingresar una calificación para la competencia "${subcategory.name}"`);
						errors.subcategories = "Debe completar todas las preguntas";
						return errors;
					}
				}
			}
		}
		return errors;
	}

	function handleSave(){
		const formErrors = validateForm();
		
		if(!checkIfAllNull(formErrors)){
			return;
		}
	
		let result = ''
		
		setIsLoading(true);
		(async () => {
			try {
				result = await saveEvaluation(evaluation);
			} catch (error) {
				toast.error(`Ha ocurrido un error al guardar la evaluación.`);
				setIsLoading(false);
			} finally {
				if (result === API_CREATE_PERFORMANCE_EVALUATION_SUCCESS)
					toast.success(EVALUACION_CREADA_CON_EXITO);
				setTimeout(() => {
					navigateTo(PERFORMANCE_EVALUATION_HISTORY, {
						id: employee.id,
						name: employee.name
					});
					setIsLoading(false);
				}, 2000);
			}
		})();
	}

	return (
		<div>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<Layout
				title={`Evaluación de desempeño - ${employee.name}`}
				subtitle={isReadOnly ? null : "Los campos con (*) son obligatorios."}
				body={isLoading ? <LoadingScreen/> : body}
				route={PERFORMANCE_EVALUATION_INDEX}
				button={isReadOnly ? buttonsDetails : <></>}
			/>
		</div>
	);
};

export default BaseForm;
