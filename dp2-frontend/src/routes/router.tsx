import { RouteObject } from "react-router-dom";
import Login from "@components/Login/Login";
import { Roles } from "./types/roles";
import { Navigate } from "react-router-dom";
import Authenticated from "@components/Authenticated";
import { routes as routesGroup4 } from "@features/Modulo4/routes/router";
import { routes as routesGrupo3 } from "@features/Modulo3/routes/router";
import { routes as routesGrupo1 } from "@features/Modulo1/routes/router";

import { SELECTION_PROCESS_AND_JOB_OFFERS_MODULE,
	JOB_OFFERS,
	CREATE_JOB_OFFER,
	LIST_JOB_OFFERS,
	SELECTION_PROCESS,
	CREATE_SELECTION_PROCESS,
	LIST_SELECTION_PROCESS } from "@features/Modulo4/routes/path";

const defaultRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to={`${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_OFFERS}/${CREATE_JOB_OFFER}`} replace />
	},
	{
		path: "login",
		element: (
			<Authenticated
				allowedRoles={[
					Roles.HR_ADMIN,
					Roles.HR_MANAGER,
					Roles.HR_WORKER,
					Roles.CANDIDATE,
					Roles.GENERAL_MANAGER,
					Roles.HEAD_OF_AREA,
					Roles.WORKER
				]}>
				<Login />
			</Authenticated>
		)
	}
];

// HERE MERGE ALL GROUPS ROUTER
const routes: RouteObject[] = defaultRoutes.concat(routesGroup4).concat(routesGrupo3).concat(routesGrupo1);

const router: RouteObject[] = [
	{
		path: "/",
		children: routes
	}
];

export default router;
