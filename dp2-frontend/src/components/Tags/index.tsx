import {useLayoutEffect, useEffect, useRef} from 'react'
import { Form } from 'react-bootstrap';
import Choices from 'choices.js';

const Tags: React.FC<any> = ({defaultValue, disabled, className, placeholder, removeItemButton, ...props}: any) => {

  const tagsInput = useRef(null);

  useEffect( ()=> {
    //let plainText = tagsInput.current.classList.contains('form-control-plaintext') && `choices__inner-plaintext`;
    //let containerInner = `choices__inner ${plainText && plainText}`;

    const choices = new Choices(tagsInput.current, {
      silent: true,
      allowHTML: false,
      placeholder: true,
      placeholderValue: placeholder,
      removeItemButton: false || removeItemButton
    });

    return () => {
      choices.destroy();
    };

  }, [])

  const handleSelectChange = (event) => {
    console.log("asd");
    const selectedValues = Array.from(event.target.selectedOptions, (option: any) => option.value);
    console.log(selectedValues);
  };

  return (
    <>
      <select multiple ref={tagsInput} defaultValue={defaultValue} disabled={disabled} onChange={handleSelectChange}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
      </select>
    </>
  )
}

export default Tags