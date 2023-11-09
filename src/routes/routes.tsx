import { createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '~components/NotFound/notFoundPage.tsx';
import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import FallbackError from '~components/FallbackError/fallbackError.tsx';
import { AnimeContextProvider } from '~context/animeContext.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AnimeContextProvider>
        <AnimeRoot />
      </AnimeContextProvider>
    ),
    errorElement: <FallbackError />,
    children: [
      {
        path: '',
        element: <AnimeDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
