import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useState } from "react";

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
      const [selectedCompetencia, setSelectedCompetencia] = useState('');
      const [data1, setData1] = useState(null);
      const [data2, setData2] = useState(null);
      
      const handleCompetenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {    
        const seleccion = event.target.value;
        setSelectedCompetencia(seleccion);
        if (seleccion === 'Competencia 1') {
            setData1(data1Comp1);
            setData2(data2Comp1);
        }
        else{ 
            if(seleccion === 'Competencia 2'){
                setData1(data1Comp2);
                setData2(data2Comp2);
            }
            else{
                setData1(data1Comp3);
                setData2(data2Comp3);
            }
        }
            
      };
      
      const handleBuscarClick = () => {
        // Lógica para buscar competencias por área
      };
      
      const handleMostrarLineChartClick = () => {
        // Lógica para mostrar el gráfico en formato de línea
      };
      
      const handleVerDetalleAreaClick = () => {
        // Lógica para ver el detalle del área
      };
      
      const competencias = [
        { id: 1, nombre: 'Competencia 1' },
        { id: 2, nombre: 'Competencia 2' },
        { id: 3, nombre: 'Competencia 3' },
        // Agrega más competencias si es necesario
      ];
      const labels= ['80% - 100%', '60% - 79%', '40% - 59%', '20% - 39%', '0% - 19%'];
        
      
      const data1Comp1 = {
        labels: labels,
        datasets: [
          {
            label: '% de adecuacion',
            data: [12, 19, 3, 5, 2],
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
      
      const data2Comp1 = {
        labels: labels,
        datasets: [
          {
            label: '% de adecuacion',
            data: [12, 19, 3, 5, 2],
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

      const data1Comp2 = {
        labels: labels,
        datasets: [
          {
            label: '% de adecuacion',
            data: [6, 10, 8, 4, 9],
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
      
      const data2Comp2 = {
        labels: labels,
        datasets: [
          {
            label: '% de adecuacion',
            data: [3, 5, 12, 8, 6],
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
      
      const data1Comp3 = {
        labels: labels,
        datasets: [
          {
            label: '% de adecuacion',
            data: [9, 5, 7, 11, 3],
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
      
      const data2Comp3 = {
        labels: labels,
        datasets: [
          {
            label: '% de adecuacion',
            data: [4, 7, 9, 6, 12],
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


      return (
        <div className="container">
          <h2>Competencias por área</h2>
          
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="competencia-select">Selecciona una competencia:</label>
              <select
                id="competencia-select"
                className="form-select"
                value={selectedCompetencia}
                onChange={handleCompetenciaChange}
              >
                <option value="">Todas</option>
                {competencias.map((competencia) => (
                  <option key={competencia.id} value={competencia.id}>{competencia.nombre}</option>
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
                     {/* Agrega aquí la leyenda del gráfico 1 */}
                   </div>
                   <button className="btn btn-secondary" onClick={handleMostrarLineChartClick}>Mostrar en linechart</button>
                   <button className="btn btn-secondary" onClick={handleVerDetalleAreaClick}>Ver detalle del área</button>
                 </div>
               </div>
             </div>
             
             <div className="col-md-6">
               <div className="card">
                 <div className="card-body">
                   <h3 className="card-title">Adecuación a competencias de área de TI</h3>
                   <PieChart title='' labels= {labels} datasets={data2} />
                   <div className="chart-legend">
                     {/* Agrega aquí la leyenda del gráfico 2 */}
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
  