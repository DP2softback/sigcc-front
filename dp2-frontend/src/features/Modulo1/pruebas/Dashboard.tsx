import React from "react";
import BarChart from './BarChart';
import HorizontalBarChart from './HorizontalBarChart';
import SummaryCard from './SummaryCard';
import PieChart from './PieChart';
import axiosInt from "@config/axios";
import { Props, State } from './Dashboard.types';

export default class Dashboard extends React.Component<Props, State>
{

    componentDidMount ()
    {
        axiosInt.get('capacitaciones/dashboard/')
            .then((response) =>
            {
                console.log(response.data);
                this.setState({
                    data: response.data,
                })
            })
    }

    render ()
    {
        return (
            <>
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        <div className="col">
                            {
                                this.state && this.state.data ?
                                    <>
                                        <BarChart title="Cursos mejor valorados" data={this.state.data.cursos_mejor_valorados.values} datasetLabel="Alumnos" labels={this.state.data.cursos_mejor_valorados.labels} />
                                    </> : <></>
                            }
                        </div>
                        <div className="col">
                            {
                                this.state && this.state.data ?
                                    <>
                                        <HorizontalBarChart title="Competencias más demandadas" data={this.state.data.competencias_mas_demandadas.values} datasetLabel="Alumnos" labels={this.state.data.competencias_mas_demandadas.labels} />
                                    </> : <></>
                            }
                        </div>
                        <div className="col">
                            {
                                this.state && this.state.data ?
                                    <>
                                        <SummaryCard variant='warning' header='Cursos empresa sin asignar' body='cursos sin asignar' title={this.state.data.cursos_empresa_sin_asignar} />
                                    </> : <></>
                            }
                        </div>
                        <div className="col">
                            {
                                this.state && this.state.data ?
                                    <>
                                        <PieChart title="Competencias por nivel" data={this.state.data.comptencias_por_nivel.values} datasetLabel="Alumnos"
                                            labels={["No iniciado",
                                                "En proceso",
                                                "Logrado",
                                                "Sobresaliente",
                                                "Experto"]} />
                                    </> : <></>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}