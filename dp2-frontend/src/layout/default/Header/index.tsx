import { useState } from "react";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
import LogoHCM from "@assets/images/LogoHCM.svg";
import Menu from "./Menu";
import ToggleSidebar from "../Toggle/Sidebar";
import ToggleNavbar from "../Toggle/Navbar";
import { useLayout, useLayoutUpdate } from "../LayoutProvider";
import { Search, Bell } from "react-bootstrap-icons";

function QuickNav({ className, ...props }) {
	const compClass = classNames({
		"nk-quick-nav": true,
		[className]: className
	});
	return <ul className={compClass}>{props.children}</ul>;
}

function QuickNavItem({ className, ...props }) {
	const compClass = classNames({
		"d-inline-flex": true,
		[className]: className
	});
	return <li className={compClass}>{props.children}</li>;
}

const Header: React.FC = () => {
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const layout = useLayout();
	const layoutUpdate = useLayoutUpdate();

	const compClass = classNames({
		"nk-header nk-header-fixed": true,
		[`is-${layout.headerVariant}`]: layout.headerVariant
	});

	const navClass = classNames({
		"nk-header-menu nk-navbar": true,
		"navbar-active": layout.headerActive,
		// eslint-disable-next-line
		"navbar-mobile":
			layout.headerTransition ||
			eval(`layout.breaks.${layout.headerCollapse}`) > window.innerWidth
	});

	// offcanvas
	//const handleOffcanvasClose = () => setShowOffcanvas(false);
	const handleOffcanvasShow = () => setShowOffcanvas(true);

	return (
		<>
			<div className={compClass}>
				<div className="container-fluid">
					<div className="nk-header-wrap">
						<div className="nk-header-logo">
							<ToggleSidebar variant="zoom" icon="menu" />
							{/* <ToggleNavbar className="me-2" /> */}
							<img src={LogoHCM} alt="de - hasta" width="120" height="50" style={{marginLeft: '2rem'}}/>
						</div>
						{/* {layout.headerActive && (
							<div
								className="navbar-overlay"
								onClick={layoutUpdate.headerMobile}></div>
						)} */}
						<div className="nk-header-tools">
							<QuickNav className={""}>
								<Dropdown as={QuickNavItem}>
									<Dropdown.Toggle
										variant="zoom"
										size="sm"
										bsPrefix="true"
										className="btn-icon d-sm-none">
										<Search size={"24px"} />
									</Dropdown.Toggle>
									<Dropdown.Toggle
										variant="zoom"
										size="sm"
										bsPrefix="true"
										className="btn-icon d-none d-sm-inline-flex">
										<Search size={"16px"} />
									</Dropdown.Toggle>
								</Dropdown>
								<QuickNavItem className={""}>
									<button
										className="btn-icon btn btn-zoom btn-sm d-sm-none"
										onClick={handleOffcanvasShow}>
										<Bell size="24px" />
									</button>
									<button
										className="btn-icon btn btn-zoom btn-md d-none d-sm-inline-flex"
										onClick={handleOffcanvasShow}>
										<Bell size="16px" />
									</button>
								</QuickNavItem>
							</QuickNav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
