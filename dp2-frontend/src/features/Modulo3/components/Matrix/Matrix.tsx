import "./Matrix.css";
import RadioButton from "@features/Modulo3/components/Shared/RadioButton/RadioButton";
import { useEffect, useState } from "react";

type MatrixProps = {
	header: string[];
	rows: any[];
	evaluation?: any;
	setEvaluation?: any;
	isReadOnly?: boolean;
};

const Matrix = ({header, rows, evaluation, setEvaluation, isReadOnly}: MatrixProps) => {
	const headerStyle = `matrixHeader ${isReadOnly ? "matrixWhiteReadOnly" : ""}`;
	const blueBackgroundColor = isReadOnly ? "matrixBlueReadOnly" : "matrixRowBGBlue";
	const whiteBackgroundColor = isReadOnly ? "matrixWhiteReadOnly" : "matrixRowBGWhite";

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
		return (
			<div key={categoryIndex} className={rowStyle}>
				<div className="matrixRowName">{row.name}</div>
				{header.map((item, optionIndex) => {
					return (
						<div className="matrixRowRadio" key={item}>
							<RadioButton
								parentIndex={row.id}
								optionIndex={optionIndex}
								value={
									evaluation.subcategories.find(
										(sub) => sub.id == row.id
									).score == optionIndex
								}
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

	return (
		<div>
			{headerComponent}
			{bodyComponent}
		</div>
	);
};

export default Matrix;
