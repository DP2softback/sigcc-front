import React from 'react'
import { Line } from 'react-chartjs-2'
import './Linechart.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );  
  const colorsLineDefault = [ 'rgba(251,227,142,0.7)', 'rgba(154,137,255,0.7)','rgba(254,208,238,0.7)','rgba(208,232,255,0.7)','rgba(169,244,208,0.7)'] //Amarrillo, Morado, Rosado, celeste y Verde
  const labelsXDefault = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const Linechart = ({ colorsLine=colorsLineDefault, labelsX=labelsXDefault, dataInfoprops=null, title=null }) => {
    //const labelsInfo = ['Precisión y exactitud en el trabajo realizado', 'Cumplimiento de los estándares de calidad', 'Trabajo completo y bien organizado', 'Identificación y corrección de errores y problemas', 'Cumplimiento de los plazos establecidos']
    //const dataLines = [[3, 2, 2, 1, 5, 5], [1, 3, 2, 2, 3, 5], [4, 1, 3, 5, 3, 4], [2, 5, 1, 2, 3, 4], [5, 3, 4, 3, 2, 5]];
    // const dataInfo = [{descripcion : 'Precisión y exactitud en el trabajo realizado', values: [3, 2, 2, 1, 5, 5] },
    //                     {descripcion : 'Cumplimiento de los estándares de calidad', values: [1, 3, 2, 2, 3, 5] }, 
    //                     {descripcion : 'Trabajo completo y bien organizado', values: [4, 1, 3, 5, 3, 4] }, 
    //                     {descripcion : 'Identificación y corrección de errores y problemas', values: [2, 5, 1, 2, 3, 4] }, 
    //                     {descripcion : 'Cumplimiento de los plazos establecidos', values: [5, 3, 4, 3, 2, 5] }
    //                 ]

    const datasets = dataInfoprops.map((item, index) => {
        return {
            label: item['descripcion'],
            data: item['values'],
            borderColor: [colorsLineDefault[index]],
            backgroundColor: [colorsLineDefault[index]],
            pointBackgroundColor: [colorsLineDefault[index]],
            pointBorderColor: [colorsLineDefault[index]]
        }
    })    

    const data = {
        labels: labelsX,
        datasets : datasets
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: title,
          },
        },
        scales: {	
          y: {
              beginAtZero: false,
              ticks: {
                  stepSize: 1,
                  callback: (value) => {
                    if (value === 1) {
                        return 'Muy mala';
                    }else if (value === 2) {
                        return 'Mala';
                    }else if (value === 3) {
                        return 'Regular';
                    } else if (value === 4) {
                        return 'Buena';
                    } else if (value === 5) {
                        return 'Muy buena';
                    } else {
                        return '';
                    }
                },
              }
          }
        }
    };

    return (
        <div className='chart'>                      
            <Line data={data} options={options} /> 
        </div>
    )
}

export default Linechart;