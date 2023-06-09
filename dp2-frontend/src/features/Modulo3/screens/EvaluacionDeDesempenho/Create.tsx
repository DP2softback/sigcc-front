import './EvaluacionDeDesempenho.css';
import BaseForm from './BaseForm';
import { getPlantilla } from '@features/Modulo3/services/templates';
import { useEffect, useState } from 'react';
import { PERFORMANCE_EVALUATION_TYPE, USER_ID } from '@features/Modulo3/utils/constants';

const Create = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  })
  const [idPlantilla, setIdPlantilla]=useState(parseInt(urlParams.get('idPlantilla')));
  const [evaluation, setEvaluation] = useState({
    evaluatedId: employee.id,
    evaluatorId: USER_ID,
    evaluationType: PERFORMANCE_EVALUATION_TYPE,
    hasComment: false,
    associatedProject: '',
    isFinished: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPlantilla(idPlantilla, PERFORMANCE_EVALUATION_TYPE);
      if (response && response[0] && response[0].Categories) {
        setCategories(response[0].Categories);
        setEvaluation((prevEvaluation) => ({
          ...prevEvaluation,
          categories: response[0].Categories
        }))
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <BaseForm 
      employee={employee}
      categories={categories}
      evaluation={evaluation}
      isLoading={isLoading}
      isAutoevaluation={false}
      setEvaluation={setEvaluation}
      setIsLoading={setIsLoading}
      isReadOnly={false}
    />
  );
};

export default Create;