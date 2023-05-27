import React from 'react'
import { Line } from 'react-chartjs-2'


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
import { BarChart } from 'react-bootstrap-icons';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
//const colorsLineDefault = [ 'rgba(251,227,142,0.7)', 'rgba(154,137,255,0.7)','rgba(254,208,238,0.7)','rgba(208,232,255,0.7)','rgba(169,244,208,0.7)'] //Amarrillo, Morado, Rosado, celeste y Verde
const labelsXDefault = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];

const BarChart1 = ({ labelsX = labelsXDefault, dataInfoprops = null }) => {
    //const labelsInfo = ['Precisión y exactitud en el trabajo realizado', 'Cumplimiento de los estándares de calidad', 'Trabajo completo y bien organizado', 'Identificación y corrección de errores y problemas', 'Cumplimiento de los plazos establecidos']
    //const dataLines = [[3, 2, 2, 1, 5, 5], [1, 3, 2, 2, 3, 5], [4, 1, 3, 5, 3, 4], [2, 5, 1, 2, 3, 4], [5, 3, 4, 3, 2, 5]];
    const dataInfo = [{ descripcion: 'C1', values: [3, 2, 2, 1, 5, 5] },
    { descripcion: 'C2', values: [1, 3, 2, 2, 3, 5] },
    { descripcion: 'C3', values: [4, 1, 3, 5, 3, 4] },
    { descripcion: 'C4', values: [2, 5, 1, 2, 3, 4] },
    { descripcion: 'C5', values: [5, 3, 4, 3, 2, 5] }
    ]

    const dataBar = {
        labels: ['H1', 'H2', 'H3', 'H4', 'H5'],
        datasets: [
            {
                label: 'Valores',
                data: [3, 5, 1, 1, 3],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
            },
        ],
    };
    const datasets = dataInfo.map((item, index) => {
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
        datasets: datasets
    }

    

    const optionsBar = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='chart'>
            <BarChart data={dataBar} options={optionsBar} />
        </div>
    )
}

export default BarChart1;