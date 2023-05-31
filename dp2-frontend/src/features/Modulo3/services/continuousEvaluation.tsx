import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE, BACKEND_URL, SAMPLE_TOKEN } from '../utils/constants';

export const getEmployees = async (bossId, fechaInicio? : Date, fechaFin? : Date) => {  
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'employees',
    headers:{
      Authorization: `Token ${SAMPLE_TOKEN}`
    },
    data: {
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
    method: 'POST',
    url: BACKEND_URL + 'evaluations',
    headers:{
      Authorization: `Token ${SAMPLE_TOKEN}`
    },
    data: {
      employee_id: employeeId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
      nivel: nivel,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return await ajax(optionsRequest);
}

export const getEmployeesEvaluationDashboard = async (bossId) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'LineChartEvaluaciones',
    headers:{
      Authorization: `Token ${SAMPLE_TOKEN}`
    },
    data: {
      id: bossId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
    }
  }
  return await ajax(optionsRequest);
}

export const getEmployeeEvaluationDashboard = async (employeeId) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'LineChartEvaluaciones',
    headers:{
      Authorization: `Token ${SAMPLE_TOKEN}`
    },
    data: {
      employee_id: employeeId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
    }
  }
  return await ajax(optionsRequest);
}