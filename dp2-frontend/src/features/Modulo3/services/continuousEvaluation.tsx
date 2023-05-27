import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE, PERFORMANCE_EVALUATION_TYPE } from '../utils/constants.jsx';

const env = import.meta.env;

export const getEmployees = async (bossId, fechaInicio? : Date, fechaFin? : Date) => {  
  const optionsRequest = {
    method: 'GET',
    url: env.BACKEND_URL + 'api/v1/employees',
    headers:{
      
    },
    params: {
      id: bossId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return await ajax(optionsRequest);
}

export const getEvaluationsHistory = async (employeeId, nivel? : number, fechaInicio? : Date, fechaFin? : Date) => {
  const optionsRequest = {
    method: 'GET',
    url: env.BACKEND_URL + 'api/v1/evaluations',
    headers:{
      
    },
    params: {
      id: employeeId,
      evaluationType: PERFORMANCE_EVALUATION_TYPE,
      nivel: nivel,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return await ajax(optionsRequest);
}