import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import { Competencia, tipoCompetencia,AreaActiva } from "../GestionDeCompetencias/Tipos";
import DetalleCompetenciasArea from "./DetalleCompetenciasArea";
import { set } from "lodash";

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

  const ConsolidadoCompetencias = () => {
    const navigate = useNavigate();
      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
      const [tipoCompetencia, setTipoCompetencia] = useState<tipoCompetencia>(null);
      const [areasActivas, setAreasActivas] = useState<AreaActiva[]>([]);
      const [abbreviation, setAbbreviation] = useState('');
      useEffect(() => {    

        const fetchTipoCompetencias = async () => {
          try {
    
            const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competenceTypes', {
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
          try {
            const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/employeeArea', {
              headers: {
                Authorization: 'Token 06ef101f0752dd28182b9e8535add969ca6aa35d'
              }
            });
            const data = await response.json();
            setAreasActivas(data);
          } catch (error) {
            console.error('Error fetching competencias:', error);
          }
        };

        const fetchData = async () => {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 06ef101f0752dd28182b9e8535add969ca6aa35d',
            },
            body: JSON.stringify({
              idArea: 0, // Poner 0 para toda la empresa, poner el <id> si es por área
              activo: 2, // Poner 2 si es cualquiera, poner 0 o 1 si es inactivo o activo
            }),
          };
      
          try {
            const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competenceConsolidateSearch', requestOptions);
      
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
        setAbbreviation(tipo.abbreviation)
        setData1(data1);
        setData2(data2);
      }

      
      const handleBuscarClick = () => {
      };
      const handleClick = () => {        
      navigate('/DetalleCompetenciasArea', { state: { tipoCompetencia } });
      };
      const handleMostrarLineChartClick = () => {
      };
      
  
      const labels= ['80% - 100%', '60% - 79%', '40% - 59%', '20% - 39%', '0% - 19%'];
      
      return (
        <div className="container">
          <h2>Consolidado de competencias</h2>
          
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="competencia-select">Competencias por area:</label>
              <select
                id="competencia-select"
                className="form-control"
                value={abbreviation}
                onChange={handleCompetenciaChange}
              ><option value="">Todas</option>
                {areasActivas.map((area) => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button className="btn btn-primary" onClick={handleBuscarClick}>Buscar</button>
            </div>
          </div>

          {data1 && (
          <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Adecuación a competencias de la organización</h3>
                    <PieChart title='' labels= ''datasets={data1} />
                    <div className="chart-legend"> 
                      {/* Agregar aquí la leyenda del gráfico 1 */}
                    </div>
                    <button className="btn btn-secondary" onClick={handleMostrarLineChartClick}>Mostrar en linechart</button>
                  </div>
                </div>
              </div>
              {abbreviation!='' && data2 && (
              <div className="col-md-6">
               <div className="card">
                 <div className="card-body">
                   <h3 className="card-title">Adecuación a competencias de área de {abbreviation}</h3>
                   <PieChart title='' labels= {labels} datasets={data2} />
                   <div className="chart-legend">
                     {/* Agregar aquí la leyenda del gráfico 2 */}
                   </div>
                   <button className="btn btn-secondary" onClick={handleMostrarLineChartClick}>Mostrar en linechart</button>
                   <button className="btn btn-secondary" onClick={handleClick}>Ver detalle del área</button>
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
  export default ConsolidadoCompetencias
  