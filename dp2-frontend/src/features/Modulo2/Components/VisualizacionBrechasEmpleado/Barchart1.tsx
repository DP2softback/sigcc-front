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
//const colorsLineDefault = [ 'rgba(251,227,142,0.7)', 'rgba(154,137,255,0.7)','rgba(254,208,238,0.7)','rgba(208,232,255,0.7)','rgba(169,244,208,0.7)'] //Amarrillo, Morado, Rosado, celeste y Verde
const labelsXDefault = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
const dataBar = {
    labels: labelsXDefault,
    datasets: [
        {
          label: 'Nivel Actual',
          data: [3,2,3,1,3,2],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Nivel Requerido',
          data: [5,2,1,3,4,2],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    
};
const optionsBar = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};
const BarChart1 = () => {

    const dataInfo = [{ descripcion: 'C1', values: [3, 2, 2, 1, 5, 5] },
    { descripcion: 'C2', values: [1, 3, 2, 2, 3, 5] },
    { descripcion: 'C3', values: [4, 1, 3, 5, 3, 4] },
    { descripcion: 'C4', values: [2, 5, 1, 2, 3, 4] },
    { descripcion: 'C5', values: [5, 3, 4, 3, 2, 5] }
    ]

    

    return (
        <div className='chart'>
            <Bar data={dataBar} options={optionsBar} />
        </div>
    )
}

export default BarChart1;