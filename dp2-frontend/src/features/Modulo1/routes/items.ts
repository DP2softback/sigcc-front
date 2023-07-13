import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { ArrowRepeat, JournalCheck, FileEarmarkText, GraphUp, House } from "react-bootstrap-icons";
import {
	TRAINING_MANAGMENT_MODULE,
	LEARNING_PATH_INDEX,
	ORG_COURSE_INDEX,
	EMP_LEARNING_PATH_INDEX,
	EMP_ORG_COURSE_INDEX
} from "./path";

export const sideBarItemsGroup1: TSidebarItemGroup[] = [
	{
		groupName: "Gestión de capacitaciones",
		roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA, Roles.WORKER],
		children: [
			{
				name: "Dashboard",
				icon: House,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA],
				hasChildren: false,
                route: `/modulo1/test`
			},
			{
				name: "Ruta de Aprendizaje",
				icon: ArrowRepeat,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA],
				hasChildren: false,
                route: `/${TRAINING_MANAGMENT_MODULE}/${LEARNING_PATH_INDEX}`
			},
			{
				name: "Curso Empresa",
				icon: JournalCheck,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA],
				hasChildren: false,
                route: `/${TRAINING_MANAGMENT_MODULE}/${ORG_COURSE_INDEX}`
			},
            {
				name: "Ruta de Aprendizaje E",
				icon: ArrowRepeat,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.WORKER],
				hasChildren: false,
                route: `/${TRAINING_MANAGMENT_MODULE}/${EMP_LEARNING_PATH_INDEX}`
			},
			{
				name: "Curso Empresa E",
				icon: JournalCheck,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.WORKER],
				hasChildren: false,
                route: `/${TRAINING_MANAGMENT_MODULE}/${EMP_ORG_COURSE_INDEX}`
			},     
		]
	}
];
