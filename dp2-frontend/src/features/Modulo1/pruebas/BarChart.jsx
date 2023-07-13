import React from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Card } from 'react-bootstrap';
import
    {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function BarChart (props)
{
    const shuffleArray = (arr) =>
    {
        const narr = arr.slice()
        for (let i = narr.length - 1; i > 0; i--)
        {
            const rand = Math.floor(Math.random() * (i + 1));
            [narr[i], narr[rand]] = [narr[rand], narr[i]];
        }
        return narr;
    };
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: props.datasetLabel,
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
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                usePointStyle: true,
                borderWidth: 0,
                backgroundColor: 'rgba(255, 255, 255, .8)',
                titleColor: '#000000',
                bodyColor: '#000000',
            },
            datalabels: {
                color: 'white',
                anchor: 'center',
                align: 'center',
                labels: {
                    title: {
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const allAreZero = (arr) =>
    {
        return arr.every(element => element === 0);
    }

    return <>
        <Card bg='Light' text='dark' style={{ height: '100%' }}>
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>
                {
                    props.data && !allAreZero(props.data) ?
                        <Bar height={'100%'} data={data} options={options} /> :
                        <div className='no-info-err-container'>
                            <div className='vertical-align-parent'>
                                <div className='vertical-align-child'>
                                    <i className="bi bi-bar-chart-fill"></i>
                                    <h6>No hay datos que mostrar</h6>
                                </div>
                            </div>
                        </div>
                }
            </Card.Body>
        </Card>
    </>;
}

BarChart.defaultProps = {
    title: " "
};