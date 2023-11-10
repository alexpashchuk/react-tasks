import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from '~routes/routesConfig.tsx';

const App = () => {
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
};

export default App;
