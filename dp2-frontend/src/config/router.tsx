import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);


const Modulo1LP = Loader(
  lazy(() => import('@features/Modulo1/pages/LearningPath'))
);

const M1ListLearningPath = Loader(
  lazy(() => import('@features/Modulo1/pages/LearningPath'))
);

const M1LearningPathDetails = Loader(
  lazy(() => import('@features/Modulo1/pages/LearningPath/Details'))
);

const M1AddCourse = Loader(
  lazy(() => import('@features/Modulo1/pages/Course/AddCourse'))
);

const M1ListTraining = Loader(
  lazy(() => import('@features/Modulo1/pages/Training'))
);

const M1TrainingDetails = Loader(
  lazy(() => import('@features/Modulo1/pages/Training/Details'))
);

const M1TrainingAssignment = Loader(
  lazy(() => import('@features/Modulo1/pages/Training/Assignment'))
);

const EvaluacionContinuaIndex = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/Index'))
);

const EvaluacionContinuaHistory = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/History'))
);

const EvaluacionContinuaCreate = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/Create'))
);

const EvaluacionContinuaDetail = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/Detail'))
);

const EvaluacionDeDesempenhoIndex = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionDeDesempenho/Index'))
);

const EvaluacionDeDesempenhoHistory = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionDeDesempenho/History'))
);

const EvaluacionDeDesempenhoCreate = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionDeDesempenho/Create'))
);

const EvaluacionDeDesempenhoDetail = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionDeDesempenho/Detail'))
);

const VisualizacionBrechasEmpleado = Loader(
  lazy(() => import('@features/Modulo2/Components/VisualizacionBrechasEmpleado/Read'))
);

const EvaluationTemplateIndex = Loader(
  lazy(() => import('@features/Modulo3/screens/Plantillas/Index'))
);

const EvaluationTemplateCreate = Loader(
  lazy(() => import('@features/Modulo3/screens/Plantillas/Create'))
);

const EvaluationTemplateEdit = Loader(
  lazy(() => import('@features/Modulo3/screens/Plantillas/Edit'))
);

const AscensosCandidatos = Loader(
  lazy(() => import('@features/Modulo3/screens/Ascensos/Candidates'))
);

/** HERE YOU DEFINE ALL THE ROUTES OF THE APP */

const routes: RouteObject[] = [
  {
    path: 'modulo1',
    children: [
      {
        path: '',
        element: <Modulo1LP />
      },
      {
        path: 'rutadeaprendizaje',
        children: [
          {
            path: '',
            element: <M1ListLearningPath />
          },
          {
            path: 'detalle/:learningPathId',
            element: <M1LearningPathDetails />
          },
        ]
      },
      {
        path: 'curso',
        children: [
          {
            path: 'agregar/:learningPathId',
            element: <M1AddCourse />
          },
        ]
      },
      {
        path: 'capacitacion',
        children: [
          {
            path: '',
            element: <M1ListTraining />
          },
          {
            path: 'detalle/:trainingID',
            element: <M1TrainingDetails />
          },
          {
            path: 'asignacion/:trainingID',
            element: <M1TrainingAssignment />
          },
        ]
      },
    ]
  },
  {
    path: 'skillManagement',
    children: [
      {
        path: 'continuousEvaluation',
        children: [
          {
            path: 'index',
            element: <EvaluacionContinuaIndex/>
          },
          {
            path: 'history',
            element: <EvaluacionContinuaHistory/>
          },
          {
            path: 'detail',
            element: (
              <EvaluacionContinuaDetail
                employee={{
                  id: 1,
                  FullName: 'Angela Quispe Ramirez',
                }}
                categories={[
                  { id: 1, name: 'Rendimiento', subcategories: [
                    'Consecución de objetivos',
                    'Calidad del trabajo',
                    'Atención al detalle',
                    'Puntualidad de las entregas',
                    'Gestionar la carga de trabajo y cumplir los plazos'
                  ] },
                  { id: 2, name: 'Habilidades blandas', subcategories: [
                    'Liderazgo',
                    'Comunicación',
                    'Resolución de problemas',
                    'Pensamiento crítico',
                    'Trabajo en equipo'
                  ] },
                  { id: 3, name: 'Conocimientos técnicos', subcategories: [
                    'Capacidad analítica',
                    'Aprendizaje continuo y desarrollo profesional',
                    'Conocimientos técnicos',
                    'Conocimiento del producto',
                    'Resolución de problemas técnicos'
                  ] },
                  { id: 4, name: 'Orientación al cliente', subcategories: [
                    'Respuesta a las consultas y peticiones',
                    'Comprender las necesidades y preferencias',
                    'Resolución eficaz de los problemas',
                    'Mejora continua de los productos o servicios',
                    'Creación y mantenimiento de relaciones positivas',
                  ] },
                  { id: 5, name: 'Creatividad e iniciativa', subcategories: [
                    'Asunción de riesgos',
                    'Mentalidad abierta',
                    'Colaboración',
                    'Feedback',
                    'Nuevas ideas',
                  ] },
                ]}
                projects={[
                  { id: 1, name: 'BLF-KC-0012' },
                  { id: 2, name: 'BLF-KC-0013' },
                  { id: 3, name: 'BLF-KC-0014' },
                  { id: 4, name: 'BLF-KC-0015' },
                  { id: 5, name: 'BLF-KC-0016' },
                ]}
                form={{
                  evaluationCategory: 1,
                  projectId: 2,
                  evaluation: [0,1,2,3,4],
                  additionalComments: 'Todo bien la verdad, sigue así.'
                }}
              />
            ),
          },
          {
            path: 'create',
            element: (
              <EvaluacionContinuaCreate
                employee={{
                  id: 1,
                  FullName: 'Angela Quispe Ramirez',
                }}
                categories={[
                  { id: 1, name: 'Rendimiento', subcategories: [
                    'Consecución de objetivos',
                    'Calidad del trabajo',
                    'Atención al detalle',
                    'Puntualidad de las entregas',
                    'Gestionar la carga de trabajo y cumplir los plazos'
                  ] },
                  { id: 2, name: 'Habilidades blandas', subcategories: [
                    'Liderazgo',
                    'Comunicación',
                    'Resolución de problemas',
                    'Pensamiento crítico',
                    'Trabajo en equipo'
                  ] },
                  { id: 3, name: 'Conocimientos técnicos', subcategories: [
                    'Capacidad analítica',
                    'Aprendizaje continuo y desarrollo profesional',
                    'Conocimientos técnicos',
                    'Conocimiento del producto',
                    'Resolución de problemas técnicos'
                  ] },
                  { id: 4, name: 'Orientación al cliente', subcategories: [
                    'Respuesta a las consultas y peticiones',
                    'Comprender las necesidades y preferencias',
                    'Resolución eficaz de los problemas',
                    'Mejora continua de los productos o servicios',
                    'Creación y mantenimiento de relaciones positivas',
                  ] },
                  { id: 5, name: 'Creatividad e iniciativa', subcategories: [
                    'Asunción de riesgos',
                    'Mentalidad abierta',
                    'Colaboración',
                    'Feedback',
                    'Nuevas ideas',
                  ] },
                ]}
                projects={[
                  { id: 1, name: 'BLF-KC-0012' },
                  { id: 2, name: 'BLF-KC-0013' },
                  { id: 3, name: 'BLF-KC-0014' },
                  { id: 4, name: 'BLF-KC-0015' },
                  { id: 5, name: 'BLF-KC-0016' },
                ]}
              />
            ),
          },
        ],
      },
      {
        path: 'employeesGaps',
        children: [
          {
            path: 'index',
            element: <VisualizacionBrechasEmpleado/>
          }
        ]
      },
      {
        path: 'performanceEvaluation',
        children: [
          {
            path: 'index',
            element: <EvaluacionDeDesempenhoIndex/>
          },
          {
            path: 'history',
            element: <EvaluacionDeDesempenhoHistory/>
          },
          {
            path: 'detail',
            element: (
              <EvaluacionDeDesempenhoDetail
                employee={{
                  id: 1,
                  FullName: 'Angela Quispe Ramirez',
                }}
                categories={[
                  { id: 1, name: 'Rendimiento', subcategories: [
                    'Consecución de objetivos',
                    'Calidad del trabajo',
                    'Atención al detalle',
                    'Puntualidad de las entregas',
                    'Gestionar la carga de trabajo y cumplir los plazos'
                  ] },
                  { id: 2, name: 'Habilidades blandas', subcategories: [
                    'Liderazgo',
                    'Comunicación',
                    'Resolución de problemas',
                    'Pensamiento crítico',
                    'Trabajo en equipo'
                  ] },
                  { id: 3, name: 'Conocimientos técnicos', subcategories: [
                    'Capacidad analítica',
                    'Aprendizaje continuo y desarrollo profesional',
                    'Conocimientos técnicos',
                    'Conocimiento del producto',
                    'Resolución de problemas técnicos'
                  ] },
                  { id: 4, name: 'Orientación al cliente', subcategories: [
                    'Respuesta a las consultas y peticiones',
                    'Comprender las necesidades y preferencias',
                    'Resolución eficaz de los problemas',
                    'Mejora continua de los productos o servicios',
                    'Creación y mantenimiento de relaciones positivas',
                  ] },
                  { id: 5, name: 'Creatividad e iniciativa', subcategories: [
                    'Asunción de riesgos',
                    'Mentalidad abierta',
                    'Colaboración',
                    'Feedback',
                    'Nuevas ideas',
                  ] },
                ]}
                projects={[
                  { id: 1, name: 'BLF-KC-0012' },
                  { id: 2, name: 'BLF-KC-0013' },
                  { id: 3, name: 'BLF-KC-0014' },
                  { id: 4, name: 'BLF-KC-0015' },
                  { id: 5, name: 'BLF-KC-0016' },
                ]}
                form={{
                  evaluationCategory: 1,
                  projectId: 2,
                  evaluation: [0,1,2,3,4],
                  additionalComments: 'Todo bien la verdad, sigue así.'
                }}
              />
            ),
          },
          {
            path: 'create',
            element: (
              <EvaluacionDeDesempenhoCreate
                employee={{
                  id: 1,
                  FullName: 'Angela Quispe Ramirez',
                }}
                categories={[
                  { id: 1, name: 'Rendimiento', subcategories: [
                    'Consecución de objetivos',
                    'Calidad del trabajo',
                    'Atención al detalle',
                    'Puntualidad de las entregas',
                    'Gestionar la carga de trabajo y cumplir los plazos'
                  ] },
                  { id: 2, name: 'Habilidades blandas', subcategories: [
                    'Liderazgo',
                    'Comunicación',
                    'Resolución de problemas',
                    'Pensamiento crítico',
                    'Trabajo en equipo'
                  ] },
                  { id: 3, name: 'Conocimientos técnicos', subcategories: [
                    'Capacidad analítica',
                    'Aprendizaje continuo y desarrollo profesional',
                    'Conocimientos técnicos',
                    'Conocimiento del producto',
                    'Resolución de problemas técnicos'
                  ] },
                  { id: 4, name: 'Orientación al cliente', subcategories: [
                    'Respuesta a las consultas y peticiones',
                    'Comprender las necesidades y preferencias',
                    'Resolución eficaz de los problemas',
                    'Mejora continua de los productos o servicios',
                    'Creación y mantenimiento de relaciones positivas',
                  ] },
                  { id: 5, name: 'Creatividad e iniciativa', subcategories: [
                    'Asunción de riesgos',
                    'Mentalidad abierta',
                    'Colaboración',
                    'Feedback',
                    'Nuevas ideas',
                  ] },
                ]}
                projects={[
                  { id: 1, name: 'BLF-KC-0012' },
                  { id: 2, name: 'BLF-KC-0013' },
                  { id: 3, name: 'BLF-KC-0014' },
                  { id: 4, name: 'BLF-KC-0015' },
                  { id: 5, name: 'BLF-KC-0016' },
                ]}
              />
            ),
          },
        ],
      },
      {
        path: 'evaluationTemplate',
        children: [
          {
            path: 'Index',
            element: <EvaluationTemplateIndex/>
          },
          {
            path: 'Create',
            element: <EvaluationTemplateCreate/>
          },
          {
            path: 'Edit',
            element: <EvaluationTemplateEdit/>
          },
        ]
      },
      {
        path: 'promotions',
        children: [
          {
            path: 'candidates',
            element: <AscensosCandidatos promotionPosition='UX/UI Designer'/>
          },
        ]
      }
    ]
  }
]

export default routes;