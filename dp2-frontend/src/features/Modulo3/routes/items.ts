import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { ArrowRepeat, JournalCheck, FileEarmarkText, GraphUp, ListUl } from "react-bootstrap-icons";
import {
	CONTINUOS_EVALUATION_INDEX,
	PERFORMANCE_EVALUATION_INDEX,
	EVALUATION_TEMPLATE_INDEX,
	REPORT_CONTINUOS_EVALUATION_INDEX,
  REPORT_PERFORMANCE_EVALUATION_INDEX,
	CATEGORIES_INDEX
} from "./path";

export const sideBarItemsGroup3: TSidebarItemGroup[] = [
	{
		groupName: "Gestión de competencias",
		roles: [Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
		children: [
			{
				name: "Evaluación continua",
				icon: ArrowRepeat,
				roles: [Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
				hasChildren: false,
        route: CONTINUOS_EVALUATION_INDEX
			},
			{
				name: "Evaluación de desempeño",
				icon: JournalCheck,
				roles: [Roles.HEAD_OF_AREA, Roles.WORKER, Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
				hasChildren: false,
        route: PERFORMANCE_EVALUATION_INDEX
			},
      {
				name: "Plantillas",
				icon: FileEarmarkText,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
				hasChildren: false,
        route: EVALUATION_TEMPLATE_INDEX
      },
      {
				name: "Categorías",
				icon: ListUl,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
				hasChildren: false,
        route: CATEGORIES_INDEX
      },
      {
        name: "Reportes",
				icon: GraphUp,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
				hasChildren: true,
				children: [
					{
						name: "Evaluación continua",
						icon: ArrowRepeat,
						roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
						hasChildren: false,
						route: REPORT_CONTINUOS_EVALUATION_INDEX
					},
					{
						name: "Evaluación de desempeño",
						icon: JournalCheck,
						roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.GENERAL_MANAGER],
						hasChildren: false,
						route: REPORT_PERFORMANCE_EVALUATION_INDEX
					}
				]
      }
		]
	}
];
