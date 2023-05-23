import React from 'react'
import { 
  Form,
  FormGroup,
  FormControl,
  FormText,
  FormLabel,
  FormSelect
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfigSelectionProcess = () => {
  return (
    <div className='m-5'>
      <Form>
        <FormGroup className='d-flex align-items-center'>
          <FormLabel style={{ whiteSpace: 'nowrap' }} className='pe-4'>Nombre de la oferta</FormLabel>
          <FormControl type='text' placeholder='Oferta laboral' className='w-100'/>
        </FormGroup>
        <FormGroup className='d-flex align-items-center'>
          <FormLabel style={{ whiteSpace: 'nowrap' }} className='pe-4'>Area de trabajo</FormLabel>
          <FormSelect>
            <option value="null" hidden >Display but don't show in list</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </FormSelect>
        </FormGroup>
      </Form>
    </div>
  )
}

export default ConfigSelectionProcess