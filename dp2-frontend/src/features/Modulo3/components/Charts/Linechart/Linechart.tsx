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
  const colorsLineDefault = [
    "rgba(255, 192, 203, 0.7)",
    "rgba(255, 255, 153, 0.7)",
    "rgba(173, 216, 230, 0.7)",
    "rgba(152, 251, 152, 0.7)",
    "rgba(216, 191, 216, 0.7)",
    "rgba(255, 218, 185, 0.7)",
    "rgba(189, 252, 201, 0.7)",
    "rgba(230, 230, 250, 0.7)",
    "rgba(135, 206, 235, 0.7)",
    "rgba(240, 128, 128, 0.7)",
  ]; 
  const labelsXDefault = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const Linechart = ({ colorsLine=colorsLineDefault, labelsX=labelsXDefault, dataInfoprops=null, title=null }) => {
    const datasets = dataInfoprops.map((item, index) => {
        return {
            label: item['description'],
            data: item['values'],
            borderColor: [colorsLine[index]],
            backgroundColor: [colorsLine[index]],
            pointBackgroundColor: [colorsLine[index]],
            pointBorderColor: [colorsLine[index]]
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