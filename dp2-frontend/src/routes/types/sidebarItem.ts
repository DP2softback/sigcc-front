import { Icon } from "react-bootstrap-icons";
import { Roles } from "./roles";

export type TSidebarItem = {
	name: string;
	icon: Icon;
  roles: Roles[] // IF YOU DO NOT PROVIDE ANY ROLE, IT WILL NOT BE VISIBLE FOR ANYONE
	hasChildren: boolean;
  route?: string; // DO NOT SPECIFY IF ITEM IS NOT LAST CHILD
	children?: TSidebarItem[];
};

export type TSidebarItemGroup = {
	groupName: string;
  roles: Roles[]; // YOU MUST INCLUDE ALL ROLES PRESENT IN CHILDREN ITEMS
	children: TSidebarItem[];
};
