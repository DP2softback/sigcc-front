import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { People, Person, Table } from "react-bootstrap-icons";
import {
	CREATE_SELECTION_PROCESS,
	LIST_SELECTION_PROCESSES,
	CREATE_JOB_OFFER,
	LIST_JOB_OFFERS,
  JOB_OFFERS_CANDIDATE_PORTAL
} from "./path";

export const sideBarItemsGroup4: TSidebarItemGroup[] = [
	{
		groupName: "Posiciones y Ofertas Laborales",
		roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HR_WORKER],
		children: [
			{
				name: "Procesos de Selección",
				icon: People,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER],
				hasChildren: true,
				children: [
					{
						name: "Ver Procesos",
						icon: Table,
						roles: [Roles.HR_ADMIN, Roles.HR_MANAGER],
						hasChildren: false,
						route: LIST_SELECTION_PROCESSES
					},
					{
						name: "Nuevo Proceso",
						icon: Person,
						roles: [Roles.HR_ADMIN],
						hasChildren: false,
						route: CREATE_SELECTION_PROCESS
					}
				]
			},
			{
				name: "Ofertas Laborales",
				icon: People,
				roles: [Roles.HR_ADMIN, Roles.HR_WORKER],
				hasChildren: true,
				children: [
					{
						name: "Portal de Ofertas",
						icon: Table,
						roles: [Roles.HR_ADMIN],
						hasChildren: false,
						route: LIST_JOB_OFFERS
					},
					{
						name: "Nueva Oferta",
						icon: Person,
						roles: [Roles.HR_ADMIN, Roles.HR_WORKER],
						hasChildren: false,
						route: CREATE_JOB_OFFER
					}
				]
			},
      {
				name: "Portal de Ofertas Laborales",
				icon: People,
				roles: [Roles.CANDIDATE],
				hasChildren: false,
        route: JOB_OFFERS_CANDIDATE_PORTAL
      }
		]
	}
];
