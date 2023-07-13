import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import { Competencia, tipoCompetencia,AreaActiva } from "../GestionDeCompetencias/Tipos";
import DetalleCompetenciasArea from "./DetalleCompetenciasArea";
import { set } from "lodash";
import './ConsolidadoCompetencias.css';
import { GAPS_ANALYSIS_MODULE, GAPS_EMPLOYEES_ORG, GAPS_EMPLOYEES_ORG_DETAIL } from '@features/Modulo2/routes/path';

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

  const ConsolidadoCompetencias = () => {
    const navigate = useNavigate();
      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
      const [tipoCompetencia, setTipoCompetencia] = useState<tipoCompetencia>(null);
      const [areasActivas, setAreasActivas] = useState<AreaActiva[]>([]);
      const [name, setname] = useState("");
      
      useEffect(() => {    

        const fetchTipoCompetencias = async () => {
          try {
    
            const response = await fetch(URL_SERVICE + '/gaps/employeeArea', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN_SERVICE,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setTipoCompetencias(data);
              setAreasActivas(data);
              console.log(data);
            } else {
              console.log('Error al obtener los datos de competencias');
            }
          } catch (error) {
            console.log('Error al obtener los datos de competencias:', error);
          }
        };

        const fetchData = async () => {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            },
            body: JSON.stringify({
              idArea: 0,
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

        fetchData();
        fetchTipoCompetencias();
      }, []);
      

      const handleCompetenciaChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {    
        setname(event.target.value)
        setTipoCompetencia(tipoCompetencias[parseInt(event.target.value)-1])
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': TOKEN_SERVICE,
            },
            body: JSON.stringify({
              idArea: parseInt(name),
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
              setData2(newData1);

            } else {
              console.log('Error al obtener los datos desde el API');
            }
          } catch (error) {
            console.log('Error al obtener los datos desde el API:', error);
          }      

      }

      
      const handleBuscarClick = () => {
      };
      const handleClick = () => {        
      navigate(`/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEES_ORG}/${GAPS_EMPLOYEES_ORG_DETAIL}`, { state: { tipoCompetencia } });
      };
  
      const labels= ['80% - 100%', '60% - 79%', '40% - 59%', '20% - 39%', '0% - 19%'];
      
      return (
        <div className="container">
          <h2 className="Head">Consolidado de competencias</h2>
          
          <div className="row">
            <div className="col-md-6">
              <label className="subtitle" htmlFor="competencia-select">Competencias por area de la empresa:</label>
              <select
                id="competencia-select"
                className="form-control"
                value={name}
                onChange={handleCompetenciaChange}
              ><option value="">Todas</option>
                {areasActivas.map((area) => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
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

                  </div>
                </div>
              </div>
              {name!='' && data2 && (
              <div className="col-md-6">
               <div className="card">
                 <div className="card-body">
                   <h3 className="card-title">Adecuación a competencias de {areasActivas[parseInt(name)-1].name}</h3>
                   <PieChart title='' labels= {labels} datasets={data2} />
                   <div className="chart-legend">
                     {/* Agregar aquí la leyenda del gráfico 2 */}
                   </div>

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
  