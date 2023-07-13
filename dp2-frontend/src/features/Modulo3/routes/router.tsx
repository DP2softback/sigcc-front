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

const EvaluacionDeDesempenhoAuto = Loader(
	lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Autoevaluation"))
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
								Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
								Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
								Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
									Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER
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
			},
			{
				path: "auto-evaluation",
				element: (
					<EvaluacionDeDesempenhoAuto />
				)
			}
		]
	}
];
