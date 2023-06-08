import "bootstrap/dist/css/bootstrap.min.css";
import "./EvaluacionDeDesempenho.css";
import { PERFORMANCE_EVALUATION_HISTORY, PERFORMANCE_EVALUATION_INDEX } from "@features/Modulo3/routes/path";
import Layout from "@features/Modulo3/components/Layout/Content/Content";
import Section from "@features/Modulo3/components/Layout/Section/Section";
import Matrix from "@features/Modulo3/components/Matrix/Matrix";
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { navigateBack, navigateTo } from "@features/Modulo3/utils/functions";
import { saveEvaluation } from "@features/Modulo3/services/performanceEvaluation";

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
				rows={3}
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
			Cancelar
		</Button>
	);

	const saveButton = !isReadOnly && (
		<Button
			onClick={() => {
				handleSave();
			}}
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
			<Section
				title={"Evaluación"}
				content={evaluationMatrix}
				titleStyle={aditionTitleStyle}
			/>
			<Section
				title={"Comentarios adicionales"}
				content={additionalCommentsAndSave}
				titleStyle={aditionTitleStyle}
			/>
		</>
	);

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
				navigateTo(PERFORMANCE_EVALUATION_HISTORY, {
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
				title={`Evaluación de desempeño - ${employee.name}`}
				body={isLoading ? <LoadingScreen/> : body}
				route={PERFORMANCE_EVALUATION_INDEX}
			/>
		</div>
	);
};

export default BaseForm;
