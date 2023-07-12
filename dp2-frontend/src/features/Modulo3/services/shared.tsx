import { ajax } from '../tools/ajax';
import { BACKEND_URL, TOKEN } from '../utils/constants';
import { sortEvaluationsByDate, sortEvaluationsByTimeSinceLastEvaluation } from '../utils/functions';

export const getEmployeesShared = async (evaluationType : string, bossId: number, fechaInicio? : Date, fechaFin? : Date, employeeName? : string) => {  
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
      fecha_fin: fechaFin,
      nombre: employeeName
    }
  }
  return sortEvaluationsByTimeSinceLastEvaluation(await ajax(optionsRequest));
}

export const getEvaluationsHistoryShared = async (evaluationType : string, employeeId: number, nivel? : number, fechaInicio? : Date, fechaFin? : Date) => {
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

export const getEmployeesEvaluationDashboardShared = 
  async (bossId: number, evaluationType : string, fechaInicio? : Date, fechaFin? : Date, employeeName? : string) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'LineChartEvaluaciones',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: {
      id: bossId,
      evaluationType: evaluationType,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      nombre: employeeName
    }
  }
  return await ajax(optionsRequest);
}

export const getEmployeeEvaluationDashboardShared = async (employeeId: number, evaluationType : string, fechaInicio? : Date, fechaFin? : Date) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'LineChartEvaluacionesPersona',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: {
      id: employeeId,
      evaluationType: evaluationType,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    }
  }
  return await ajax(optionsRequest);
}