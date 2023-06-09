import React, { Component, ChangeEvent } from 'react';
import { QuizComponentProps, QuizComponentState, Question, Option } from './QuizFill.types';

class QuizFill extends Component<QuizComponentProps, QuizComponentState> {
    constructor(props: QuizComponentProps)
    {
        super(props);
        this.state = {
            answers: {},
        };
    }

    handleOptionChange = (questionId: number, optionId: number) =>
    {
        this.setState((prevState) => ({
            answers: {
                ...prevState.answers,
                [questionId]: optionId,
            },
        }));
    };

    handleSubmit = () =>
    {
        const { answers } = this.state;
        const answers_formated = Object.entries(answers).map(([question_id, option_id]) => ({
            id_pregunta: parseInt(question_id),
            id_opcion: option_id
        }));
        // Generar el archivo JSON con las respuestas
        const jsonData = JSON.stringify({
            id_cuestionario: 1,
            respuestas: answers_formated
        }, null, 2);
        console.log(jsonData); // Aquí puedes hacer lo que necesites con el archivo JSON generado

        // También puedes enviar el archivo JSON a través de una solicitud HTTP si lo deseas

        // Reiniciar el estado del componente
        this.setState({
            answers: {},
        });
    };

    render ()
    {
        const { questions } = this.props;

        return (
            <div>
                {questions.map((question) => (
                    <div key={question.id_pregunta}>
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
                <button onClick={this.handleSubmit}>Guardar respuestas</button>
            </div>
        );
    }
}

export default QuizFill;