import { createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFoundPage/notFoundPage.tsx';
import ErrorPage from '@/pages/ErrorPage/errorPage.tsx';
import Layout from '@/components/Layout/layout.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary/errorBoundary.tsx';
import MainPage from '@/pages/MainPage/mainPage.tsx';
import ReactHookFormPage from '@/pages/ReactHookFormPage/reactHookFormPage.tsx';
import UncontrolledFormPage from '@/pages/UncontrolledFormPage/uncontrolledFormPage.tsx';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/uncontrolled-form',
        element: <UncontrolledFormPage />,
      },
      {
        path: '/react-hook-form',
        element: <ReactHookFormPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
].map((route) => ({
  ...route,
  element: <ErrorBoundary fallback={<ErrorPage />}>{route.element}</ErrorBoundary>,
}));

export const router = createBrowserRouter(routes);
