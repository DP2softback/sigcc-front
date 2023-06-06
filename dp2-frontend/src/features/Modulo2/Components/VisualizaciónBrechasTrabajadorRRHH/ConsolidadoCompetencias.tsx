import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useEffect, useState } from "react";
import { Competencia, tipoCompetencia } from "../GestionDeCompetencias/Tipos";

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
      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
      const [abbreviation, setAbbreviation] = useState('');


      useEffect(() => {        
        const fetchTipoCompetencias = async () => {
          try {
    
            const response = await fetch('https://o4vwfhvzsh.execute-api.us-east-1.amazonaws.com/dev-modulo-brechas/api/v1/gaps/competenceTypes', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token 2e768413e0d75dd79983cd115422fee5291c668d',
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


        
        const fetchData = async () => {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 2e768413e0d75dd79983cd115422fee5291c668d',
            },
            body: JSON.stringify({
              idArea: 0, // Poner 0 para toda la empresa, poner el <id> si es por área
              activo: 2, // Poner 2 si es cualquiera, poner 0 o 1 si es inactivo o activo
            }),
          };
      
          try {
            const response = await fetch('https://o4vwfhvzsh.execute-api.us-east-1.amazonaws.com/dev-modulo-brechas/api/v1/gaps/competenceConsolidateSearch', requestOptions);
      
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


      const handleCompetenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {    
        const selectedTipoCompetencia = tipoCompetencias.find((tipo) => tipo.id.toString() === event.target.value);
        setAbbreviation(selectedTipoCompetencia.abbreviation);
        setData1(data1);
        setData2(data2);
      }
      const handleBuscarClick = () => {
      };
      
      const handleMostrarLineChartClick = () => {
      };
      
      const handleVerDetalleAreaClick = () => {
      };
  
      const labels= ['80% - 100%', '60% - 79%', '40% - 59%', '20% - 39%', '0% - 19%'];
      
      return (
        <div className="container">
          <h2>Competencias por área</h2>
          
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="competencia-select">Competencias por area:</label>
              <select
                id="competencia-select"
                className="form-control"
                value={abbreviation}
                onChange={handleCompetenciaChange}
              ><option value="">Todas</option>
                {tipoCompetencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>{competencia.abbreviation}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button className="btn btn-primary" onClick={handleBuscarClick}>Buscar</button>
            </div>
          </div>

          {data1 && data2 && (
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
                   <button className="btn btn-secondary" onClick={handleVerDetalleAreaClick}>Ver detalle del área</button>
                 </div>
               </div>
             </div>
             
             <div className="col-md-6">
               <div className="card">
                 <div className="card-body">
                   <h3 className="card-title">Adecuación a competencias de área de {abbreviation}</h3>
                   <PieChart title='' labels= {labels} datasets={data2} />
                   <div className="chart-legend">
                     {/* Agregar aquí la leyenda del gráfico 2 */}
                   </div>
                   <button className="btn btn-secondary" onClick={handleMostrarLineChartClick}>Mostrar en linechart</button>
                   <button className="btn btn-secondary" onClick={handleVerDetalleAreaClick}>Ver detalle del área</button>
                 </div>
               </div>
             </div>
           </div>


          )
          
          }
         
        </div>
      );
    };
  export default ConsolidadoCompetencias
  