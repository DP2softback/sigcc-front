import react, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IndexEvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { Form, Button, Dropdown} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

const IndexEvaluacionContinua = () => {
  const [activeRepContinua, setActiveRepContinua] = useState(true);
  const chartRef = useRef(null);

  const chart = (
    <div
      id="chart-container"
      className="col-md-12 mb-32px"
      style={{ paddingBottom: '12px', marginBottom: '32px' }}
    >
      <Linechart
        title={activeRepContinua ? 'Evaluaciones Continuas - Todas las áreas' : 'Evaluaciones de Desempeño - Todas las áreas'}
        dataInfoprops={[
          { descripcion: 'Precisión y exactitud en el trabajo realizado', values: [3, 2, 2, 1, 5, 5] },
          { descripcion: 'Cumplimiento de los estándares de calidad', values: [1, 3, 2, 2, 3, 5] },
          { descripcion: 'Trabajo completo y bien organizado', values: [4, 1, 3, 5, 3, 4] },
          { descripcion: 'Identificación y corrección de errores y problemas', values: [2, 5, 1, 2, 3, 4] },
          { descripcion: 'Cumplimiento de los plazos establecidos', values: [5, 3, 4, 3, 2, 5] },
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

  const handleButtonExportClick = async () => {
    const chartElement = document.getElementById('chart-container');

    // Captura el contenido del componente como una imagen utilizando dom-to-image
    const imageDataUrl = await domtoimage.toPng(chartElement);

    // Crea un nuevo objeto PDF
    const doc = new jsPDF();

    // Calcula las dimensiones de la imagen en el documento PDF
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (chartElement.offsetHeight / chartElement.offsetWidth) * pdfWidth;

    // Agrega la imagen al documento PDF
    doc.addImage(imageDataUrl, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);

    // Descarga el archivo PDF
    doc.save('Reporte.pdf');
  };

  const handleButtonModeClick = () => {
    setActiveRepContinua(!activeRepContinua);
  };
  
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
        <Button variant='primary' className='ec-buttonExportar' onClick={handleButtonExportClick}>Exportar a PDF            
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
