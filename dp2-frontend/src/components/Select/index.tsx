import {useLayoutEffect, useRef} from 'react'
import { Form } from 'react-bootstrap';
import Choices from 'choices.js';

function Select({...props}) {

  const {multiple, disabled, className, placeholder, removeItemButton, shouldSort, searchEnabled, searchPlaceholder, defaultValue} = props;

  const selectInput = useRef(null);
  useLayoutEffect( ()=> {
    new Choices(selectInput.current, {
      silent: true,
      allowHTML: false,
      searchEnabled: false || searchEnabled,
      placeholder: true,
      placeholderValue: placeholder,
      searchPlaceholderValue: 'Search' || searchPlaceholder,
      shouldSort: false || shouldSort,
      removeItemButton: false || removeItemButton,
    });
  })

  return (
    <>
      <Form.Select defaultValue={defaultValue} className={className} ref={selectInput} multiple={multiple} disabled={disabled}>
        {placeholder && <option value=''>{placeholder}</option> }
        {props.children}
      </Form.Select>
    </>
  )
}

export default Select