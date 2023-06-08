import { PERFORMANCE_EVALUATION_TYPE } from '../utils/constants';
import { getEmployeeEvaluationDashboardShared, getEmployeesEvaluationDashboardShared, getEmployeesShared, getEvaluationsHistoryShared } from './shared';

export const getEmployees = async (bossId: number, fechaInicio? : Date, fechaFin? : Date) => { 
  return await getEmployeesShared(bossId, PERFORMANCE_EVALUATION_TYPE, fechaInicio, fechaFin);
}

export const getEvaluationsHistory = async (employeeId: number, nivel? : number, fechaInicio? : Date, fechaFin? : Date) => {
  return await getEvaluationsHistoryShared(employeeId, PERFORMANCE_EVALUATION_TYPE, nivel, fechaInicio, fechaFin);
}

export const getEmployeesEvaluationDashboard = async (bossId: number) => {
  return await getEmployeesEvaluationDashboardShared(bossId, PERFORMANCE_EVALUATION_TYPE);
}

export const getEmployeeEvaluationDashboard = async (employeeId: number) => {
  return await getEmployeeEvaluationDashboardShared(employeeId, PERFORMANCE_EVALUATION_TYPE);
}