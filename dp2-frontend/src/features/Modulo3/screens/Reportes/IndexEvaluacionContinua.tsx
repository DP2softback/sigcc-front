import react, {useState, useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IndexEvaluacionContinua.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Linechart from '@features/Modulo3/components/Charts/Linechart/Linechart';
import { Form, Button, Dropdown} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { REPORT_CONTINUOS_EVALUATION_INDEX } from '@config/paths';
import { getAreas, getCategoriasContinua, getCategoriasDesempenio, getEmployeesEvaluationDashboard, getReportDesempenioLineChart, getReportContinuaLineChart, getPostAreas, getPostCategoriasContinua, getPostCategoriasDesempenio, getPostReportContinuaLineChart, getPostReportDesempenioLineChart } from '@features/Modulo3/services/reports';
import { formatDashboardJson } from '@features/Modulo3/utils/functions';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import { set } from 'zod';

const dataAreas =     [
  {
    id: 1,
    area: "Infraestructura"
  },
  {
    id: 2,
    area: "Seguridad"
  },
  {
    id: 3,
    area: "Desarrollo"
  },
  {
    id: 4,
    area: "Soporte"
  }
];

const dataCategoriasEvaluacion = [
  {
    id: 1,
    categoria: "Calidad del Trabajo"
  },
  {
    id: 2,
    categoria: "Habilidades Blandas"
  },
  {
    id: 3,
    categoria: "Conocimientos"
  },
  {
    id: 4,
    categoria: "Productividad"
  },
  {
    id: 5,
    categoria: "Creatividad y Iniciativa"
  }
];

const dataCategoriasDesempenio =  [
  {
    id: 1,
    categoria: "Calidad del Trabajo"
  },
  {
    id: 2,
    categoria: "Productividad"
  },
  {
    id: 3,
    categoria: "Comportamiento y actitud"
  },
  {
    id: 4,
    categoria: "Habilidades técnicas"
  },
  {
    id: 5,
    categoria: "Comunicación"
  },
  {
    id: 6,
    categoria: "Colaboración y trabajo en equipo"
  },
  {
    id: 7,
    categoria: "Habilidades de liderazgo"
  },
  {
    id: 8,
    categoria: "Iniciativa y creatividad"
  },
  {
    id: 9,
    categoria: "Cumplimiento de objetivos y metas"
  },
  {
    id: 10,
    categoria: "Desarrollo profesional y personal"
  }
]

const IndexEvaluacionContinua = () => {
  const [activeRepContinua, setActiveRepContinua] = useState(true);

  const [searchParams, setSearchParams] = useState({
    area: {id:0 , area:"Todas las áreas"},
    categoria: {id:0, categoria:"Todas las categorías"},
    fechaInicio: null,
    fechaFin: null,
  });
  
  const [areas, setAreas] = useState(dataAreas); // Cuando tengamos las apis dejarlo como array vacío
  const [categoriasContinua, setCategoriasContinua] = useState(dataCategoriasEvaluacion); // Cuando tengamos las apis dejarlo como array vacío
  const [categoriasDesempenio, setCategoriasDesempenio] = useState(dataCategoriasDesempenio); // Cuando tengamos las apis dejarlo como array vacío

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

      // const areasData = await getPostAreas();
      // setAreas(areasData);
      
      // const categoriasContinuaData = await getPostCategoriasContinua();
      // setCategoriasContinua(categoriasContinuaData);

      // const categoriasDesempenioData = await getPostCategoriasDesempenio();
      // setCategoriasDesempenio(categoriasDesempenioData);

      setDashboard(defaultDashboard);

      // const data = await getEmployeesEvaluationDashboard(5);
      // if(data){
      //   setDashboard(formatDashboardJson(data));
      //   console.log("Data: ", data);
      //   console.log("Dashboard: ", dashboard);
      // }
      // else{
      //   console.log("Error: ", data);
      // }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const chart = (
    <div
      id="chart-container"
      className="col-md-12 mb-32px"
      style={{ paddingBottom: '12px', marginBottom: '32px' }}
    >          
      {dashboard && (
        <Linechart
          title={
            activeRepContinua
              ? `Evaluaciones Continuas - ${searchParams.area.area}`
              : `Evaluaciones de Desempeño - ${searchParams.area.area}`
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
    setSearchParams(prevState => ({
      ...prevState,
      area: selected ? selected : {id:0 , area:"Todas las áreas"},
    }));
  };

  const handleCategoria = (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
    const selected = (activeRepContinua ? categoriasContinua : categoriasDesempenio).find(categoria => categoria.id === Number(eventKey));
    setSearchParams(prevState => ({
      ...prevState,
      categoria: selected ? selected : {id:0, categoria:"Todas las categorías"},
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
      area: {id:0 , area:"Todas las áreas"},
      categoria: {id:0, categoria:"Todas las categorías"},
    }));
  };

  const handleSearchClick = () => {
    const { area, categoria, fechaInicio, fechaFin } = searchParams;
    
    if(fechaInicio === null || fechaFin === null) {
      alert("Debe seleccionar un rango de fechas");
      return;
    }

    if(fechaInicio > fechaFin) {
      alert("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    if(searchParams.area.id === 0) {
      alert("Debe seleccionar un área");
      return;
    }
    if(searchParams.categoria.id === 0) {
      alert("Debe seleccionar una categoría");
      return;
    }

    if(activeRepContinua) {
      const fetchData = async () => {
        setIsLoading(true);
        const data = await getPostReportContinuaLineChart(searchParams.area.id, searchParams.categoria.id, searchParams.fechaInicio, searchParams.fechaFin);
        if(data){
          setDashboard(formatDashboardJson(data));
          console.log("Data: ", data);
          console.log("Dashboard: ", dashboard);
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
        const data = await getPostReportDesempenioLineChart(searchParams.area.id, searchParams.categoria.id, searchParams.fechaInicio, searchParams.fechaFin);
        if(data){
          setDashboard(formatDashboardJson(data));
          console.log("Data: ", data);
          console.log("Dashboard: ", dashboard);
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
  
  const filters = (
    <Form>
      <Form.Group controlId='reportes' className='ec-indexFilters'>        
          <Dropdown onSelect={handleArea}>
            <Dropdown.Toggle variant="outline-secondary" className="ec-indexButton">
              {searchParams.area.area}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={0} value={0}>Todas las áreas</Dropdown.Item>
              {areas.map((area) => (
                <Dropdown.Item eventKey={area.id} value={area.id}>{area.area}</Dropdown.Item>
              ))}              
            </Dropdown.Menu>
          </Dropdown>    
          <Dropdown onSelect={handleCategoria}>
            <Dropdown.Toggle variant="outline-secondary" className="ec-indexButton">
              {searchParams.categoria.categoria}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={0} value={0}>Todas las categorías</Dropdown.Item>
              {
                (activeRepContinua ? categoriasContinua : categoriasDesempenio).map(categoria => (
                  <Dropdown.Item eventKey={categoria.id} value={categoria.id}>{categoria.categoria}</Dropdown.Item>
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
        <Button variant='secondary' className='ec-buttonChangeMode' onClick={handleButtonModeClick}>{activeRepContinua? "Evaluación de Desempeño":"Evaluación Continua"}</Button>
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
