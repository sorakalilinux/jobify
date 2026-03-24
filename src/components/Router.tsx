import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import VagasPage from '@/components/pages/VagasPage';
import VagaDetalhePage from '@/components/pages/VagaDetalhePage';
import CandidatarPage from '@/components/pages/CandidatarPage';
import EmpresasPage from '@/components/pages/EmpresasPage';
import LoginPage from '@/components/pages/LoginPage';
import ProfessionalPage from '@/components/pages/ProfessionalPage';
import ContractorPage from '@/components/pages/ContractorPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/vagas" replace />,
      },
      {
        path: "vagas",
        element: <VagasPage />,
        routeMetadata: {
          pageIdentifier: 'vagas',
        },
      },
      {
        path: "vagas/:id",
        element: <VagaDetalhePage />,
        routeMetadata: {
          pageIdentifier: 'vaga-detalhe',
        },
      },
      {
        path: "candidatar/:id",
        element: <CandidatarPage />,
        routeMetadata: {
          pageIdentifier: 'candidatar',
        },
      },
      {
        path: "empresas",
        element: <EmpresasPage />,
        routeMetadata: {
          pageIdentifier: 'empresas',
        },
      },
      {
        path: "login",
        element: <LoginPage />,
        routeMetadata: {
          pageIdentifier: 'login',
        },
      },
      {
        path: "profissional",
        element: <ProfessionalPage />,
        routeMetadata: {
          pageIdentifier: 'profissional',
        },
      },
      {
        path: "contratante",
        element: <ContractorPage />,
        routeMetadata: {
          pageIdentifier: 'contratante',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
