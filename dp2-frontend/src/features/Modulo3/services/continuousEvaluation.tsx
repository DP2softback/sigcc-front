import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE } from '../utils/constants.jsx';

const env = import.meta.env;

export const getPersonasACargo = async () => {  
  const optionsRequest = {
    method: 'GET',
    url: env.BACKEND_URL + 'api/v1/GetPersonasACargo',
    params: {
      id: 2,
      evaluationType: CONTINUOS_EVALUATION_TYPE
    }
  }
  return await ajax(optionsRequest);
}