import './EvaluacionDeDesempenho.css';
import BaseForm from './BaseForm';
import { useEffect, useState } from 'react';
import { getEvaluation } from '@features/Modulo3/services/continuousEvaluation';

const Autoevaluation = () => {  
  const urlParams = new URLSearchParams(window.location.search);

  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  })
  const [evaluation, setEvaluation] = useState({
    categories: []
  });
  const [associatedEvaluation, setAssociatedEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lleno, setLleno] = useState(true)

  useEffect(() => {
    setIsLoading(false);
    (async () => {
      const response = await getEvaluation(parseInt(urlParams.get('evaluationId')));
      if (response) {
        setEvaluation(response);
        for(let i = 0; i < response.categories.length; i++){
          const category = response.categories[i];
          const subcategories = category.subcategories;
          for(let j = 0; j < subcategories.length; j++){
            const subcategory = subcategories[j];
            if (subcategory.score === null || subcategory.score === undefined || subcategory.score === "" || subcategory.score == 0){
              setLleno(false)
            }
          }
        }
        if (response.associatedEvaluationId) {
          const associatedResponse = await getEvaluation(response.associatedEvaluationId);
          if (associatedResponse) {
            setAssociatedEvaluation(associatedResponse);
          }
        }else{
          setAssociatedEvaluation(response);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='auto-32'>
      <BaseForm
        employee={employee}
        categories={evaluation.categories}
        evaluation={evaluation}
        //associatedEvaluation={associatedEvaluation}
        setEvaluation={setEvaluation}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        isReadOnly={lleno}
        isAutoevaluation={true}
        evaluationId={parseInt(urlParams.get('evaluationId'))}
      />
    </div>
  );
};

export default Autoevaluation;