import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend 
);

const labelsXDefault = ['Programación en Java', 'Liderazgo', 'Programación', 'Uso de Microsoft Word', 'Innovación', 'Gestión del Tiempo'];
// const dataBar = {
//     labels: labelsXDefault,
//     datasets: [
//         {
//           label: 'Nivel Requerido',
//           data: [2,4,3,4,3,2],
//           backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//           label: 'Nivel Alcanzado',
//           data: [3,4,4,4,3,3],
//           backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
       
//       ],
    
// };

var dataBar = {
  labels: labelsXDefault,
  datasets: [
      {
        label: 'Nivel Requerido',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Nivel Alcanzado',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
     
    ],
  
};

const optionsBar = {
    responsive: true,
    plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Adecuación a las capacidades',
        },
      },
    scales: {
        y: {

            beginAtZero: true,
        },
            
    },
};

const hardcode = [
    { nombre: 'Programación en Java',  nivelActual: 1, nivelRequerido: 2 },
    { nombre: 'Liderazgo',  nivelActual: 3, nivelRequerido: 3},
    { nombre: 'Programación modular',  nivelActual: 2, nivelRequerido: 3},
    { nombre: 'Uso de Microsoft Word',  nivelActual: 3, nivelRequerido: 3 },
    { nombre: 'Innovación', nivelActual: 2, nivelRequerido: 2 },
    { nombre: 'Gestión del Tiempo',  nivelActual: 1, nivelRequerido: 2 },

];

/**
 * const hardcode = [
    { nombre: 'Programación en Java',  nivelActual: 'Bajo', nivelRequerido: 'Medio' },
    { nombre: 'Liderazgo',  nivelActual: 'Alto', nivelRequerido: 'Alto'},
    { nombre: 'Programación modular',  nivelActual: 'Medio', nivelRequerido: 'Alto'},
    { nombre: 'Uso de Microsoft Word',  nivelActual: 'Alto', nivelRequerido: 'Alto' },
    { nombre: 'Innovación', nivelActual: 'Medio', nivelRequerido: 'Medio' },
    { nombre: 'Gestión del Tiempo',  nivelActual: 'Bajo', nivelRequerido: 'Medio' },
    { nombre: 'Pensamiento Analítico', nivelActual: 'Alto', nivelRequerido: 'Alto' },
    { nombre: 'Negociación',  nivelActual: 'Bajo', nivelRequerido: 'Medio' },
    { nombre: 'Planificación Estratégica',  nivelActual: 'Alto', nivelRequerido: 'Medio' },
    { nombre: 'Comunicación Interpersonal',  nivelActual: 'Bajo', nivelRequerido: 'Alto'},
    { nombre: 'Resiliencia',  nivelActual: 'Medio', nivelRequerido: 'Alto' },
    { nombre: 'Adaptabilidad',  nivelActual: 'Bajo', nivelRequerido: 'Medio' },
    { nombre: 'Comunicación Escrita',  nivelActual: 'Medio', nivelRequerido: 'Medio' },
    { nombre: 'Habilidades de Presentación',  nivelActual: 'Medio', nivelRequerido: 'Alto' },
    { nombre: 'Resolución de Conflictos',  nivelActual: 'Bajo', nivelRequerido: 'Alto' },
    { nombre: 'Pensamiento Crítico',  nivelActual: 'Bajo', nivelRequerido: 'Medio' },
    { nombre: 'Empatía',  nivelActual: 'Alto', nivelRequerido: 'Alto' },
    { nombre: 'Toma de Decisiones',  nivelActual: 'Medio', nivelRequerido: 'Medio' },
    { nombre: 'Trabajo Bajo Presión',  nivelActual: 'Bajo', nivelRequerido: 'Alto'  },
];
 */
const BarChart1 = (props) => {
    const { dataBarProps } = props;
    const [dataBarTot, setDataBarTot] = React.useState({labels: null, datasets: []}); 

    React.useEffect(() => {
      if(dataBarProps !== null){
        var labelsTab = [];
        var dataBarReq = [];
        var dataBarAlc = [];
        for(var i=0; i<dataBarProps.length; i++){
          labelsTab.push(dataBarProps[i].capacity__name)
          console.log("REQ")
          console.log(dataBarProps[i].levelRequired)
          console.log("cur")
          console.log(dataBarProps[i].levelCurrent)
          if(dataBarProps[i].levelRequired === 'B'){
            dataBarReq.push(1)
          }
          if(dataBarProps[i].levelRequired === 'M'){
            dataBarReq.push(2)
          }
          if(dataBarProps[i].levelRequired === 'A'){
            dataBarReq.push(3)
          }
          //dataBarReq.push(dataBarProps[i].levelRequired)
          if(dataBarProps[i].levelCurrent === 'B'){
            dataBarAlc.push(1)
          }
          if(dataBarProps[i].levelCurrent === 'M'){
            dataBarAlc.push(2)
          }
          if(dataBarProps[i].levelCurrent === 'A'){
            dataBarAlc.push(3)
          }
          //dataBarAlc.push(dataBarProps[i].levelCurrent)
        }
        setDataBarTot({
          labels: labelsTab,
          datasets: [
            {
              label: 'Nivel Requerido',
              data: dataBarReq,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Nivel Alcanzado',
              data: dataBarAlc,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ]
        })
      }
      
    }, [dataBarProps])

    return (
        <div className='chart'>
            <Bar data={dataBarTot} options={optionsBar} style={{display: 'flex'}} />
        </div>
    )
}

export default BarChart1;

