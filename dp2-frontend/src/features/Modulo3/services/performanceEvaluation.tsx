import { ajax } from '../tools/ajax';
import { BACKEND_URL, PERFORMANCE_EVALUATION_TYPE, TOKEN } from '../utils/constants';
import { getEmployeeEvaluationDashboardShared, getEmployeesEvaluationDashboardShared, getEmployeesShared, getEvaluationsHistoryShared } from './shared';

export const getEmployees = async (params: any) => { 
  return await getEmployeesShared(PERFORMANCE_EVALUATION_TYPE, params.bossId, params.fecha_inicio, params.fecha_fin);
}

export const getEvaluationsHistory = async (params: any) => {
  return await getEvaluationsHistoryShared(PERFORMANCE_EVALUATION_TYPE, params.employeeId, params.nivel, params.fecha_inicio, params.fecha_fin);
}

export const getEmployeesEvaluationDashboard = async (params: any) => {
  return await getEmployeesEvaluationDashboardShared(params.bossId, PERFORMANCE_EVALUATION_TYPE, params.fecha_inicio, params.fecha_fin, params.employeeName);
}

export const getEmployeeEvaluationDashboard = async (params: any) => {
  return await getEmployeeEvaluationDashboardShared(params.employeeId, PERFORMANCE_EVALUATION_TYPE, params.fecha_inicio, params.fecha_fin);
}

export const saveEvaluation = async (evaluation) => {
  const optionsRequest = {
    method: 'POST',
    url: BACKEND_URL + 'CrearEvaluacionDese',
    headers:{
      Authorization: `Token ${TOKEN}`
    },
    data: evaluation
  }
  return await ajax(optionsRequest);
}