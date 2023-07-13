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
    categories: []
  });
  const [associatedEvaluation, setAssociatedEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    (async () => {
      const response = await getEvaluation(parseInt(urlParams.get('evaluationId')));
      if (response) {
        setEvaluation(response);
        if (response.RelatedEvaluation) {
          const associatedResponse = await getEvaluation(response.RelatedEvaluation);          
          if (associatedResponse) setAssociatedEvaluation(associatedResponse);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <BaseForm
      employee={employee}
      categories={evaluation.categories}
      evaluation={evaluation}
      associatedEvaluation={associatedEvaluation}
      isLoading={isLoading}
      isReadOnly={true}
      evaluationId={parseInt(urlParams.get('evaluationId'))}
    />
  );
};

export default Detail;