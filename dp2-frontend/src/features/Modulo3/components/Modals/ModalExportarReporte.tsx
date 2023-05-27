import React from 'react'
import { InputGroup, Button, Modal, Accordion, Form, FormCheck } from 'react-bootstrap';
import './ModalExportarReporte.css'

const categorias = [
{
    id: '1',
    name: 'Calidad del Trabajo',
    subcategorias:['Cumplimiento de los objetivos','Cantidad y calidad', 'Uso eficiente del tiempo', 'Capacidad de trabajo bajo presion']
},
{
    id: '2',
    name: 'Productividad',
    subcategorias:['Cumplimiento de los objetivos','Cantidad y calidad', 'Uso eficiente del tiempo', 'Capacidad de trabajo bajo presion']
}
]

const accordion =(
    <Accordion alwaysOpen={true}> 
    {
        categorias.map((categoria, index) => (
            <Accordion.Item eventKey={categoria.id}>
                <Accordion.Header>
                    <FormCheck 
                        type='checkbox'
                        label={categoria.name}
                    />
                </Accordion.Header>
                <Accordion.Body>
                    <div className="accordionExpPla-bodyitems">
                    {
                    categoria.subcategorias.map((subcategoria,index) => (
                        <FormCheck 
                            type='checkbox'
                            label={subcategoria}
                        />
                        )
                    )
                    }
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        ))
    }
    </Accordion>
)

const ModalExportReporte = () => {
    return(
        <Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Exportar Reporte</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {accordion}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary">
                    Exportar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalExportReporte;