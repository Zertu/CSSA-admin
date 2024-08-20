import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import thunk from 'redux-thunk'
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./components/App";
import reducers from "./reducers";
axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export const store = configureStore({
  reducer: reducers,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
