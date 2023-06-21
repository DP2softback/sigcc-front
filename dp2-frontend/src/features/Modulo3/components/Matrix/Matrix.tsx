import { CONTINUOS_EVALUATION_TYPE } from "@features/Modulo3/utils/constants";
import "./Matrix.css";
import RadioButton from "@features/Modulo3/components/Shared/RadioButton/RadioButton";

type MatrixProps = {
	header: string[];
	rows: any[];
	evaluation?: any;
	setEvaluation?: any;
	isReadOnly?: boolean;
	index?: number;
};

const Matrix = ({header, rows, evaluation, setEvaluation, isReadOnly, index}: MatrixProps) => {
	const headerStyle = `matrixHeader ${isReadOnly ? "matrixWhiteReadOnly" : ""}`;
	const blueBackgroundColor = isReadOnly ? "matrixBlueReadOnly" : "matrixRowBGBlue";
	const whiteBackgroundColor = isReadOnly ? "matrixWhiteReadOnly" : "matrixRowBGWhite";
	const isContinuosEvaluation = evaluation.evaluationType === CONTINUOS_EVALUATION_TYPE;

	const headerComponent = (
		<div className={headerStyle}>
			{header.map((item) => {
				return (
					<div className="matrixHeaderItem" key={item}>
						{item}
					</div>
				);
			})}
		</div>
	);

	const bodyComponent = (
		<div className="matrixBody">
			{rows.map((row, categoryIndex) => {
				return displayRow(categoryIndex, row, header);
			})}
		</div>
	);

	function displayRow(categoryIndex: number, row: any, header: string[]) {
		const rowStyle = `matrixRow ${getBackgroundColor(categoryIndex)}`;
		let subcategories;
		if (isContinuosEvaluation && !isReadOnly)
			subcategories = evaluation.subcategories;
		else 
			subcategories = evaluation.categories[index].subcategories;

		return (
			<div key={categoryIndex} className={rowStyle}>
				<div className="matrixRowName">{row.name}</div>
				{header.map((item, optionIndex) => {
					return (
						<div className="matrixRowRadio" key={item}>
							<RadioButton
								parentIndex={row.id}
								optionIndex={optionIndex + 1}
								value={subcategories.find((sub) => sub.id == row.id).score == optionIndex + 1}
								handleClick={changeEvaluation}
								isReadOnly={isReadOnly}
							/>
						</div>
					);
				})}
			</div>
		);
	}

	function getBackgroundColor(categoryIndex: number) {
		return categoryIndex % 2 == 0 ? blueBackgroundColor : whiteBackgroundColor;
	}

	function changeEvaluation(id: number, value: number) {
		if(isContinuosEvaluation){
			updateContinuousEvaluation(id, value);
		}else{
			updatePerformanceEvaluation(id, value);
		}
	}

	return (
		<div className="matrix">
			{headerComponent}
			{bodyComponent}
		</div>
	);

	function updatePerformanceEvaluation(id: number, value: number) {
		setEvaluation(prevEvaluation => {
			const updatedCategories = prevEvaluation.categories.map(category => {
				if (category.id === prevEvaluation.categories[index].id) {
					const updatedSubcategories = category.subcategories.map(subcategory => {
						if (subcategory.id === id) {
							return { ...subcategory, score: value };
						}
						return subcategory;
					});
					return { ...category, subcategories: updatedSubcategories };
				}
				return category;
			});
			return { ...prevEvaluation, categories: updatedCategories };
		});
	}

	function updateContinuousEvaluation(id: number, value: number) {
		setEvaluation((prevState) => ({
			...prevState,
			subcategories: prevState.subcategories.map(
				(subcategory) => {
					if (subcategory.id === id) {
						return {
							...subcategory,
							score: value
						};
					}
					return subcategory;
				}
			)
		}));
	}
};

export default Matrix;
