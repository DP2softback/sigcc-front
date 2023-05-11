import "./Matrix.css";
import RadioButton from "../RadioButton/RadioButton";
import { useState } from "react";

type MatrixProps = {
  header: string[];
  rows: string[];
};

const Matrix = ({ header, rows }: MatrixProps) => {
  const [evaluation, setEvaluation] = useState([]);

  function changeEvaluation (index: number, value: number) {
    let newEvaluation = [...evaluation];
    newEvaluation[index] = value;
    setEvaluation(newEvaluation);
  }

  const headerComponent = (
    <div className="matrixHeader">
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
        return (
          <div key={categoryIndex}
            className="matrixRow"
            style={{
              backgroundColor: categoryIndex % 2 == 0 ? "#E7F1FF" : "white",
            }}>
            <div className="matrixRowName">{row}</div>
            {header.map((item, optionIndex) => {
              return (
                <div className="matrixRowRadio" key={item}>
                  <RadioButton
                    parentIndex={categoryIndex}
                    optionIndex={optionIndex}
                    value={evaluation[categoryIndex] == optionIndex}
                    handleClick={changeEvaluation}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {headerComponent}
      {bodyComponent}
    </div>
  );
};

export default Matrix;
