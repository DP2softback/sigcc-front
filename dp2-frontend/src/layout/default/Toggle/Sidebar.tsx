import classNames from "classnames";
import Button from "react-bootstrap/Button";
import Icon from "@components/Icon/Icon";
import {
	useLayout,
	useLayoutUpdate
} from "../LayoutProvider";

const Sidebar = ({ icon, variant }: Partial<any>) => {
	const layout = useLayout();
	const layoutUpdate = useLayoutUpdate();

	const btnClass = classNames({
		"btn-icon text-light d-none d-sm-inline-flex sidebar-toggle": true,
		active: layout.sidebarActive
	});

	const btnSmClass = classNames({
		"btn-icon text-light d-sm-none sidebar-toggle": true,
		active: layout.sidebarActive
	});

	return (
		<div className="nk-sidebar-toggle me-n1">
			<Button
				size="sm"
				variant={variant || "no-hover"}
				onClick={layoutUpdate.sidebarMobile}
				className={btnSmClass}>
				<Icon name={icon || "arrow-left"} />
			</Button>
			<Button
				size="sm"
				variant={variant || "no-hover"}
				onClick={layoutUpdate.sidebarMobile}
				className={btnClass}>
				<Icon name={icon || "arrow-left"} />
			</Button>
		</div>
	);
};

export default Sidebar;
