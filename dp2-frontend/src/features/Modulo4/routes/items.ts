import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { People, Person, Table } from "react-bootstrap-icons";
import {
	SELECTION_PROCESS_AND_JOB_OFFERS_MODULE,
	JOB_OFFERS,
	JOB_POSITIONS,
	CREATE_JOB_OFFER,
	LIST_JOB_OFFERS,
	LIST_JOB_POSITION,
	CREATE_JOB_POSITION,
	SELECTION_INDICADORES,
	SELECTION_PROCESS,
	CREATE_SELECTION_PROCESS,
	LIST_SELECTION_PROCESS,
	REGISTER_IN_JOB_OFFER,
	LIST_SELECTION_PROCESS_STEP
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
						name: "Ver Indicadores",
						icon: Table,
						roles: [Roles.HR_ADMIN, Roles.HR_MANAGER],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${SELECTION_PROCESS}/${SELECTION_INDICADORES}`
					},
					{
						name: "Ver Procesos",
						icon: Table,
						roles: [Roles.HR_ADMIN, Roles.HR_MANAGER],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${SELECTION_PROCESS}/${LIST_SELECTION_PROCESS}`
					},
					{
						name: "Ver etapa",
						icon: Table,
						roles: [Roles.HR_ADMIN, Roles.HR_MANAGER],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${SELECTION_PROCESS}/${LIST_SELECTION_PROCESS_STEP}`
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
						name: "Registrarme en oferta",
						icon: Person,
						roles: [Roles.HR_ADMIN],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_OFFERS}/${REGISTER_IN_JOB_OFFER}`
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
			{
				name: "Puestos de Trabajo",
				icon: People,
				roles: [Roles.HR_ADMIN, Roles.HR_WORKER],
				hasChildren: true,
				children: [
					{
						name: "Ver Posiciones",
						icon: Table,
						roles: [Roles.HR_ADMIN],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_POSITIONS}/${LIST_JOB_POSITION}`
					},
					{
						name: "Nueva Posición",
						icon: Person,
						roles: [Roles.HR_ADMIN, Roles.HR_WORKER],
						hasChildren: false,
						route: `/${SELECTION_PROCESS_AND_JOB_OFFERS_MODULE}/${JOB_POSITIONS}/${CREATE_JOB_POSITION}`
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
