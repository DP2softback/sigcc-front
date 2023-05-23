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

const ConfigSelectionProcess = Loader(
  lazy(() => import('@features/Modulo4/pages/ConfigSelectionProcess'))
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
    path: 'modulo1',
    children: [
      {
        path: 'configurar-proceso-seleccion',
        element: <ConfigSelectionProcess />
      },
    ]
  },
]

export default routes;