import React, { useEffect, useRef } from 'react';
import Choices from 'choices.js';

type MultiSelectProps<T> = {
  options: T[];
  value: keyof T & (string | number);
  label: keyof T & (string | number);
  placeholder?: string;
  handleSelect: (values: number[]) => void;
}

const MultiSelect = <T extends {}>(
	props: MultiSelectProps<T>
): JSX.Element => {

  const { label, options, value, placeholder, handleSelect } = props;

  const tagsInput = useRef(null);

  useEffect( ()=> {;

    const choices = new Choices(tagsInput.current, {
      silent: true,
      allowHTML: false,
      placeholder: true,
      placeholderValue: placeholder || '',
      removeItemButton: true
    });

    return () => {
      choices.destroy();
    };

  }, [])

  const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    handleSelect(selectedValues.map(value => Number(value)));
  };

  return (
    <>
      <select multiple ref={tagsInput} onChange={handleSelectChange}>
      {
        options.map((opt, index) => {
          return (
            <option key={index} value={opt[value].toString()}>{opt[label].toString()}</option>
          )
        })
      }
      </select>
    </>
  )
}

export default MultiSelect;