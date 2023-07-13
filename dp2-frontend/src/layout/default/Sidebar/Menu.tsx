import { useEffect } from "react";
import classNames from "classnames";
import slideUp from "@utils/slideUp";
import slideDown from "@utils/slideDown";
import getParents from "@utils/getParents";
import { NavLink, Link } from "react-router-dom";
import { sidebarItems } from "@routes/sidebarItems";
import { Icon } from "react-bootstrap-icons";
import { Fragment } from "react";
import { getStorageItem } from "@config/localStorage";

type MenuHeadingProps = {
	className?: string;
	text?: string;
	children?: React.ReactNode;
};

const MenuHeading: React.FC<MenuHeadingProps> = ({
	className,
	text,
	...props
}: MenuHeadingProps) => {
	const compClass = classNames({
		"nk-menu-heading": true,
		[className]: className
	});
	return (
		<li className={compClass}>
			<h6 className="overline-title">{text || props.children}</h6>
		</li>
	);
};

type MenuItemTemplateProps = {
	text: string;
	Icon: Icon;
};

const MenuItemTemplate: React.FC<MenuItemTemplateProps> = ({
	text,
	Icon
}: MenuItemTemplateProps) => {
	return (
		<>
			{Icon && <span className="nk-menu-icon"><em className="icon"><Icon size="16px" /></em></span>}
			{text && <span className="nk-menu-text">{text}</span>}
		</>
	);
};

type MenuItemLinkProps = {
	text: string;
	Icon: Icon;
	sub?: boolean;
	to?: string;
	blank?: boolean;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const MenuItemLink: React.FC<MenuItemLinkProps> = ({
	text,
	Icon,
	sub,
	to,
	blank,
	onClick
}: MenuItemLinkProps) => {
	return (
		<>
			{!blank && !sub && (
				<NavLink className="nk-menu-link" to={to}>
					<MenuItemTemplate Icon={Icon} text={text} />
				</NavLink>
			)}
			{blank && (
				<Link className="nk-menu-link" to={to} target="_blank">
					<MenuItemTemplate Icon={Icon} text={text} />
				</Link>
			)}
			{sub && (
				<a
					className="nk-menu-link nk-menu-toggle"
					onClick={onClick}
					href="#expand">
					<MenuItemTemplate Icon={Icon} text={text} />
				</a>
			)}
		</>
	);
};

type MenuItemProps = {
	sub?: boolean;
	className?: string;
	children?: React.ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({
	sub,
	className,
	...props
}: MenuItemProps) => {
	const compClass = classNames({
		"nk-menu-item": true,
		"has-sub": sub,
		[className]: className
	});
	return <li className={compClass}>{props.children}</li>;
};

type MenuSubProps = {
	className?: string;
	children?: React.ReactNode;
};

const MenuSub: React.FC<MenuSubProps> = ({
	className,
	...props
}: MenuSubProps) => {
	const compClass = classNames({
		"nk-menu-sub": true,
		[className]: className
	});
	return <ul className={compClass}>{props.children}</ul>;
};

type MenuListProps = {
	className?: string;
	children?: React.ReactNode;
};

const MenuList: React.FC<any> = ({ className, ...props }: MenuListProps) => {
	const compClass = classNames({
		"nk-menu": true,
		[className]: className
	});
	return <ul className={compClass}>{props.children}</ul>;
};

const Menu: React.FC = () => {
	// variables for Sidebar
	let menu = {
		classes: {
			main: "nk-menu",
			item: "nk-menu-item",
			link: "nk-menu-link",
			toggle: "nk-menu-toggle",
			sub: "nk-menu-sub",
			subparent: "has-sub",
			active: "active",
			current: "current-page"
		}
	};

	let currentLink = function (selector) {
		let elm = document.querySelectorAll(selector);
		elm.forEach(function (item) {
			var activeRouterLink = item.classList.contains("active");
			if (activeRouterLink) {
				let parents = getParents(
					item,
					`.${menu.classes.main}`,
					menu.classes.item
				);
				parents.forEach((parentElemets) => {
					parentElemets.classList.add(
						menu.classes.active,
						menu.classes.current
					);
					let subItem = parentElemets.querySelector(`.${menu.classes.sub}`);
					subItem !== null && (subItem.style.display = "block");
				});
			} else {
				item.parentElement.classList.remove(
					menu.classes.active,
					menu.classes.current
				);
			}
		});
	};

	// dropdown toggle
	let dropdownToggle = function (elm) {
		let parent = elm.parentElement;
		let nextelm = elm.nextElementSibling;
		let speed =
			nextelm.children.length > 5 ? 400 + nextelm.children.length * 10 : 400;
		if (!parent.classList.contains(menu.classes.active)) {
			parent.classList.add(menu.classes.active);
			slideDown(nextelm, speed);
		} else {
			parent.classList.remove(menu.classes.active);
			slideUp(nextelm, speed);
		}
	};

	// dropdown close siblings
	let closeSiblings = function (elm) {
		let parent = elm.parentElement;
		let siblings = parent.parentElement.children;
		Array.from<any>(siblings).forEach((item) => {
			if (item !== parent) {
				item.classList.remove(menu.classes.active);
				if (item.classList.contains(menu.classes.subparent)) {
					let subitem = item.querySelectorAll(`.${menu.classes.sub}`);
					subitem.forEach((child) => {
						child.parentElement.classList.remove(menu.classes.active);
						slideUp(child, 400);
					});
				}
			}
		});
	};

	let menuToggle = function (e) {
		e.preventDefault();
		let item = e.target.closest(`.${menu.classes.toggle}`);
		dropdownToggle(item);
		closeSiblings(item);
	};

	useEffect(() => {
		currentLink(`.${menu.classes.link}`);
		// eslint-disable-next-line
	}, [null]);

	return (
		<MenuList>
			{sidebarItems.map((itemGroup, index) => {
				let user = getStorageItem("user", false);
				//console.log(user)
				return (
					itemGroup.roles.find((role) => user?.roles?.includes(role)) && 
					<Fragment key={index}>
						<MenuHeading text={itemGroup.groupName} key={index} />
						{itemGroup.children.map((item, idx) => {
							return (
								item.roles.find((role) => user?.roles?.includes(role)) && 
								<MenuItem sub={item.hasChildren} key={idx}>
									<MenuItemLink
										key={idx}
										Icon={item.icon}
										text={item.name}
										onClick={menuToggle}
										sub={item.hasChildren}
										to={item.route}
									/>
									{item.hasChildren && (
										<MenuSub>
											{item.children.map((itemChild, i) => {
												return (
													itemChild.roles.find((role) => user?.roles?.includes(role)) && <MenuItem key={i}>
														<MenuItemLink key={i}
															Icon={itemChild.icon}
															text={itemChild.name}
															to={itemChild.route}
														/>
													</MenuItem>
												);
											})}
										</MenuSub>
									)}
								</MenuItem>
							);
						})}
					</Fragment>
				);
			})}
		</MenuList>
	);
};

export default Menu;
