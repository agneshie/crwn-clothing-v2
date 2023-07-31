import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Root from './routes/Root/Root.component';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
