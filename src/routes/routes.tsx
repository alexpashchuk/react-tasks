import { createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '~components/NotFound/notFoundPage.tsx';
import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import FallbackError from '~components/FallbackError/fallbackError.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AnimeRoot />,
    errorElement: <FallbackError />,
    children: [
      {
        path: 'details/:id',
        element: <AnimeDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
