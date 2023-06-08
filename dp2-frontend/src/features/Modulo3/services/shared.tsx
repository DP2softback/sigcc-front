import { ajax } from '../tools/ajax';
import { BACKEND_URL, TOKEN } from '../utils/constants';
import { sortEvaluationsByDate, sortEvaluationsByTimeSinceLastEvaluation } from '../utils/functions';

export const getEmployeesShared = async (bossId: number, evaluationType : string, fechaInicio? : Date, fechaFin? : Date) => {  
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'employees',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: {
      id: bossId,
      evaluationType: evaluationType,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return sortEvaluationsByTimeSinceLastEvaluation(await ajax(optionsRequest));
}

export const getEvaluationsHistoryShared = async (employeeId: number, evaluationType : string, nivel? : number, fechaInicio? : Date, fechaFin? : Date) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'evaluations',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: {
      employee_id: employeeId,
      evaluationType: evaluationType,
      nivel: nivel,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return sortEvaluationsByDate(await ajax(optionsRequest));
}

export const getEmployeesEvaluationDashboardShared = async (bossId: number, evaluationType : string) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'LineChartEvaluaciones',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: {
      id: bossId,
      evaluationType: evaluationType,
    }
  }
  return await ajax(optionsRequest);
}

export const getEmployeeEvaluationDashboardShared = async (employeeId: number, evaluationType : string) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'LineChartEvaluacionesPersona',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: {
      id: employeeId,
      evaluationType: evaluationType,
    }
  }
  return await ajax(optionsRequest);
}