import React from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap';



const ModalV = (props) => {
  const {funcionPrincipal, ...rest } = props;
  const aceptar = () => {
    funcionPrincipal();
  }

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {"Registro exitoso"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='message'>
          {"Postulación registrada correctamente."}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>aceptar()}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalV;