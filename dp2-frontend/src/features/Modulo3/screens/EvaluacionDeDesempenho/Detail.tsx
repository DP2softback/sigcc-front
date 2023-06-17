import './EvaluacionDeDesempenho.css';
import BaseForm from './BaseForm';
import { useEffect, useState } from 'react';
import { getEvaluation } from '@features/Modulo3/services/continuousEvaluation';

const Detail = () => {  
  const urlParams = new URLSearchParams(window.location.search);

  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  })
  const [evaluation, setEvaluation] = useState({
    EvaluationId: 1,
    evaluatorId: 1,
    evaluatedId: 2,
    associatedProject: "olawa",
    isFinished: 0,
    evaluationType: "Evaluación de Desempeño",
    categories: [
      {
        id: 1,
        name: "Categoría 1",
        additionalComent: "Holawa",
        subcategories: [
          {
            id: 1,
            name: "Liderazgo",
            score: 1
          },
          {
            id: 2,
            name: "Comunicación",
            score: 2
          },
          {
            id: 3,
            name: "Resolución de problemas",
            score: 3
          },
          {
            id: 4,
            name: "Pensamiento crítico",
            score: 4
          },
          {
            id: 5,
            name: "Trabajo en equipo",
            score: 5
          },
        ]
      },
      {
        id: 2,
        name: "Categoría 2",
        additionalComent: "Holawa 2",
        subcategories: [
          {
            id: 6,
            name: "Liderazgo",
            score: 1
          },
          {
            id: 7,
            name: "Comunicación",
            score: 2
          },
          {
            id: 8,
            name: "Resolución de problemas",
            score: 3
          },
          {
            id: 9,
            name: "Pensamiento crítico",
            score: 4
          },
          {
            id: 10,
            name: "Trabajo en equipo",
            score: 5
          },
        ]
      }
    ]
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    (async () => {
      // const response = await getEvaluation(parseInt(urlParams.get('evaluationId')));
      // if (response) {
      //   setEvaluation(response);
      // }
      // setIsLoading(false);
    })();
  }, []);

  return (
    <BaseForm
      employee={employee}
      categories={evaluation.categories}
      evaluation={evaluation}
      isLoading={isLoading}
      isReadOnly={true}
    />
  );
};

export default Detail;