import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE } from '../utils/constants.jsx';

const env = import.meta.env;

export const getPersonasACargo = async bossId => {  
  const optionsRequest = {
    method: 'GET',
    url: env.BACKEND_URL + 'api/v1/GetPersonasACargo',
    params: {
      id: bossId,
      evaluationType: CONTINUOS_EVALUATION_TYPE
    }
  }
  return await ajax(optionsRequest);
}