import './RadioButton.css'

type RadioButtonProps = {
  parentIndex: number;
  optionIndex: number;
  value: boolean;
  handleClick: any;
  isReadOnly?: boolean;
};

const RadioButton = ({parentIndex, optionIndex, value, handleClick, isReadOnly}: RadioButtonProps) => {
  return (
    <input
      type="checkbox"
      className={`radioButton ${isReadOnly ? 'radioButtonReadOnly' : ''}`}
      checked={value}
      onChange={() => { !isReadOnly && handleClick(parentIndex, optionIndex) }}
    />
  );
};

export default RadioButton;