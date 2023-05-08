import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);


const Modulo1 = Loader(
  lazy(() => import('@features/Modulo1'))
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

/** HERE YOU DEFINE ALL THE ROUTES OF THE APP */

const routes: RouteObject[] = [
  {
    path: 'modulo1',
    children: [
      {
        path: '',
        element: <Modulo1 />
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
    ]
  },
]

export default routes;