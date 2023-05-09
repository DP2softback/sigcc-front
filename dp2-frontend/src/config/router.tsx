import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);

const ListExample = Loader(
  lazy(() => import('@features/ExampleModule/features/ListExample'))
);

const RegisterExample = Loader(
  lazy(() => import('@features/ExampleModule/features/ListExample'))
);

const Modulo1 = Loader(
  lazy(() => import('@features/Modulo1'))
);

const M1ListTraining = Loader(
  lazy(() => import('@features/Modulo1/pages/Training'))
);

const M1TrainingDetails = Loader(
  lazy(() => import('@features/Modulo1/pages/Training/Details'))
);

/** HERE YOU DEFINE ALL THE ROUTES OF THE APP */

const routes: RouteObject[] = [
  {
    path: '',
  },
  {
    path: 'example',
    children: [
      {
        path: 'list',
        element: <ListExample />
      },
      {
        path: 'register',
        element: <RegisterExample />
      },
    ]
  },
  {
    path: 'modulo0',
    children: [
      {
        path: 'submodulo0',
        children: [
          {
            path: 'list',
            element: <ListExample />
          },
          {
            path: 'register',
            element: <ListExample />
          },
        ]
      },
      {
        path: 'submodulo1',
        children: [
          {
            path: 'list',
            element: <ListExample />
          },
          {
            path: 'register',
            element: <ListExample />
          },
        ]
      },
    ]
  },
  {
    path: 'modulo1',
    element: <Modulo1 />,
    children: [
      {
        path: 'submodulo0',
        children: [
          {
            path: 'list',
            element: <ListExample />
          },
          {
            path: 'register',
            element: <ListExample />
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
        ]
      },
    ]
  },
]

export default routes;