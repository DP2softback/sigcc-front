import "./EvaluacionDeDesempenho.css";
import { PERFORMANCE_EVALUATION_HISTORY, PERFORMANCE_EVALUATION_INDEX } from "@features/Modulo3/routes/path";
import Layout from "@features/Modulo3/components/Layout/Content/Content";
import Section from "@features/Modulo3/components/Layout/Section/Section";
import Matrix from "@features/Modulo3/components/Matrix/Matrix";
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
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
	
	const evaluationMatrix = categories && (
		categories.map((category, index) => {
			const matrixAndComent = <div className="row">
				<div className="col">
					<div className="mb-2">
						<Matrix
							header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
							rows={category.subcategories}
							index={index}
							evaluation={evaluation}
							setEvaluation={setEvaluation}
							isReadOnly={isReadOnly} />
					</div>
					<div className='mb-4'>
						<Form.Control
							value={evaluation && evaluation.additionalComments}
							disabled={isReadOnly}
							as="textarea"
							aria-label="With textarea"
							placeholder="Ingrese los comentarios o recomendaciones que crea conveniente"
							rows={3}
							onChange={onAdditionalCommentsChange(index)} />
					</div>
				</div>
			</div>;

			return (
				<div key={category.id}>
					<Section
						title={category.name + ' *'}
						titleStyle={{marginBottom: '1em'}}
						sectionStyle={{marginBottom: 0}}
						content={matrixAndComent}
					/>
				</div>
			);
		})
	);

	const cancelButton = (
		<Button variant="outline-primary me-2" onClick={() => navigateBack()}>
			Cancelar
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
			{evaluationMatrix}
			<Section
				content={buttons}
				sectionStyle={{marginBottom: 0}}
			/>
		</>
	);

	function onAdditionalCommentsChange(categoryIndex: number) {
		return (e) => {
			var value = e.target.value;
			setEvaluation(prevEvaluation => {
				const updatedCategories = [...prevEvaluation.categories];
				updatedCategories[categoryIndex] = {
					...updatedCategories[categoryIndex],
					additionalComments: value
				};
				return { ...prevEvaluation, categories: updatedCategories };
			});
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
				subtitle="Los campos con (*) son obligatorios."
				body={isLoading ? <LoadingScreen/> : body}
				route={PERFORMANCE_EVALUATION_INDEX}
			/>
		</div>
	);
};

export default BaseForm;
