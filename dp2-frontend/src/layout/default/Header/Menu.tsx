import React, {useEffect} from 'react'
import classNames from 'classnames'

import slideUp from '@utils/slideUp';
import slideDown from '@utils/slideDown';
import getParents from '@utils/getParents';

import {useLayout} from '../LayoutProvider'; 

import { NavLink, Link } from "react-router-dom";
import { Placement, createPopper } from "@popperjs/core"

import Icon from '@components/Icon/Icon';
import Media from '@components/Media/Media';
import MediaText from '@components/Media/MediaText';
import MediaGroup from '@components/Media/MediaGroup';
import Image from '@components/Image/Image';
import { any } from 'zod';

function MenuItemTemplate({ text,icon }: Partial<any>) {
    return (
        <>
            {icon && <span className="nk-nav-icon"><Icon name={icon}></Icon></span>}
            {text && <span className="nk-nav-text">{text}</span>}
        </>
    )
}

function MenuItemLink({ text,icon,sub,to,blank,onClick,onMouseEnter,className,...props }: Partial<any>) {
    const compClass = classNames({
        'nk-nav-link': true,
        'nk-nav-toggle': sub,
        [className]: className
    });
    return (
			<>
				{!blank && !sub && (
					<NavLink className={compClass} to={to}>
						<MenuItemTemplate icon={icon} text={text} />
						{props.children}
					</NavLink>
				)}
				{blank && (
					<Link
						className={compClass}
						to={to}
						target="_blank"
					>
						<MenuItemTemplate icon={icon} text={text} />
						{props.children}
					</Link>
				)}
				{sub && (
					<a
						className={compClass}
						onClick={onClick}
						onMouseEnter={onMouseEnter}
						href="#expand"
					>
						<MenuItemTemplate icon={icon} text={text} />
						{props.children}
					</a>
				)}
			</>
		);
}

function MenuItem({ sub,className, ...props }: Partial<any>) {
    const compClass = classNames({
        'nk-nav-item': true,
        'has-sub': sub,
        [className]: className
    });
    return (
        <li className={compClass}>
            {props.children}
        </li>
    )
}

function MenuSub({mega,size,megaSize,className,megaClassName, ...props }: Partial<any>) {
    const compClass = classNames({
        'nk-nav-sub': true,
        [`nk-nav-sub-${size}`]: size,
        [className]: className
    });
    const megaClass = classNames({
        'nk-nav-mega': true,
        [`nk-nav-mega-${megaSize}`]: megaSize,
        [megaClassName]: megaClassName
    });
    return (
        <>
            {!mega && <ul className={compClass}>{props.children}</ul>}
            {mega && <div className={compClass}><div className={megaClass}>{props.children}</div></div> }
        </>
    )
}

function MenuList({className, ...props }: Partial<any>) {
    const compClass = classNames({
        'nk-nav': true,
        [className]: className
    });
    return (
        <ul className={compClass}>
            {props.children}
        </ul>
    )
}

function Menu() {

    const layout = useLayout();

    // variables for Sidebar
    let menu = {
        classes: {
            main: 'nk-nav',
            item:'nk-nav-item',
            link:'nk-nav-link',
            toggle: 'nk-nav-toggle',
            sub: 'nk-nav-sub',
            subparent: 'has-sub',
            active: 'active',
            current: 'current-page'
        },
    };

    let currentLink = function(selector){
        let elm = document.querySelectorAll(selector);
        elm.forEach(function(item){
            var activeRouterLink = item.classList.contains('active');
            if (activeRouterLink) {
                let parents = getParents(item,`.${menu.classes.main}`, menu.classes.item);
                parents.forEach(parentElemets =>{
                    parentElemets.classList.add(menu.classes.active, menu.classes.current);
                    let subItem = parentElemets.querySelector(`.${menu.classes.sub}`);
                    subItem !== null && (subItem.style.display = "block")
                })
            } else {
                item.parentElement.classList.remove(menu.classes.active, menu.classes.current);
            }
        })
    } 

    // dropdown toggle
    let dropdownToggle = function(elm){
        let parent = elm.parentElement;
        let nextelm = elm.nextElementSibling;
        let speed = nextelm.children.length > 5 ? 400 + nextelm.children.length * 10 : 400;
        if(!parent.classList.contains(menu.classes.active)){
            parent.classList.add(menu.classes.active);
            slideDown(nextelm,speed);
        }else{
            parent.classList.remove(menu.classes.active);
            slideUp(nextelm,speed);
        }
    }

    // dropdown extended
    let dropdownExtended = function(elm){
        let nextelm = elm.nextElementSibling;
        let headerCollapse = layout.headerCollapse ? layout.headerCollapse : layout.breaks.lg;
        // eslint-disable-next-line
        if(window.innerWidth > eval(`layout.breaks.${headerCollapse}`)){
            let placement: Placement = getParents(elm,`.${menu.classes.main}`,menu.classes.sub).length > 0 ? 'right-start' : 'bottom-start';
            createPopper(elm, nextelm, {
                placement: placement
            });
        }
    }

    // dropdown close siblings
    let closeSiblings = function(elm){
        let parent = elm.parentElement;
        let siblings = parent.parentElement.children;
        Array.from<any>(siblings).forEach(item => {
        if(item !== parent){
            item.classList.remove(menu.classes.active);
            if(item.classList.contains(menu.classes.subparent)){
            let subitem = item.querySelectorAll(`.${menu.classes.sub}`);
            subitem.forEach(child => {
                child.parentElement.classList.remove(menu.classes.active);
                slideUp(child,400);
            })
            }
        }
        });
    }

    let menuToggle = function(e){
        e.preventDefault();
        let item = e.target.closest(`.${menu.classes.toggle}`)
        dropdownToggle(item);
        closeSiblings(item);
    }

    let menuHover = function(e){
        e.preventDefault();
        let item = e.target.closest(`.${menu.classes.toggle}`)
        dropdownExtended(item);
    }

    useEffect(() =>{
        currentLink(`.${menu.classes.link}`);
        // eslint-disable-next-line
    },[null])

  return (
    <MenuList>
        <MenuItem sub>
            <MenuItemLink text="Dashboards" onClick={menuToggle} onMouseEnter={menuHover} sub/>
            <MenuSub size="lg">
                <MenuItem>
                    <MenuItemLink className="bg-primary-soft-hover" to="/">
                        <MediaGroup className="flex-grow-1">
                            <Media border size="md" variant="primary-soft-outline">
                                <Icon name='dashboard-fill'></Icon>
                            </Media>
                            <MediaText className="flex-grow-1">
                                <span className="title">Default</span>
                                <span className="sub-text d-block">Website Analytics</span>
                            </MediaText>
                        </MediaGroup>
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink className="bg-secondary-soft-hover" to="/home-ecommerce">
                        <MediaGroup className="flex-grow-1">
                            <Media border size="md" variant="secondary-soft-outline">
                                <Icon name='cart-fill'></Icon>
                            </Media>
                            <MediaText className="flex-grow-1">
                                <span className="title">eCommerce</span>
                                <span className="sub-text d-block">Sales reports</span>
                            </MediaText>
                        </MediaGroup>
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink className="bg-success-soft-hover" to="/home-project">
                        <MediaGroup className="flex-grow-1">
                            <Media border size="md" variant="success-soft-outline">
                                <Icon name='link-group'></Icon>
                            </Media>
                            <MediaText className="flex-grow-1">
                                <span className="title">Project Manage</span>
                                <span className="sub-text d-block">Tests, graphs &amp; charts</span>
                            </MediaText>
                        </MediaGroup>
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink className="bg-info-soft-hover" to="/home-marketing">
                        <MediaGroup className="flex-grow-1">
                            <Media border size="md" variant="info-soft-outline">
                                <Icon name='growth-fill'></Icon>
                            </Media>
                            <MediaText className="flex-grow-1">
                                <span className="title">Marketing</span>
                                <span className="sub-text d-block">Campaings &amp; conversions</span>
                            </MediaText>
                        </MediaGroup>
                    </MenuItemLink>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink className="bg-danger-soft-hover" to="/home-nft">
                        <MediaGroup className="flex-grow-1">
                            <Media border size="md" variant="danger-soft-outline">
                                <Icon name='img-fill'></Icon>
                            </Media>
                            <MediaText className="flex-grow-1">
                                <span className="title">NFT</span>
                                <span className="sub-text d-block">Sell &amp; Create your own NFTs</span>
                            </MediaText>
                        </MediaGroup>
                    </MenuItemLink>
                </MenuItem>
            </MenuSub>
        </MenuItem>
        <MenuItem sub>
            <MenuItemLink text="Pages" onClick={menuToggle} onMouseEnter={menuHover} sub/>
            <MenuSub>
                <MenuItem sub>
                    <MenuItemLink text="Applications" onClick={menuToggle} onMouseEnter={menuHover} sub/>
                    <MenuSub>
                        <MenuItem>
                            <MenuItemLink text="Chat" to="/apps/chats"/>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink text="Inbox" to="/apps/inbox"/>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink text="Calendar" to="/apps/calendar"/>
                        </MenuItem>
                        <MenuItem sub>
                            <MenuItemLink text="Kanban board" onClick={menuToggle} onMouseEnter={menuHover} sub/>
                            <MenuSub>
                                <MenuItem>
                                    <MenuItemLink text="Basic" to="/apps/kanban/basic"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="Custom Board" to="/apps/kanban/custom"/>
                                </MenuItem>
                            </MenuSub>
                        </MenuItem>
                        <MenuItem sub>
                            <MenuItemLink text="User Management" onClick={menuToggle} onMouseEnter={menuHover} sub/>
                            <MenuSub>
                                <MenuItem>
                                    <MenuItemLink text="User Lists" to="/user-manage/user-list"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="User Cards" to="/user-manage/user-cards"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="User Profile" to="/user-manage/user-profile/uid01"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="User Edit" to="/user-manage/user-edit/uid01"/>
                                </MenuItem>
                            </MenuSub>
                        </MenuItem>
                        <MenuItem sub>
                            <MenuItemLink text="eCommerce" onClick={menuToggle} onMouseEnter={menuHover} sub/>
                            <MenuSub>
                                <MenuItem>
                                    <MenuItemLink text="Products" to="/ecommerce/products"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="Categories" to="/ecommerce/categories"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="Add Product" to="/ecommerce/add-product"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="Edit Product" to="/ecommerce/edit-product/uid01"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="Add Category" to="/ecommerce/add-category"/>
                                </MenuItem>
                                <MenuItem>
                                    <MenuItemLink text="Edit Category" to="/ecommerce/edit-category/uid01"/>
                                </MenuItem>
                            </MenuSub>
                        </MenuItem>
                    </MenuSub>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Data tables" to="/data-table"/>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Charts" to="/charts"/>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Sweetalert" to="/sweetalert"/>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Auth Register" to="/auths/auth-register"/>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Auth Login" to="/auths/auth-login"/>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Forgot Password" to="/auths/auth-reset"/>
                </MenuItem>
                <MenuItem>
                    <MenuItemLink text="Page 404" to="/not-found"/>
                </MenuItem>
            </MenuSub>
        </MenuItem>
        <MenuItem sub>
            <MenuItemLink text="Ui Elements" onClick={menuToggle} onMouseEnter={menuHover} sub/>
            <MenuSub mega megaSize="lg">
                <div className="nk-nav-col">
                    <h6 className="nk-nav-heading">Elements</h6>
                    <ul className="link-list link-list-md link-list-hover-bg-primary">
                        <li>
                            <Link to="/ui-elements/alert">Alerts</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/badge">Badges</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/breadcrumb">Breadcrumb</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/buttons">Buttons</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/button-group">Button group</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/cards">Cards</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/close-button">Close button</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/list-group">List group</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/pagination">Pagination</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/placeholders">Placeholders</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/progress">Progress</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/spinners">Spinners</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/accordion">Accordion</Link>
                        </li>
                    </ul>
                </div>
                <div className="nk-nav-col">
                    <h6 className="nk-nav-heading">Components</h6>
                    <ul className="link-list link-list-md link-list-hover-bg-primary">
                        <li>
                            <Link to="/ui-elements/carousel">Carousel</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/collapse">Collapse</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/dropdowns">Dropdowns</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/modal">Modal</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/tabs">Tabs</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/offcanvas">Offcanvas</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/popovers">Popovers</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/toasts">Toasts</Link>
                        </li>
                        <li>
                            <Link to="/ui-elements/tooltips">Tooltips</Link>
                        </li>
                    </ul>
                    <h6 className="nk-nav-heading">Layout</h6>
                    <ul className="link-list link-list-md link-list-hover-bg-primary">
                        <li>
                            <Link to="/layout/breakpoints">Breakpoints</Link>
                        </li>
                        <li>
                            <Link to="/layout/containers">Containers</Link>
                        </li>
                        <li>
                            <Link to="/layout/gutters">Gutters</Link>
                        </li>
                    </ul>
                </div>
                <div className="nk-nav-col">
                    <h6 className="nk-nav-heading">Utilities</h6>
                    <ul className="link-list link-list-md link-list-hover-bg-primary">
                        <li>
                            <Link to="/utilities/background">Background</Link>
                        </li>
                        <li>
                            <Link to="/utilities/borders">Borders</Link>
                        </li>
                        <li>
                            <Link to="/utilities/colors">Colors</Link>
                        </li>
                        <li>
                            <Link to="/utilities/flex">Flex</Link>
                        </li>
                        <li>
                            <Link to="/utilities/images">Images</Link>
                        </li>
                        <li>
                            <Link to="/utilities/sizing">Sizing</Link>
                        </li>
                        <li>
                            <Link to="/utilities/spacing">Spacing</Link>
                        </li>
                        <li>
                            <Link to="/utilities/typography">Typography</Link>
                        </li>
                        <li>
                            <Link to="/utilities/tables">Tables</Link>
                        </li>
                        <li>
                            <Link to="/utilities/misc">Miscellaneous</Link>
                        </li>
                    </ul>
                </div>
                {/* <div className="nk-nav-col nk-nav-media">
                    <Image src="/images/thumb/a.jpg" alt="mega menu image" className="rounded-3" />
                </div> */}
            </MenuSub>
        </MenuItem>

    </MenuList>
  )
}

export default Menu