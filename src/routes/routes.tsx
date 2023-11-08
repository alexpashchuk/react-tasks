import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MainLayout } from '~components/MainLayout/MainLayout.tsx';
import NotFoundPage from '~components/NotFound/notFoundPage.tsx';
import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import { ErrorBoundary } from '~components/ErrorBoundary/errorBoundary.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/characters" replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/characters',
    element: (
      <ErrorBoundary>
        <MainLayout>
          <AnimeRoot />
        </MainLayout>
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'details/:id',
        element: <AnimeDetail />,
      },
    ],
  },
]);
