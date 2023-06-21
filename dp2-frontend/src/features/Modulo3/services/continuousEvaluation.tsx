import { ajax } from '../tools/ajax';
import { CONTINUOS_EVALUATION_TYPE, BACKEND_URL, TOKEN } from '../utils/constants';
import { getEmployeeEvaluationDashboardShared, getEmployeesEvaluationDashboardShared, getEmployeesShared, getEvaluationsHistoryShared } from './shared';

export const getEmployees = async (params: any) => { 
  return await getEmployeesShared(CONTINUOS_EVALUATION_TYPE, params.bossId, params.fecha_inicio, params.fecha_fin, params.employeeName);
}

export const getEvaluationsHistory = async (params: any) => {
  return await getEvaluationsHistoryShared(CONTINUOS_EVALUATION_TYPE, params.employeeId, params.nivel, params.fecha_inicio, params.fecha_fin);
}

export const getEmployeesEvaluationDashboard = async (params: any) => {
  return await getEmployeesEvaluationDashboardShared(params.bossId, CONTINUOS_EVALUATION_TYPE, params.fecha_inicio, params.fecha_fin, params.employeeName);
}

export const getEmployeeEvaluationDashboard = async (params: any) => {
  return await getEmployeeEvaluationDashboardShared(params.employeeId, CONTINUOS_EVALUATION_TYPE, params.fecha_inicio, params.fecha_fin);
}

export const saveEvaluation = async (evaluation) => {
  evaluation.evaluationType = CONTINUOS_EVALUATION_TYPE;
  evaluation.isFinished = 1;
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'eval',
    headers:{
      Authorization: `Token ${TOKEN}`
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
      Authorization: `Token ${TOKEN}`
    }
  }
  return await ajax(optionsRequest);
}