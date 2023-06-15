import { lazy, Suspense } from "react";
import { Roles } from "@routes/types/roles";
import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import { CONTINUOS_EVALUATION_INDEX, EVALUATION_TEMPLATE_INDEX, PERFORMANCE_EVALUATION_INDEX, REPORT_CONTINUOS_EVALUATION_INDEX } from "./path";

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<></>}>
			<Component {...props} />
		</Suspense>
	);

const EvaluacionContinuaIndex = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/Index"))
);

const EvaluacionContinuaHistory = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/History"))
);

const EvaluacionContinuaCreate = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/Create"))
);

const EvaluacionContinuaDetail = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/Detail"))
);

const EvaluacionDeDesempenhoIndex = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Index"))
);

const EvaluacionDeDesempenhoHistory = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/History"))
);

const EvaluacionDeDesempenhoCreate = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Create"))
);

const EvaluacionDeDesempenhoDetail = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Detail"))
);

const EvaluationTemplateIndex = Loader(
	lazy(() => import("@features/Modulo3/screens/Plantillas/Index"))
);

const EvaluationTemplateCreate = Loader(
	lazy(() => import("@features/Modulo3/screens/Plantillas/Create"))
);

const EvaluationTemplateEdit = Loader(
	lazy(() => import("@features/Modulo3/screens/Plantillas/Edit"))
);

const ReporteEvaluacionContinua = Loader(
	lazy(() => import("@features/Modulo3/screens/Reportes/IndexEvaluacionContinua"))
);

const ReporteEvaluacionDesempenho = Loader(
	lazy(() => import("@features/Modulo3/screens/Reportes/IndexEvaluacionDesempenho"))
);
const CategoriesIndex = Loader(
	lazy(()=> import("@features/Modulo3/screens/Categorias/Index"))
  ); 
  
const CategoriesDetail = Loader(
lazy(()=> import("@features/Modulo3/screens/Categorias/Detail"))
);

const CategoriesCreate = Loader(
lazy(()=> import("@features/Modulo3/screens/Categorias/Create"))
);


export const routes: RouteObject[] = [
	{
		path: "skill-management",
		children: [
			{
				path: "continuous-evaluation",
				children: [
					{
						path: "index",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionContinuaIndex />
							</AppLayout>
						)
					},
					{
						path: "history",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionContinuaHistory />
							</AppLayout>
						)
					},
					{
						path: "detail",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionContinuaDetail />
							</AppLayout>
						)
					},
					{
						path: "create",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionContinuaCreate />
							</AppLayout>
						)
					},
					{
						path: "*",
						element: <Navigate to={CONTINUOS_EVALUATION_INDEX} replace />
					}
				]
			},
			{
				path: "performance-evaluation",
				children: [
					{
						path: "index",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionDeDesempenhoIndex />
							</AppLayout>
						)
					},
					{
						path: "history",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionDeDesempenhoHistory />
							</AppLayout>
						)
					},
					{
						path: "detail",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionDeDesempenhoDetail />
							</AppLayout>
						)
					},
					{
						path: "create",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluacionDeDesempenhoCreate />
							</AppLayout>
						)
					},
					{
						path: "*",
						element: <Navigate to={PERFORMANCE_EVALUATION_INDEX} replace />
					}
				]
			},
			{
				path: "evaluation-template",
				children: [
					{
						path: "index",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluationTemplateIndex />
							</AppLayout>
						)
					},
					{
						path: "create",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluationTemplateCreate />
							</AppLayout>
						)
					},
					{
						path: "edit",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<EvaluationTemplateEdit />
							</AppLayout>
						)
					},
					{
						path: "*",
						element: <Navigate to={EVALUATION_TEMPLATE_INDEX} replace />
					}
				]
			},
			{
				path: "categorias",
				children:[
				  {
					path: "index",
					element:(
						<AppLayout
							allowedRoles={[
								Roles.HR_ADMIN,
								Roles.HR_MANAGER,
								Roles.HR_WORKER,
								Roles.CANDIDATE
							]}>
							<CategoriesIndex />
						</AppLayout>
					)
				  },
				  {
					path: "detail",
					element:(
						<AppLayout
							allowedRoles={[
								Roles.HR_ADMIN,
								Roles.HR_MANAGER,
								Roles.HR_WORKER,
								Roles.CANDIDATE
							]}>
							<CategoriesDetail />
						</AppLayout>
					)
				  },
				  {
					path: "create",
					element:(
						<AppLayout
							allowedRoles={[
								Roles.HR_ADMIN,
								Roles.HR_MANAGER,
								Roles.HR_WORKER,
								Roles.CANDIDATE
							]}>
							<CategoriesCreate />
						</AppLayout>
					)
				  },
				],
			  },
			{
				path: "report",
				children: [
					{
						path: "continuous-evaluation",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<ReporteEvaluacionContinua />
							</AppLayout>
						)
					},
					{
						path: "performance-evaluation",
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<ReporteEvaluacionDesempenho />
							</AppLayout>
						)
					},
					{
						path: "*",
						element: <Navigate to={REPORT_CONTINUOS_EVALUATION_INDEX} replace />
					}
				]
			}
		]
	}
];

export default routes;
