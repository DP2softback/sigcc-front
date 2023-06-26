import { lazy, Suspense } from "react";
import { Roles } from "@routes/types/roles";
import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import {
	GAPS_ANALYSIS_MODULE,
	COMPETENCES,
	GAPS_EMPLOYEES_ORG,
	GAPS_EMPLOYEES_ORG_DETAIL,
	GAPS_EMPLOYEES_ORG_DETAIL_EMPLOYEE,
	EMPLOYEES_JOB_OPPORTUNITIES,
	GAPS_EMPLOYEE_EMP,
	GAPS_EMPLOYEE_EMP_DETAIL,
	MY_JOB_OPPORTUNITIES,
	EMPLOYEES_JOB_CANDIDATES,
	GAPS_EMPLOYEES_AREA,
	GAPS_EMPLOYEES_AREA_DETAIL,
	GAPS_EMPLOYEES_AREA_DETAIL_EMPLOYEE,
	INDEX,
	MY_JOB_OPPORTUNITIES_DETAIL,
	EMPLOYEES_JOB_STATISTICS,
	DEMAND_COMPANY_COURSES,
	DEMAND_COMPANY_COURSES_LIST
} from "./path";

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<></>}>
			<Component {...props} />
		</Suspense>
	);

const GestionDeCompetencias = Loader(
	lazy(() => import("@features/Modulo2/Components/GestionDeCompetencias/Read"))
);

const ConsolidadoCompetencias = Loader (
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/ConsolidadoCompetencias"))
);

const JobOpportunitiesRelatedToSkills = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesRelatedToSkills/index"))
);

const JobOpportunitiesSelected = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesRelatedToSkills/JobOpportunitySelected"))
);

const JobOpportunitiesHumanResources = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesHumanResources/index"))
);
  
const JobOpportunitiesHRCandidates = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesHumanResources/JobOpportunityCandidates"))
);

const JobOpportunitiesHRStats = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesHumanResources/JobOpportunityStats"))
);

const VisualizacionBrechasEmpleado = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasEmpleado/Read"))
);

const VisualizacionBrechasEmpleadoDetalle = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasEmpleado/Detail"))
);
  
const EstadisticasCompetencias = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/ConsolidadoCompetencias"))
);
  
const DetalleCompetenciasArea = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/DetalleCompetenciasArea"))
);

const ConsolidadoCompetenciasAM = Loader(
	lazy(() => import("@features/Modulo2/Components/JobStatisticsAreaManager/ConsolidadoCompetencias"))
);

const DetalleCompetenciaPuesto= Loader(
	lazy(() => import("@features/Modulo2/Components/JobStatisticsAreaManager/DetalleCompetenciasArea"))
);

const GestionCompetenciaEmpleadoAM = Loader(
	lazy(() => import("@features/Modulo2/Components/JobStatisticsAreaManager/GestionCompetencias"))
);

const GestionCompetenciaEmpleado = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/GestionCompetencias"))
);

const CoursesDemandCompany = Loader(
	lazy(() => import("@features/Modulo2/Components/CoursesDemandCompany/AreaEmpDemandCourses"))
);

const CoursesDemandCompanyList = Loader(
	lazy(() => import("@features/Modulo2/Components/CoursesDemandCompany/SelectDemandCourses"))
);


//ConsolidadoCompetenciasAM
//GestionCompetencia

export const routes: RouteObject[] = [
	{
		path: GAPS_ANALYSIS_MODULE,
		children: [
			{
				path: COMPETENCES,
				children: [
					{
						path: INDEX,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN
								]}>
								<GestionDeCompetencias />
							</AppLayout>
						)
					}
				]
			},
			{
				path: GAPS_EMPLOYEES_ORG,
				children: [
					{
						path: INDEX,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.GENERAL_MANAGER,
									Roles.HR_WORKER,
								]}>
								<ConsolidadoCompetencias />
							</AppLayout>
						)
					},
					{
						path: GAPS_EMPLOYEES_ORG_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.GENERAL_MANAGER,
									Roles.HR_WORKER,
								]}>
								<DetalleCompetenciasArea />
							</AppLayout>
						)
					},
					{
						path: GAPS_EMPLOYEES_ORG_DETAIL_EMPLOYEE,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.GENERAL_MANAGER,
									Roles.HR_WORKER,
								]}>
								<GestionCompetenciaEmpleado/>
							</AppLayout>
						)
					},
				]
			},
			{
				path: GAPS_EMPLOYEES_AREA,
				children: [
					{
						path: INDEX,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.GENERAL_MANAGER,
									Roles.HR_WORKER,
									Roles.HEAD_OF_AREA,
								]}>
								<ConsolidadoCompetenciasAM/>
							</AppLayout>
						)
					},
					{
						path: GAPS_EMPLOYEES_AREA_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.GENERAL_MANAGER,
									Roles.HR_WORKER,
									Roles.HEAD_OF_AREA,
								]}>
								<DetalleCompetenciaPuesto/>
							</AppLayout>
						)
					},
					{
						path: GAPS_EMPLOYEES_AREA_DETAIL_EMPLOYEE,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.GENERAL_MANAGER,
									Roles.HR_WORKER,
									Roles.HEAD_OF_AREA,
								]}>
								<GestionCompetenciaEmpleadoAM/>
							</AppLayout>
						)
					},
				]
			},
			{
				path: EMPLOYEES_JOB_OPPORTUNITIES,
				children: [
					{
						path: INDEX,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER
								]}>
								<JobOpportunitiesHumanResources />
							</AppLayout>
						)
					},
					{
						path: EMPLOYEES_JOB_CANDIDATES,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER
								]}>
								<JobOpportunitiesHRCandidates />
							</AppLayout>
						)
					},
					{
						path: EMPLOYEES_JOB_STATISTICS,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER
								]}>
								<JobOpportunitiesHRStats />
							</AppLayout>
						)
					}
				]
			},
			{
				path: GAPS_EMPLOYEE_EMP,
				children: [
					{
						path: INDEX,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_WORKER,
								]}>
								<VisualizacionBrechasEmpleado />
							</AppLayout>
						)
					},
					{
						path: GAPS_EMPLOYEE_EMP_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_WORKER,
								]}>
								<VisualizacionBrechasEmpleadoDetalle />
							</AppLayout>
						)
					},
				]
			},
			{
				path: EMPLOYEES_JOB_OPPORTUNITIES,
				element: (
					<AppLayout
						allowedRoles={[
							Roles.HR_ADMIN,
							Roles.HR_MANAGER,
							Roles.HR_WORKER,
						]}>
						<ConsolidadoCompetencias />
					</AppLayout>
				)
			},
			{
				path: MY_JOB_OPPORTUNITIES,
				children: [

					{
						path: MY_JOB_OPPORTUNITIES_DETAIL,
						element: (
							<AppLayout
						allowedRoles={[
							Roles.HR_WORKER,
						]}>
						<JobOpportunitiesSelected />
					</AppLayout>
							
						)
					}
				]
			},	
			{
				path: DEMAND_COMPANY_COURSES,
				children: [
					{
						path: INDEX,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER
								]}>
								<CoursesDemandCompany/>
							</AppLayout>
						)
					},
					{
						path: DEMAND_COMPANY_COURSES_LIST,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER
								]}>
								<CoursesDemandCompanyList />
							</AppLayout>
						)
					},

				]
			},
			{
				path: "*",
				element: <Navigate to={`/${GAPS_ANALYSIS_MODULE}/${COMPETENCES}/${INDEX}`} 
				replace />
			}
		]
	}
];
