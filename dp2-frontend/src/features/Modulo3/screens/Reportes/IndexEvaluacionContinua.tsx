import react, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IndexEvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { Form, Button, Dropdown} from 'react-bootstrap';
import { PDFViewer, Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';

const IndexEvaluacionContinua = () => {
  const [activeRepContinua, setActiveRepContinua] = useState(true);

  const chart = (
    <div className='col-md-12 mb-32px' style={{paddingBottom:"12px", marginBottom:"32px"}}>
      <Linechart
        title={(activeRepContinua)?"Evaluaciones Continuas - Todas las áreas" : "Evaluaciones de Desempeño - Todas las áreas"}
        dataInfoprops={[          
            {descripcion : 'Precisión y exactitud en el trabajo realizado', values: [3, 2, 2, 1, 5, 5] },
            {descripcion : 'Cumplimiento de los estándares de calidad', values: [1, 3, 2, 2, 3, 5] }, 
            {descripcion : 'Trabajo completo y bien organizado', values: [4, 1, 3, 5, 3, 4] }, 
            {descripcion : 'Identificación y corrección de errores y problemas', values: [2, 5, 1, 2, 3, 4] }, 
            {descripcion : 'Cumplimiento de los plazos establecidos', values: [5, 3, 4, 3, 2, 5] }                            
        ]}
      />
    </div>
  );
  
  const content = (
    <>
    {chart}
    </>
  )

  const handleSelect = (eventKey: any) => {
    console.log(eventKey);
  }

  const handleButtonModeClick = () => {
    setActiveRepContinua(!activeRepContinua);
  };
  
  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <View>
          <Text>Contenido del PDF</Text>
          {/* {body} */}
        </View>
      </Page>
    </Document>
  );
  
  const filters = (
    <Form>
      <Form.Group controlId='searchEmployees' className='ec-indexFilters'>        
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="outline-secondary" className="ec-indexButton">
              Todas las áreas
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action1">Opción 1</Dropdown.Item>
              <Dropdown.Item href="#action2">Opción 2</Dropdown.Item>
              <Dropdown.Item href="#action3">Opción 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>    

          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="outline-secondary" className="ec-indexButton">
              Todas las categorías
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#action1">Opción 1</Dropdown.Item>
              <Dropdown.Item href="#action2">Opción 2</Dropdown.Item>
              <Dropdown.Item href="#action3">Opción 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>                                                
          
          <Form.Control type='date' placeholder='Fecha inicio' className='ec-indexFilterDate'/>
          <Form.Control type='date' placeholder='Fecha fin' className='ec-indexFilterDate'/>
          <Button variant='primary' className='ec-buttonBuscar'>Buscar</Button>        
        <Button variant='primary' className='ec-buttonExportar'>            
          <PDFDownloadLink document={<MyDocument />} fileName="Reporte.pdf" className='ec-downloadLink'>
            {({ loading }) =>
              loading ? 'Generando PDF...' : 'Exportar a PDF'
            }
          </PDFDownloadLink>
        </Button>
        <Button variant='secondary' className='ec-buttonChangeMode' onClick={handleButtonModeClick}>{activeRepContinua? "Evaluación de Desempeño":"Evaluación Continua"}</Button>
      </Form.Group>            
    </Form>
  );
  
  const body = (
    <Section title={(activeRepContinua)?"Evaluaciones Continuas":"Evaluaciones de Desempeño"} content={content} filters={filters} 
    titleStyle={{width: "100%", flexDirection:"column"}}
    contentStyle={{width: "100%", flexDirection:"column", height: "100%"}}  
    />
  )
  
  return (
    <>
      <Layout
        title={'Reportes'}
        body={body}
        subtitle='Reportes acerca de las evaluaciones continuas y evaluaciones de desempeño de los trabajadores'
      />
    </>
  );
};

export default IndexEvaluacionContinua;
