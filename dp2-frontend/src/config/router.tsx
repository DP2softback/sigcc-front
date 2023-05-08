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

const Modulo1LP = Loader(
  lazy(() => import('@features/Modulo1/pages/LearningPath'))
);

const Modulo1CapC = Loader(
  lazy(() => import('@features/Modulo1/index2'))
);

const Modulo1CapP = Loader(
  lazy(() => import('@features/Modulo1/pages/Training'))
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
    // element: <Modulo1CapC />,
    children: [
      {
        path: 'rutadeaprendizaje',
        element: <Modulo1LP />
      },
      {
        path: 'capacitacion',
        element: <Modulo1CapP />
      },
    ]
  },
]

export default routes;