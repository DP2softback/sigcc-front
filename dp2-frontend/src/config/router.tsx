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

const M1LearningPathAssignment = Loader(
  lazy(() => import("@features/Modulo1/pages/LearningPath/Assignment"))
);

const M1AddCourse = Loader(
  lazy(() => import("@features/Modulo1/pages/Course/AddCourse"))
);

const M1Rubric = Loader(
  lazy(() => import("@features/Modulo1/components/Rubric/RubricGrade"))
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

const ConfigSelectionProcess = Loader(
  lazy(() => import("@features/Modulo4/pages/ConfigSelectionProcess"))
);

const ConfigOfertaLaboral = Loader(
  lazy(() => import("@features/Modulo4/pages/ConfigOfertaLaboral"))
);

const ConfigProcesoSeleccion = Loader(
  lazy(() => import("@features/Modulo4/pages/ConfigProcesoSeleccion"))
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

const JobOpportunitiesRelatedToSkills = Loader(
  lazy(
    () =>
      import(
        "@features/Modulo2/Components/JobOpportunitiesRelatedToSkills/index"
      )
  )
);

const JobOpportunitiesHumanResources = Loader(
  lazy(
    () =>
      import(
        "@features/Modulo2/Components/JobOpportunitiesHumanResources/index"
      )
  )
);

const JobOpportunitiesHRCandidates = Loader(
  lazy(
    () =>
      import(
        "@features/Modulo2/Components/JobOpportunitiesHumanResources/JobOpportunityCandidates"
      )
  )
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

const VisualizacionOfertasLaborales = Loader(
    lazy(
        () =>
            import("@features/Modulo4/pages/JobOffer/JobOffer")
    )
);

const DetalleOfertaLaboral = Loader(
    lazy(
        () =>
            import("@features/Modulo4/pages/JobOffer/Details/JobOfferDetails")
    )
);

const ConfigPosition = Loader(
  lazy(
    () =>
      import("@features/Modulo4/pages/JobPositions/ConfigPosition")
  )
);

const CreateJobOffer = Loader(
  lazy(
    () =>
      import("@features/Modulo4/pages/JobPositions/CreateJobOffer")
  )
);

const JobOpportunitiesSelected = Loader(
  lazy(() => import("@features/Modulo2/Components/JobOpportunitiesRelatedToSkills/JobOpportunitySelected"))
);

const EstadisticasCompetencias = Loader(
  lazy(
    () =>
      import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/ConsolidadoCompetencias")
  )
);

const DetalleCompetenciasArea = Loader(
  lazy(
    () =>
      import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/DetalleCompetenciasArea")
  )
);

const CompetenciasRead = Loader(
  lazy(
    () =>
      import("@features/Modulo2/Components/GestionDeCompetencias/Read")
  )
);

const GestionCompetencia = Loader(
  lazy(
    () =>
      import("@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/GestionCompetencias")
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
          {
            path: "asignacion/:learningPathId",
            element: <M1LearningPathAssignment />,
          },
          {
            path: "rubrica",
            element: <M1Rubric />,
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
            children: [
              {
                path: "",
                element: <M1TrainingDetails />,
              },
              {
                path: "asistencia/:sessionID",
                element: <M1TrainingAttendance />,
              },
            ],
          },
          {
            path: "asignacion/:trainingID",
            element: <M1TrainingAssignment />,
          },
        ],
      },
      {
        path: "empleado",
        children: [
          {
            path: "",
            element: <M1ListLearningPathE />,
          },
          {
            path: "rutadeaprendizaje",
            children: [
              {
                path: "",
                element: <M1ListLearningPathE />,
              },
              {
                path: "detalle/:learningPathId",
                element: <M1ListLearningPathEDetails />,
              },
            ],
          },

          {
            path: "cursoempresa",
            children: [
              {
                path: "",
                element: <M1ListTrainingE />,
              },
              {
                path: "sessions/:trainingID",
                element: <M1TrainingEDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "modulo4",
    children: [
      {
        path: "joboffer",
        element: <VisualizacionOfertasLaborales />,
      },
      {
        path: "joboffer/detail/:jobOfferId",
        element: <DetalleOfertaLaboral />,
      },
      {
        path: "configurar-oferta-laboral",
        element: <ConfigOfertaLaboral />,
      },
      {
        path: "configurar-proceso-seleccion",
        element: <ConfigProcesoSeleccion />,
      }
    ],
  },
  {
    path: "skill-management",
    children: [
      {
        path: "continuous-evaluation",
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
        path: "performance-evaluation",
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
        path: "evaluation-template",
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
        path: "report",
        children: [
          {
            path: "continuous-evaluation",
            element: <ReporteEvaluacionContinua />,
          },
          {
            path: "performance-evaluation",
            element: <ReporteEvaluacionDesempenho />,
          },
        ],
      },
      {
        path: "selection-process",
        children: [
          {
            path: "create",
            element: <ConfigSelectionProcess />,
          },
          {
            path: "portal-create-job",
            element: <ConfigOfertaLaboral />
          },
          {
            path: "test",
            element: <CreateJobOffer />
          },
          {
            path: "test2",
            element: <ConfigPosition />
          }
        ],
      },
    ],
  },
  {
    path: "modulo2-skill-management",
    children: [
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
        path: "jobOpportunitiesRelatedToSkills",
        children: [
          {
            path: "index",
            element: <JobOpportunitiesRelatedToSkills />,
          },
          {
            path: "selectedJob",
            element: <JobOpportunitiesSelected/>,
          },
        ],
      },
      {
        path: "JobOpportunitiesHumanResources",
        children: [
          {
            path: "index",
            element: <JobOpportunitiesHumanResources />,
          },
          {
            path: "selectedJob",
            element: <JobOpportunitiesHRCandidates/>,
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
      }
    ],
  },
  {
    path: "modulo4",
    children: [
      {
        path: "showAreaStatistics",
        children: [
          {
            path: "index",
            element: <EstadisticasCompetencias></EstadisticasCompetencias>,
          },

          {
            path: "showStatsPerArea",
            element: <DetalleCompetenciasArea></DetalleCompetenciasArea>,
          },

          {
            path: "showEmployeeCompetencies",
            element: <CompetenciasRead></CompetenciasRead>,
          },

          {
            path: "showEmployeeNecessities",
            element: <GestionCompetencia></GestionCompetencia>,
          },
        ],
      },
    ]
  },
  
];

export default routes;
