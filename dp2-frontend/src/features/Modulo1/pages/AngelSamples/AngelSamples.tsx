import React, { createRef } from "react";
import { Props, State } from "./AngelSamples.types";
import datajson from './data.json';
import RubricCriterias from "@features/Modulo1/components/Rubric/RubricCriterias";
import RubricGrade from "@features/Modulo1/components/Rubric/RubricGrade";
import gradeSample from '../../components/Rubric/gradeSample.json';

export default class AngelSamples extends React.Component<Props, State>
{
    refRubrica: any;

    constructor(props: Props)
    {
        super(props);
        this.refRubrica = createRef();
        this.state = {
            data: props.data,
        }
    }

    static defaultProps = {
        data: JSON.parse(JSON.stringify(datajson)),
    }

    handleLPPropertyChange (key: string, value: string)
    {
        let data = this.state.data;
        data.learning_path[key] = value;
        this.setState({
            data: data,
        });
    }

    handleCourseChange = (courseIndex, courseState) =>
    {
        this.setState(prevState =>
        {
            const data = prevState.data;
            const cursos = [...prevState.data.cursos];
            cursos[courseIndex] = courseState;
            data.cursos = cursos
            return { data };
        });
    };

    removeCourse = (courseIndex) => 
    {
        if (this.state.data.cursos.length)
        {
            let data = this.state.data;
            data.cursos.splice(courseIndex, 1);
            this.setState({
                data: data,
            });
        }
    }

    render ()
    {
        const removeCourse = this.removeCourse.bind(this);
        const handleLPPropertyChange = this.handleLPPropertyChange.bind(this);
        return (<>
        <RubricGrade criterias={gradeSample.criterias}/>
            <div className="container-fluid">
                <h1>Ruta de aprendizaje</h1>
                <h3>Datos generales</h3>
                <div className="row g-3 mb-4">
                    <div className="col-12">
                        <div className="form-floating">
                            <input value={this.props.data.learning_path.nombre} onChange={(e: any) => handleLPPropertyChange('nombre', e.target.value)} id="nameInput" type="text" className="form-control" placeholder="Nombre" />
                            <label htmlFor="nameInput">Nombre</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <textarea value={this.props.data.learning_path.descripcion} onChange={(e) => handleLPPropertyChange('descripcion', e.target.value)} id="descriptionInput" className="form-control" placeholder="Descripción" rows={3} />
                            <label htmlFor="descriptionInput">Descripción</label>
                        </div>
                    </div>
                </div>
                <h3>Evaluaciones</h3>
                <div className="row g-3 mb-4">
                    <div className="col">
                        <h6>Cuestionarios</h6>
                        <div className="row">
                            <label htmlFor="courseTriedNumber" className="col-sm-8 col-form-label">Número de intentos</label>
                            <div className="col-sm-4">
                                <input value={this.props.data.learning_path.cant_intentos_cursos_max}
                                    onChange={(e) => handleLPPropertyChange('cant_intentos_cursos_max', parseInt(e.target.value))}
                                    type="number" className="form-control" id="courseTriedNumber" />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h6>Evaluación final</h6>
                        <div className="row">
                            <label htmlFor="courseTriedNumberFE" className="col-sm-8 col-form-label">Número de intentos</label>
                            <div className="col-sm-4">
                                <input value={this.props.data.learning_path.cant_intentos_evaluacion_integral_max}
                                    onChange={(e) => handleLPPropertyChange('cant_intentos_evaluacion_integral_max', parseInt(e.target.value))}
                                    type="number" className="form-control" id="courseTriedNumberFE" />
                            </div>
                        </div>
                    </div>
                </div>

                <h3>Rúbrica de calificación</h3>
                <div className="mb-4">
                <RubricCriterias criterias={this.props.data.learning_path.rubrica ?? []} />
                </div>
                <h3>Cursos</h3>
                <div className="row g-3">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Curso</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.data.cursos.map((course, courseIndex) =>
                                    {
                                        return (
                                            <tr key={courseIndex}>
                                                <td>
                                                    {course.nombre}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm w-100" onClick={() => removeCourse(courseIndex)}>Eliminar</button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>)
    }
}