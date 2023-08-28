import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Root from './routes/Root/Root.component';
import ErrorPage from './ErrorPage';
import Home from './routes/Home/Home.component';
import Authentication from './routes/Authentication/Authentication.component';
import Shop from './routes/Shop/Shop.component';
import Checkout from './routes/Checkout/Checkout.component';


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
      },
      {
        path: "checkout",
        element: <Checkout />
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
