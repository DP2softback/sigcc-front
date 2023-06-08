import { lazy, Suspense } from "react";
import { Roles } from "@routes/types/roles";
import { RouteObject, Navigate } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import { CREATE_JOB_OFFER, JOB_OFFERS_CANDIDATE_PORTAL, SELECTION_PROCESS_MODULE } from "./path";

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);

const ConfigSelectionProcess = Loader(
  lazy(() => import("@features/Modulo4/pages/JobPositions/ConfigPosition"))
);

const ConfigOfertaLaboral = Loader(
  lazy(() => import("@features/Modulo4/pages/JobPositions/CreateJobOffer"))
);

export const routes: RouteObject[] = [
  {
    path: SELECTION_PROCESS_MODULE,
    children: [
      {
        path: CREATE_JOB_OFFER,
        element: (<AppLayout allowedRoles={[Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HR_WORKER, Roles.CANDIDATE]}><ConfigOfertaLaboral /></AppLayout>),
      },
      {
        path: JOB_OFFERS_CANDIDATE_PORTAL,
        element: (<AppLayout allowedRoles={[Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HR_WORKER, Roles.CANDIDATE]}><ConfigSelectionProcess /></AppLayout>),
      },
      {
        path: "*",
        element: <Navigate to={JOB_OFFERS_CANDIDATE_PORTAL} replace />,
      },
    ],
  },
]