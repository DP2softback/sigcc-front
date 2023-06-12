import './EvaluacionContinua.css';
import BaseForm from './BaseForm';
import { getPlantilla } from '@features/Modulo3/services/templates';
import { useEffect, useState } from 'react';
import { CONTINUOS_EVALUATION_TYPE, USER_ID } from '@features/Modulo3/utils/constants';

const Create = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  })
  const [idPlantilla,setIdPlantilla]=useState(parseInt(urlParams.get('idPlantilla')));
  const [evaluation, setEvaluation] = useState({
    evaluatedId: employee.id,
    evaluatorId: USER_ID,
    associatedProject: '',
    additionalComments: '',
    evaluationType: CONTINUOS_EVALUATION_TYPE
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPlantilla(idPlantilla, CONTINUOS_EVALUATION_TYPE);
      if (response && response[0] && response[0].Categories) {
        setCategories(response[0].Categories);
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
      setEvaluation={setEvaluation}
      setIsLoading={setIsLoading}
      isReadOnly={false}
    />
  );
};

export default Create;