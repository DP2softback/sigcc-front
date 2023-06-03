import { useEffect } from "react";
import classNames from "classnames";
import slideUp from "@utils/slideUp";
import slideDown from "@utils/slideDown";
import getParents from "@utils/getParents";
import { NavLink, Link } from "react-router-dom";

type MenuHeadingProps = {
    className?: string
    text?: string
    children?: React.ReactNode
}

const MenuHeading: React.FC<MenuHeadingProps> = ({ className, text, ...props }: MenuHeadingProps) => {
	const compClass = classNames({
		"nk-menu-heading": true,
		[className]: className
	});
	return (
		<li className={compClass}>
			<h6 className="overline-title">{text || props.children}</h6>
		</li>
	);
}

function MenuItemTemplate({ text, icon }: Partial<any>) {
	return (
		<>
			{icon && (
				<span className="nk-menu-icon">
					<em className={`icon ni ni-${icon}`}></em>
				</span>
			)}
			{text && <span className="nk-menu-text">{text}</span>}
		</>
	);
}

function MenuItemLink({ text, icon, sub, to, blank, onClick }: Partial<any>) {
	return (
		<>
			{!blank && !sub && (
				<NavLink className="nk-menu-link" to={to}>
					<MenuItemTemplate icon={icon} text={text} />
				</NavLink>
			)}
			{blank && (
				<Link className="nk-menu-link" to={to} target="_blank">
					<MenuItemTemplate icon={icon} text={text} />
				</Link>
			)}
			{sub && (
				<a
					className="nk-menu-link nk-menu-toggle"
					onClick={onClick}
					href="#expand">
					<MenuItemTemplate icon={icon} text={text} />
				</a>
			)}
		</>
	);
}

function MenuItem({ sub, className, ...props }: Partial<any>) {
	const compClass = classNames({
		"nk-menu-item": true,
		"has-sub": sub,
		[className]: className
	});
	return <li className={compClass}>{props.children}</li>;
}

function MenuSub({ mega, className, ...props }: Partial<any>) {
	const compClass = classNames({
		"nk-menu-sub": true,
		[className]: className
	});
	return <ul className={compClass}>{props.children}</ul>;
}

type MenuListProps = {
    className?: string
    children?: React.ReactNode
}

const MenuList: React.FC<any> = ({ className, ...props }: MenuListProps) => {
	const compClass = classNames({
		"nk-menu": true,
		[className]: className
	});
	return <ul className={compClass}>{props.children}</ul>;
}

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
	}, []);

	return (
		<MenuList>
			<MenuHeading text="Applications" />
			<MenuItem>
				<MenuItemLink icon="chat-circle" text="Chat" to="/apps/chats" />
			</MenuItem>
			<MenuItem>
				<MenuItemLink icon="inbox" text="Inbox" to="/apps/inbox" />
			</MenuItem>
			<MenuItem>
				<MenuItemLink
					icon="calendar-booking"
					text="Calendar"
					to="/apps/calendar"
				/>
			</MenuItem>
			<MenuItem sub>
				<MenuItemLink
					icon="grid-alt"
					text="Kanban board"
					onClick={menuToggle}
					sub
				/>
				<MenuSub>
					<MenuItem>
						<MenuItemLink text="Basic" to="/apps/kanban/basic" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Custom Board" to="/apps/kanban/custom" />
					</MenuItem>
				</MenuSub>
			</MenuItem>
			<MenuItem sub>
				<MenuItemLink
					icon="users"
					text="User Management"
					onClick={menuToggle}
					sub
				/>
				<MenuSub>
					<MenuItem>
						<MenuItemLink text="Users List" to="/user-manage/user-list" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Users Cards" to="/user-manage/user-cards" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink
							text="User Profile"
							to="/user-manage/user-profile/uid01"
						/>
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="User Edit" to="/user-manage/user-edit/uid01" />
					</MenuItem>
				</MenuSub>
			</MenuItem>
			<MenuItem sub>
				<MenuItemLink icon="bag" text="eCommerce" onClick={menuToggle} sub />
				<MenuSub>
					<MenuItem>
						<MenuItemLink text="Products" to="/ecommerce/products" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Categories" to="/ecommerce/categories" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Add Product" to="/ecommerce/add-product" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink
							text="Edit Product"
							to="/ecommerce/edit-product/uid01"
						/>
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Add Category" to="/ecommerce/add-category" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink
							text="Edit Category"
							to="/ecommerce/edit-category/uid01"
						/>
					</MenuItem>
				</MenuSub>
			</MenuItem>
			<MenuHeading text="Components" />
			<MenuItem sub>
				<MenuItemLink
					icon="layers"
					text="Ui Elements"
					onClick={menuToggle}
					sub
				/>
				<MenuSub>
					<MenuItem>
						<MenuItemLink text="Accordion" to="/ui-elements/accordion" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Alerts" to="/ui-elements/alert" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Badge" to="/ui-elements/badge" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Breadcrumb" to="/ui-elements/breadcrumb" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Buttons" to="/ui-elements/buttons" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Button group" to="/ui-elements/button-group" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Cards" to="/ui-elements/cards" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Carousel" to="/ui-elements/carousel" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Close button" to="/ui-elements/close-button" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Collapse" to="/ui-elements/collapse" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Dropdowns" to="/ui-elements/dropdowns" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="List group" to="/ui-elements/list-group" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Modal" to="/ui-elements/modal" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Tabs" to="/ui-elements/tabs" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Offcanvas" to="/ui-elements/offcanvas" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Pagination" to="/ui-elements/pagination" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Placeholders" to="/ui-elements/placeholders" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Popovers" to="/ui-elements/popovers" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Progress" to="/ui-elements/progress" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Spinners" to="/ui-elements/spinners" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Toasts" to="/ui-elements/toasts" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Tooltips" to="/ui-elements/tooltips" />
					</MenuItem>
					<MenuItem sub>
						<MenuItemLink text="Utilities" onClick={menuToggle} sub />
						<MenuSub>
							<MenuItem>
								<MenuItemLink text="Miscellaneous" to="/utilities/misc" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Typography" to="/utilities/typography" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Images" to="/utilities/images" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Tables" to="/utilities/tables" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Background" to="/utilities/background" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Borders" to="/utilities/borders" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Colors" to="/utilities/colors" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Flex" to="/utilities/flex" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Sizing" to="/utilities/sizing" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Spacing" to="/utilities/spacing" />
							</MenuItem>
						</MenuSub>
					</MenuItem>
					<MenuItem sub>
						<MenuItemLink text="Layout" onClick={menuToggle} sub />
						<MenuSub>
							<MenuItem>
								<MenuItemLink text="Breakpoints" to="/layout/breakpoints" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Containers" to="/layout/containers" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Gutters" to="/layout/gutters" />
							</MenuItem>
						</MenuSub>
					</MenuItem>
				</MenuSub>
			</MenuItem>
			<MenuItem sub>
				<MenuItemLink icon="package" text="Forms" onClick={menuToggle} sub />
				<MenuSub>
					<MenuItem>
						<MenuItemLink text="Form Controls" to="/forms/form-control" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Form Select" to="/forms/form-select" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Date & Time picker" to="/forms/date-time" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Form Upload" to="/forms/form-upload" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Input Group" to="/forms/input-group" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Floating Labels" to="/forms/floating-labels" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Checks and radios" to="/forms/checks-radios" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Form Range" to="/forms/form-range" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Form Validation" to="/forms/form-validation" />
					</MenuItem>
					<MenuItem>
						<MenuItemLink text="Form Layout" to="/forms/form-layout" />
					</MenuItem>
					<MenuItem sub>
						<MenuItemLink text="Rich Editors" onClick={menuToggle} sub />
						<MenuSub>
							<MenuItem>
								<MenuItemLink text="Quill" to="/editors/quill" />
							</MenuItem>
							<MenuItem>
								<MenuItemLink text="Tinymce" to="/editors/tinymce" />
							</MenuItem>
						</MenuSub>
					</MenuItem>
				</MenuSub>
			</MenuItem>
			<MenuItem>
				<MenuItemLink icon="dot-box" text="Icons" to="/icons" />
			</MenuItem>
			<MenuItem>
				<MenuItemLink icon="table-view" text="Data tables" to="/data-table" />
			</MenuItem>
			<MenuItem>
				<MenuItemLink icon="pie" text="Charts" to="/charts" />
			</MenuItem>
			<MenuItem>
				<MenuItemLink icon="alert-c" text="Sweetalert" to="/sweetalert" />
			</MenuItem>
			<MenuHeading text="misc pages" />
			<MenuItem sub>
				<MenuItemLink
					icon="signin"
					text="Auth Pages"
					onClick={menuToggle}
					sub
				/>
				<MenuSub>
					<MenuItem>
					    <MenuItemLink text="Auth Register" to="/auths/auth-register" />
						<MenuItemLink text="Auth Login" to="/auths/auth-login" />
						<MenuItemLink text="Forgot Password" to="/auths/auth-reset" />
					</MenuItem>
				</MenuSub>
			</MenuItem>
			<MenuItem>
				<MenuItemLink icon="files" text="Page 404" to="/not-found" />
			</MenuItem>
		</MenuList>
	);
};

export default Menu;
