import React, { Component, ChangeEvent, Fragment, createRef } from 'react';
import { QuizGeneratorProps, QuizGeneratorState, Question, Option } from './QuizGenerator.types';
import axiosInt from '@config/axios';

class QuizGenerator extends Component<QuizGeneratorProps, QuizGeneratorState> {
    refCancelBtn: any;
    constructor(props: QuizGeneratorProps)
    {
        super(props);
        this.state = {
            questions: [],
            currentQuestionId: 1,
        };
        this.refCancelBtn = createRef();
    }

    handleQuestionTitleChange = (event: ChangeEvent<HTMLInputElement>, questionId: number) =>
    {
        const { questions } = this.state;
        const updatedQuestions = questions.map((question) =>
        {
            if (question.id_pregunta === questionId)
            {
                return { ...question, pregunta: event.target.value };
            } else
            {
                return question;
            }
        });
        this.setState({ questions: updatedQuestions });
    };

    handleOptionTextChange = (event: ChangeEvent<HTMLInputElement>, questionId: number, optionId: number) =>
    {
        const { questions } = this.state;
        const updatedQuestions = questions.map((question) =>
        {
            if (question.id_pregunta === questionId)
            {
                const updatedOptions = question.opciones.map((option) =>
                {
                    if (option.id_opcion === optionId)
                    {
                        return { ...option, opcion: event.target.value };
                    } else
                    {
                        return option;
                    }
                });
                return { ...question, opciones: updatedOptions };
            } else
            {
                return question;
            }
        });
        this.setState({ questions: updatedQuestions });
    };

    handleOptionCorrectChange = (questionId: number, optionId: number) =>
    {
        const { questions } = this.state;
        const updatedQuestions = questions.map((question) =>
        {
            if (question.id_pregunta === questionId)
            {
                const updatedOptions = question.opciones.map((option) =>
                {
                    if (option.id_opcion === optionId)
                    {
                        return { ...option, es_correcta: true };
                    } else
                    {
                        return { ...option, es_correcta: false };
                    }
                });
                return { ...question, opciones: updatedOptions };
            } else
            {
                return question;
            }
        });
        this.setState({ questions: updatedQuestions });
    };

    handleAddQuestion = () =>
    {
        const { questions, currentQuestionId } = this.state;
        const newQuestion: Question = {
            id_pregunta: currentQuestionId,
            pregunta: '',
            opciones: [
                { id_opcion: 1, opcion: '', es_correcta: true },
                { id_opcion: 2, opcion: '', es_correcta: false },
                { id_opcion: 3, opcion: '', es_correcta: false },
                { id_opcion: 4, opcion: '', es_correcta: false },
            ],
        };
        this.setState((prevState) => ({
            questions: [...prevState.questions, newQuestion],
            currentQuestionId: prevState.currentQuestionId + 1,
        }));
    };

    handleRemoveQuestion = (id_pregunta: number) =>
    {
        const updatedQuestions = [...this.state.questions];
        const filteredQuestions = updatedQuestions.filter((question: Question) => question.id_pregunta !== id_pregunta);
        this.setState({ questions: filteredQuestions });
    };

    handleGenerateJSON = () =>
    {
        const { questions } = this.state;
        axiosInt.post(`capacitaciones/udemy_course/questionary/${this.props.quizId}/`, {
            evaluacion: questions
        })
        .then((response) => {
            this.refCancelBtn.current.click();
        })
    };

    get()
    {
        axiosInt.get(`capacitaciones/udemy_course/questionary/${this.props.quizId}/`)
        .then((response) => {
            this.setState({
                questions: response.data.evaluacion
            })
        })
    }

    componentDidMount (): void
    {
        this.get();
    }

    render ()
    {
        const { questions } = this.state;

        return (
            <>
                <div id={`quizGeneratorModal${this.props.quizId}`} className="modal">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                </button>
                            </div>
                            <div className="modal-body">
                                {questions.map((question) => (
                                    <Fragment key={question.id_pregunta}>
                                        <div className='d-flex justify-content-between'>
                                            <div></div>
                                            <button className='btn btn-danger mb-3' onClick={this.handleRemoveQuestion.bind(this, question.id_pregunta)}>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-trash3 me-3' viewBox='0 0 16 16'>
                                                <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
                                            </svg>
                                            <span className='align-middle'>
                                            Eliminar pregunta
                                            </span>
                                        </button>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id={`questionInput${question.id_pregunta}`} placeholder=""
                                                value={question.pregunta}
                                                onChange={(event) => this.handleQuestionTitleChange(event, question.id_pregunta)}
                                            />
                                            <label htmlFor={`questionInput${question.id_pregunta}`}>Escriba una pregunta</label>
                                        </div>
                                        <div className='mb-4'>
                                            {question.opciones.map((option) => (
                                                <div className='row mb-2' key={option.id_opcion}>
                                                    <div className='col pe-0' style={{ flex: '0 0 .7rem' }}>
                                                        <input
                                                            className="form-check-input"
                                                            style={{ verticalAlign: '-webkit-baseline-middle' }}
                                                            type="radio"
                                                            checked={option.es_correcta}
                                                            onChange={() => this.handleOptionCorrectChange(question.id_pregunta, option.id_opcion)}
                                                        />
                                                    </div>
                                                    <div className='col'>
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            value={option.opcion}
                                                            onChange={(event) => this.handleOptionTextChange(event, question.id_pregunta, option.id_opcion)}
                                                            placeholder={`Opción ${option.id_opcion}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Fragment>
                                ))}
                                {
                                    !questions.length ?
                                        <>
                                            <div className='vertical-align-parent' style={{ height: '10rem' }}>
                                                <div className='vertical-align-child'>
                                                    <h5 className='opacity-50 text-center'>Agrega una pregunta para empezar</h5>
                                                </div>
                                            </div>
                                        </> : <></>
                                }
                            </div>
                            <div className="modal-footer justify-content-between">
                                <div>
                                    <button className='btn btn-success' onClick={this.handleAddQuestion}>
                                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-plus-square me-3' viewBox='0 0 16 16'>
                                            <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                                            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                                        </svg>
                                        <span className='align-middle'>
                                        Nueva pregunta
                                        </span>
                                        </button>
                                </div>
                                <div>
                                    <button ref={this.refCancelBtn} type="button" className="btn btn-light me-3" data-bs-dismiss="modal">
                                        Cancelar
                                    </button>
                                    <button className='btn btn-primary' onClick={this.handleGenerateJSON}>Confirmar y enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default QuizGenerator;
