import React from "react";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";

import ErrorPage from "../pages/error/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import "../styles/theme.scss";
import LayoutComponent from "./Layout/Layout";
//import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { logoutUser } from "../actions/user";
import NotFound from "@/pages/notFound/NotFound";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
const App = () => {
  const routes = [
    {
      path: "/",
      element: <Navigate to="/app" replace />,
    },
    {
      path: "/app/*",
      element: (
        <PrivateRoute>
          <LayoutComponent />
        </PrivateRoute>
      ),
    },
    {
      path: "/documentation",
      element: (
        <Navigate to="/documentation/getting-started/overview" replace />
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
