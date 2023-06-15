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
	INDEX
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

const JobOpportunitiesHumanResources = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesHumanResources/index"))
);
  
const JobOpportunitiesHRCandidates = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesHumanResources/JobOpportunityCandidates"))
);

const VisualizacionBrechasEmpleado = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasEmpleado/Read"))
);

const VisualizacionBrechasEmpleadoDetalle = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasEmpleado/Detail"))
);

const JobOpportunitiesSelected = Loader(
	lazy(() => import("@features/Modulo2/Components/JobOpportunitiesRelatedToSkills/JobOpportunitySelected"))
);
  
const EstadisticasCompetencias = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/ConsolidadoCompetencias"))
);
  
const DetalleCompetenciasArea = Loader(
	lazy(() => import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/DetalleCompetenciasArea"))
);

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
								<ConsolidadoCompetencias />
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
								<span>Meter aqui el index de area</span>
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
								<span>Meter aqui el detalle por puesto de empleados</span>
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
								<span>Meter aqui el detalle del empleado empleados</span>
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
						path: INDEX,
						element: (
					<AppLayout
						allowedRoles={[
							Roles.HR_WORKER,
						]}>
						<JobOpportunitiesRelatedToSkills />
					</AppLayout>)
					}
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
