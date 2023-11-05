import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MainLayout } from '~components/MainLayout/MainLayout.tsx';
import NotFoundPage from '~components/NotFound/NotFoundPage.tsx';
import CharactersRoot from '~components/CharactersRoot/CharactersRoot.tsx';
import CharacterDetail from '~components/CharacterDetail/CharacterDetail.tsx';
import { ErrorBoundary } from '~components/ErrorBoundary/ErrorBoundary.tsx';

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
          <CharactersRoot />
        </MainLayout>
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'details/:id',
        element: <CharacterDetail />,
      },
    ],
  },
]);
