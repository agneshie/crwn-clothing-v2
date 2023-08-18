import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Root from './routes/Root/Root.component';
import ErrorPage from './ErrorPage';
import Home from './routes/Home/Home.component';
import Authentication from './routes/Authentication/Authentication.component';


const Shop = () => {
  return(
    <h1>I am the Shop page</h1>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />  
      },
      {
        path: "shop",
        element: <Shop />
      },
      {
        path: "auth",
        element: <Authentication />
      }
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
