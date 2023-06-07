import { sideBarItemsGroup3 } from "@features/Modulo3/routes/items";
import { TSidebarItemGroup } from "./types/sidebarItem";
import { sideBarItemsGroup4 } from "@features/Modulo4/routes/items";
// HERE I WILL CONCAT ALL SIDEBAR ITEMS FROM ALL GROUPS
export const sidebarItems: TSidebarItemGroup[] = sideBarItemsGroup3.concat(sideBarItemsGroup4);