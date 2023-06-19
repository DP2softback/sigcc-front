import {useLayoutEffect, useRef} from 'react'
import { Form } from 'react-bootstrap';
import Choices from 'choices.js';

const Tags: React.FC<any> = ({defaultValue, disabled, className, placeholder, removeItemButton, ...props}: any) => {

  const tagsInput = useRef(null);

  useLayoutEffect( ()=> {
    let plainText = tagsInput.current.classList.contains('form-control-plaintext') && `choices__inner-plaintext`;
    let containerInner = `choices__inner ${plainText && plainText}`;

    new Choices(tagsInput.current, {
      silent: true,
      allowHTML: false,
      placeholder: true,
      placeholderValue: placeholder,
      removeItemButton: false || removeItemButton
    });

  })

  return (
    <>
      <Form.Control className={className} ref={tagsInput} defaultValue={defaultValue} disabled={disabled}></Form.Control>
    </>
  )
}

export default Tags