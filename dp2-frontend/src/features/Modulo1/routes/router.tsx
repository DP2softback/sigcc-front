import { lazy, Suspense } from "react";
import { Roles } from "@routes/types/roles";
import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import
	{
		TRAINING_MANAGMENT_MODULE,
		LEARNING_PATH_INDEX,
		LEARNING_PATH_ADDCOURSE,
		LEARNING_PATH_DETAIL,
		LEARNING_PATH_ASSIGNMENT,
		ORG_COURSE_INDEX,
		ORG_COURSE_CREATE,
		ORG_COURSE_DETAIL,
		ORG_COURSE_ATTENDANCE,
		ORG_COURSE_ASSIGNMENT,
		EMP_LEARNING_PATH_INDEX,
		EMP_LEARNING_PATH_DETAIL,
		EMP_ORG_COURSE_INDEX,
		EMP_ORG_COURSE_DETAIL,
	} from "./path";

const Loader = (Component) => (props) =>
(
	<Suspense fallback={<></>}>
		<Component {...props} />
	</Suspense>
);

const M1ListLearningPath = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath"))
);

const M1LearningPathDetails = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath/Details"))
);

const M1LearningPathAssignment = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath/Assignment"))
);

const M1AddCourse = Loader(
	lazy(() => import("@features/Modulo1/pages/Course/AddCourse"))
);

const M1ListTraining = Loader(
	lazy(() => import("@features/Modulo1/pages/Training"))
);

const M1TrainingCreate = Loader(
	lazy(() => import("@features/Modulo1/pages/Training/Create"))
);

const M1TrainingDetails = Loader(
	lazy(() => import("@features/Modulo1/pages/Training/Details"))
);

const M1TrainingAttendance = Loader(
	lazy(() => import("@features/Modulo1/pages/Training/Attendance"))
);

const M1TrainingAssignment = Loader(
	lazy(() => import("@features/Modulo1/pages/Training/Assignment"))
);

const M1ListLearningPathE = Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/LearningPath"))
);

const M1ListLearningPathEDetails = Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/LearningPath/Details"))
);

const M1ListTrainingE = Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/Training"))
);

const M1TrainingEDetails = Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/Training/Details"))
);

const GSettings = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath/ComprehensiveEvaluation"))
);

const AngelSamples = Loader(
	lazy(() => import("@features/Modulo1/pages/AngelSamples"))
);

export const routes: RouteObject[] = [
	{
		path: TRAINING_MANAGMENT_MODULE,
		children: [
			{
				path: LEARNING_PATH_INDEX,
				children: [
					{
						path: LEARNING_PATH_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1LearningPathDetails />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1ListLearningPath />
							</AppLayout>
						)
					},
					{
						path: '',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1ListLearningPath />
							</AppLayout>
						)
					},
					{
						path: LEARNING_PATH_ASSIGNMENT,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1LearningPathAssignment />
							</AppLayout>
						)
					}
				]
			},
			{
				path: LEARNING_PATH_ADDCOURSE,
				element: (
					<AppLayout
						allowedRoles={[
							Roles.HR_ADMIN,
							Roles.HR_MANAGER,
							Roles.HEAD_OF_AREA
						]}>
						<M1AddCourse />
					</AppLayout>
				)
			},
			{
				path: ORG_COURSE_INDEX,
				children: [
					{
						path: ORG_COURSE_CREATE,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1TrainingCreate />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1ListTraining />
							</AppLayout>
						)
					},
					{
						path: '',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1ListTraining />
							</AppLayout>
						)
					},
					{
						path: ORG_COURSE_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1TrainingDetails />
							</AppLayout>
						)
					},
					{
						path: ORG_COURSE_ATTENDANCE,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1TrainingAttendance />
							</AppLayout>
						)
					},
					{
						path: ORG_COURSE_ASSIGNMENT,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.HEAD_OF_AREA
								]}>
								<M1TrainingAssignment />
							</AppLayout>
						)
					}
				]
			},
			{
				path: EMP_LEARNING_PATH_INDEX,
				children: [
					{
						path: EMP_LEARNING_PATH_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.WORKER
								]}>
								<M1ListLearningPathEDetails />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.WORKER
								]}>
								<M1ListLearningPathE />
							</AppLayout>
						)
					},
					{
						path: '',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.WORKER
								]}>
								<M1ListLearningPathE />
							</AppLayout>
						)
					}
				]
			},
			{
				path: EMP_ORG_COURSE_INDEX,
				children: [
					{
						path: EMP_ORG_COURSE_DETAIL,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.WORKER
								]}>
								<M1TrainingEDetails />
							</AppLayout>
						)
					},
					{
						path: '*',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.WORKER
								]}>
								<M1ListTrainingE />
							</AppLayout>
						)
					},
					{
						path: '',
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN,
									Roles.HR_MANAGER,
									Roles.WORKER
								]}>
								<M1ListTrainingE />
							</AppLayout>
						)
					}
				]
			},
			{
				path: 'test',
				element:  (
					<AppLayout
						allowedRoles={[
							Roles.HR_ADMIN,
							Roles.HR_MANAGER,
							Roles.HEAD_OF_AREA
						]}>
						<AngelSamples />
					</AppLayout>
				)
			},
			{
				path: "*",
				element: <Navigate to={`${TRAINING_MANAGMENT_MODULE}/${LEARNING_PATH_INDEX}`} replace />
			}
		]
	}
];
