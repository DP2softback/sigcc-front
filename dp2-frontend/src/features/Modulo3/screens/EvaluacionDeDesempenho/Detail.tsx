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
  const [evaluation, setEvaluation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getEvaluation(parseInt(urlParams.get('evaluationId')));
      if (response) {
        setEvaluation(response);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <BaseForm
      employee={employee}
      categories={[]}
      evaluation={evaluation}
      isLoading={isLoading}
      isReadOnly={true}
    />
  );
};

export default Detail;