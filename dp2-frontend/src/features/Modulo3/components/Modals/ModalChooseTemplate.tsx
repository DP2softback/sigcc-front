import React, { useEffect, useState } from 'react'
import { InputGroup, Button, Modal, Accordion, Form, FormCheck } from 'react-bootstrap';
import './ModalExportarReporte.css'
import { getPlantillas } from '@features/Modulo3/services/templates';
import Template from '@features/Modulo3/components/Cards/Template/Template';
import { CONTINUOS_EVALUATION_TYPE, PERFORMANCE_EVALUATION_TYPE } from '@features/Modulo3/utils/constants';
import { navigateTo } from '@features/Modulo3/utils/functions';
import { CONTINUOS_EVALUATION_CREATE } from '@config/paths';
const ModalChooseTemplate = (props) => {
    const {show, setShow, tipo, employeeId, employeeName  } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [plantillas,setPlantillas]=useState([]);
    const imagen = {
        image: 'https://media.istockphoto.com/id/1374487428/es/vector/altavoz-de-meg%C3%A1fono-3d-o-altavoz-meg%C3%A1fono-para-anunciar-promoci%C3%B3n-altavoz-de-meg%C3%A1fono-con.jpg?s=612x612&w=0&k=20&c=T_IXBnvEl28k5MTrzMoiO9xwQypsT1VzngBvTlR2S0s=',
        imageStyle: '100px',
    }
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const response = await getPlantillas();
            if(response){
                if(tipo===CONTINUOS_EVALUATION_TYPE){
                    setPlantillas(response[CONTINUOS_EVALUATION_TYPE]);
                    console.log("response[CONTINUOS_EVALUATION_TYPE]",response[CONTINUOS_EVALUATION_TYPE]);
                }
                else if(tipo===PERFORMANCE_EVALUATION_TYPE){
                    setPlantillas(response[PERFORMANCE_EVALUATION_TYPE]);
                }
                console.log("response",response);
            }
          setIsLoading(false);
        })();
      }, []);


    const handleClose = () => {
        setShow(false);
      };
    const handleSeleccion=(template)=>{
        console.log(template['plantilla-id'])
        setShow(false);
        navigateTo(CONTINUOS_EVALUATION_CREATE, { id: employeeId, name: employeeName, idPlantilla:template['plantilla-id'] });
    }
  	const templates = (
        <div className='pl-templates'>
                {plantillas && plantillas.length > 0 && plantillas.map((template,index) =>{
                    return (
                        <div key={template['plantilla-id']}>
                            <Template 
                                key={template['plantilla-id']}
                                image={imagen.image} 
                                imageStyle={imagen.imageStyle} 
                                name={template['plantilla-nombre']}
                                onClick={() => handleSeleccion(template)}
                            />
                        </div>
                    )              
                })}
        </div>
    );
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Elegir Plantilla</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
        {templates}
        </div>
          </Modal.Body>
      
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      );
                }
export default ModalChooseTemplate;