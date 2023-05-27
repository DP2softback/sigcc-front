import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE, BACKEND_URL } from '../utils/constants';

export const getEmployees = async (bossId, fechaInicio? : Date, fechaFin? : Date) => {  
  const optionsRequest = {
    method: 'GET',
    url: BACKEND_URL + 'api/v1/employees',
    headers:{
      Authorization: `Token d2ac8a51b8501fc272c3878e4bd3a5338be44188`
    },
    body: {
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
    url: BACKEND_URL + 'api/v1/evaluations',
    headers:{
      Authorization: `Token d2ac8a51b8501fc272c3878e4bd3a5338be44188`
    },
    body: {
      id: employeeId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
      nivel: nivel,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return await ajax(optionsRequest);
}

export const getEmployeesEvaluationDashboard = async () => {
  const optionsRequest = {
    method: 'GET',
    url: BACKEND_URL + 'api/v1/LineChartEvaluaciones',
    headers:{
      Authorization: `Token d2ac8a51b8501fc272c3878e4bd3a5338be44188`
    },
    params: {
      evaluationType: CONTINUOS_EVALUATION_TYPE,
    }
  }
  return await ajax(optionsRequest);
}

export const getEmployeeEvaluationDashboard = async (employeeId) => {
  const optionsRequest = {
    method: 'GET',
    url: BACKEND_URL + 'api/v1/LineChartEvaluacione',
    headers:{
      Authorization: `Token d2ac8a51b8501fc272c3878e4bd3a5338be44188`
    },
    body: {
      id: employeeId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
    }
  }
  return await ajax(optionsRequest);
}