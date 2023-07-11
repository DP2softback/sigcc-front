import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import { useLocation,  useNavigate  } from 'react-router-dom';
import { Competencia, tipoCompetencia,AreaActiva } from "../GestionDeCompetencias/Tipos";
import './ConsolidadoCompetencias.css';
import { GAPS_ANALYSIS_MODULE, GAPS_EMPLOYEES_AREA, GAPS_EMPLOYEES_AREA_DETAIL } from '@features/Modulo2/routes/path';

import {TOKEN_SERVICE, URL_SERVICE} from '@features/Modulo2/services/ServicesApis'

const PieChart = ({ title, labels, datasets }) => {
    ChartJS.register(ArcElement, Tooltip, Legend, Title);
    const chartData = {
      labels: labels,
      datasets: datasets,
    };
    return (
      <div className="container-Pie">
        <Pie data={datasets} className="m-auto h-100" options={{
          plugins: {
            title: {
              display: true,
              align: 'center',
              text: title,
              font: {
                size: 24,
                weight: 'bold'
              }
            }
          }
        }}/>
      </div>
    );
  };

  const ConsolidadoCompetenciasAM = () => {
    const navigate = useNavigate();
      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
      const [tipoCompetencia, setTipoCompetencia] = useState<tipoCompetencia>(null);
      const [areasActivas, setAreasActivas] = useState<AreaActiva[]>([]);
      const [abbreviation, setAbbreviation] = useState('');
      const [hard, setHard] = useState(['Ingeniero de software', 'Desarrollador de aplicaciones', '	Arquitecto de software','Analista de sistemas', 'Asistente' ]);
      
      useEffect(() => {    

        const fetchTipoCompetencias = async () => {
          try {
    
            const response = await fetch(URL_SERVICE + '/gaps/employeeArea', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token 06ef101f0752dd28182b9e8535add969ca6aa35d',
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setTipoCompetencias(data);
            } else {
              console.log('Error al obtener los datos de competencias');
            }
          } catch (error) {
            console.log('Error al obtener los datos de competencias:', error);
          }
        };

        const fetchAreasActivas = async () => {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            }
          }
          try {
            const response = await fetch(URL_SERVICE + '/positions', requestOptions);
            if (response.ok) {
              const data = await response.json();
              setAreasActivas(data);
            }
          }
            catch (error) {
            console.error('Error fetching competencias:', error);
          }
        };

        const fetchData = async () => {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            },
            // Poner 2 si es cualquiera, poner 0 o 1 si es inactivo o activo
            // Poner 0 para toda la empresa, poner el <id> si es por área
            body: JSON.stringify({ 
                idArea: 2,
                idPosicion:  0,
                activo: 2
            }),
          };
      
          try {
            const response = await fetch(URL_SERVICE + '/gaps/competenceConsolidateSearch', requestOptions);
      
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              const newData1 = {
                labels: labels,
                datasets: [
                  {
                    label: '% de adecuación',
                    data: [data.rango1, data.rango2, data.rango3, data.rango4, data.rango5],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              };
              
              const newData2 = {
                labels: labels,
                datasets: [
                  {
                    label: '% de adecuación',
                    data: [data.rango1, data.rango2, data.rango3, data.rango4, data.rango5],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              };

              setData1(newData1); 
              setData2(newData2);

            } else {
              console.log('Error al obtener los datos desde el API');
            }
          } catch (error) {
            console.log('Error al obtener los datos desde el API:', error);
          }
        };

        fetchAreasActivas();
        fetchData();
        fetchTipoCompetencias();
      }, []);
      

      const handleCompetenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {    
        const tipo  = tipoCompetencias.find((tipo) => tipo.id.toString() === event.target.value)
        setTipoCompetencia(tipoCompetencias[0]);
        console.log(tipoCompetencia)
        setAbbreviation(event.target.value)
        //setAbbreviation(tipo.abbreviation)
        setData1(data1);
        setData2(data2);
      }

      
      const handleBuscarClick = () => {
      };
      const handleClick = () => {        
      navigate(`/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEES_AREA}/${GAPS_EMPLOYEES_AREA_DETAIL}`, { state: { tipoCompetencia } });
      };

  
      const labels= ['80% - 100%', '60% - 79%', '40% - 59%', '20% - 39%', '0% - 19%'];
      
      return (
        <div className="container">
          <h2 className="Head">Consolidado de competencias de área de TI</h2>
          
          <div className="row">
            <div className="col-md-6">
              <label className="subtitle" htmlFor="competencia-select">Competencias por puesto:</label>
              <select
                id="competencia-select"
                className="form-control"
                value={abbreviation}
                onChange={handleCompetenciaChange}
              ><option value="">Todas</option>
                {hard.map((hard) => (
                  <option key={hard} value={hard}>{hard}</option>
                ))}
              </select>
            </div>
          </div>

          {data1 && (
          <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Adecuación a competencias del area</h3>
                    <PieChart title='' labels= ''datasets={data1} />
                    <div className="chart-legend"> 
                      {/* Agregar aquí la leyenda del gráfico 1 */}
                    </div>

                  </div>
                </div>
              </div>
              {abbreviation!='' && data2 && (
              <div className="col-md-6">
               <div className="card">
                 <div className="card-body">
                   <h3 className="card-title">Adecuación a competencias de  {abbreviation}</h3>
                   <PieChart title='' labels= {labels} datasets={data2} />
                   <div className="chart-legend">
                     {/* Agregar aquí la leyenda del gráfico 2 */}
                   </div>

                   <button className="btn btn-secondary" onClick={handleClick}>Ver detalle del puesto</button>
                   </div>
               </div>
             </div>
          )
          }
           </div>
          )
          }

          
         
        </div>
      );
    };
  export default ConsolidadoCompetenciasAM
  