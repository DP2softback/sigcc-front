import SidebarLayout from "@layout/default";
import RequireAuth from "@components/RequireAuth";
import { Roles } from "@routes/types/roles";

type Props = {
	allowedRoles: Roles[];
	title?: string;
	children?: React.ReactNode;
};

const AppLayout: React.FC<Props> = (props: Props) => {
	return (
		<RequireAuth allowedRoles={props.allowedRoles}>
			<SidebarLayout title={props.title || "DP2"}>
				{props.children}
			</SidebarLayout>
		</RequireAuth>
	);
};

export default AppLayout;
