import React, { Component, ChangeEvent, Fragment } from 'react';
import { QuizGeneratorState, Question, Option } from './QuizGenerator.types';

class QuizGenerator extends Component<{}, QuizGeneratorState> {
  constructor(props: {})
  {
    super(props);
    this.state = {
      questions: [],
      currentQuestionId: 1,
    };
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

  handleGenerateJSON = () =>
  {
    const { questions } = this.state;
    const jsonData = JSON.stringify(questions, null, 2);
    console.log(jsonData); // Aquí puedes hacer lo que necesites con el archivo JSON generado
  };

  render ()
  {
    const { questions } = this.state;

    return (
      <>
        {questions.map((question) => (
          <Fragment key={question.id_pregunta}>
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
                  <div className='col pe-0' style={{flex: '0 0 .7rem'}}>
                    <input
                    className="form-check-input"
                    style={{verticalAlign: '-webkit-baseline-middle'}}
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
        <div>
          <button className='btn btn-primary mb-3' onClick={this.handleAddQuestion}>Nueva pregunta</button>
        </div>
        <div>
          <button className='btn btn-primary' onClick={this.handleGenerateJSON}>Generar JSON</button>
        </div>
      </>
    );
  }
}

export default QuizGenerator;
