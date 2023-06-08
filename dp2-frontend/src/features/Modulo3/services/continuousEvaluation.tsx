import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE, BACKEND_URL, SAMPLE_TOKEN } from '../utils/constants';
import { getEmployeeEvaluationDashboardShared, getEmployeesEvaluationDashboardShared, getEmployeesShared, getEvaluationsHistoryShared } from './shared';

export const getEmployees = async (bossId: number, fechaInicio? : Date, fechaFin? : Date) => { 
  return await getEmployeesShared(bossId, CONTINUOS_EVALUATION_TYPE, fechaInicio, fechaFin);
}

export const getEvaluationsHistory = async (employeeId: number, nivel? : number, fechaInicio? : Date, fechaFin? : Date) => {
  return await getEvaluationsHistoryShared(employeeId, CONTINUOS_EVALUATION_TYPE, nivel, fechaInicio, fechaFin);
}

export const getEmployeesEvaluationDashboard = async (bossId: number) => {
  return await getEmployeesEvaluationDashboardShared(bossId, CONTINUOS_EVALUATION_TYPE);
}

export const getEmployeeEvaluationDashboard = async (employeeId: number) => {
  return await getEmployeeEvaluationDashboardShared(employeeId, CONTINUOS_EVALUATION_TYPE);
}

export const saveEvaluation = async (evaluation) => {
  evaluation.evaluationType = CONTINUOS_EVALUATION_TYPE;
  evaluation.isFinished = 1;
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'eval',
    headers:{
      Authorization: `Token ${SAMPLE_TOKEN}`
    },
    data: evaluation
  }
  return await ajax(optionsRequest);
}

export const getEvaluation = async (evalutionId: number) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'eval/' + evalutionId,
    headers:{
      Authorization: `Token ${SAMPLE_TOKEN}`
    }
  }
  return await ajax(optionsRequest);
}