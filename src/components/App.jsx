import React from "react";
import { RouterProvider, Navigate, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ErrorPage from "../pages/error/ErrorPage";

import "../styles/theme.scss";
import LayoutComponent from "./Layout/Layout";
//import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { logoutUser } from "../actions/user";

const PrivateRoute = ({ dispatch, children }) => {
  if (Login.isAuthenticated(localStorage.getItem("id_token"))) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

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
  ];
  const router = createBrowserRouter(routes)
  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeButton={<CloseButton />}
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
