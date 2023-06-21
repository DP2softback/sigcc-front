import { lazy, Suspense } from "react";
import { Roles } from "@routes/types/roles";
import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import {
	TRAINING_MANAGMENT_MODULE,
	LEARNING_PATH_INDEX,	
	LEARNING_PATH_ADDCOURSE,
	LEARNING_PATH_ADDCOURSECE,
	LEARNING_PATH_DETAIL,
	LEARNING_PATH_ASSIGNMENT,
	LEARNING_PATH_EVALUATION_DETAILS,
	LEARNING_PATH_EVALUATION_REVIEW,
	LEARNING_PATH_COURSE_REPORT,
	ORG_COURSE_INDEX,
	ORG_COURSE_CREATE, 
	ORG_COURSE_DETAIL,
	ORG_COURSE_ATTENDANCE,
	ORG_COURSE_ASSIGNMENT,
	EMP_LEARNING_PATH_INDEX,
	EMP_LEARNING_PATH_DETAIL,
	EMP_LEARNING_PATH_INTEGRAL_EVALUATION,
	EMP_ORG_COURSE_INDEX,
	EMP_ORG_COURSE_DETAIL
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

const M1AddCourseCE = Loader(
	lazy(() => import("@features/Modulo1/pages/Course/AddCourseCE"))
);

const M1LearningPathIntegralEvaluation = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath/IntegralEvaluation/EvaluationDetails"))
);

const M1LearningPathIntegralEvaluationReview = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath/IntegralEvaluation/EvaluationReview"))
);

const M1LearningPathIntegralCoursesReporte = Loader(
	lazy(() => import("@features/Modulo1/pages/LearningPath/CourseReport"))
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

const M1ListLearningPathEIntegralEval= Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/LearningPath/IntegralEvaluation"))
);


const M1ListTrainingE = Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/Training"))
);

const M1TrainingEDetails = Loader(
	lazy(() => import("@features/Modulo1/pages/EmployeeView/Training/Details"))
);

export const routes: RouteObject[] = [
	{
		path: TRAINING_MANAGMENT_MODULE,
		children: [
			{
				path: LEARNING_PATH_INDEX,
				children: [
					{
						path: LEARNING_PATH_EVALUATION_DETAILS,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN, 
									Roles.HR_MANAGER, 
									Roles.HEAD_OF_AREA
								]}>
								<M1LearningPathIntegralEvaluation />
							</AppLayout>
						)
					},
					{
						path: LEARNING_PATH_EVALUATION_REVIEW,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN, 
									Roles.HR_MANAGER, 
									Roles.HEAD_OF_AREA
								]}>
								<M1LearningPathIntegralEvaluationReview />
							</AppLayout>
						)
					},
					{
						path: LEARNING_PATH_COURSE_REPORT,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN, 
									Roles.HR_MANAGER, 
									Roles.HEAD_OF_AREA
								]}>
								<M1LearningPathIntegralCoursesReporte />
							</AppLayout>
						)
					},
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
				path: LEARNING_PATH_ADDCOURSECE,
				element: (
					<AppLayout
						allowedRoles={[
							Roles.HR_ADMIN, 
							Roles.HR_MANAGER, 
							Roles.HEAD_OF_AREA
						]}>
						<M1AddCourseCE />
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
				path: 	EMP_LEARNING_PATH_INDEX,
				children: [
					{
						path: EMP_LEARNING_PATH_INTEGRAL_EVALUATION,
						element: (
							<AppLayout
								allowedRoles={[
									Roles.HR_ADMIN, 
									//Roles.HR_MANAGER, 
									Roles.WORKER
								]}>
								<M1ListLearningPathEIntegralEval />
							</AppLayout>
						)
					},
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
				path: 	EMP_ORG_COURSE_INDEX,
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
				path: "*",
				element: <Navigate to={`${TRAINING_MANAGMENT_MODULE}/${LEARNING_PATH_INDEX}`} replace />
			}
		]
	}
];
