import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { People, Person, Table } from "react-bootstrap-icons";
import {
	SELECTION_PROCESS_AND_JOB_OFFERS_MODULE,
	JOB_OFFERS,
	CREATE_JOB_OFFER,
	LIST_JOB_OFFERS,
	SELECTION_PROCESS,
	CREATE_SELECTION_PROCESS,
	LIST_SELECTION_PROCESS
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
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${SELECTION_PROCESS}/${LIST_SELECTION_PROCESS}`
					},
					{
						name: "Nuevo Proceso",
						icon: Person,
						roles: [Roles.HR_ADMIN],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${SELECTION_PROCESS}/${CREATE_SELECTION_PROCESS}`
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
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_OFFERS}/${LIST_JOB_OFFERS}`
					},
					{
						name: "Nueva Oferta",
						icon: Person,
						roles: [Roles.HR_ADMIN, Roles.HR_WORKER],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_OFFERS}/${CREATE_JOB_OFFER}`
					}
				]
			},
      // {
			// 	name: "Portal de Ofertas Laborales",
			// 	icon: People,
			// 	roles: [Roles.CANDIDATE],
			// 	hasChildren: false,
      //   route: `${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_OFFERS}/${LIST_JOB_OFFERS}`
      // }
		]
	}
];
