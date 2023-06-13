import React from 'react';
import { Question } from './QuizFill.types';
import QuizFill from './QuizFill';

const questions: Question[] = [
  {
    id_pregunta: 1,
    pregunta: '¿Cuál es tu color favorito?',
    opciones: [
      { id_opcion: 1, opcion: 'Rojo' },
      { id_opcion: 2, opcion: 'Azul' },
      { id_opcion: 3, opcion: 'Verde' },
      { id_opcion: 4, opcion: 'Amarillo' },
      { id_opcion: 5, opcion: 'Negro' },
    ],
  },
  {
    id_pregunta: 2,
    pregunta: '¿Cuál es tu color favorito?',
    opciones: [
      { id_opcion: 1, opcion: 'Rojo' },
      { id_opcion: 2, opcion: 'Azul' },
      { id_opcion: 3, opcion: 'Verde' },
      { id_opcion: 4, opcion: 'Amarillo' },
      { id_opcion: 5, opcion: 'Negro' },
    ],
  },];

function index() {
  return (
    <div className="App">
      <h1>Generador de cuestionarios</h1>
      <QuizFill questions={questions} />
    </div>
  );
}

export default index;