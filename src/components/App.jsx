import React from "react";
import { connect } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
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

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route
             path="/app/*"
              element={
                <PrivateRoute dispatch={this.props.dispatch}>
                    <LayoutComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/documentation"
              element={
                <Navigate
                  to="/documentation/getting-started/overview"
                  replace
                />
              }
            />
            {/* <Route path="/documentation" element={<DocumentationLayoutComponent />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
