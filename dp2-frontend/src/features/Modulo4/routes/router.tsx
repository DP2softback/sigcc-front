import { lazy, Suspense } from "react";
import { Roles } from "@routes/types/roles";
import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import {
	SELECTION_PROCESS_AND_JOB_OFFERS_MODULE,
	JOB_OFFERS,
	JOB_POSITIONS,
	CREATE_JOB_OFFER,
	LIST_JOB_OFFERS,
	LIST_JOB_POSITION,
	CREATE_JOB_POSITION,
	SELECTION_PROCESS,
	CREATE_SELECTION_PROCESS,
	LIST_SELECTION_PROCESS
} from "./path";

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<></>}>
			<Component {...props} />
		</Suspense>
	);

const ConfigSelectionProcess = Loader(
	lazy(() => import("@features/Modulo4/pages/ConfigProcesoSeleccion/ConfigProcesoSeleccion"))
);

const ConfigOfertaLaboral = Loader(
	lazy(() => import("@features/Modulo4/pages/ConfigOfertaLaboral/ConfigOfertaLaboral"))
);

const ConfigJobPosition = Loader(
	lazy(() => import("@features/Modulo4/pages/JobPositions/ConfigPosition"))
);

export const routes: RouteObject[] = [
	{
		path: SELECTION_PROCESS_AND_JOB_OFFERS_MODULE,
		children: [
			{
				path: JOB_OFFERS,
				children: [
					{
						path: CREATE_JOB_OFFER,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<ConfigOfertaLaboral />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: <Navigate to={CREATE_JOB_OFFER} replace />
					}
				]
			},
			{
				path: SELECTION_PROCESS,
				children: [
					{
						path: CREATE_SELECTION_PROCESS,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<ConfigSelectionProcess />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: <Navigate to={CREATE_SELECTION_PROCESS} replace />
					}
				]
			},
			{
				path: JOB_POSITIONS,
				children: [
					{
						path: CREATE_JOB_POSITION,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HR_WORKER,
									Roles.CANDIDATE
								]}>
								<ConfigJobPosition />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: <Navigate to={CREATE_JOB_POSITION} replace />
					}
				]
			},
			{
				path: "*",
				element: <Navigate to={`${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_OFFERS}/${CREATE_JOB_OFFER}`} replace />
			}
		]
	}
];
