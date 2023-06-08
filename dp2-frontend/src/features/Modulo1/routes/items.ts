import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { ArrowRepeat, JournalCheck, FileEarmarkText, GraphUp } from "react-bootstrap-icons";
import {
	LEARNING_PATH_INDEX,
	ORG_COURSE_INDEX,
	EMP_LEARNING_PATH_INDEX,
	EMP_ORG_COURSE_INDEX
} from "./path";

export const sideBarItemsGroup1: TSidebarItemGroup[] = [
	{
		groupName: "Gestión de capacidades",
		roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA, Roles.WORKER],
		children: [
			{
				name: "Ruta de Aprendizaje",
				icon: ArrowRepeat,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA],
				hasChildren: false,
                route: LEARNING_PATH_INDEX
			},
			{
				name: "Curso Empresa",
				icon: JournalCheck,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HEAD_OF_AREA],
				hasChildren: false,
                route: ORG_COURSE_INDEX
			},
            {
				name: "Ruta de Aprendizaje",
				icon: ArrowRepeat,
				roles: [Roles.WORKER],
				hasChildren: false,
                route: EMP_LEARNING_PATH_INDEX
			},
			{
				name: "Curso Empresa",
				icon: JournalCheck,
				roles: [Roles.WORKER],
				hasChildren: false,
                route: EMP_ORG_COURSE_INDEX
			},     
		]
	}
];
