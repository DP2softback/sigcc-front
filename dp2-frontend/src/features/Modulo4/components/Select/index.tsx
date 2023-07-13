import { useEffect, useRef } from 'react';
import Choices from 'choices.js';

type MultiSelectProps<T> = {
  options: T[];
  value: keyof T & (string | number);
  label: keyof T & (string | number);
  placeholder?: string;
  handleSelectItem: (value: number) => void;
}

const MultiSelect = <T extends {}>(
	props: MultiSelectProps<T>
): JSX.Element => {

  const { label, options, value, placeholder, handleSelectItem } = props;

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
    handleSelectItem(Number(selectedValues[0]));
  };

  return (
    <>
      <select ref={tagsInput} onChange={handleSelectChange}>
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