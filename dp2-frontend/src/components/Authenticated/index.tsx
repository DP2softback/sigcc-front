import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "@redux/slices/authSlice";
import Login from "@components/Login/Login";
import { Roles } from "@routes/types/roles";

type AuthenticatedProps = {
	children?: React.ReactNode;
	allowedRoles: Roles[];
};

const Authenticated: React.FC<AuthenticatedProps> = (
	props: AuthenticatedProps
) => {
	const user = useSelector(selectCurrentUser);
	const token = useSelector(selectCurrentToken);

	const location = useLocation();
	const [requestedLocation, setRequestedLocation] = useState(null);

	if (
		!user?.roles?.find((role) =>
			props.allowedRoles?.includes(Roles.HR_ADMIN)
		) ||
		!token
	) {
		if (location.pathname !== requestedLocation) {
			setRequestedLocation(location.pathname);
		}
		return <Login />;
	}

	if (requestedLocation && location.pathname !== requestedLocation) {
		setRequestedLocation(null);
		return <Navigate to={requestedLocation} />;
	}

	return <Navigate to={"/"} />;
};

export default Authenticated;
