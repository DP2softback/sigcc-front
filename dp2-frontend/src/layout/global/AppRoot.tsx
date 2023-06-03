import classNames from "classnames";
import { useLayout } from "../default/LayoutProvider";

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const AppRoot: React.FC<Props> = ({ className, ...props } : Props) => {
	const layout = useLayout();
	const compClass = classNames({
		"nk-app-root": true,
		"sidebar-compact": layout.sidebarCompact,
		"sidebar-shown": layout.sidebarActive,
		"navbar-shown": layout.headerActive,
		[`${className}`]: className
	});
	return (
		<div
			className={compClass}
			data-sidebar-collapse={layout.sidebarCollapse || "lg"}
			data-navbar-collapse={layout.headerCollapse || "lg"}>
			{props.children}
		</div>
	);
}

export default AppRoot;
