import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import VagasPage from '@/components/pages/VagasPage';
import VagaDetalhePage from '@/components/pages/VagaDetalhePage';
import CandidatarPage from '@/components/pages/CandidatarPage';
import EmpresasPage from '@/components/pages/EmpresasPage';

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
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
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
