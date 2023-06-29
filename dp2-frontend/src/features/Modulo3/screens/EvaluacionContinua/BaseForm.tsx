import "./EvaluacionContinua.css";
import { CONTINUOS_EVALUATION_HISTORY, CONTINUOS_EVALUATION_INDEX } from "@features/Modulo3/routes/path";
import Layout from "@features/Modulo3/components/Layout/Content/Content";
import Section from "@features/Modulo3/components/Layout/Section/Section";
import Matrix from "@features/Modulo3/components/Matrix/Matrix";
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { checkIfAllNull, navigateBack, navigateTo } from "@features/Modulo3/utils/functions";
import { saveEvaluation } from "@features/Modulo3/services/continuousEvaluation";
import { API_CREATE_EVALUATION_SUCCESS, EVALUACION_CREADA_CON_EXITO, TEXTAREA_ROWS } from "@features/Modulo3/utils/constants";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

type BaseFormProps = {
	employee: any;
	categories: any;
	evaluation: any;
	isLoading: boolean;
	setEvaluation?: any;
	setIsLoading?: any;
	isReadOnly?: boolean;
};

const BaseForm = ({employee, categories, evaluation, isLoading, setEvaluation, setIsLoading, isReadOnly}: BaseFormProps) => {
	const aditionTitleStyle = { marginBottom: "20px" };
  const [selectedCategory, setSelectedCategory] = useState(null);
	const [errors, setErrors] = useState({
		categoryId: null,
		associatedProject: null,
	});
	
	const evaluationCategory = (
		isReadOnly ? (
			<Form.Control type="text" disabled value={evaluation?.categories?.[0]?.name} />
		) : (
			<>
			<Form.Select
				value={evaluation && evaluation.categoryId}
				isInvalid={!!errors.categoryId}
				onChange={onCategoryChange()}>
				<option hidden>Seleccionar</option>
				{categories.map((category) => {
					return (
						<option value={category.id} key={category.id}>
							{category.name}
						</option>
					);
				})}
			</Form.Select>
			<Form.Control.Feedback type="invalid">
				{errors.categoryId}
			</Form.Control.Feedback>
			</>
		)
	);

	const asociatedProject = (
		<>
		<Form.Control
			type="text"
			placeholder="Ingrese el proyecto asocidado"
			value={evaluation && evaluation.associatedProject}
			disabled={isReadOnly}
			isInvalid={!!errors.associatedProject}
			onChange={onProjectChange()}
		></Form.Control>
		<Form.Control.Feedback type="invalid">
			{errors.associatedProject}
		</Form.Control.Feedback>
		</>
	);

	const evaluationMatrix = (
		isReadOnly ? (
			<Matrix
				header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
				rows={evaluation?.categories?.[0]?.subcategories}
				evaluation={evaluation}
				setEvaluation={setEvaluation}
				index={0}
				isReadOnly={isReadOnly}
			/>
		) : evaluation && evaluation.categoryId ? (
			<Matrix
				header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
				rows={selectedCategory?.subcategories}
				evaluation={evaluation}
				setEvaluation={setEvaluation}
				isReadOnly={isReadOnly}
			/>
		) : (
			<div>Seleccione una categoría a evaluar</div>
		)
	);

	const additionalComments = (
		<div className={isReadOnly ? `mb-4` : ""}>
			<Form.Control
				value={evaluation?.additionalComments}
				disabled={isReadOnly}
				as="textarea"
				aria-label="With textarea"
				placeholder="Ingrese los comentarios o recomendaciones que crea conveniente"
				rows={TEXTAREA_ROWS}
				onChange={onAdditionalCommentsChange()}
			/>
		</div>
	);

	const cancelButton = (
		<Button
			variant={`outline-primary ${isReadOnly ? '' : 'me-2'}`}
			onClick={() => {
				navigateBack();
			}}
		>
			{isReadOnly ? <>Volver</> : <>Cancelar</>}
		</Button>
	);

	const saveButton = !isReadOnly && (
		<Button type="submit" onClick={() => handleSave()}>
			Guardar evaluación
		</Button>
	);

	const additionalCommentsAndSave = (
		<>
			{additionalComments}
			<div className="text-end mt-32">
				{cancelButton}
				{saveButton}
			</div>
		</>
	);

	const body = (
		<>
			<Row style={aditionTitleStyle}>
				<Col md={4}>
					<Section
						title={`Categoría de evaluación ${isReadOnly ? '' : '*'}`}
						content={evaluationCategory}
						titleStyle={aditionTitleStyle}
					/>
				</Col>
				<Col md={4}>
					<Section
						title={`Proyecto asociado ${isReadOnly ? '' : '*'}`}
						content={asociatedProject}
						titleStyle={aditionTitleStyle}
					/>
				</Col>
			</Row>
			<Section
				title={`Evaluación ${isReadOnly ? '' : '*'}`}
				content={evaluationMatrix}
				titleStyle={aditionTitleStyle}
				sectionStyle={aditionTitleStyle}
			/>
			<Section
				title={`Comentarios adicionales`}
				content={additionalCommentsAndSave}
				titleStyle={aditionTitleStyle}
				sectionStyle={{marginBottom: 0}}
			/>
		</>
	);

	function onCategoryChange() {
		return (e) => {
			var value = Number(e.target.value);
      const category = categories.find(cat => cat.id == value);
      setSelectedCategory(category);
			setEvaluation((prevState) => ({
				...prevState,
				categoryId: category.id,
        subcategories: category.subcategories
			}));
			if (!!errors.categoryId) setErrors({ ...errors, categoryId: null });
		};
	}

	function onProjectChange() {
		return (e) => {
			var value = e.target.value;
			setEvaluation((prevState) => ({
				...prevState,
				associatedProject: value
			}));
			if (!!errors.associatedProject) setErrors({ ...errors, associatedProject: null });
		};
	}

	function onAdditionalCommentsChange() {
		return (e) => {
			var value = e.target.value;
			setEvaluation((prevState) => ({
				...prevState,
				additionalComments: value,
				hasComment: value !== ''
			}));
		};
	}

	const validateForm = () => {
		const { categoryId, associatedProject, subcategories } = evaluation;
		let errors = {
			categoryId: null,
			associatedProject: null,
			subcategories: null
		};

		if (!categoryId || categoryId === '') {
			errors.categoryId = 'Debe seleccionar una categoría';
		}
		if (!associatedProject || associatedProject === '') {
			errors.associatedProject = 'Debe ingresar un proyecto asociado';
		}
		if (subcategories){
			for(let i = 0; i < subcategories.length; i++){
				if (!subcategories[i].score || subcategories[i].score === '') {
					toast.error(`Debe ingresar una calificación para la competencia "${subcategories[i].name}"`);
					errors.subcategories = 'Debe ingresar una calificación para todas las competencias';
					return errors;
				}
			}
		}
		return errors;
	}

	function handleSave(){
		const formErrors = validateForm();
		
		if(!checkIfAllNull(formErrors)){
			setErrors(formErrors);
			return;
		}
	
		let result = {
			message: ''
		};

		setIsLoading(true);
		(async () => {
			try {
				result = await saveEvaluation(evaluation);
			} catch (error) {
				toast.error(`Ha ocurrido un error al guardar la evaluación.`);
			} finally {
				if (result.message === API_CREATE_EVALUATION_SUCCESS)
					toast.success(EVALUACION_CREADA_CON_EXITO);
				setTimeout(() => {
					navigateTo(CONTINUOS_EVALUATION_HISTORY, {
						id: employee.id,
						name: employee.name
					});
				}, 2000);
				setIsLoading(false);
			}
		})();
	}

	return (
		<div>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
			<Layout
				title={`Evaluación continua - ${employee.name}`}
				subtitle="Los campos con (*) son obligatorios."
				body={isLoading ? <LoadingScreen/> : body}
				route={CONTINUOS_EVALUATION_INDEX}
			/>
		</div>
	);
};

export default BaseForm;
