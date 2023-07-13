import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./ModalExportarReporte.css";
import '../../screens/Categorias/Categorias.css'
import { agregarCompromisos } from "@features/Modulo3/services/performanceEvaluation";
import { ToastContainer, toast } from "react-toastify";

const ModalCompromisos = (props) => {
    const { evaluationId, show, setShow, evaluationComment  } = props;
    const [ compromisos, setCompromisos] = useState('');

    const handleClose = () => {
        setShow(false);
    };

    function delay(ms: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const handleAgregar = (event) => {
        //if (event.target.value.trim() !== '') {
        setCompromisos(event.target.value)
        //} 
      };

    const closeNotification = async () => {
        await delay(4000);
        window.location.reload();
    };

    const closeNotificationError = async () => {
        await delay(4000);
    };

    const handleGuardar = () => {
        if (compromisos != '') {
            (async () => {
                const data={comentario:compromisos,id:evaluationId}
                const response = await agregarCompromisos(data);
                if (response) {
                    toast.success("Se ha añadido correctamente los compromisos");
                    setShow(false);
                    closeNotification();
                }else {
                    toast.error("Ocurrió un problema");
                    //setShow(false);
                    closeNotificationError();
                }
            })();
        } else {
            toast.error("Debe llenar los compromisos");
            //setShow(false);
            closeNotificationError();
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <Modal.Header closeButton>
                <Modal.Title>{evaluationComment != null ? <>Compromisos</> : <>Agregar Compromisos</>}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        {evaluationComment != null 
                            ? <Form.Control readOnly value={evaluationComment} as="textarea" rows={3} />
                            : <Form.Control onChange={handleAgregar} placeholder="Ingrese los compromisos" value={compromisos} as="textarea" rows={3} />}
                    </Form.Group>
                </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-primary' className='boton-dejar mr-10' onClick={() => setShow(false)}>
                    Volver
                </Button>
                {evaluationComment != null 
                    ? <></>
                    : <Button variant="primary" onClick={handleGuardar} disabled={compromisos.trim() === ''} >
                        Agregar
                    </Button>
                }
                
            </Modal.Footer>
        </Modal>
    );
};
export default ModalCompromisos;
