import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

const Modulo1LP = Loader(
  lazy(() => import("@features/Modulo1/pages/LearningPath"))
);

const M1ListLearningPath = Loader(
  lazy(() => import("@features/Modulo1/pages/LearningPath"))
);

const M1LearningPathDetails = Loader(
  lazy(() => import("@features/Modulo1/pages/LearningPath/Details"))
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

const M1TrainingAssignment = Loader(
  lazy(() => import("@features/Modulo1/pages/Training/Assignment"))
);

const ConfigSelectionProcess = Loader(
  lazy(() => import("@features/Modulo4/pages/ConfigSelectionProcess"))
);

const ConfigOfertaLaboral = Loader(
  lazy(() => import("@features/Modulo4/pages/ConfigOfertaLaboral"))
);

const EvaluacionContinuaIndex = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/Index"))
);

const EvaluacionContinuaHistory = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/History"))
);

const EvaluacionContinuaCreate = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/Create"))
);

const EvaluacionContinuaDetail = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionContinua/Detail"))
);

const EvaluacionDeDesempenhoIndex = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Index"))
);

const EvaluacionDeDesempenhoHistory = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/History"))
);

const EvaluacionDeDesempenhoCreate = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Create"))
);

const EvaluacionDeDesempenhoDetail = Loader(
  lazy(() => import("@features/Modulo3/screens/EvaluacionDeDesempenho/Detail"))
);

const GestionDeCompetencias = Loader(
  lazy(() => import("@features/Modulo2/Components/GestionDeCompetencias/Read"))
);

const EvaluationTemplateIndex = Loader(
  lazy(() => import("@features/Modulo3/screens/Plantillas/Index"))
);

const EvaluationTemplateCreate = Loader(
  lazy(() => import("@features/Modulo3/screens/Plantillas/Create"))
);

const EvaluationTemplateEdit = Loader(
  lazy(() => import("@features/Modulo3/screens/Plantillas/Edit"))
);

const AscensosCandidatos = Loader(
  lazy(() => import("@features/Modulo3/screens/Ascensos/Candidates"))
);

const ReporteEvaluacionContinua = Loader(
  lazy(
    () => import("@features/Modulo3/screens/Reportes/IndexEvaluacionContinua")
  )
);

const ReporteEvaluacionDesempenho = Loader(
  lazy(
    () => import("@features/Modulo3/screens/Reportes/IndexEvaluacionDesempenho")
  )
);

const VisualizacionBrechasEmpleado = Loader(
  lazy(
    () =>
      import("@features/Modulo2/Components/VisualizacionBrechasEmpleado/Read")
  )
);

/** HERE YOU DEFINE ALL THE ROUTES OF THE APP */

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Modulo1LP />,
  },
  {
    path: "modulo1",
    children: [
      {
        path: "",
        element: <Modulo1LP />,
      },
      {
        path: "rutadeaprendizaje",
        children: [
          {
            path: "",
            element: <M1ListLearningPath />,
          },
          {
            path: "detalle/:learningPathId",
            element: <M1LearningPathDetails />,
          },
        ],
      },
      {
        path: "curso",
        children: [
          {
            path: "agregar/:learningPathId",
            element: <M1AddCourse />,
          },
        ],
      },
      {
        path: "cursoempresa",
        children: [
          {
            path: "",
            element: <M1ListTraining />,
          },
          {
            path: "creacion/:trainingID",
            element: <M1TrainingCreate />,
          },
          {
            path: "detalle/:trainingID",
            element: <M1TrainingDetails />,
          },
          {
            path: "asignacion/:trainingID",
            element: <M1TrainingAssignment />,
          },
        ],
      },
    ],
  },
  {
    path: "skillManagement",
    children: [
      {
        path: "continuousEvaluation",
        children: [
          {
            path: "index",
            element: <EvaluacionContinuaIndex />,
          },
          {
            path: "history",
            element: <EvaluacionContinuaHistory />,
          },
          {
            path: "detail",
            element: <EvaluacionContinuaDetail />,
          },
          {
            path: "create",
            element: <EvaluacionContinuaCreate />,
          },
        ],
      },
      {
        path: "performanceEvaluation",
        children: [
          {
            path: "index",
            element: <EvaluacionDeDesempenhoIndex />,
          },
          {
            path: "history",
            element: <EvaluacionDeDesempenhoHistory />,
          },
          {
            path: "detail",
            element: <EvaluacionDeDesempenhoDetail />,
          },
          {
            path: "create",
            element: <EvaluacionDeDesempenhoCreate />,
          },
        ],
      },
      {
        path: "evaluationTemplate",
        children: [
          {
            path: "index",
            element: <EvaluationTemplateIndex />,
          },
          {
            path: "create",
            element: <EvaluationTemplateCreate />,
          },
          {
            path: "edit",
            element: <EvaluationTemplateEdit />,
          },
        ],
      },
      {
        path: "promotions",
        children: [
          {
            path: "candidates",
            element: <AscensosCandidatos promotionPosition="UX/UI Designer" />,
          },
        ],
      },
      {
        path: "report",
        children: [
          {
            path: "continuousEvaluation",
            element: <ReporteEvaluacionContinua />,
          },
          {
            path: "performanceEvaluation",
            element: <ReporteEvaluacionDesempenho />,
          }
        ],
      },
      {
        path: "employeesGaps",
        children: [
          {
            path: "index",
            element: <VisualizacionBrechasEmpleado />,
          },
        ],
      },
      {
        path: "showskills",
        children: [
          {
            path: "index",
            element: <GestionDeCompetencias />,
          },
        ],
      },
    ],
  },
];

export default routes;
