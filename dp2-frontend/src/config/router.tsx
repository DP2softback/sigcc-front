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

const EvaluacionContinuaIndex = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/Index'))
);

const EvaluacionContinuaHistory = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/History'))
);

const EvaluacionContinuaCreate = Loader(
  lazy(() => import('@features/Modulo3/screens/EvaluacionContinua/Create'))
);

const AscensosCandidatos = Loader(
  lazy(() => import('@features/Modulo3/screens/Ascensos/Candidates'))
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
            path: 'create',
            element: 
            <EvaluacionContinuaCreate
              employee={{
                id: 1,
                FullName: "Angela Quispe Ramirez",
              }}
              categories={[
                { id: 1, name: "Calidad del Trabajo" },
                { id: 2, name: "Habilidades Blandas" },
                { id: 3, name: "Conocimientos" },
                { id: 4, name: "Productividad" },
                { id: 5, name: "Creatividad y Iniciativa" },
              ]}
              projects={[
                { id: 1, name: "BLF-KC-0012"} ,
                { id: 2, name: "BLF-KC-0013"} ,
                { id: 3, name: "BLF-KC-0014"} ,
                { id: 4, name: "BLF-KC-0015"} ,
                { id: 5, name: "BLF-KC-0016"} ,
              ]}
            />
          }
        ]
      }
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

export default routes;