import React from 'react';
import { Card } from 'react-bootstrap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart(props) {
    const shuffleArray = (arr) => {
        const narr = arr.slice()
        for (let i = narr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [narr[i], narr[rand]] = [narr[rand], narr[i]];
        }
        return narr;
    };
    const data = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: shuffleArray([
                    'rgba(200, 34, 188, 1)',
                    'rgba(255, 156, 215, 1)',
                    'rgba(65, 185, 228, 1)',
                    'rgba(250, 214, 52, 1)',
                    'rgba(226, 40, 77, 1)',
                    'rgba(240, 174, 25, 1)',
                    'rgba(0, 78, 168, 1)',
                    'rgba(40, 65, 221, 1)',
                    'rgba(22, 199, 142, 1)',
                    'rgba(173, 215, 84, 1)',
                    'rgba(159, 66, 245, 1)',
                    'rgba(80, 100, 247, 1)',
                    'rgba(0, 135, 104, 1)',
                    'rgba(10, 123, 194, 1)',
                    'rgba(195, 9, 74, 1)',
                    'rgba(226, 48, 8, 1)',
                ]),
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    usePointStyle: true,
                }
            },
            title: {
                display: false,
            },
            tooltip: {
                usePointStyle: true,
                borderWidth: 0,
                backgroundColor: 'rgba(255, 255, 255, .8)',
                bodyColor: '#000000',
            },
            datalabels: {
                formatter: (value, ctx) => {
                    const datapoints = ctx.chart.data.datasets[0].data;
                    const total = datapoints.reduce((total, datapoint) => total + datapoint, 0);
                    const percentage = value / total * 100;
                    if (percentage === 0) return "";
                    return percentage.toFixed(0) + "%";;
                },
                color: 'white',
            }
        },
    };

    const allAreZero = (arr) => {
        return arr.every(element => element === 0);
    }

    return <>
        <Card bg='Light' text='dark' style={{ height: '100%' }}>
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>
                {
                    props.data && !allAreZero(props.data) ?
                        <Pie height={'100%'} data={data} options={options} /> :
                        <div className='no-info-err-container'>
                            <div className='vertical-align-parent'>
                                <div className='vertical-align-child'>
                                    <i className="bi bi-pie-chart-fill"></i>
                                    <h6>No hay datos que mostrar</h6>
                                </div>
                            </div>
                        </div>
                }
            </Card.Body>
        </Card>
    </>;
}

PieChart.defaultProps = {
    title: " "
};