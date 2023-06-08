import { RouteObject } from "react-router-dom";
import Login from "@components/Login/Login";
import { Roles } from "./types/roles";
import { Navigate } from "react-router-dom";
import Authenticated from "@components/Authenticated";
import { routes as routesGroup4 } from "@features/Modulo4/routes/router";

const defaultRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/selection-offers-and-positions/selection-process/test" replace />
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
const routes: RouteObject[] = defaultRoutes.concat(routesGroup4);

const router: RouteObject[] = [
	{
		path: "/",
		children: routes
	}
];

export default router;
