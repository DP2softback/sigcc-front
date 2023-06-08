import classNames from "classnames";
import SimpleBar from "simplebar-react";
import LogoHCM from "@assets/images/LogoHCM.svg";
import Menu from "./Menu";
import ToggleSidebar from "../Toggle/Sidebar";
import {
	useLayout,
	useLayoutUpdate
} from "../LayoutProvider";

const Sidebar: React.FC = () => {
	const layout = useLayout();
	const layoutUpdate = useLayoutUpdate();

	const compClass = classNames({
		"nk-sidebar nk-sidebar-fixed": true,
		"is-compact": layout.sidebarCompact,
		"sidebar-active": layout.sidebarActive,
		[`is-${layout.sidebarVariant}`]: layout.sidebarVariant
	});

	return (
		<>
			{layout.sidebarActive && (
				<div
					className="sidebar-overlay"
					onClick={layoutUpdate.sidebarMobile}></div>
			)}
			<div className={compClass}>
				<div
					className="nk-sidebar-element nk-sidebar-head"
					style={{ backgroundColor: "white" }}>
					<div
						className="nk-sidebar-brand"
						style={{
							display: "flex",
							justifyContent: "center"
						}}>
						<img
							src={LogoHCM}
							alt="HCM SOFTWARE"
							width="180"
							height="50"
						/>
						<ToggleSidebar />
					</div>
				</div>
				<div className="nk-sidebar-element nk-sidebar-body">
					<div className="nk-sidebar-content">
						<SimpleBar className="nk-sidebar-menu">
							<Menu />
						</SimpleBar>
					</div>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
