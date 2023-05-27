import { ajax } from '../tools/ajax';
import { PERFORMANCE_EVALUATION_TYPE } from '../utils/constants.jsx';

const env = import.meta.env;

export const getPersonasACargo = async bossId => {  
  const optionsRequest = {
    method: 'GET',
    url: env.BACKEND_URL + 'api/v1/GetPersonasACargo',
    headers:{
      Authorization: `Token d2ac8a51b8501fc272c3878e4bd3a5338be44188`
    },
    params: {
      id: bossId,
      evaluationType: PERFORMANCE_EVALUATION_TYPE
    }
  }
  return await ajax(optionsRequest);
}