import React from "react";
import BarChart from './BarChart';
import HorizontalBarChart from './HorizontalBarChart';
import SummaryCard from './SummaryCard';
import PieChart from './PieChart';

export default class Dashboard extends React.Component
{
    render ()
    {
        return (
            <>
                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        <div className="col">
                            <BarChart title="Cursos mejor valorados" data={[1, 2, 3]} datasetLabel="Alumnos" labels={["A", "B", "C"]} />
                        </div>
                        <div className="col">
                            <HorizontalBarChart title="Competencias más demandadas" data={[1, 2, 3]} datasetLabel="Alumnos" labels={["A", "B", "C"]} />
                        </div>
                        <div className="col">
                            <SummaryCard variant='warning' header='Cursos empresa sin asignar' body='cursos sin asignar' title={1000} />
                        </div>
                        <div className="col">
                            <PieChart title="Competencias por nivel" data={[1, 2, 3, 4, 5]} datasetLabel="Alumnos"
                                labels={["No iniciado",
                                    "En proceso",
                                    "Logrado",
                                    "Sobresaliente",
                                    "Experto"]} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}