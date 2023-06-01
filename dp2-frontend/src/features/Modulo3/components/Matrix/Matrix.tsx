import "./Matrix.css";
import RadioButton from "@features/Modulo3/components/Shared/RadioButton/RadioButton";
import { useEffect, useState } from "react";

type MatrixProps = {
  header: string[];
  rows: string[];
  evaluation?: number[];
  isReadOnly?: boolean;
};

const Matrix = ({ header, rows, evaluation, isReadOnly }: MatrixProps) => {
  const [newEvaluation, setEvaluation] = useState(evaluation != null ? evaluation : []);

  const headerStyle = `matrixHeader ${isReadOnly ? 'matrixWhiteReadOnly' : ''}`;

  function changeEvaluation(index: number, value: number) {
    let modEvaluation = [...newEvaluation];
    modEvaluation[index] = value;
    setEvaluation(modEvaluation);
  }

  function getBackgroundColor(categoryIndex: number) {
    return isReadOnly
      ? categoryIndex % 2 == 0
        ? "matrixBlueReadOnly"
        : "matrixWhiteReadOnly"
      : categoryIndex % 2 == 0
        ? "matrixRowBGBlue"
        : "matrixRowBGWhite";
  }

  function displayRow(categoryIndex: number, row: string, header: string[], changeEvaluation: (index: number, value: number) => void) {
    const rowStyle = `matrixRow ${getBackgroundColor(categoryIndex)}`;
    return (
      <div key={categoryIndex} className={rowStyle}>
        <div className="matrixRowName">{row}</div>
        {header.map((item, optionIndex) => {
          return (
            <div className="matrixRowRadio" key={item}>
              <RadioButton
                parentIndex={categoryIndex}
                optionIndex={optionIndex}
                value={newEvaluation[categoryIndex] == optionIndex}
                handleClick={changeEvaluation}
                isReadOnly={isReadOnly}
              />
            </div>
          );
        })}
      </div>
    );
  }

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
        return displayRow(categoryIndex, row, header, changeEvaluation);
      })}
    </div>
  );

  useEffect(() => {
    if(!isReadOnly) setEvaluation([]);
  }, [rows])

  return (
    <div>
      {headerComponent}
      {bodyComponent}
    </div>
  );
};

export default Matrix;

