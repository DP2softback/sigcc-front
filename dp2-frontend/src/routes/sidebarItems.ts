import { sideBarItemsGroup3 } from "@features/Modulo3/routes/items";
import { TSidebarItemGroup } from "./types/sidebarItem";
import { sideBarItemsGroup4 } from "@features/Modulo4/routes/items";
import { sideBarItemsGroup2 } from "@features/Modulo2/routes/items";
import { sideBarItemsGroup1 } from "@features/Modulo1/routes/items";
// HERE I WILL CONCAT ALL SIDEBAR ITEMS FROM ALL GROUPS
export const sidebarItems: TSidebarItemGroup[] = sideBarItemsGroup1.concat(sideBarItemsGroup3).concat(sideBarItemsGroup4).concat(sideBarItemsGroup2);
