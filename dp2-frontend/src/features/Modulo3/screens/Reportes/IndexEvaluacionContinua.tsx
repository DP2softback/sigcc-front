import react, {useState, useRef, useEffect} from 'react';
import './IndexEvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { Form, Button, Dropdown} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { REPORT_CONTINUOS_EVALUATION_INDEX } from '@features/Modulo3/routes/path';
import { getAreas, getCategoriasContinua, getCategoriasDesempenio,postReportLineChart, postReportLineChartAll,postReportLineChartAllAreasCategories} from '@features/Modulo3/services/reports';
import { formatDashboardJsonReport, formatDashboardJsonAreasCategorias,formatDashboardJsonAreas, formatDashboardJsonCategorias } from '@features/Modulo3/utils/functions';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; 
import logoUrl from '../../assets/images/LogoHCM.png';

type DataLineChart = {
  Year: string;
  Month: {
    month: string;
    subCategory_scores: {
      CategoryName: string;
      ScoreAverage: number;
    }[];
  }[];
}[];

const IndexEvaluacionContinua = () => {
  const [activeRepContinua, setActiveRepContinua] = useState(true);

  const [searchParams, setSearchParams] = useState({
    area: {id:0 , name:"Todas las áreas"},
    categoria: {id:0, name:"Todas las categorías"},
    fechaInicio: new Date().toISOString().substring(0, 10),
    fechaFin: new Date().toISOString().substring(0, 10),
    evaluationType: "Evaluación Continua"
  });
  
  const [areas, setAreas] = useState([]); // Cuando tengamos las apis dejarlo como array vacío
  const [categoriasContinua, setCategoriasContinua] = useState([]); // Cuando tengamos las apis dejarlo como array vacío
  const [categoriasDesempenio, setCategoriasDesempenio] = useState([]); // Cuando tengamos las apis dejarlo como array vacío
  const [dataAllAreasByAreas, setDataAllAreasByAreas] = useState([]);
  const [dataAllAreasByCategories, setDataAllAreasByCategories] = useState([]);
  const [areaSelected, setAreaSelected] = useState({name:""});
  const [categoriaSelected, setCategoriaSelected] = useState({name:""});

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
    // Invocaciones provisionales:
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const dataAreas = await getAreas();
        const dataCategoriasContinua = await getCategoriasContinua();
        const dataCategoriasDesempenio = await getCategoriasDesempenio();
        setAreas([{id:0 , name:"Todas las áreas"},...dataAreas]);          
        setCategoriasContinua([{id:0 , name:"Todas las categorias"},...dataCategoriasContinua]);
        
        const dateInicio = new Date(); 
        const dateFin = new Date();
        dateInicio.setMonth(dateInicio.getMonth() - 6); 
        setSearchParams({...searchParams, fechaInicio: getFormattedDate(dateInicio), fechaFin: getFormattedDate(dateFin)});

        const reportData = await postReportLineChartAllAreasCategories(dateInicio.toISOString().split('T')[0] , dateFin.toISOString().split('T')[0], "Evaluación Continua");
        // const reportData = await postReportLineChartAllAreasCategories(0, 0,"2023-01-01" , "2023-06-21", "Evaluación Continua");
        
        if(reportData){
        // let dataSorted:DataLineChart = reportData;
        // dataSorted = sortMonths(dataSorted);
          setDashboard(formatDashboardJsonAreasCategorias(reportData));
        }
        else{
          console.log("Error en report data: ", reportData);
        }
      } catch (error){
        console.error("Error fetching data: ", error)
        setDashboard(defaultDashboard);
      }
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
  
  const chartsAreas = dataAllAreasByAreas.map((areaData, index) => {
    const categoriaName = categoriaSelected.name;
    return (
      <div
        key={index}  // Se añade un key para elementos en una lista
        id="chart-container"
        className="col-md-12 mb-32px"
        style={{ paddingBottom: '12px', marginBottom: '32px', marginTop: '20px' }}
      >
        <Linechart
          title={`Evaluación Continua  - Area: ${areaData.area} - Categoría: ${categoriaName}`}
          dataInfoprops={areaData.data}
          labelsX={areaData.months}
        />
      </div>
    );
  });

  const chartsCategorias = dataAllAreasByCategories.map((categoriaData, index) => {
    const areaName = areaSelected.name;
    return (
      <div
        key={index}  // Se añade un key para elementos en una lista
        id="chart-container"
        className="col-md-12 mb-32px"
        style={{ paddingBottom: '12px', marginBottom: '32px', marginTop: '20px' }}
      >
        <Linechart
          title={`Evaluación Continua - Area: ${areaName} - Categoría: ${categoriaData.categoria}`}
          dataInfoprops={categoriaData.data}
          labelsX={categoriaData.months}
        />
      </div>
    );
  });

  const content = (
    <>
      {dataAllAreasByAreas.length===0 && dataAllAreasByCategories.length===0? chart :
      dataAllAreasByAreas.length!==0 && dataAllAreasByCategories.length===0? chartsAreas : chartsCategorias}
    </>
  )

  const handleArea = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
    const selected = areas.find(area => area.id === Number(eventKey));

    setSearchParams(prevState => ({
      ...prevState,
      area: selected ? selected : {id:0 , name:"Todas las áreas"},
    }));
  };

  const handleCategoria = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
    const selected = (activeRepContinua ? categoriasContinua : categoriasDesempenio).find(categoria => categoria.id === Number(eventKey));
    setSearchParams(prevState => ({
      ...prevState,
      categoria: selected ? selected : {id:0, name:"Todas las categorías"},
    }));
  }

  const handleFechaInicio = (event) => {
    setSearchParams(prevState => ({
      ...prevState,
      fechaInicio: event.target.value,
    }));
  };

  const handleFechaFin = (event) => {
    setSearchParams(prevState => ({
      ...prevState,
      fechaFin: event.target.value,
    }));
  };

  const handleSearchClick = () => {
    setDataAllAreasByAreas([]);
    setDataAllAreasByCategories([]);
    setDashboard(null);
    setAreaSelected(searchParams.area);
    setCategoriaSelected(searchParams.categoria);
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
    searchParamsCopy.fechaInicio = searchParams.fechaInicio;//.toISOString().split('T')[0];
    searchParamsCopy.fechaFin = searchParams.fechaFin;//.toISOString().split('T')[0];
    
    if(searchParamsCopy.area.id === 0 && searchParamsCopy.categoria.id === 0) {
      const fetchData = async () => {
        setIsLoading(true);
        const reportData = await postReportLineChartAllAreasCategories(searchParamsCopy.fechaInicio, searchParamsCopy.fechaFin, searchParamsCopy.evaluationType);
        if(reportData){
          // let dataSorted:DataLineChart = reportData;
          // dataSorted = sortMonths(dataSorted);
          setDashboard(formatDashboardJsonAreasCategorias(reportData));
        }
        else{
          console.log("Error en report data: ", reportData);
        }
        setIsLoading(false);
      };
      fetchData();
    }
    else if(searchParamsCopy.area.id !== 0 && searchParamsCopy.categoria.id === 0) {
      const fetchData = async () => {
        setIsLoading(true);
        const reportData = await postReportLineChartAll(searchParamsCopy.area.id, searchParamsCopy.categoria.id, searchParamsCopy.fechaInicio, searchParamsCopy.fechaFin, searchParamsCopy.evaluationType);
        if(reportData){
          const transformedData = formatDashboardJsonCategorias(reportData);
          setDataAllAreasByCategories(transformedData);
        }
        else{
          console.log("Error en report data: ", reportData);
        }
        setIsLoading(false);
      };
      fetchData();
    }
    else if(searchParamsCopy.area.id === 0 && searchParamsCopy.categoria.id !== 0) {
      const fetchData = async () => {
        setIsLoading(true);
        const reportData = await postReportLineChartAll(searchParamsCopy.area.id, searchParamsCopy.categoria.id, searchParamsCopy.fechaInicio, searchParamsCopy.fechaFin, searchParamsCopy.evaluationType);
        if(reportData){
          const transformedData = formatDashboardJsonAreas(reportData);
          setDataAllAreasByAreas(transformedData);
        }
        else{
          console.log("Error en report data: ", reportData);
        }
        setIsLoading(false);
      };
      fetchData();
    }
    else if(searchParamsCopy.area.id !== 0 && searchParamsCopy.categoria.id !== 0){
      const fetchData = async () => {
        setIsLoading(true);
        const data = await postReportLineChartAll(searchParamsCopy.area.id, searchParamsCopy.categoria.id, searchParamsCopy.fechaInicio, searchParamsCopy.fechaFin, searchParamsCopy.evaluationType);
        if(data){
          let dataSorted:DataLineChart = data;
          console.log("data: ", data);
          // dataSorted = sortMonths(dataSorted);
          // console.log("dataSorted: ", dataSorted);
          setDashboard(formatDashboardJsonReport(data));
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

  const addHeader = (doc, pageNumber) => {
    doc.addImage(logoUrl, 'PNG', 160, 5, 30, 10); // Añade el logotipo
    doc.setFontSize(12); // Añade el nombre de la empresa
  
    const title = 'Reporte de Evaluación Continua'; // Agrega un título
    const titleFontSize = 22;
    doc.setFontSize(titleFontSize);
    const titleWidth = doc.getStringUnitWidth(title) * titleFontSize / doc.internal.scaleFactor;
    const titlePosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titlePosition, 30); // 30 es la posición en y
  
    const subtitle = `Periodo: ${searchParams.fechaInicio} a ${searchParams.fechaFin}`; // Agrega un subtítulo
    const subtitleFontSize = 16;
    doc.setFontSize(subtitleFontSize);
    const subtitleWidth = doc.getStringUnitWidth(subtitle) * subtitleFontSize / doc.internal.scaleFactor;
    const subtitlePosition = (doc.internal.pageSize.getWidth() - subtitleWidth) / 2;
    doc.text(subtitle, subtitlePosition, 45); 
  
    const date = new Date(); // Agrega la fecha de hoy en la parte inferior derecha
    const dateString = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth()+1).padStart(2, '0')}-${date.getFullYear()}`;
    const dateFontSize = 12;
    doc.setFontSize(dateFontSize);
    doc.text(dateString, 10, doc.internal.pageSize.getHeight() - 10); // 10 es el margen en x, doc.internal.pageSize.getHeight() - 10 es la posición en y
  
    const pageFontSize = 12; // Añade el número de hoja
    doc.setFontSize(pageFontSize);
    const pageNumberString = `Página: ${pageNumber}`;
    const pageNumberWidth = doc.getStringUnitWidth(pageNumberString) * pageFontSize / doc.internal.scaleFactor;
    doc.text(pageNumberString, doc.internal.pageSize.getWidth() - pageNumberWidth - 10, doc.internal.pageSize.getHeight() - 10);
  };
  
  const printPdf = async () => {
    const doc = new jsPDF(); // Crea un nuevo objeto PDF
  
    const chartContainers = document.querySelectorAll('#chart-container'); // Obtiene todos los contenedores de gráficos
    for (let i = 0; i < chartContainers.length; i++) {
      const chartElement = chartContainers[i] as HTMLElement;
  
      const imageDataUrl = await domtoimage.toPng(chartElement); // Captura el contenido del componente como una imagen utilizando dom-to-image
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (chartElement.offsetHeight / chartElement.offsetWidth) * pdfWidth;
  
      if (i !== 0) { // Si no es la primera página, añade una nueva página
        doc.addPage();
      }
    
      addHeader(doc, i + 1); // Llama a la función addHeader para cada página
  
      doc.addImage(imageDataUrl, 'PNG', 10, 50, pdfWidth - 20, pdfHeight - 20); // Agrega la imagen al documento PDF
    }
  
    doc.save('Reporte Evaluacion Continua.pdf'); // Descarga el archivo PDF
  };
  

  const sortMonths = (data: DataLineChart) => {
    const sortedData = JSON.parse(JSON.stringify(data)); // Deep copy
    sortedData.forEach((item) => {
      item.month.sort((a, b) => a.month.localeCompare(b.month));
    });
    return sortedData;
  };

  function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

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
            value={searchParams.fechaInicio}
            onChange={handleFechaInicio}
          />
          <Form.Control 
            type='date' 
            placeholder='Fecha fin' 
            value={searchParams.fechaFin}
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

export default IndexEvaluacionContinua;
