import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "@redux/slices/authSlice";
import { Roles } from "@routes/types/roles";
import { Fragment } from "react";

type AuthProps = {
	allowedRoles: Roles[];
	children?: React.ReactNode;
};

const RequireAuth: React.FC<AuthProps> = (props: AuthProps) => {
	const user = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);
	const location = useLocation();

	return token &&
		user?.roles?.find((role: Roles) => props.allowedRoles?.includes(role)) ? (
		<Fragment>{props.children}</Fragment>
	) : token ? (
		<Navigate to="/login" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
