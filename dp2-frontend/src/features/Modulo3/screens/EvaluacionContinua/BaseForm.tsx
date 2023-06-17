import "./EvaluacionContinua.css";
import { CONTINUOS_EVALUATION_HISTORY, CONTINUOS_EVALUATION_INDEX } from "@features/Modulo3/routes/path";
import Layout from "@features/Modulo3/components/Layout/Content/Content";
import Section from "@features/Modulo3/components/Layout/Section/Section";
import Matrix from "@features/Modulo3/components/Matrix/Matrix";
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { navigateBack, navigateTo } from "@features/Modulo3/utils/functions";
import { saveEvaluation } from "@features/Modulo3/services/continuousEvaluation";
import { TEXTAREA_ROWS } from "@features/Modulo3/utils/constants";

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
	
	const evaluationCategory = isReadOnly ? (
		evaluation &&
		evaluation.categoryName && (
			<Form.Control type="text" disabled value={evaluation.categoryName[0]} />
		)
	) : (
		<Form.Select
			value={evaluation && evaluation.categoryId}
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
	);

	const asociatedProject = (
		<Form.Control
			type="text"
			placeholder="Ingrese el proyecto asocidado"
			value={evaluation && evaluation.associatedProject}
			disabled={isReadOnly}
			onChange={onProjectChange()}
		></Form.Control>
	);

	const evaluationMatrix = isReadOnly ? (
		evaluation && evaluation.subcategories ? (
			<Matrix
				header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
				rows={evaluation.subcategories}
				evaluation={evaluation}
				setEvaluation={setEvaluation}
				isReadOnly={isReadOnly}
			/>
		) : (
			<></>
		)
	) : evaluation && evaluation.categoryId ? (
		<Matrix
			header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
			rows={selectedCategory.subcategories}
			evaluation={evaluation}
			setEvaluation={setEvaluation}
			isReadOnly={isReadOnly}
		/>
	) : (
		<div>Seleccione una categoría a evaluar</div>
	);

	const additionalComments = (
		<div className={isReadOnly ? `mb-4` : ""}>
			<Form.Control
				value={evaluation && evaluation.additionalComments}
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
			variant="outline-primary me-2"
			onClick={() => {
				navigateBack();
			}}
		>
			{isReadOnly ? <>Volver</> : <>Cancelar</>}
		</Button>
	);

	const saveButton = !isReadOnly && (
		<Button onClick={() => handleSave()}
		>
			Guardar evaluación
		</Button>
	);

	const additionalCommentsAndSave = (
		<>
			{additionalComments}
			<div className="text-end mt-32 mb-4">
				{cancelButton}
				{saveButton}
			</div>
		</>
	);

	const body = (
		<>
			<div className="row">
				<div className="col-md-4">
					<Section
						title={"Categoría de evaluación *"}
						content={evaluationCategory}
						titleStyle={aditionTitleStyle}
					/>
				</div>
				<div className="col-md-4">
					<Section
						title={"Proyecto asociado *"}
						content={asociatedProject}
						titleStyle={aditionTitleStyle}
					/>
				</div>
			</div>
			<Section
				title={"Evaluación *"}
				content={evaluationMatrix}
				titleStyle={aditionTitleStyle}
			/>
			<Section
				title={"Comentarios adicionales"}
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
		};
	}

	function onProjectChange() {
		return (e) => {
			var value = e.target.value;
			setEvaluation((prevState) => ({
				...prevState,
				associatedProject: value
			}));
		};
	}

	function onAdditionalCommentsChange() {
		return (e) => {
			var value = e.target.value;
			setEvaluation((prevState) => ({
				...prevState,
				additionalComments: value
			}));
		};
	}

	function handleSave(){
		setIsLoading(true);
		(async () => {
			try{
				await saveEvaluation(evaluation);
				navigateTo(CONTINUOS_EVALUATION_HISTORY, {
					id: employee.id,
					name: employee.name
				});
			}catch(error){

			}
			setIsLoading(false);
		})();
	}

	return (
		<div>
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
