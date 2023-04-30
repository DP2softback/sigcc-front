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

/** HERE YOU DEFINE ALL THE ROUTES OF THE APP */

const routes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to="/example/list" replace />
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
]

export default routes;