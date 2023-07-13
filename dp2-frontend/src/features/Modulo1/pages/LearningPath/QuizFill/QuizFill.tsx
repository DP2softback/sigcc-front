import React, { Component, ChangeEvent } from 'react';
import { QuizComponentProps, QuizComponentState, Question, Option } from './QuizFill.types';
import axiosInt from '@config/axios';
class QuizFill extends Component<QuizComponentProps, QuizComponentState> {
    constructor(props: QuizComponentProps) {
        super(props);
        this.state = {
            answers: {},
        };
    }

    handleOptionChange = (questionId: number, optionId: number) => {
        this.setState((prevState) => ({
            answers: {
                ...prevState.answers,
                [questionId]: optionId,
            },
        }));
    };

    handleSubmit = () => {

        console.log(this.state.answers)

        const { answers } = this.state;
        const answers_formated = Object.entries(answers).reduce((formattedObj, [question_id, option_id]) => {
            formattedObj[question_id] = option_id;
            return formattedObj;
        }, {});

        // Generar el archivo JSON con las respuestas
        const jsonData = JSON.stringify({
            respuestas: answers_formated
        }, null, 2);
        console.log(jsonData);

        axiosInt.post(`capacitaciones/curso/form/${this.props.courseId}/1/`,
            jsonData
        )
            .then((response) => {
                console.log(response)
                if (this.props.lp) {
                    axiosInt.post(`capacitaciones/course_lp_employee_advance/${this.props.courseId}/${this.props.lpId}/1/`)
                        .then((response) => {
                            console.log(response)
                        })
                        .catch(function (error) {

                        });
                } else {
                    axiosInt.post(`capacitaciones/course_employee_advance/`,
                        {
                            "curso_id": this.props.courseId,
                            "empleado_id": 1
                        })
                        .then((response) => {
                            console.log(response)      
                        })
                        .catch(function (error) {

                        });
                }
                window.location.reload()
            })
            .catch(function (error) {

            });

    };

    // handleSubmit = () => {
    //     const { answers } = this.state;
    //     const answers_formated = Object.entries(answers).map(([question_id, option_id]) => ({
    //         id_pregunta: parseInt(question_id),
    //         id_opcion: option_id
    //     }));
    //     // Generar el archivo JSON con las respuestas
    //     const jsonData = JSON.stringify({
    //         id_cuestionario: 1,
    //         respuestas: answers_formated
    //     }, null, 2);
    //     console.log(jsonData); // Aquí puedes hacer lo que necesites con el archivo JSON generado

    //     // También puedes enviar el archivo JSON a través de una solicitud HTTP si lo deseas

    //     // Reiniciar el estado del componente
    //     this.setState({
    //         answers: {},
    //     });
    // };

    render() {
        const { questions } = this.props;

        return (
            <>
                <div className="modal-body">
                    {questions.map((question) => (
                        <div key={question.id_pregunta} style={{ marginTop: "1rem" }}>
                            <h4>{question.pregunta}</h4>
                            {question.opciones.map((option) => (
                                <div key={option.id_opcion}>
                                    <div className="form-check">
                                        <input
                                            id={`question${question.id_pregunta}-option${option.id_opcion}}`}
                                            type="radio"
                                            className="form-check-input"
                                            name={question.id_pregunta.toString()}
                                            value={option.id_opcion.toString()}
                                            checked={this.state.answers[question.id_pregunta] === option.id_opcion}
                                            onChange={() => this.handleOptionChange(question.id_pregunta, option.id_opcion)}
                                        />
                                        <label className="form-check-label" htmlFor={`question${question.id_pregunta}-option${option.id_opcion}}`}>
                                            {option.opcion}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='modal-footer justify-content-between'>
                    <button className='btn btn-primary' onClick={this.handleSubmit}>Guardar respuestas</button>
                </div>
            </>
        );
    }
}

export default QuizFill;