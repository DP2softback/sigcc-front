import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import React,{useState} from 'react';
import { Form, Button, InputGroup, Accordion, OverlayTrigger, Tooltip  } from 'react-bootstrap';
import categorias from '@features/Modulo3/jsons/Categories';
import "./Plantillas.css"


const Edit = () => {
  const [file, setFile] = useState(null);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const filters = (
        <Form className='ec-indexFilters'>
          <Form.Group>
          <label htmlFor='nombrePlantilla'>Nombre de plantilla</label>
          <Form.Control placeholder='Comunicación Oral' id="nombrePlantilla" disabled={true}/>
          </Form.Group>
          <Form.Group className='ec-indexFilterElement'>
          <label htmlFor='file'>Imagen relacionada</label>
          <Form.Control type="file" id="file" name="file" accept="image/*"  />
          </Form.Group>
 
      </Form>
  );
  const acordion =(
    <Accordion> 
    {
        categorias.map((element, index) => (
            <AccordionPlantilla key={index} element={element} index={index}/>
        ))
    }
    </Accordion>
  )

  const content = (
    <>
    {acordion}
    <div className="text-end mt-32 mb-4">
      <Button >
        Editar Plantilla
      </Button>
    </div>
    </>
  )

  const body = (
    <Section title={null} content={content} filters={filters}/>
  );
  return (
    <div>
        <Layout
        title={'Plantilla - Comunicación Oral'}
        body={body}
    />
    </div>
  );
};

export default Edit;

function AccordionPlantilla({element, index}) {
  const {name, id, subcategories} = element;
  return (
      <Accordion.Item eventKey={`${id}`} className="accordionPlantilla">
          <Accordion.Header className="accordionPlantilla__header">
              <span className="accordionPlantilla__header-name">{name}</span>
          </Accordion.Header>
          <Accordion.Body className="accordionPlantilla__body">
              <div className="accordionPlantilla__body-items">
              {
               subcategories.map((f,i) => (
                              <InputGroup className="accordionPlantilla__flow-flows-item">

                              <InputGroup  />
                                  
                                  <div className="accordionPlantilla__flow-flows-name">
                                      {

                                          <span>{f}</span>
                                      }

                                  </div>

                              </InputGroup>
                          )
                  )
                  }
              </div>
          </Accordion.Body>
      </Accordion.Item>
  )
}