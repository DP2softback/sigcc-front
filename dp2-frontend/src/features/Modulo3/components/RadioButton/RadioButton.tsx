import './RadioButton.css'

const RadioButton = ({parentIndex, optionIndex, value, handleClick}) => {
  return (
    <input
      type="checkbox"
      className="radioButton"
      checked={value}
      onChange={() => { handleClick(parentIndex, optionIndex) }}
    />
  );
};

export default RadioButton;