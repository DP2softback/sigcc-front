import react, {useState, useRef, useEffect} from 'react';
import './IndexEvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { Form, Button, Dropdown} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { REPORT_CONTINUOS_EVALUATION_INDEX } from '@features/Modulo3/routes/path';
import { getAreas, getCategoriasDesempenio, postReportLineChart} from '@features/Modulo3/services/reports';
import { formatDashboardJson } from '@features/Modulo3/utils/functions';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; 
import logoUrl from '../../assets/images/LogoHCM.png';

type DataLineChart = {
  year: string;
  month: {
    month: string;
    category_scores: {
      CategoryName: string;
      ScoreAverage: number;
    }[];
  }[];
}[];

const IndexEvaluacionDesempenho = () => {
  const [activeRepContinua, setActiveRepContinua] = useState(false);

  const [searchParams, setSearchParams] = useState({
    area: {id:0 , name:"Todas las áreas"},
    categoria: {id:0, name:"Todas las categorías"},
    fechaInicio: null,
    fechaFin: null,
    evaluationType: "Evaluación de Desempeño"
  });
  
  const [areas, setAreas] = useState([]); // Cuando tengamos las apis dejarlo como array vacío
  const [categoriasContinua, setCategoriasContinua] = useState([]); // Cuando tengamos las apis dejarlo como array vacío
  const [categoriasDesempenio, setCategoriasDesempenio] = useState([]); // Cuando tengamos las apis dejarlo como array vacío

  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [defaultDashboard, setDefaultDashboard] = useState(
    {
      data: [
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
        {description: "", values: 0},
      ],
      months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const dataAreas = await getAreas();
        const dataCategoriasDesempenio = await getCategoriasDesempenio();
        setAreas([{id:0 , name:"Todas las áreas"},...dataAreas]);          
        setCategoriasDesempenio([{id:0 , name:"Todas las categorias"},...dataCategoriasDesempenio]);
      } catch (error){
        console.error("Error fetching data: ", error)
      }
      setDashboard(defaultDashboard);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const chart = (
    <div
      id="chart-container"
      className="col-md-12 mb-32px"
      style={{ paddingBottom: '12px', marginBottom: '32px', marginTop: '20px' }}
    >          
      {dashboard && (
        <Linechart
          title={
            activeRepContinua
              ? `Evaluaciones Continuas - ${searchParams.area.name}`
              : `Evaluaciones de Desempeño - ${searchParams.area.name}`
          }
          dataInfoprops={dashboard.data}
          labelsX={dashboard.months}
        />
      )}
    </div>
  );
  
  const content = (
    <>
    {chart}
    </>
  )

  const handleArea = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
    const selected = areas.find(area => area.id === Number(eventKey));
    console.log("Selected Area: ", selected);
    setSearchParams(prevState => ({
      ...prevState,
      area: selected ? selected : {id:0 , name:"Todas las áreas"},
    }));
  };

  const handleCategoria = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
    const selected = (activeRepContinua ? categoriasContinua : categoriasDesempenio).find(categoria => categoria.id === Number(eventKey));
    console.log("Selected Categoria: ", selected);
    setSearchParams(prevState => ({
      ...prevState,
      categoria: selected ? selected : {id:0, name:"Todas las categorías"},
    }));
  }

  const handleFechaInicio = (event) => {
    setSearchParams(prevState => ({
      ...prevState,
      fechaInicio: new Date(event.target.value),
    }));
  };

  const handleFechaFin = (event) => {
    setSearchParams(prevState => ({
      ...prevState,
      fechaFin: new Date(event.target.value),
    }));
  };

  const handleButtonModeClick = () => {
    setActiveRepContinua(!activeRepContinua);
    setSearchParams(prevState => ({
      ...prevState,
      area: {id:0 , name:"Todas las áreas"},
      categoria: {id:0, name:"Todas las categorías"},
    }));
  };

  const handleSearchClick = () => {
    if(searchParams.fechaInicio === null || searchParams.fechaFin === null) {
      toast.warn("Debe seleccionar un rango de fechas");
      return;
    }
    if(searchParams.fechaInicio > searchParams.fechaFin) {
      toast.warn("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    //Upate searchParams.fechaInicio and searchParams.fechaFin to ISOString
    const searchParamsCopy = {...searchParams};
    searchParamsCopy.fechaInicio = searchParams.fechaInicio.toISOString().split('T')[0];
    searchParamsCopy.fechaFin = searchParams.fechaFin.toISOString().split('T')[0];

    if(activeRepContinua) {
      const fetchData = async () => {
        setIsLoading(true);
        const data = await postReportLineChart(searchParamsCopy.area.id, searchParamsCopy.categoria.id, searchParamsCopy.fechaInicio, searchParamsCopy.fechaFin, searchParamsCopy.evaluationType);
        if(data){
          let dataSorted:DataLineChart = data;
          dataSorted = sortMonths(dataSorted);
          setDashboard(formatDashboardJson(dataSorted));
        }
        else{
          console.log("Error C: ", data);
        }
        setIsLoading(false);
      };
      fetchData();
    }
    else{
      const fetchData = async () => {
        setIsLoading(true);
        const data = await postReportLineChart(searchParamsCopy.area.id, searchParamsCopy.categoria.id, searchParamsCopy.fechaInicio, searchParamsCopy.fechaFin, searchParamsCopy.evaluationType);
        if(data){
          let dataSorted:DataLineChart = data;
          dataSorted = sortMonths(dataSorted);
          setDashboard(formatDashboardJson(dataSorted));
        }
        else{
          console.log("Error D: ", data);
        }
        setIsLoading(false);
      };
      fetchData();
    }        
  };

  const handleButtonExportClick = async () => {
    if(searchParams.fechaInicio === null || searchParams.fechaFin === null) {
      toast.warn("Debe seleccionar un rango de fechas");
      return;
    }
    if(searchParams.fechaInicio > searchParams.fechaFin) {
      toast.warn("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    printPdf();
  };

  const printPdf = async () => {
    const chartElement = document.getElementById('chart-container');
    
    // Captura el contenido del componente como una imagen utilizando dom-to-image
    const imageDataUrl = await domtoimage.toPng(chartElement);
    
    // Crea un nuevo objeto PDF
    const doc = new jsPDF();
    
    // Añade el logotipo
    await doc.addImage(logoUrl, 'PNG', 160, 5, 30, 10);
    
    // Añade el nombre de la empresa
    doc.setFontSize(12);
    
    // Agrega un título 
    const title = 'Reporte de Evaluación de Desempeño';
    const titleFontSize = 22;
    doc.setFontSize(titleFontSize);
    const titleWidth = doc.getStringUnitWidth(title) * titleFontSize / doc.internal.scaleFactor;
    const titlePosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titlePosition, 30); // 30 es la posición en y

    // Agrega un subtítulo
    const subtitle = `Periodo: ${searchParams.fechaInicio.toISOString().split('T')[0]} a ${searchParams.fechaFin.toISOString().split('T')[0]}`;
    const subtitleFontSize = 16;
    doc.setFontSize(subtitleFontSize);
    const subtitleWidth = doc.getStringUnitWidth(subtitle) * subtitleFontSize / doc.internal.scaleFactor;
    const subtitlePosition = (doc.internal.pageSize.getWidth() - subtitleWidth) / 2;
    doc.text(subtitle, subtitlePosition, 45); 

    // Calcula las dimensiones de la imagen en el documento PDF
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (chartElement.offsetHeight / chartElement.offsetWidth) * pdfWidth;

    // Agrega la imagen al documento PDF
    doc.addImage(imageDataUrl, 'PNG', 10, 50, pdfWidth - 20, pdfHeight - 20);

    // Agrega la fecha de hoy en la parte inferior derecha
    const date = new Date();
    const dateString = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth()+1).padStart(2, '0')}-${date.getFullYear()}`;
    const dateFontSize = 12;
    doc.setFontSize(dateFontSize);
    doc.text(dateString, 10, doc.internal.pageSize.getHeight() - 10); // 10 es el margen en x, doc.internal.pageSize.getHeight() - 10 es la posición en y
    
    // Añade el número de hoja
    const pageFontSize = 12;
    doc.setFontSize(pageFontSize);
    const numberPage = 1;
    const pageNumberString = `Página: ${numberPage}`;
    const pageNumberWidth = doc.getStringUnitWidth(pageNumberString) * pageFontSize / doc.internal.scaleFactor;
    doc.text(pageNumberString, doc.internal.pageSize.getWidth() - pageNumberWidth - 10, doc.internal.pageSize.getHeight() - 10);

    // Descarga el archivo PDF
    doc.save('Reporte Evaluacion de Desempeno.pdf');
  };
  
  const sortMonths = (data: DataLineChart) => {
    const sortedData = JSON.parse(JSON.stringify(data)); // Deep copy
    sortedData.forEach((item) => {
      item.month.sort((a, b) => a.month.localeCompare(b.month));
    });
    return sortedData;
  };  

  const filters = (
    <Form>
      <Form.Group controlId='reportes' className='ec-indexFilters'>        
          <Dropdown onSelect={handleArea}>
            <Dropdown.Toggle variant="outline-secondary" className="ec-indexButton">
              {searchParams.area.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {areas.map((area) => (
                <Dropdown.Item eventKey={area.id} value={area.id}>{area.name}</Dropdown.Item>
              ))}              
            </Dropdown.Menu>
          </Dropdown>    
          <Dropdown onSelect={handleCategoria}>
            <Dropdown.Toggle variant="outline-secondary" className="ec-indexButton">
              {searchParams.categoria.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                (activeRepContinua ? categoriasContinua : categoriasDesempenio).map(categoria => (
                  <Dropdown.Item eventKey={categoria.id} value={categoria.id}>{categoria.name}</Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown> 

          <Form.Control 
            type='date' 
            placeholder='Fecha inicio' 
            className='ec-indexFilterDate'
            onChange={handleFechaInicio}
          />
          <Form.Control 
            type='date' 
            placeholder='Fecha fin' 
            className='ec-indexFilterDate'
            onChange={handleFechaFin}  
          />
        <Button variant='primary' className='ec-buttonBuscar' onClick={handleSearchClick}>Buscar</Button>        
        <Button variant='primary' className='ec-buttonExportar' onClick={handleButtonExportClick}>Exportar a PDF            
        </Button>
        {/* <Button variant='secondary' className='ec-buttonChangeMode' onClick={handleButtonModeClick}>{activeRepContinua? "Evaluación de Desempeño":"Evaluación Continua"}</Button> */}
      </Form.Group>            
    </Form>
  );
  
  const body = (
    <Section title={(activeRepContinua)?"Evaluaciones Continuas":"Evaluaciones de Desempeño"} 
      content={isLoading ? <LoadingScreen/> : content}
      filters={filters} 
      titleStyle={{width: "100%", flexDirection:"column"}}
      contentStyle={{width: "100%", flexDirection:"column", height: "100%"}}  
    />
  )
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
      <Layout
        title={'Reportes'}
        body={body}
        subtitle='Reportes acerca de las evaluaciones continuas y evaluaciones de desempeño de los trabajadores'
				route={REPORT_CONTINUOS_EVALUATION_INDEX}
      />
    </>
  );
};

export default IndexEvaluacionDesempenho