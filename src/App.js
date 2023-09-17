import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { useDispatch } from "react-redux";


import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

import Root from './routes/Root/Root.component';
import ErrorPage from './ErrorPage';
import Home from './routes/Home/Home.component';
import Authentication from './routes/Authentication/Authentication.component';
import Shop from './routes/Shop/Shop.component';
import Checkout from './routes/Checkout/Checkout.component';
import Category from './routes/Category/Category.component';

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
        path: "shop/:category",
        element: <Category />
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
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = () => onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));

    });
    return unsubscribe;
  }, []);



  return (
    <RouterProvider router={router} />
  );
}

export default App;
